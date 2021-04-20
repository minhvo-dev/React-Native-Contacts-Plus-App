import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import {
  Avatar,
  Caption,
  Drawer,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { signOutAsync } from "../../utils/firebase";
import { DispatchContext, StateContext } from "../../contexts/appContext";
import { PreferencesContext } from "../../contexts/preferencesContext";
import { resetAppState, setSnackbar } from "../../reducers/reducer";
import { formatPhoneNumber } from "../../utils/helpers";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    alignSelf: "center"
  },
  drawerContainer: {
    marginTop: 15
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});

const SettingsDrawer = (props) => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);
  const { authUser, userInfo } = React.useContext(StateContext);
  const { darkMode, toggleDarkMode } = React.useContext(PreferencesContext);

  const handleSignOutPressed = async () => {
    try {
      props.navigation.closeDrawer();
      await signOutAsync();
      if (theme.dark) {
        toggleDarkMode();
      }
      dispatch(resetAppState());
      dispatch(setSnackbar(true, "Signed out successfully"));
    }
    catch (error) {
      console.log(error);
      dispatch(setSnackbar(true, error.message));
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={
        {
          flex: 1,
          height: "100%",
          backgroundColor: theme.colors.surface
        }
      }>
        <View>
          <TouchableOpacity
            style={{ marginLeft: 10, alignSelf: "center" }}
            onPress={() => props.navigation.navigate("Me")}
          >
            <Avatar.Image
              source={userInfo && userInfo.photo ? { uri: userInfo.photo } : require("../../../assets/default_photo.png")}
              size={50}
            />
          </TouchableOpacity>

          <Title style={styles.title}>
            {authUser.displayName}
          </Title>

          <Caption style={styles.caption}>
            {userInfo ? formatPhoneNumber(userInfo.phone) : ""}
          </Caption>
        </View>

        <Drawer.Section title="Preferences" style={styles.drawerContainer}>
          <TouchableRipple onPress={toggleDarkMode}>
            <View style={styles.preference}>
              <Text style={{ color: theme.colors.placeholder }}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={darkMode} color={theme.colors.primary} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            label="About"
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="information"
                size={size}
                color={color}
              />
            )}
            onPress={() => props.navigation.navigate("About")}
          />
          <DrawerItem
            label="Sign Out"
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                size={size}
                color={color}
              />
            )}
            onPress={() => handleSignOutPressed()}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default SettingsDrawer;