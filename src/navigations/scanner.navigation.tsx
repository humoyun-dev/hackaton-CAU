import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PrivacySettingsScreen,
  ProfileSettingsScreen,
  ScannerScreen,
  SettingsScreen,
  SupportScreen,
} from "../screens/app";
import { useTheme } from "../providers/theme.provider";
import { StatusBar } from "react-native";
import NotificationsScreen from "../screens/app/settings/notifications-screen";
import AppearanceSettings from "../screens/app/settings/appearance-settings";
import AuthNavigation from "./auth.navigation";
import ResultsPage from "../screens/app/results-page";

const Stack = createNativeStackNavigator();

const ScannerNavigations = () => {
  const { isDark } = useTheme();

  const darkTheme = {
    headerStyle: {
      backgroundColor: "#1C1C1E",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      color: "#FFFFFF",
    },
  };

  const lightTheme = {
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#000000",
    headerTitleStyle: {
      color: "#000000",
    },
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ headerTitle: "Scanner", headerShown: false }}
        />

        <Stack.Screen
          name="ResultsPage"
          component={ResultsPage as any}
          options={{ headerTitle: "Result" }}
        />
      </Stack.Navigator>
    </>
  );
};

export default ScannerNavigations;
