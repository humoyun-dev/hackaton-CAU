import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const TasksScreen: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);
  const [caloriesToBurn, setCaloriesToBurn] = useState<number | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<string>('');

  const mealSuggestions = [
    { meal: 'Oatmeal with berries and nuts', calories: 300 },
    { meal: 'Grilled chicken salad', calories: 400 },
    { meal: 'Salmon with quinoa and veggies', calories: 500 },
    { meal: 'Greek yogurt with honey and almonds', calories: 200 },
    { meal: 'Veggie wrap with hummus', calories: 350 },
  ];

  const calculateCaloriesToBurn = () => {
    if (!weight || !age || !activityLevel) {
      Alert.alert('Please enter all details to calculate calories');
      return;
    }

    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);
    const activityMultiplier = parseFloat(activityLevel) || 1.2;

    const baseCalories = 10 * weightNum + 6.25 * 170 - 5 * ageNum + 5;
    const totalCalories = baseCalories * activityMultiplier;

    setCaloriesToBurn(Math.round(totalCalories));
    suggestMeal();
  };

  const suggestMeal = () => {
    const randomMeal = mealSuggestions[Math.floor(Math.random() * mealSuggestions.length)];
    setMealSuggestion(`${randomMeal.meal} - ${randomMeal.calories} kcal`);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1521986329282-0436dbf21e61' }}
      style={styles.background}
      blurRadius={3}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Today's Task</Text>
        <Text style={styles.description}>
          Enter your details to get meal suggestions and daily calorie goals.
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="barbell-outline" size={20} color="#4b9df7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={20} color="#4b9df7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="walk-outline" size={20} color="#4b9df7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Activity Level (1.2 - 1.9)"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={activityLevel}
            onChangeText={setActivityLevel}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            Set Your Calorie Goal: <Text style={styles.calorieGoal}>{calorieGoal} kcal</Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1200}
            maximumValue={3000}
            step={100}
            value={calorieGoal}
            onValueChange={setCalorieGoal}
            minimumTrackTintColor="#34d399"
            maximumTrackTintColor="#f87171"
            thumbTintColor="#34d399"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateCaloriesToBurn}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {caloriesToBurn !== null && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultText}>
              <Ionicons name="flame-outline" size={18} color="#ff4500" /> Calories to burn today:{' '}
              <Text style={styles.caloriesText}>{caloriesToBurn} kcal</Text>
            </Text>
            <Text style={styles.resultText}>
              <Ionicons name="restaurant-outline" size={18} color="#34d399" /> Suggested meal:{' '}
              <Text style={styles.mealText}>{mealSuggestion}</Text>
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  sliderContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 5,
  },
  calorieGoal: {
    fontWeight: 'bold',
    color: '#34d399',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 20,
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'flex-start',
  },
  resultText: {
    fontSize: 16,
    color: '#111827',
    marginVertical: 4,
  },
  caloriesText: {
    fontWeight: 'bold',
    color: '#ff4500',
  },
  mealText: {
    fontWeight: 'bold',
    color: '#34d399',
  },
});

export default TasksScreen;
