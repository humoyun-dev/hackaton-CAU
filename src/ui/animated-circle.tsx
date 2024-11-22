import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { ActivityRing } from './activity-ring';


const activities = [
  {
    label: "Move",
    value: "420",
    target: "500 CAL",
    percentage: 0.84,
    color: "#FF453A",
    icon: "fire",
  },
  {
    label: "Exercise",
    value: "22",
    target: "30 MIN",
    percentage: 0.73,
    color: "#30D158",
    icon: "dumbbell",
  },
  {
    label: "Stand",
    value: "10",
    target: "12 HRS",
    percentage: 0.83,
    color: "#0A84FF",
    icon: "human-handsup",
  },
];

export const ActivityRingsCard: React.FC = () => {
  const colorScheme = useColorScheme();
  // @ts-ignore
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Activity</Text>
      <View style={styles.ringsContainer}>
        {activities.map((activity) => (
          <ActivityRing key={activity.label} {...activity} />
        ))}
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {((420 / 500) * 100).toFixed(0)}% of daily goal
        </Text>
      </View>
    </View>
  );
};

const getStyles = (colorScheme: 'light' | 'dark' | null) => StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
    marginBottom: 16,
  },
  ringsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  messageContainer: {
    backgroundColor: colorScheme === 'dark' ? '#ffffff10' : '#00000010',
    borderRadius: 8,
    padding: 8,
  },
  message: {
    color: colorScheme === 'dark' ? '#ffffff80' : '#00000080',
    textAlign: 'center',
    fontSize: 12,
  },
});

