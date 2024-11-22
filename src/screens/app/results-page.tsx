import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Card, Divider } from "@rneui/themed";
import { NutritionBar } from "../../ui/nutrionbar";

const { width } = Dimensions.get("window");

// Interfaces for type safety
interface Ingredient {
  name: string;
  calories: number;
  protein: string;
  fat: string;
  carbohydrates: string;
}

interface TotalNutrition {
  calories: number;
  protein: string;
  fat: string;
  carbohydrates: string;
}

interface FoodsResponse {
  success: boolean;
  meal_name: string;
  ingredients: Ingredient[];
  total_nutrition: TotalNutrition;
}

interface ResultsPageProps {
  route: {
    params: {
      photo: { uri: string };
      foods: string; // JSON string response from AI
    };
  };
}

// Utility function to parse foods JSON
const parseFoods = (foods: string): FoodsResponse | null => {
  try {
    return JSON.parse(foods) as FoodsResponse;
  } catch {
    return null;
  }
};

const ResultsPage: React.FC<ResultsPageProps> = ({ route }) => {
  const { photo, foods } = route.params;

  // Parse the JSON response
  const parsedFoods = parseFoods(foods);

  // Error handling for invalid or unsuccessful responses
  if (!parsedFoods) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorMessage}>
          Invalid response data. Please try again.
        </Text>
      </SafeAreaView>
    );
  }

  if (!parsedFoods.success) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorMessage}>
          The image does not depict a dish. Please try again.
        </Text>
      </SafeAreaView>
    );
  }

  const { meal_name, ingredients, total_nutrition } = parsedFoods;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display Meal Image */}
        <Image source={{ uri: photo.uri }} style={styles.image} />

        {/* Display Meal Name */}
        <Text style={styles.mealName}>{meal_name}</Text>

        {/* Total Nutrition Section */}
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Total Nutrition</Card.Title>
          <Card.Divider />
          <View style={styles.nutritionContainer}>
            {renderNutritionBars(total_nutrition)}
          </View>
        </Card>

        {/* Ingredients Section */}
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Ingredients</Card.Title>
          <Card.Divider />
          {ingredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              ingredient={ingredient}
              isLast={index === ingredients.length - 1}
            />
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

// Render nutrition bars
const renderNutritionBars = (totalNutrition: TotalNutrition) => {
  const nutritionData = [
    { label: "Calories", value: `${totalNutrition.calories} kcal`, max: 2000, color: "#FF9500" },
    { label: "Protein", value: totalNutrition.protein, max: 50, color: "#34C759" },
    { label: "Fat", value: totalNutrition.fat, max: 65, color: "#FF3B30" },
    { label: "Carbs", value: totalNutrition.carbohydrates, max: 300, color: "#007AFF" },
  ];

  return nutritionData.map((item, index) => (
    <NutritionBar
      key={index}
      label={item.label}
      value={item.value}
      max={item.max}
      color={item.color}
    />
  ));
};

// Render a single ingredient item
const IngredientItem: React.FC<{ ingredient: Ingredient; isLast: boolean }> = ({
  ingredient,
  isLast,
}) => (
  <View>
    <View style={styles.ingredientItem}>
      <Text style={styles.ingredientName}>{ingredient.name}</Text>
      <Text style={styles.ingredientCalories}>{ingredient.calories} kcal</Text>
    </View>
    <Text style={styles.ingredientDetails}>
      {`Protein: ${ingredient.protein} | Fat: ${ingredient.fat} | Carbs: ${ingredient.carbohydrates}`}
    </Text>
    {!isLast && <Divider style={styles.ingredientDivider} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: width,
    height: width * 0.75,
    resizeMode: "cover",
  },
  mealName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#000",
  },
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    marginBottom: 8,
  },
  nutritionContainer: {
    marginTop: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  ingredientCalories: {
    fontSize: 16,
    color: "#8E8E93",
  },
  ingredientDetails: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  ingredientDivider: {
    marginVertical: 8,
  },
  errorMessage: {
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 24,
  },
});

export default ResultsPage;
