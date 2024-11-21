import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    FoodScreen,
} from "../screens/app";
import { useTheme } from "../providers/theme.provider";
import { StatusBar } from "react-native";
import FoodDetail from "../screens/app/food-detail";

const Stack = createNativeStackNavigator();

const FoodsNavigations = () => {
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Foods"
          component={FoodScreen}
          options={{ ...theme }}
        />
        <Stack.Screen
          name="FoodDetail"
          component={FoodDetail}
          options={{ ...theme }}
        />
      </Stack.Navigator>
    </>
  );
};

export default FoodsNavigations;
