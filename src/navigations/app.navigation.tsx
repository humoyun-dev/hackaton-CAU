import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MainTabParamList } from "./types";
import {
  AccountScreen,
  HomeScreen,
  ScannerScreen,
  SettingsScreen,
} from "../screens/app";
import SettingsNavigations from "./settings.navigations";
import FoodsNavigations from "./food.navigation";
import { useTheme } from "../providers/theme.provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetail from "../screens/app/food-detail";

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

const HomeNavigations = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
    </Stack.Navigator>
  );
};

const AppNavigations = () => {
  const { isDark } = useTheme();

  const darkTheme = {
    tabBarStyle: {
      backgroundColor: "#1C1C1E",
    },
    tabBarActiveTintColor: "#6200EE",
    tabBarInactiveTintColor: "#8E8E93",
  };

  const lightTheme = {
    tabBarStyle: {
      backgroundColor: "#FFFFFF",
    },
    tabBarActiveTintColor: "#6200EE",
    tabBarInactiveTintColor: "gray",
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Account":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
            case "Foods":
              iconName = focused ? "fast-food" : "fast-food-outline";
              break;
            case "Scanner":
              iconName = focused ? "qr-code" : "qr-code-outline";
              break;
            default:
              iconName = "help";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: theme.tabBarStyle,
        tabBarActiveTintColor: theme.tabBarActiveTintColor,
        tabBarInactiveTintColor: theme.tabBarInactiveTintColor,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigations} />
      <Tab.Screen name="Foods" component={FoodsNavigations} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigations} />
    </Tab.Navigator>
  );
};

export default AppNavigations;
