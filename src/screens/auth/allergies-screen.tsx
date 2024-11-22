import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { allergies } from "../../data/diseases";
import { useNavigation } from "@react-navigation/native";

const USER_STORAGE_KEY = "user";

const AllergiesScreen = ({ route }: any) => {
  const diseaseName = route?.params?.diseaseName || "this disease";
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  useEffect(() => {
    const loadSelectedAllergies = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userData) {
          const parsedData = JSON.parse(userData);
          setSelectedAllergies(parsedData.allergies || []);
        }
      } catch (error) {
        console.error("Failed to load allergies:", error);
      }
    };
    loadSelectedAllergies();
  }, []);

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  const handleSave = async () => {
    if (selectedAllergies.length === 0) {
      Alert.alert("Validation Error", "Please select at least one allergy.");
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const parsedData = userData ? JSON.parse(userData) : {};
      const updatedUser = {
        ...parsedData,
        allergies: selectedAllergies,
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      Alert.alert("Success", "Allergies have been saved.");
      // @ts-ignore
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "Main", }],
      });
    } catch (error) {
      console.error("Failed to save allergies:", error);
      Alert.alert("Error", "Failed to save allergies. Please try again.");
    }
  };

  const renderAllergy = ({ item }: { item: { id: string; name: string } }) => {
    const isSelected = selectedAllergies.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.allergyItem,
          theme.allergyItem,
          isSelected && styles.selectedItem,
          isSelected && theme.selectedItem,
        ]}
        activeOpacity={0.8}
        onPress={() => toggleAllergy(item.id)}
      >
        <Text
          style={[
            styles.allergyText,
            theme.text,
            isSelected && styles.selectedText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <Text style={[styles.title, theme.text]}>
        Select Allergies for {diseaseName}
      </Text>
      <FlatList
        data={allergies}
        renderItem={renderAllergy}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={[styles.button, theme.button]}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, theme.buttonText]}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllergiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  allergyItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  allergyText: {
    fontSize: 17,
    fontWeight: "500",
  },
  selectedItem: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "600",
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
});

const lightTheme = {
  container: {
    backgroundColor: "#F9F9F9",
  },
  text: {
    color: "#000",
  },
  allergyItem: {
    backgroundColor: "#FFF",
    borderColor: "#D1D1D6",
  },
  button: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#FFF",
  },
  selectedItem: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
};

const darkTheme = {
  container: {
    backgroundColor: "#1C1C1E",
  },
  text: {
    color: "#FFF",
  },
  allergyItem: {
    backgroundColor: "#2C2C2E",
    borderColor: "#3A3A3C",
  },
  button: {
    backgroundColor: "#0A84FF",
  },
  buttonText: {
    color: "#FFF",
  },
  selectedItem: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
};
