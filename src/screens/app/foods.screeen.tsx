import React, { useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  useColorScheme,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { foods, Food } from "../../data/foods";

interface Category {
  id: number;
  name: string;
  filter: (food: Food) => boolean;
}

const { height, width } = Dimensions.get("window");

const categories: Category[] = [
  { id: 1, name: "High-Protein", filter: (food) => food.calories >= 550 },
  { id: 2, name: "Low-Calorie", filter: (food) => food.calories < 550 },
  { id: 3, name: "Gluten-Free", filter: (food) => food.calories < 350 },
  { id: 4, name: "Vegan", filter: (food) => food.calories <= 170 },
];

const FoodScreen: React.FC = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDarkMode = colorScheme === "dark";

  const colors = useMemo(
    () => ({
      background: isDarkMode ? "#000000" : "#F2F2F7",
      cardBackground: isDarkMode ? "#1C1C1E" : "#FFFFFF",
      text: isDarkMode ? "#FFFFFF" : "#000000",
      secondaryText: isDarkMode ? "#EBEBF5" : "#3C3C43",
      separator: isDarkMode ? "#38383A" : "#C6C6C8",
      tint: "#007AFF",
      searchBackground: isDarkMode ? "#1C1C1E" : "#E5E5EA",
    }),
    [isDarkMode]
  );

  const filteredFoods = useMemo(() => {
    const activeFilters = selectedCategories
      .map((id) => categories.find((cat) => cat.id === id)?.filter)
      .filter(Boolean) as Array<(food: Food) => boolean>;

    return foods.filter(
      (food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!activeFilters.length || activeFilters.every((filter) => filter(food)))
    );
  }, [searchQuery, selectedCategories]);

  const handleCategoryToggle = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const renderCategoryItem = useCallback(
    ({ item }: { item: Category }) => (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          {
            backgroundColor: selectedCategories.includes(item.id)
              ? colors.tint
              : colors.cardBackground,
          },
        ]}
        onPress={() => handleCategoryToggle(item.id)}
      >
        <Text
          style={[
            styles.categoryName,
            {
              color: selectedCategories.includes(item.id)
                ? colors.cardBackground
                : colors.text,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategories, colors]
  );

  const renderFoodItem = useCallback(
    ({ item }: { item: Food }) => (
      <TouchableOpacity
        style={[styles.foodItem, { backgroundColor: colors.cardBackground }]}
        onPress={() => navigation.navigate("FoodDetail", { food: item })}
        accessibilityLabel={`View details about ${item.name}`}
      >
        {/* Food Image */}
        <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />

        {/* Food Information */}
        <View style={styles.infoContainer}>
          <Text style={[styles.foodName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text
            style={[styles.foodDescription, { color: colors.secondaryText }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          <View style={styles.healthInfo}>
            <Text style={[styles.calories, { color: colors.tint }]}>
              {item.calories} kcal
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [colors, navigation]
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Healthy Food</Text>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.searchBackground },
        ]}
      >
        <MagnifyingGlassIcon size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchBar, { color: colors.text }]}
          placeholder="Search for healthy food..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <XCircleIcon size={20} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      />

      <FlatList
        data={filteredFoods}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 36,
  },
  searchBar: {
    flex: 1,
    marginLeft: 8,
    fontSize: 17,
  },
  categoriesContainer: {
    marginVertical: 12,
    height: 48,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600",
  },
  foodList: {
    paddingHorizontal: 16,
  },
  foodItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  foodName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  healthInfo: {
    marginBottom: 8,
  },
  calories: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default FoodScreen;
