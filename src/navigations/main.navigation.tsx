import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import AppNavigations from "./app.navigation";
import AuthNavigation from "./auth.navigation";
import { getUserFromStorage } from "../providers/user.provider";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const MainTabNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Null indicates loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await getUserFromStorage(); // Fetch user from storage
        setIsAuthenticated(!!user); // True if user exists, false otherwise
      } catch (error) {
        console.error("Failed to check authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Render a loading indicator while checking authentication
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default MainTabNavigation;
