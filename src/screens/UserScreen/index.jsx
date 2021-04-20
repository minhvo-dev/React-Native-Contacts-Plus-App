import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Avatar, Button, Divider, IconButton, List, Title, useTheme } from "react-native-paper";
import Clipboard from "expo-clipboard";
import Constants from "expo-constants";

import { DispatchContext, StateContext } from "../../contexts/appContext";
import { setSnackbar, setUserInfo } from "../../reducers/reducer";
import { emailValidator, nameValidator, phoneValidator } from "../../utils/validators";
import { updateUserDisplayName } from "../../utils/firebase";
import { formatPhoneNumber } from "../../utils/helpers";
import { setDataToDocumentInCollectionAsync, updateDataOfDocumentInCollectionAsync } from "../../utils/dbService";
import { getBase64ImageUriFromPhotoLibraryAsync } from "../../utils/imageService";

import TextInput from "../../components/TextInput";

const UserScreen = () => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const { authUser, userInfo } = React.useContext(StateContext);
  const [editable, setEditable] = React.useState(false);
  const [name, setName] = React.useState({ value: "", error: "" });
  const [phone, setPhone] = React.useState({ value: "", error: "" });
  const [email, setEmail] = React.useState({ value: "", error: "" });
  const [address, setAddress] = React.useState({ value: "", error: "" });
  const [imageBase64, setImageBase64] = React.useState(null);

  const handleEditButtonPressed = () => {
    setName({ value: authUser.displayName, error: "" });
    setPhone({ value: userInfo ? userInfo.phone : "", error: "" });
    setEmail({ value: userInfo ? userInfo.email : "", error: "" });
    setAddress({ value: userInfo ? userInfo.address : "", error: "" });
    setImageBase64(userInfo ? userInfo.photo : null);
    setEditable(true);
  };

  const handleCancelPressed = () => {
    setName({ value: "", error: "" });
    setEditable(false);
  };

  const handleSavePressed = async () => {
    try {
      const nameError = nameValidator(name.value);
      const phoneError = phone.value ? phoneValidator(phone.value) : "";
      const emailError = email.value ? emailValidator(email.value) : "";

      if (nameError || phoneError || emailError) {
        setName({ ...name, error: nameError });
        setPhone({ ...phone, error: phoneError });
        setEmail({ ...email, error: emailError });
      }
      else {
        let updated = false;
        // update user displayname to firebase
        if (name.value !== authUser.displayName) {
          await updateUserDisplayName(name.value);
          updated = true;
        }
        // update user info to firestore
        const data = {
          phone: phone.value,
          email: email.value,
          address: address.value,
          photo: imageBase64
        };

        if (!userInfo) {
          // if user info does not exist yet
          await setDataToDocumentInCollectionAsync(authUser.uid, Constants.manifest.extra.userInfoDocument, data);
          updated = true;
        }
        else {
          // update only fields that changed
          const updateObject = {};
          if (userInfo.phone !== phone.value) {
            updateObject.phone = phone.value;
            updated = true;
          }
          if (userInfo.email !== email.value) {
            updateObject.email = email.value;
            updated = true;
          }
          if (userInfo.address !== address.value) {
            updateObject.address = address.value;
            updated = true;
          }
          if (userInfo.photo !== imageBase64) {
            updateObject.photo = imageBase64;
            updated = true;
          }
          if (updated) {
            await updateDataOfDocumentInCollectionAsync(authUser.uid, Constants.manifest.extra.userInfoDocument, updateObject);
          }
        }
        if (updated) {
          dispatch(setUserInfo(data));
          dispatch(setSnackbar(true, "Updated information successfully"));
        }
        setEditable(false);
      }
    }
    catch (error) {
      console.log(error);
      dispatch(setSnackbar(true, error.message));
      setEditable(false);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    dispatch(setSnackbar(true, "Copied to clipboard"));
  };

  const handlePhotoPressed = async () => {
    try {
      const result = await getBase64ImageUriFromPhotoLibraryAsync();
      if (result === undefined) {
        dispatch(setSnackbar(true, "Permission denied"));
      }
      else if (result) {
        setImageBase64(result);
      }
    }
    catch (error) {
      dispatch(setSnackbar(true, "Error occurred"));
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <View style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: theme.colors.surface
      }}>
        <TouchableOpacity
          disabled={!editable}
          onPress={handlePhotoPressed}
        >
          {editable ? (
            <Avatar.Image
              size={160}
              style={{ alignSelf: "center" }}
              source={imageBase64 ? { uri: imageBase64 } : require("../../../assets/default_photo.png")}
            />
          ) : (
            <Avatar.Image
              size={160}
              style={{ alignSelf: "center" }}
              source={userInfo && userInfo.photo ? { uri: userInfo.photo } : require("../../../assets/default_photo.png")}
            />
          )}
        </TouchableOpacity>
        <View style={{
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10
        }}>
          {editable ? (
            <TextInput
              label="Name"
              style={{ backgroundColor: theme.colors.surface }}
              dense
              mode="outlined"
              returnKeyType="done"
              autoCapitalize="words"
              value={name.value}
              onChangeText={text => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
            />
          ) : (
            <Title>
              {authUser.displayName}
            </Title>
          )}

        </View>
        <List.Section>
          <List.Subheader>Personal Information</List.Subheader>
          <Divider />
          {editable ? (
            <>
              <TextInput
                label="Phone"
                style={{ backgroundColor: theme.colors.surface }}
                dense
                mode="outlined"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                value={phone.value}
                onChangeText={text => setPhone({ value: text, error: "" })}
                error={!!phone.error}
                errorText={phone.error}
              />
              <TextInput
                label="Email"
                style={{ backgroundColor: theme.colors.surface }}
                dense
                mode="outlined"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
              />
              <TextInput
                label="Address"
                style={{ backgroundColor: theme.colors.surface }}
                dense
                mode="outlined"
                returnKeyType="done"
                value={address.value}
                onChangeText={text => setAddress({ value: text, error: "" })}
                error={!!address.error}
                errorText={address.error}
              />
            </>
          ) : (
            <>
              <List.Item
                style={{ paddingVertical: 0 }}
                title={userInfo ? formatPhoneNumber(userInfo.phone) : ""}
                left={props => (
                  <IconButton
                    {...props}
                    disabled={!userInfo || !userInfo.phone}
                    icon="cellphone"
                    color={theme.colors.primary}
                    style={{backgroundColor: "white"}}
                    onPress={() => copyToClipboard(userInfo.phone)}
                  />
                )}
              />
              < Divider />
              <List.Item
                style={{ paddingVertical: 0 }}
                title={userInfo ? userInfo.email : ""}
                left={props => (
                  <IconButton
                    {...props}
                    disabled={!userInfo || !userInfo.email}
                    icon="email"
                    color={theme.colors.primary}
                    style={{backgroundColor: "white"}}
                    onPress={() => copyToClipboard(userInfo.email)}
                  />
                )}
              />
              <Divider />
              <List.Item
                style={{ paddingVertical: 0 }}
                title={userInfo ? userInfo.address : ""}
                titleNumberOfLines={3}
                left={props => (
                  <IconButton
                    {...props}
                    disabled={!userInfo || !userInfo.address}
                    icon="home"
                    color={theme.colors.primary}
                    style={{backgroundColor: "white"}}
                    onPress={() => copyToClipboard(userInfo.address)}
                  />
                )}
              />

            </>
          )}
        </List.Section>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {!editable ? (
            <Button
              style={{ width: 100, marginTop: 20 }}
              icon={"pencil"}
              mode="contained"
              onPress={handleEditButtonPressed}
            >
              {"Edit"}
            </Button>
          ) : (
            <>
              <Button
                style={{ width: 100, marginTop: 20 }}
                icon={"cancel"}
                mode="contained"
                onPress={handleCancelPressed}
              >
                {"Cancel"}
              </Button>
              <Button
                style={{ width: 100, marginTop: 20, marginLeft: 20 }}
                icon={"content-save"}
                mode="contained"
                onPress={handleSavePressed}
              >
                {"Save"}
              </Button>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserScreen;