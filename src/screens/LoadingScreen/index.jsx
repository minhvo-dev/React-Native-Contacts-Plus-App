import React from "react";
import { Image, ImageBackground, Text } from "react-native";
import { useTheme } from "react-native-paper";

const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}
      resizeMode="repeat"
      source={require("../../../assets/background_dot.png")}
    >
      <Image
        source={require("../../../assets/contact_plus.png")}
      />
      <Text style={{ color: theme.colors.primary }}>Loading...</Text>
    </ImageBackground>
  );
};

export default LoadingScreen;