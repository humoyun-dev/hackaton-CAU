import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { diseases } from "../../data/diseases";

const USER_STORAGE_KEY = "user";

const DiseasesScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === "dark";
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

  useEffect(() => {
    const loadSelectedDiseases = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userData) {
          const parsedData = JSON.parse(userData);
          setSelectedDiseases(parsedData.diseases || []);
        }
      } catch (error) {
        console.error("Failed to load selected diseases:", error);
      }
    };
    loadSelectedDiseases();
  }, []);

  const handleSelectDisease = (diseaseId: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(diseaseId)
        ? prev.filter((id) => id !== diseaseId)
        : [...prev, diseaseId]
    );
  };

  const handleSaveDiseases = async () => {
    if (selectedDiseases.length === 0) {
      Alert.alert("Validation Error", "Please select at least one disease.");
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const parsedData = userData ? JSON.parse(userData) : {};
      const updatedUser = {
        ...parsedData,
        diseases: selectedDiseases,
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      Alert.alert("Success", "Diseases have been saved.");
      navigation.navigate("AllergiesScreen", { selectedDiseases });
    } catch (error) {
      console.error("Failed to save diseases:", error);
      Alert.alert("Error", "Failed to save diseases. Please try again.");
    }
  };

  const renderDisease = ({ item }: { item: { id: string; name: string } }) => {
    const isSelected = selectedDiseases.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.diseaseItem,
          theme.diseaseItem,
          isSelected && styles.selectedDiseaseItem,
          isSelected && theme.selectedDiseaseItem,
        ]}
        activeOpacity={0.7}
        onPress={() => handleSelectDisease(item.id)}
      >
        <Text
          style={[
            styles.diseaseText,
            theme.text,
            isSelected && styles.selectedDiseaseText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.title, theme.text]}>Select Diseases</Text>
      <FlatList
        data={diseases}
        renderItem={renderDisease}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={[styles.saveButton, theme.saveButton]}
        onPress={handleSaveDiseases}
      >
        <Text style={[styles.saveButtonText, theme.text]}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DiseasesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  diseaseItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  selectedDiseaseItem: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  diseaseText: {
    fontSize: 17,
    fontWeight: "500",
  },
  selectedDiseaseText: {
    color: "#FFF",
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
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
  diseaseItem: {
    backgroundColor: "#FFF",
    borderColor: "#D1D1D6",
    borderWidth: 1,
  },
  selectedDiseaseItem: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
};

const darkTheme = {
  container: {
    backgroundColor: "#1C1C1E",
  },
  text: {
    color: "#FFF",
  },
  diseaseItem: {
    backgroundColor: "#2C2C2E",
    borderColor: "#3A3A3C",
    borderWidth: 1,
  },
  selectedDiseaseItem: {
    borderColor: "#0A84FF",
    backgroundColor: "#0A84FF",
  },
  saveButton: {
    backgroundColor: "#0A84FF",
  },
};
