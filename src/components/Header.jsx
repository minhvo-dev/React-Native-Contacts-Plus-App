import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";

const Header = ({ children }) => {
  const theme = useTheme();
  return (
    <Text style={{
      fontSize: 26,
      color: theme.colors.primary,
      fontWeight: "bold",
      paddingVertical: 14
    }}>
      {children}
    </Text>
  );
};

export default Header;