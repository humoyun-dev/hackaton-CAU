import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

interface AppearanceOption {
  id: string;
  title: string;
  description?: string;
  previewColor: string;
}

const appearanceOptions: AppearanceOption[] = [
  {
    id: "1",
    title: "Light",
    description: "Always use a light appearance.",
    previewColor: "#ffffff",
  },
  {
    id: "2",
    title: "Dark",
    description: "Always use a dark appearance.",
    previewColor: "#000000",
  },
  {
    id: "3",
    title: "Automatic",
    description: "Match your system settings.",
    previewColor: "#dddddd",
  },
];

const AppearanceSettings = () => {
  const [selectedOption, setSelectedOption] = useState<string>("3"); // Default to "Automatic"

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    console.log(`Selected Appearance: ${id}`);
  };

  const renderOption = ({ item }: { item: AppearanceOption }) => (
    <TouchableOpacity
      style={[
        styles.optionContainer,
        selectedOption === item.id && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={[styles.colorPreview, { backgroundColor: item.previewColor }]} />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.optionDescription}>{item.description}</Text>
        )}
      </View>
      {selectedOption === item.id && (
        <Text style={styles.checkmark}>✔</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appearanceOptions}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionsList: {
    padding: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#007aff",
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
  },
  checkmark: {
    fontSize: 20,
    color: "#007aff",
  },
});

export default AppearanceSettings;
