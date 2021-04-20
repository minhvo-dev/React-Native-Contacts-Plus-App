import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, IconButton, List, useTheme } from "react-native-paper";

import { formatPhoneNumber } from "../../utils/helpers";

const ContactItem = ({
  contact,
  toggleFavorite,
  handleSMSPressed,
  handlePhonePressed,
  handleContactItemPressed
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => handleContactItemPressed(contact.id)}
    >
      <List.Item
        style={{ backgroundColor: theme.colors.surface }}
        title={contact.name}
        description={formatPhoneNumber(contact.phone)}
        left={props => (
          <Avatar.Image
            {...props}
            size={40}
            source={contact.photo ? { uri: contact.photo } : require("../../../assets/default_photo.png")}
          />)
        }
        right={props => (
          <View {...props} style={{ flexDirection: "row" }}>
            <IconButton
              icon={contact.favorite ? "heart" : "heart-outline"}
              size={20}
              color="red"
              style={{ backgroundColor: "white" }}
              onPress={async () => await toggleFavorite(contact.id)}
            />
            <IconButton
              icon="message-text-outline"
              size={20}
              color="blue"
              style={{ backgroundColor: "white" }}
              onPress={async () => await handleSMSPressed(contact.id)}
            />
            <IconButton
              icon="phone"
              size={20}
              color="green"
              style={{ backgroundColor: "white" }}
              onPress={async () => await handlePhonePressed(contact.id)} />
          </View>
        )}
      />
    </TouchableOpacity>
  );
};

export default ContactItem;