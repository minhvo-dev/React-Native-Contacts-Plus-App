import React from "react";
import { useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ContactsScreen from "../../screens/ContactsScreen";
import FavoriteScreen from "../../screens/FavoriteScreen";
import UserScreen from "../../screens/UserScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomNavigationBar = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.disabled}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: "card-account-phone",
          tabBarColor: theme.colors.surface
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: "heart",
          tabBarColor: theme.colors.surface
        }}
      />
      <Tab.Screen
        name="Me"
        component={UserScreen}
        options={{
          tabBarIcon: "account",
          tabBarColor: theme.colors.surface
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;