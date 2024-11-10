import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import ProfileScreen from '../screens/profile-screen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesScreen from '../screens/favourite-screen';
import MessagesScreen from '../screens/massage-screen';

type TabParamList = {
  Suggest: undefined;
  Favorites: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const routeIcons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Suggest: 'home',
  Favorites: 'heart',
  Messages: 'chatbubble',
  Profile: 'person',
};

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName = routeIcons[route.name];
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#9ca3af',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Suggest" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    {/* <Tab.Screen name="Messages" component={MessagesScreen} /> */}
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
