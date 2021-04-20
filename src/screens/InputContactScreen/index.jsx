import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Divider,
  useTheme
} from "react-native-paper";

import {
  emailValidator,
  nameValidator,
  phoneValidator,
  socialAccountValidator
} from "../../utils/validators";
import { DispatchContext, StateContext } from "../../contexts/appContext";
import { addNewContact, setSnackbar, updateContact } from "../../reducers/reducer";
import { getBase64ImageUriFromPhotoLibraryAsync } from "../../utils/imageService";
import { addDataToCollectionAsync, updateDataOfDocumentInCollectionAsync } from "../../utils/dbService";

import TextInput from "../../components/TextInput";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start"
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
  },
  groupContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center"
  },
  titleContainer: {
    width: 60,
    justifyContent: "center"
  },
  title: {
    textAlign: "left"
  },
  textInputContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  vline: {
    width: 1,
    height: 30,
    marginHorizontal: 10,
  },
  hline: {
    marginHorizontal: 10
  }
});

const InputContactScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const { authUser, contacts } = React.useContext(StateContext);

  const contact = contactId ? contacts.find(c => c.id === contactId) : null;

  const [name, setName] = React.useState({ value: contact ? contact.name : "", error: "" });
  const [phone, setPhone] = React.useState({ value: contact ? contact.phone : "", error: "" });
  const [email, setEmail] = React.useState({ value: contact ? contact.email : "", error: "" });
  const [twitter, setTwitter] = React.useState({ value: contact ? contact.twitter : "", error: "" });
  const [facebook, setFacebook] = React.useState({ value: contact ? contact.facebook : "", error: "" });
  const [instagram, setInstagram] = React.useState({ value: contact ? contact.instagram : "", error: "" });
  const [imageBase64, setImageBase64] = React.useState(contact ? contact.photo : null);

  const handleCancelPressed = () => {
    navigation.goBack();
  };

  const pushDataToDatabase = async (isNew) => {
    const nameError = nameValidator(name.value);
    const phoneError = phoneValidator(phone.value);
    const emailError = email.value ? emailValidator(email.value) : "";
    const twitterError = twitter.value ? socialAccountValidator(twitter.value) : "";
    const facebookError = facebook.value ? socialAccountValidator(facebook.value) : "";
    const instagramError = instagram.value ? socialAccountValidator(instagram.value) : "";

    if (nameError || phoneError || emailError || twitterError || facebookError || instagramError) {
      setName({ ...name, error: nameError });
      setPhone({ ...phone, error: phoneError });
      setEmail({ ...email, error: emailError });
      setTwitter({ ...twitter, error: twitterError });
      setFacebook({ ...facebook, error: facebookError });
      setInstagram({ ...instagram, error: instagramError });
    }
    else {
      try {
        const data = {
          name: name.value,
          phone: phone.value,
          email: email.value,
          twitter: twitter.value,
          facebook: facebook.value,
          instagram: instagram.value,
          favorite: contact ? contact.favorite : false,
          photo: imageBase64
        };

        if (isNew) {
          const docRef = await addDataToCollectionAsync(authUser.uid, data);
          data.id = docRef.id;
          dispatch(addNewContact(data));
          dispatch(setSnackbar(true, "Added new contact successfully"));
        }
        else {
          await updateDataOfDocumentInCollectionAsync(authUser.uid, contactId, data);
          dispatch(updateContact({ ...data, id: contact.id }));
          dispatch(setSnackbar(true, "Updated contact successfully"));
        }
        navigation.goBack();
      }
      catch (error) {
        console.log(error);
        dispatch(setSnackbar(true, "Errors occurred"));
      }
    }
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
    <KeyboardAvoidingView
      enabled
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={[styles.groupContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.itemContainer]}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handlePhotoPressed}
            >
              <Avatar.Image
                size={60}
                source={imageBase64 ? { uri: imageBase64 } : require("../../../assets/default_photo.png")}
              />
            </TouchableOpacity>
            <Divider style={[styles.vline, { height: 40 }]} />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Name"
                dense
                mode="text"
                returnKeyType="done"
                autoCapitalize="words"
                value={name.value}
                onChangeText={text => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
              />
            </View>
          </View>
        </View>

        <View style={[styles.groupContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.itemContainer]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {"Phone"}
              </Text>
            </View>
            <Divider style={styles.vline} />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Phone"
                dense
                mode="text"
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
            </View>
          </View>

          <Divider style={styles.hline} />

          <View style={[styles.itemContainer]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {"Email"}
              </Text>
            </View>
            <Divider style={styles.vline} />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email"
                dense
                mode="text"
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
            </View>
          </View>

          <Divider style={styles.hline} />

          <View style={[styles.itemContainer]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {"Twitter"}
              </Text>
            </View>
            <Divider style={styles.vline} />
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Twitter"
                dense
                mode="text"
                leftIcon="at"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="off"
                value={twitter.value}
                onChangeText={text => setTwitter({ value: text, error: "" })}
                error={!!twitter.error}
                errorText={twitter.error}
              />
            </View>
          </View>

          <Divider style={styles.hline} />

          <View style={[styles.itemContainer]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {"Facebook"}
              </Text>
            </View>
            <Divider style={styles.vline} />
            <View style={styles.textInputContainer}>
              <TextInput
                dense
                placeholder="Facebook"
                mode="text"
                leftIcon="facebook"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="off"
                value={facebook.value}
                onChangeText={text => setFacebook({ value: text, error: "" })}
                error={!!facebook.error}
                errorText={facebook.error}
              />
            </View>
          </View>

          <Divider style={styles.hline} />

          <View style={[styles.itemContainer]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {"Instagram"}
              </Text>
            </View>
            <Divider style={styles.vline} />
            <View style={styles.textInputContainer}>
              <TextInput
                dense
                placeholder="Instagram"
                mode="text"
                leftIcon="instagram"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="off"
                value={instagram.value}
                onChangeText={text => setInstagram({ value: text, error: "" })}
                error={!!instagram.error}
                errorText={instagram.error}
              />
            </View>
          </View>
        </View>

        <View style={[
          styles.groupContainer,
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            marginBottom: 40,
            paddingVertical: 10,
          }
        ]}>
          {contact ? (
            <>
              <Button
                style={{ width: 100 }}
                icon={"cancel"}
                mode="contained"
                onPress={handleCancelPressed}
              >
                {"Cancel"}
              </Button>
              <Button
                style={{ width: 100, marginLeft: 20 }}
                icon={"content-save"}
                mode="contained"
                onPress={() => pushDataToDatabase(false)}
              >
                {"Save"}
              </Button>
            </>
          ) : (
            <Button
              style={{ alignSelf: "center" }}
              icon="account-plus"
              mode="contained"
              onPress={() => pushDataToDatabase(true)}
              dark
            >
              {"Add to contacts"}
            </Button>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

export default InputContactScreen;