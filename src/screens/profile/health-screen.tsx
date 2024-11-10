import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const healthData = {
  steps: 8000,
  stepsGoal: 10000,
  caloriesBurned: 600,
  caloriesGoal: 800,
  sleepHours: 7,
  sleepGoal: 8,
};

const HealthProfileScreen: React.FC = () => {
  const stepsProgress = healthData.steps / healthData.stepsGoal;
  const caloriesProgress = healthData.caloriesBurned / healthData.caloriesGoal;
  const sleepProgress = healthData.sleepHours / healthData.sleepGoal;

  const data = {
    labels: ['Steps', 'Calories', 'Sleep'],
    data: [stepsProgress, caloriesProgress, sleepProgress],
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#2563eb', '#1e40af']} style={styles.header}>
        <Text style={styles.headerText}>Your Health Statistics</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProgressChart
          data={data}
          width={screenWidth - 32}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chartStyle}
        />
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            Steps: <Text style={styles.highlight}>{healthData.steps} / {healthData.stepsGoal}</Text>
          </Text>
          <Text style={styles.statText}>
            Calories Burned: <Text style={styles.highlight}>{healthData.caloriesBurned} / {healthData.caloriesGoal}</Text> kcal
          </Text>
          <Text style={styles.statText}>
            Sleep Hours: <Text style={styles.highlight}>{healthData.sleepHours} / {healthData.sleepGoal}</Text> hrs
          </Text>
        </View>
        <View style={styles.tipsSection}>
          <Text style={styles.tipsHeader}>Wellness Tips</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tip}>• Stay hydrated by drinking at least 8 cups of water daily.</Text>
            <Text style={styles.tip}>• Incorporate 30 minutes of exercise into your routine.</Text>
            <Text style={styles.tip}>• Maintain a balanced diet rich in fruits and vegetables.</Text>
            <Text style={styles.tip}>• Aim for 7-9 hours of quality sleep each night.</Text>
            <Text style={styles.tip}>• Take short breaks during work to reduce stress.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#f7faff',
  backgroundGradientTo: '#f7faff',
  color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`, // Vibrant green
  labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  statsContainer: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    elevation: 2,
  },
  statText: {
    fontSize: 18,
    marginVertical: 6,
    color: '#333',
    textAlign: 'center',
  },
  highlight: {
    color: '#34d399', // Vibrant green for highlights
    fontWeight: 'bold',
  },
  tipsSection: {
    marginTop: 24,
    width: '100%',
    padding: 16,
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    elevation: 2,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f59e0b', // Gold color
    marginBottom: 10,
    textAlign: 'center',
  },
  tipsContainer: {
    alignItems: 'flex-start',
  },
  tip: {
    fontSize: 16,
    color: '#6b7280',
    marginVertical: 4,
    paddingLeft: 10,
  },
});

export default HealthProfileScreen;
