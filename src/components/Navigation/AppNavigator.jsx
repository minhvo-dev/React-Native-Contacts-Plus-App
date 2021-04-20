import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SettingsDrawer from "../SettingsDrawer";
import ScreensStack from "./ScreensStack";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SettingsDrawer {...props} />}>
      <Drawer.Screen name="Home" component={ScreensStack} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;