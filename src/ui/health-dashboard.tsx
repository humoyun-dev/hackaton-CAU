import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ActivityChart, ActivityRing } from './activity';

const mockData = {
  dailyActivity: {
    move: { value: 420, goal: 500 },
    exercise: { value: 22, goal: 30 },
    stand: { value: 10, goal: 12 },
  },
  weeklyActivity: {
    move: [350, 400, 420, 380, 450, 500, 420],
    exercise: [15, 20, 25, 18, 30, 35, 22],
    stand: [8, 9, 11, 10, 12, 11, 10],
  },
  caloriesConsumed: [1800, 2000, 1900, 2100, 1950, 2200, 1800],
  caloriesBurned: [2000, 2200, 2100, 2300, 2150, 2400, 2000],
  heartRate: [68, 72, 70, 75, 71, 69, 70],
};

export const HealthDashboard: React.FC = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Activity</Text>
      
      <View style={styles.ringsContainer}>
        <ActivityRing
          progress={(mockData.dailyActivity.move.value / mockData.dailyActivity.move.goal) * 100}
          color="#FF3B30"
          icon="fire"
          value={mockData.dailyActivity.move.value.toString()}
          label="Move"
        />
        <ActivityRing
          progress={(mockData.dailyActivity.exercise.value / mockData.dailyActivity.exercise.goal) * 100}
          color="#34C759"
          icon="run"
          value={mockData.dailyActivity.exercise.value.toString()}
          label="Exercise"
        />
        <ActivityRing
          progress={(mockData.dailyActivity.stand.value / mockData.dailyActivity.stand.goal) * 100}
          color="#007AFF"
          icon="human-handsup"
          value={mockData.dailyActivity.stand.value.toString()}
          label="Stand"
        />
      </View>

      <View style={styles.goalProgress}>
        <Text style={styles.goalProgressText}>
          {Math.round((mockData.dailyActivity.move.value / mockData.dailyActivity.move.goal) * 100)}% of daily goal
        </Text>
      </View>

      <ActivityChart
        data={mockData.weeklyActivity.move}
        labels={daysOfWeek}
        color="#FF3B30"
        title="Move (cal)"
      />

      <ActivityChart
        data={mockData.weeklyActivity.exercise}
        labels={daysOfWeek}
        color="#34C759"
        title="Exercise (min)"
      />

      <ActivityChart
        data={mockData.caloriesConsumed}
        labels={daysOfWeek}
        color="#FF9500"
        title="Calories Consumed"
      />

      <ActivityChart
        data={mockData.caloriesBurned}
        labels={daysOfWeek}
        color="#AF52DE"
        title="Calories Burned"
      />

      <ActivityChart
        data={mockData.heartRate}
        labels={daysOfWeek}
        color="#FF2D55"
        title="Heart Rate (bpm)"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  ringsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  goalProgress: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  goalProgressText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8E8E93',
  },
});

