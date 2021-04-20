import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar, Button, Divider, IconButton, List, Modal, Title, useTheme } from "react-native-paper";
import Clipboard from "expo-clipboard";

import { DispatchContext, StateContext } from "../../contexts/appContext";
import { removeContact, setSnackbar } from "../../reducers/reducer";
import { formatPhoneNumber } from "../../utils/helpers";
import {
  openCallAppAsync,
  openEmailAppAsync,
  openFacebookAppAsync,
  openInstagramAppAsync,
  openSMSAppAsync,
  openTwitterAppAsync
} from "../../utils/contactService";
import { deleteDocumentFromCollectionAsync } from "../../utils/dbService";

const DetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const { authUser, contacts } = React.useContext(StateContext);
  const [modalVisible, setModalVisible] = React.useState(false);

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) return null;

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    dispatch(setSnackbar(true, "Copied to clipboard"));
  };

  const handleSMSPressed = async () => {
    try {
      await openSMSAppAsync(contact.phone);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handlePhonePressed = async () => {
    try {
      await openCallAppAsync(contact.phone);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handleEmailPressed = async () => {
    try {
      await openEmailAppAsync(contact.email);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handleFacebookPressed = async () => {
    try {
      await openFacebookAppAsync(contact.facebook);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }

  };

  const handleTwitterPressed = async () => {
    try {
      await openTwitterAppAsync(contact.twitter);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handleInstagramPressed = async () => {
    try {
      await openInstagramAppAsync(contact.instagram);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handleEditPressed = () => {
    navigation.navigate("Edit Contact", { contactId: contact.id });
  };

  const handleDeletePressed = () => {
    setModalVisible(true);
  };

  const deleteContact = async () => {
    try {
      await deleteDocumentFromCollectionAsync(authUser.uid, contact.id);
      navigation.goBack();
      dispatch(removeContact(contact.id));
      dispatch(setSnackbar(true, "Deleted contact successfully"));
    }
    catch (error) {
      console.log(error);
      dispatch(setSnackbar(true, "Errors occurred"));
    }
  };

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <View style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: theme.colors.surface
      }}>
        <Avatar.Image
          size={160}
          style={{ alignSelf: "center" }}
          source={contact.photo ? { uri: contact.photo } : require("../../../assets/default_photo.png")}
        />
        <Title style={{ alignSelf: "center", marginVertical: 10 }}>
          {contact.name}
        </Title>

        <List.Section>
          <List.Subheader>Contact Details</List.Subheader>
          <List.Item
            title={formatPhoneNumber(contact.phone)}
            left={props => (
              <IconButton
                {...props}
                style={{ alignSelf: "center", marginVertical: 0, backgroundColor: "white" }}
                icon="cellphone"
                color={theme.colors.primary}
                onPress={() => copyToClipboard(contact.phone)}
              />
            )}
            right={props => (
              <View {...props} style={{ flexDirection: "row" }}>
                <IconButton
                  icon="message-text-outline"
                  size={20}
                  color="blue"
                  style={{ backgroundColor: "white" }}
                  onPress={handleSMSPressed}
                />
                <IconButton
                  icon="phone"
                  size={20}
                  color="green"
                  style={{ backgroundColor: "white" }}
                  onPress={handlePhonePressed} />
              </View>
            )}
          />
          {!!contact.email && (
            <List.Item
              title={contact ? contact.email : ""}
              left={props => (
                <IconButton
                  {...props}
                  style={{ alignSelf: "center", marginVertical: 0, backgroundColor: "white" }}
                  disabled={!contact.email}
                  icon="email"
                  color={theme.colors.primary}
                  onPress={() => copyToClipboard(contact.email)}
                />
              )}
              right={props => (contact.email ? (
                <IconButton
                  {...props}
                  icon="email-edit-outline"
                  color={theme.colors.primary}
                  style={{ backgroundColor: theme.colors.background }}
                  onPress={handleEmailPressed}
                />) : (
                null
              ))}
            />)
          }

          < Divider />

          <List.Subheader>Social Accounts</List.Subheader>
          {!!contact.facebook && (
            <Button
              icon="facebook"
              mode="text"
              color="#4267B2"
              onPress={handleFacebookPressed}
            >
              {"Visit on Facebook"}
            </Button>
          )}
          {!!contact.twitter && (
            <Button
              icon="twitter"
              mode="text"
              color="#1DA1F2"
              onPress={handleTwitterPressed}
            >
              {"Visit on Twitter"}
            </Button>
          )}
          {!!contact.instagram && (
            <Button
              icon="instagram"
              mode="text"
              color="#C13584"
              onPress={handleInstagramPressed}
            >
              {"Visit on Instagram"}
            </Button>
          )}
        </List.Section>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            style={{ width: 100, marginTop: 20 }}
            icon={"delete"}
            mode="contained"
            onPress={handleDeletePressed}
          >
            {"Delete"}
          </Button>
          <Button
            style={{ width: 100, marginTop: 20, marginLeft: 20 }}
            icon={"pencil"}
            mode="contained"
            onPress={handleEditPressed}
          >
            {"Edit"}
          </Button>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={{
          borderRadius: 8,
          backgroundColor: theme.colors.surface,
          padding: 20,
          margin: 20
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: theme.colors.text }}>Do you want to delete this contact?</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 20
        }}>
          <Button
            mode="outlined"
            style={{ marginRight: 20 }}
            onPress={deleteContact}
          >
            {"Yes"}
          </Button>
          <Button
            mode="outlined"
            onPress={() => setModalVisible(false)}
          >
            {"No"}
          </Button>

        </View>
      </Modal>
    </ScrollView >
  );
};

export default DetailsScreen;