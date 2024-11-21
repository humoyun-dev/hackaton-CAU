import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Nutrients {
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  sugar: string;
}

export interface Food {
  id: number;
  name: string;
  foodGroup: string;
  composition: string;
  description: string;
  calories: number;
  nutrients: Nutrients;
  imageUrl: string;
}

type RootStackParamList = {
  Home: undefined;
  FoodDetail: { food: Food };
};

type Props = NativeStackScreenProps<RootStackParamList, "FoodDetail">;

const FoodDetail: React.FC<Props> = ({ route, navigation }) => {
  const { food } = route.params;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{food.name}</Text>
        </View>

        {/* Food Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: food.imageUrl }} style={styles.image} />
        </View>

        {/* Food Information */}
        <View style={styles.detailsContainer}>
          <Text style={styles.foodGroup}>{food.foodGroup}</Text>
          <Text style={styles.description}>{food.description}</Text>

          {/* Composition Section */}
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <Text style={styles.text}>{food.composition}</Text>

          {/* Nutritional Information */}
          <Text style={styles.sectionTitle}>Nutritional Information:</Text>
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Calories:</Text>
              <Text style={styles.nutrientValue}>{food.calories} kcal</Text>
            </View>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Protein:</Text>
              <Text style={styles.nutrientValue}>{food.nutrients.protein}</Text>
            </View>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Fat:</Text>
              <Text style={styles.nutrientValue}>{food.nutrients.fat}</Text>
            </View>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Carbs:</Text>
              <Text style={styles.nutrientValue}>{food.nutrients.carbs}</Text>
            </View>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Fiber:</Text>
              <Text style={styles.nutrientValue}>{food.nutrients.fiber}</Text>
            </View>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>Sugar:</Text>
              <Text style={styles.nutrientValue}>{food.nutrients.sugar}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  imageContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  foodGroup: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333333",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
    color: "#333333",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555555",
  },
  nutrientsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 8,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 16,
    color: "#333333",
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
});

export default FoodDetail;
