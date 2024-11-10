import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const PreferencesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Preferences</Text>

      {/* Button to navigate back to the main screen */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      {/* More UI components can be added here based on your preference */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PreferencesScreen;
