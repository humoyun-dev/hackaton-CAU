import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PrivacySettingsScreen,
  ProfileSettingsScreen,
  SettingsScreen,
} from "../screens/app";
import { useTheme } from "../providers/theme.provider";
import { StatusBar } from "react-native";
import SupportScreen from "../screens/app/settings/Support-screen";
import NotificationsScreen from "../screens/app/settings/notifications-screen";
import AppearanceSettings from "../screens/app/settings/appearance-settings";

const Stack = createNativeStackNavigator();

const SettingsNavigations = () => {
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
          name="SettingsMain"
          component={SettingsScreen}
          options={{ headerTitle: "Settings", headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettingsScreen}
          options={{ headerTitle: "Profile Settings", ...theme }}
        />
        <Stack.Screen
          name="PrivacySettings"
          component={PrivacySettingsScreen}
          options={{ headerTitle: "Privacy Settings", ...theme }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ headerTitle: "Support AI" }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ headerTitle: "Notifications Settings" }}
        />
        <Stack.Screen
          name="AppearanceSettings"
          component={AppearanceSettings}
          options={{ headerTitle: "Appearance Settings" }}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsNavigations;
