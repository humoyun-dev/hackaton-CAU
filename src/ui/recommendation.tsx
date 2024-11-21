import React, { useMemo } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type Nutrients = {
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  sugar: string;
};

type RecommendationProps = {
  name: string;
  calories: number;
  imageUrl: string;
  foodGroup: string;
  composition: string;
  description: string;
  nutrients: Nutrients;
};

export default function Recommendation({
  name,
  calories,
  imageUrl,
  foodGroup,
  composition,
  description,
  nutrients,
}: RecommendationProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const colors = useMemo(
    () => ({
      text: isDarkMode ? "#FFFFFF" : "#000000",
      secondaryText: isDarkMode ? "#EBEBF5" : "#3C3C43",
    }),
    [isDarkMode]
  );

  const data = {
    name,
    calories,
    imageUrl,
    foodGroup,
    composition,
    description,
    nutrients,
  };

  const navigation = useNavigation();

  const handlePress = () => {
    // @ts-ignore
    navigation.navigate("FoodDetail", { food: data });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.bannerImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.foodName, { color: colors.text }]}>{name}</Text>
          <Text
            style={[styles.foodDescription, { color: colors.secondaryText }]}
          >
            {composition}
          </Text>
          <Text style={[styles.calories, { color: colors.text }]}>
            {calories} kcal - {foodGroup}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 8,
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  foodName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  calories: {
    fontSize: 15,
    fontWeight: "500",
  },
});
