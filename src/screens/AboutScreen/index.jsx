import React from "react";
import { View } from "react-native";
import { Divider, IconButton, List, useTheme } from "react-native-paper";

import { DispatchContext } from "../../contexts/appContext";
import { setSnackbar } from "../../reducers/reducer";
import { openWebBrowserAsync } from "../../utils/contactService";
const AboutScreen = () => {
  const theme = useTheme();
  const dispatch = React.useContext(DispatchContext);

  const handleVisitPressed = async () => {
    try {
      await openWebBrowserAsync("https://minhvo-dev.github.io");
    }
    catch (error) {
      dispatch(setSnackbar(error.message));
    }
  };

  return (
    <View style={{
      flexDirection: "column",
      width: "100%",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20
    }}>
      <List.Section>
        <List.Subheader>Application</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
        />
        <Divider />
        <List.Item
          title="Flatforms"
          description="iOS, Android"
        />
        <Divider />
        <List.Item
          title="License"
          description="MIT"
        />
        <Divider />
        <List.Item
          title="Developer"
          description="Vo, Dinh Tue Minh"
          right={props => (
            <IconButton
              {...props}
              color={theme.colors.primary}
              icon="login"
              onPress={handleVisitPressed}
            />
          )}
        />
      </List.Section>
    </View >
  );
};

export default AboutScreen;