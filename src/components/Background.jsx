import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%"
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

const Background = ({ children }) => (

  <ImageBackground
    source={require("../../assets/background_dot.png")}
    resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView
      enabled
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

export default Background;