import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

// Use the Meal interface for type safety
export interface Meal {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  recipe: string;
  ingredients: string;
  category_id: null | number;
  mode: null | string;
  meal_type: null | string;
  image?: string; // Optional image property
}

interface MealDetailScreenProps {
  route: RouteProp<{ params: { meal: Meal } }, 'params'>;
}

const MealDetailScreen: React.FC = () => {
  const route = useRoute<MealDetailScreenProps['route']>();
  const { meal } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: meal.image || "https://via.placeholder.com/250" }} style={styles.image} />

      <View style={styles.headerContainer}>
        <Text style={styles.mealName}>{meal.name}</Text>
        {meal.category_id && <Text style={styles.category}>Category ID: {meal.category_id}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredientText}>{JSON.parse(meal.ingredients)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipe</Text>
        <Text style={styles.recipeText}>{meal.recipe}</Text>
      </View>

      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart" size={24} color="#fff" />
        <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  mealName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
    lineHeight: 22,
  },
  recipeText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  favoriteButton: {
    flexDirection: 'row',
    backgroundColor: '#ff5a5f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default MealDetailScreen;
