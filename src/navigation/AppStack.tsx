import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './main-tab-navigation';
import PreferencesScreen from '../screens/preference-screen';
import TasksScreen from '../screens/profile/task-screen';
import HealthProfileScreen from '../screens/profile/health-screen';
import MealDetailScreen from '../screens/detail-screen';
import HistoryScreen from '../screens/profile/history-screen';
import SettingsScreen from '../screens/profile/settings-screen';


const Stack = createStackNavigator();

const AppStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Preferences"
      component={PreferencesScreen}
      options={{ title: 'User Preferences' }}
    />
    <Stack.Screen
      name="Tasks"
      component={TasksScreen}
      options={{ title: 'Tasks' }}
    />
    <Stack.Screen
      name="HealthProfile"
      component={HealthProfileScreen}
      options={{ title: 'Health Profile' }}
    />
    <Stack.Screen
      name="MealDetail"
      component={MealDetailScreen}
      options={{ title: 'Meal Detail' }}
    />
    <Stack.Screen
      name="History"
      component={HistoryScreen}
      options={{ title: 'View History' }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Stack.Navigator>
);

export default AppStack;
