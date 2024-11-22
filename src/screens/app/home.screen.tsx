import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  useColorScheme,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Banner from "../../ui/banner";
import Recommendation from "../../ui/recommendation";
import ChallengeCard from "../../ui/challenge-card";
import { foods } from "../../data/foods";
import { banners } from "../../data/banners";
import { challenges } from "../../data/fitnes";

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDarkMode = colorScheme === "dark";

  const colors = {
    background: isDarkMode ? "#000000" : "#F2F2F7",
    text: isDarkMode ? "#FFFFFF" : "#000000",
    secondaryText: isDarkMode ? "#EBEBF5" : "#3C3C43",
    tertiaryText: isDarkMode ? "#EBEBF599" : "#3C3C434D",
    separator: isDarkMode ? "#38383A" : "#C6C6C8",
    tint: "#007AFF",
    searchBackground: isDarkMode ? "#1C1C1E" : "#E5E5EA",
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData(); // Reload user data and recommendations
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // Fetch user data from AsyncStorage
  const fetchUserData = useCallback(async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson !== null) {
        const user = JSON.parse(userJson);
        setUserData(user);
        recommendFoods(user);
      }
    } catch (error) {
      console.error("Failed to load user data", error);
    }
  }, []);

  const recommendFoods = useCallback(
    // @ts-ignore
    (user) => {
      // Filter foods based on allergies
      let filteredFoods = foods.filter((food) => {
        // @ts-ignore
        const hasAllergens = food.allergens?.some((allergen) =>
          user.allergies?.includes(allergen)
        );
        if (hasAllergens) return false;
        // @ts-ignore
        if (
          user.medicalConditions?.includes("diabetes") &&
          // @ts-ignore
          food.sugarContent > 10
        ) {
          return false;
        }

        return true;
      });

      // @ts-ignore
      setRecommendedFoods(filteredFoods.slice(0, 5));
    },
    [foods]
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderSectionHeader = useCallback(
    ({ title }: { title: string }) => (
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
    ),
    [colors.text]
  );

  const renderRecommendation = useCallback(
    ({ item }: any) => <Recommendation {...item} />,
    []
  );

  const renderBanner = useCallback(({ item }: any) => <Banner {...item} />, []);

  const renderChallenge = useCallback(
    ({ item }: any) => <ChallengeCard {...item} />,
    []
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
          />
        }
      >
        <Text style={[styles.header, { color: colors.text }]}>Welcome</Text>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.searchBackground },
          ]}
        >
          <MagnifyingGlassIcon size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.searchBar, { color: colors.text }]}
            placeholder="Search..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {renderSectionHeader({ title: "Food Recommendations" })}
        <FlatList
          data={recommendedFoods}
          horizontal
          showsHorizontalScrollIndicator={false}
          // @ts-ignore
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecommendation}
          contentContainerStyle={styles.recommendationList}
        />

        {renderSectionHeader({ title: "Apple Fitness+" })}
        <FlatList
          data={banners}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBanner}
          contentContainerStyle={styles.bannerList}
        />

        {renderSectionHeader({ title: "Challenges" })}
        <FlatList
          data={challenges}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChallenge}
          contentContainerStyle={styles.challengeList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 34,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 36,
  },
  searchBar: {
    flex: 1,
    marginLeft: 8,
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  bannerList: {
    paddingHorizontal: 20,
  },
  recommendationList: {
    paddingHorizontal: 20,
  },
  challengeList: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
