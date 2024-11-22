import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { LoginScreen, RegisterScreen } from "../screens/auth";
import CustomizeProfileScreen from "../screens/auth/customize-profile";
import DiseasesScreen from "../screens/auth/diseases-screen";
import AllergiesScreen from "../screens/auth/allergies-screen";
import AppNavigations from "./app.navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomizeProfile"
        component={CustomizeProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiseasesScreen"
        component={DiseasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllergiesScreen"
        component={AllergiesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={AppNavigations}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
