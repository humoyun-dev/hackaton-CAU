import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import AppNavigations from "./app.navigation";
import AuthNavigation from "./auth.navigation";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const MainTabNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={AppNavigations} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigation} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigation;
