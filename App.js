import React from "react";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme
} from "react-native-paper";

import AppContextProvider from "./src/contexts/appContext";
import { PreferencesContext } from "./src/contexts/preferencesContext";

import Navigation from "./src/components/Navigation";
import Notificator from "./src/components/Notificator";

const combinedDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#9832e6",
    error: "#f13a59"
  }
};

const combinedDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#9832e6",
    error: "#f13a59"
  }
};

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const preferences = React.useMemo(() => ({
    darkMode,
    toggleDarkMode
  }), [darkMode, toggleDarkMode]);

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={
        darkMode ? combinedDarkTheme : combinedDefaultTheme
      }>
        <AppContextProvider>
          <Navigation />
          <Notificator />
        </AppContextProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}