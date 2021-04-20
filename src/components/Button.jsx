import React from "react";
import { StyleSheet } from "react-native";
import { Button as ButtonPaper, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26
  }
});

const Button = ({ mode, style, children, ...props }) => {
  const theme = useTheme();
  return (
    <ButtonPaper
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    >
      {children}
    </ButtonPaper>
  );
};

export default Button;