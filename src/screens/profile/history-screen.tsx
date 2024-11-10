import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Sample data for foods consumed and calories
const foodHistoryData = [
  { id: '1', date: '2024-11-01', food: 'Grilled Chicken Salad', calories: 350 },
  { id: '2', date: '2024-11-01', food: 'Apple', calories: 80 },
  { id: '3', date: '2024-11-02', food: 'Pasta Bolognese', calories: 600 },
  { id: '4', date: '2024-11-03', food: 'Greek Yogurt', calories: 150 },
  { id: '5', date: '2024-11-04', food: 'Vegetable Stir Fry', calories: 300 },
];

const HistoryScreen: React.FC = () => {
  const renderItem = ({ item }: { item: { date: string; food: string; calories: number } }) => (
    <View style={styles.historyItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.foodText}>{item.food}</Text>
      <Text style={styles.caloriesText}>{item.calories} kcal</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Food Consumption History</Text>
      <FlatList
        data={foodHistoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: screenWidth - 32,
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 4,
  },
  foodText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
  },
  caloriesText: {
    fontSize: 16,
    color: '#34d399', // Vibrant green for calorie info
    fontWeight: '600',
    marginTop: 4,
  },
});

export default HistoryScreen;
