import React from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import Constants from "expo-constants";

import { auth } from "../../utils/firebase";
import { DispatchContext, StateContext } from "../../contexts/appContext";
import { setAuthUser, setContacts, setSnackbar, setUserInfo } from "../../reducers/reducer";
import { getAllDocumentsInCollectionAsync } from "../../utils/dbService";

import AppNavigator from "./AppNavigator";
import AuthStack from "./AuthStack";
import LoadingScreen from "../../screens/LoadingScreen";

const Navigation = () => {
  const theme = useTheme();
  const { authUser } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
    const unsubscribe = auth.onAuthStateChanged(async authUser => {
      try {
        if (authUser) {
          // get all data from the firestore for this user
          const querySnapshot = await getAllDocumentsInCollectionAsync(authUser.uid);
          if (!querySnapshot.empty) {
            const contacts = [];
            querySnapshot.forEach(doc => {
              // there are 2 doc types: userinfo and contact
              // differentiate by doc.id
              if (doc.id === Constants.manifest.extra.userInfoDocument) {
                dispatch(setUserInfo(doc.data()));
              }
              else {
                contacts.push({ id: doc.id, ...doc.data() });
              }
            });
            dispatch(setContacts(contacts));
            dispatch(setSnackbar(true, "Loaded data successfully"));
          }
          dispatch(setAuthUser(authUser));
        }
        else {
          dispatch(setAuthUser(null));
        }
        setIsLoading(false); //todo: uncomment
      }
      catch (error) {
        console.log(error);
        dispatch(setSnackbar(true, error.message));
      }
    });
    // on unmount, run unsubcribe
    return unsubscribe;
  }, []);

  if (isLoading && !authUser) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
      {authUser ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;