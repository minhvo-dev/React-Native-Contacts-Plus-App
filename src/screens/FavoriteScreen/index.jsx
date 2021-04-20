import React from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

import { DispatchContext, StateContext } from "../../contexts/appContext";
import { setSnackbar, updateContact } from "../../reducers/reducer";
import { updateDataOfDocumentInCollectionAsync } from "../../utils/dbService";
import { openCallAppAsync, openSMSAppAsync } from "../../utils/contactService";

import ContactItem from "../ContactsScreen/ContactItem";

const favoriteContacts = contacts => contacts.filter(contact => contact.favorite);

const FavoriteScreen = ({ navigation }) => {
  const dispatch = React.useContext(DispatchContext);
  const { authUser, contacts } = React.useContext(StateContext);

  const toggleFavorite = async (id) => {
    try {
      const contact = contacts.find(c => c.id === id);
      if (contact.favorite) {
        await updateDataOfDocumentInCollectionAsync(authUser.uid, contact.id, { favorite: false });
        dispatch(updateContact({ ...contact, favorite: false }));
        dispatch(setSnackbar(true, `Removed ${contact.name} from Favorites`));
      }
      else {
        await updateDataOfDocumentInCollectionAsync(authUser.uid, contact.id, { favorite: true });
        dispatch(updateContact({ ...contact, favorite: true }));
        dispatch(setSnackbar(true, `Added ${contact.name} to Favorites`));
      }
    }
    catch (error) {
      console.log(error);
      dispatch(setSnackbar(true, "Errors occurred"));
    }
  };

  const handleSMSPressed = async (id) => {
    try {
      const contact = contacts.find(c => c.id === id);
      await openSMSAppAsync(contact.phone);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handlePhonePressed = async (id) => {
    try {
      const contact = contacts.find(c => c.id === id);
      await openCallAppAsync(contact.phone);
    }
    catch (error) {
      dispatch(setSnackbar(true, error.message));
    }
  };

  const handleContactItemPressed = (id) => {
    navigation.navigate("Contact Details", { contactId: id });
  };

  return (
    <FlatList
      data={favoriteContacts(contacts)}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          toggleFavorite={toggleFavorite}
          handleSMSPressed={handleSMSPressed}
          handlePhonePressed={handlePhonePressed}
          handleContactItemPressed={handleContactItemPressed}
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default FavoriteScreen;