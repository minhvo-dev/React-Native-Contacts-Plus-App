import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import EmailSignInScreen from "../../screens/EmailSignInScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="EmailSignIn" component={EmailSignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;