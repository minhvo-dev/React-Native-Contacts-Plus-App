import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

import { signInWithGoogle } from "../../utils/firebase";

import Background from "../../components/Background";
import Header from "../../components/Header";
import Button from "../../components/Button";

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 64
  }
});

const SignInScreen = ({ navigation }) => {
  const theme = useTheme();

  const handleGoogleSignInPressed = async () => {
    await signInWithGoogle();
  };

  const handleEmailSignInPressed = () => {
    navigation.navigate("EmailSignIn");
  };

  const handleSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Background>
      <Image
        style={{ transform: [{ scale: 0.7 }] }}
        source={require("../../../assets/contact_plus.png")}
      />

      <Button mode="contained" onPress={handleGoogleSignInPressed}>
        Sign in with Google
      </Button>

      <Button mode="contained" onPress={handleEmailSignInPressed}>
        Sign in with email
      </Button>

      <View style={styles.rowContainer}>
        <Text style={{ color: theme.colors.text }}>{"Don't have an account? "}</Text>
        <TouchableOpacity onPress={handleSignUpPressed}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SignInScreen;