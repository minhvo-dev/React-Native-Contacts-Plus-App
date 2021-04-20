import React from "react";
import { Text, View } from "react-native";
import { TextInput as TextInputPaper, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TextInput = ({ errorText, leftIcon, rightIcon, toggleText, ...props }) => {
  const theme = useTheme();

  return (
    <View style={{
      width: "100%",
      marginVertical: 12,
    }}>
      <TextInputPaper
        styles={{
          flex: 1,
          width: "100%"
        }}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        left={
          leftIcon ?
            <TextInputPaper.Icon
              name={() =>
                <MaterialCommunityIcons
                  name={leftIcon}
                  backgroundColor={theme.colors.surface}
                  color={theme.colors.text}
                  size={20}
                />}
            />
            : null
        }
        right={
          rightIcon ?
            <TextInputPaper.Icon
              name={() =>
                <MaterialCommunityIcons
                  name={rightIcon}
                  backgroundColor={theme.colors.surface}
                  size={20}
                  onPress={toggleText}
                />}
            />
            : null
        }
        {...props}
      />
      {errorText ? (
        <Text style={{
          fontSize: 14,
          color: theme.colors.error,
          paddingHorizontal: 4,
          paddingTop: 4
        }}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

export default TextInput;