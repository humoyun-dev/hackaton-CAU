import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash/debounce";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "./type";
import FoodItem from "../components/card";

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Meal[]>([]);
  const [originalData, setOriginalData] = useState<Meal[]>([]);
  const [category, setCategory] = useState<{ name: string; id: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch meals and categories
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const [mealsResponse, categoryResponse] = await Promise.all([
        axios.get(
          "https://ultimate-octopus-visually.ngrok-free.app/api/meals/recommendations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        axios.get(
          "https://ultimate-octopus-visually.ngrok-free.app/api/meals/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      setOriginalData(mealsResponse.data.data);
      setData(mealsResponse.data.data);
      setCategory(categoryResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Search handling with debounce
  const handleSearch = useCallback(
    (searchText: string) => {
      if (searchText === "") {
        setData(originalData);
      } else {
        const filteredData = originalData.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setData(filteredData);
      }
    },
    [originalData]
  );

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  // Category filtering
  const handleCategoryPress = useCallback(
    (categoryId: number) => {
      setSelectedCategory(categoryId);
      if (categoryId === selectedCategory) {
        setData(originalData);
        setSelectedCategory(null);
      } else {
        const filteredData = originalData.filter(
          (meal: any) => meal.categoryId === categoryId
        );
        setData(filteredData);
      }
    },
    [originalData, selectedCategory]
  );

  const renderItem = useCallback(
    ({ item }: { item: Meal }) => <FoodItem item={item} />,
    []
  );

  const renderHeader = useMemo(() => {
    return (
      <>
        <SafeAreaView style={styles.headerContainer}>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          <View>
            <View style={styles.topBar}>
              <TouchableOpacity>
                <View style={styles.profileIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={28} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#6b7280"
                style={styles.searchIcon}
              />
              <TextInput
                onChangeText={debouncedSearch}
                placeholder="Search"
                placeholderTextColor="#9ca3af"
                style={styles.searchInput}
              />
            </View>
          </View>
        </SafeAreaView>

        {isLoading && <ActivityIndicator size="large" color="#2563eb" />}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {category.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => handleCategoryPress(cat.id)}
            >
              <View
                style={[
                  styles.recommendationCard,
                  selectedCategory === cat.id && styles.selectedCard,
                ]}
              >
                <Text style={styles.recommendationText}>{cat.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity onPress={() => fetchData()}>
            <Ionicons name="reload-circle" size={32} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [
    isLoading,
    debouncedSearch,
    category,
    selectedCategory,
    handleCategoryPress,
  ]);

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No meals found.</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={ListEmptyComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={11}
        removeClippedSubviews
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
    color: "#1f2937",
  },
  horizontalScroll: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  recommendationCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 100,
  },
  selectedCard: {
    borderColor: "#2563eb",
    borderWidth: 1,
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
  },
});
