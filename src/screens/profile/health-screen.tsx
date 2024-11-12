import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import { diseases, allergies } from "../../data"; // Assuming you have allergies data in a similar structure

const screenWidth = Dimensions.get("window").width;

const healthData = {
  steps: 8000,
  stepsGoal: 10000,
  caloriesBurned: 600,
  caloriesGoal: 800,
  sleepHours: 7,
  sleepGoal: 8,
};

const HealthProfileScreen: React.FC = () => {
  const stepsProgress = healthData.steps / healthData.stepsGoal;
  const caloriesProgress = healthData.caloriesBurned / healthData.caloriesGoal;
  const sleepProgress = healthData.sleepHours / healthData.sleepGoal;
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [collapsedDiseases, setCollapsedDiseases] = useState(true);
  const [collapsedAllergies, setCollapsedAllergies] = useState(true);

  const onSelectedDiseasesChange = (newSelectedItems: any) => {
    setSelectedDiseases(newSelectedItems);
  };

  const onSelectedAllergiesChange = (newSelectedItems: any) => {
    setSelectedAllergies(newSelectedItems);
  };

  const data = {
    labels: ["Steps", "Calories", "Sleep"],
    data: [stepsProgress, caloriesProgress, sleepProgress],
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#2563eb", "#1e40af"]} style={styles.header}>
        <Text style={styles.headerText}>Your Health Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Diseases Section */}
        <Text style={styles.sectionTitle}>Diseases</Text>
        <View className="w-full">
          <MultiSelect
            hideTags
            items={diseases}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedDiseasesChange}
            selectedItems={selectedDiseases}
            selectText="Select Diseases"
            searchInputPlaceholderText="Search Diseases..."
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#34d399"
            tagBorderColor="#34d399"
            tagTextColor="#34d399"
            selectedItemTextColor="#34d399"
            selectedItemIconColor="#34d399"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#000" }}
            submitButtonColor="#34d399"
            submitButtonText="Submit"
          />
        </View>

        {/* Collapsible Diseases Section */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setCollapsedDiseases(!collapsedDiseases)} // Toggle collapse state
        >
          <Text style={styles.toggleButtonText}>
            {collapsedDiseases
              ? "Show Selected Diseases"
              : "Hide Selected Diseases"}
          </Text>
        </TouchableOpacity>

        {/* Conditionally render selected diseases */}
        {!collapsedDiseases && selectedDiseases.length > 0 ? (
          selectedDiseases.map((itemId) => {
            const item = diseases.find((i) => i.id === itemId);
            return (
              <View key={itemId} style={styles.itemContainer}>
                <Text style={styles.itemText}>{item?.name}</Text>
              </View>
            );
          })
        ) : (
          <></>
        )}

        {/* Allergies Section */}
        <Text style={styles.sectionTitle}>Allergies</Text>
        <View className="w-full">
          <MultiSelect
            hideTags
            items={allergies}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedAllergiesChange}
            selectedItems={selectedAllergies}
            selectText="Select Allergies"
            searchInputPlaceholderText="Search Allergies..."
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#ff5722"
            tagBorderColor="#ff5722"
            tagTextColor="#ff5722"
            selectedItemTextColor="#ff5722"
            selectedItemIconColor="#ff5722"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#000" }}
            submitButtonColor="#ff5722"
            submitButtonText="Submit"
          />
        </View>

        {/* Collapsible Allergies Section */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setCollapsedAllergies(!collapsedAllergies)} // Toggle collapse state
        >
          <Text style={styles.toggleButtonText}>
            {collapsedAllergies
              ? "Show Selected Allergies"
              : "Hide Selected Allergies"}
          </Text>
        </TouchableOpacity>

        {/* Conditionally render selected allergies */}
        {!collapsedAllergies && selectedAllergies.length > 0 ? (
          selectedAllergies.map((itemId) => {
            const item = allergies.find((i) => i.id === itemId);
            return (
              <View key={itemId} style={styles.itemContainer}>
                <Text style={styles.itemText}>{item?.name}</Text>
              </View>
            );
          })
        ) : (
          <></>
        )}

        {/* Progress Chart */}
        <ProgressChart
          data={data}
          width={screenWidth - 32}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chartStyle}
        />

        {/* Health Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            Steps:{" "}
            <Text style={styles.highlight}>
              {healthData.steps} / {healthData.stepsGoal}
            </Text>
          </Text>
          <Text style={styles.statText}>
            Calories Burned:{" "}
            <Text style={styles.highlight}>
              {healthData.caloriesBurned} / {healthData.caloriesGoal}
            </Text>{" "}
            kcal
          </Text>
          <Text style={styles.statText}>
            Sleep Hours:{" "}
            <Text style={styles.highlight}>
              {healthData.sleepHours} / {healthData.sleepGoal}
            </Text>{" "}
            hrs
          </Text>
        </View>

        {/* Wellness Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsHeader}>Wellness Tips</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tip}>• Stay hydrated: 8 cups daily.</Text>
            <Text style={styles.tip}>• Exercise for 30 minutes daily.</Text>
            <Text style={styles.tip}>
              • Eat a balanced diet with fruits & veggies.
            </Text>
            <Text style={styles.tip}>• Aim for 7-9 hours of sleep.</Text>
            <Text style={styles.tip}>
              • Take breaks during work to reduce stress.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#f7faff",
  backgroundGradientTo: "#f7faff",
  color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`, // Vibrant green
  labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  toggleButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#34d399",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 8,
    marginVertical: 6,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  noSelectionText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  statsContainer: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#e0f2f1",
    padding: 16,
    borderRadius: 12,
    width: "90%",
    elevation: 2,
  },
  statText: {
    fontSize: 18,
    marginVertical: 6,
    color: "#333",
    textAlign: "center",
  },
  highlight: {
    color: "#34d399", // Vibrant green for highlights
    fontWeight: "bold",
  },
  tipsSection: {
    marginTop: 24,
    width: "100%",
    padding: 16,
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    elevation: 2,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f59e0b", // Gold color
    marginBottom: 10,
    textAlign: "center",
  },
  tipsContainer: {
    alignItems: "flex-start",
  },
  tip: {
    fontSize: 16,
    color: "#6b7280",
    marginVertical: 4,
    paddingLeft: 10,
  },
});

export default HealthProfileScreen;
