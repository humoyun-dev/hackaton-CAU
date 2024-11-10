import React from "react";
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWish } from "../store/wish";
import { Meal } from "../screens/type";

interface FoodItemProps {
  item: Meal;
}

const FoodItem: React.FC<FoodItemProps> = ({ item }) => {
  const navigation = useNavigation();
  const { addToWish, removeFromWish, isItWish } = useWish();
  const isFavourite = isItWish(item.id);

  const handlePress = () => {
    // @ts-ignore
    navigation.navigate("MealDetail", { meal: item });
  };

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromWish(item.id);
    } else {
      addToWish(item);
    }
  };

  return (
    <View style={styles.foodItemContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
        <Image
          // @ts-ignore
          source={{ uri: item.image || "https://via.placeholder.com/150" }}
          style={styles.foodItemImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteIconContainer}
        onPress={toggleFavourite}
      >
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={24}
          color={isFavourite ? "#ff3b30" : "#8e8e93"}
        />
      </TouchableOpacity>
      <Text style={styles.foodItemName}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  foodItemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 8,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  foodItemImage: {
    width: "100%",
    height: "100%",
  },
  favoriteIconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  foodItemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
});

export default FoodItem;
