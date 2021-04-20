import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";

import BottomNavigationBar from "./BottomNavigationBar";
import InputContactScreen from "../../screens/InputContactScreen";
import ContactDetailsScreen from "../../screens/ContactDetailsScreen";
import AboutScreen from "../../screens/AboutScreen";

const Stack = createStackNavigator();

const ScreensStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
              ? options.title
              : scene.route.name;
          return (
            <Appbar.Header
              theme={{
                colors: { primary: theme.colors.surface }
              }}>
              {previous
                ? (
                  <Appbar.BackAction
                    onPress={navigation.goBack}
                    color={theme.colors.primary}
                    style={{ backgroundColor: "white" }}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      marginLeft: 10
                    }}
                    onPress={() => navigation.openDrawer()}
                  >
                    <Avatar.Image
                      size={40}
                      style={{ backgroundColor: "white" }}
                      source={require("../../../assets/logo.png")}
                    />
                  </TouchableOpacity>
                )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.colors.text,
                }}
              />
            </Appbar.Header>
          );
        }
      }}
    >
      <Stack.Screen
        name="Main"
        component={BottomNavigationBar}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Contacts";
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name="New Contact"
        component={InputContactScreen}
        options={{ headerTitle: "New Contact" }}
      />
      <Stack.Screen
        name="Contact Details"
        component={ContactDetailsScreen}
        options={{ headerTitle: "Contact Details" }}
      />
      <Stack.Screen
        name="Edit Contact"
        component={InputContactScreen}
        options={{ headerTitle: "Edit Contact" }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        option={{ headerTitle: "About" }}
      />
    </Stack.Navigator>
  );
};

export default ScreensStack;