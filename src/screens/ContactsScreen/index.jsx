import React from "react";
import { FlatList } from "react-native";
import { Divider, FAB, Searchbar, useTheme } from "react-native-paper";

import { DispatchContext, StateContext } from "../../contexts/appContext";
import { setSnackbar, updateContact } from "../../reducers/reducer";
import { updateDataOfDocumentInCollectionAsync } from "../../utils/dbService";
import { openCallAppAsync, openSMSAppAsync } from "../../utils/contactService";

import ContactItem from "./ContactItem";

const filterContacts = (contacts, searchKeyword) => {
  // key => .*k.*e.*y
  const pattern = searchKeyword.split("").map(c => `.*${c}`).join("");
  const re = new RegExp(`${pattern}`, "iu"); // case-insensitive, unicode support
  return contacts.filter(contact => re.test(contact.name));
};

const ContactsScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const { authUser, contacts } = React.useContext(StateContext);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [fabVisible, setFabVisible] = React.useState(true);
  const [timeoutID, setTimeoutID] = React.useState(null);

  React.useEffect(() => {
    return () => {
      // clear the timeout
      console.log("Clear timeout running");
      clearTimeout(timeoutID);
    };
  }, []);

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

  const handleFlatListScrolled = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    setFabVisible(false);
    setTimeoutID(setTimeout(() => {
      setFabVisible(true);
      setTimeoutID(null);
    }, 3000));
  };

  const handleFABPressed = () => {
    navigation.navigate("New Contact", { contactId: null });
  };

  return (
    <>
      <FlatList
        data={filterContacts(contacts, searchKeyword)}
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
        stickyHeaderIndices={[0]}
        onScroll={handleFlatListScrolled}
        ListHeaderComponent={
          <Searchbar
            iconColor={theme.colors.primary}
            placeholder={`Search among ${contacts.length} contact${contacts.length > 1 ? "s" : ""}`}
            onChangeText={text => setSearchKeyword(text)}
            style={{ width: "95%", alignSelf: "center", marginVertical: 5 }}
          />
        }
      />
      <FAB
        visible={fabVisible}
        icon="account-plus"
        style={{
          position: "absolute",
          bottom: 10,
          right: 10
        }}
        color="white"
        theme={{
          colors: {
            accent: theme.colors.primary
          }
        }}
        onPress={handleFABPressed}
      />
    </>
  );
};

export default ContactsScreen;