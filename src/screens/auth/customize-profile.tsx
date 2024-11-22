import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigations/types";

type CustomizeProfileScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "CustomizeProfile"
>;

interface CustomizeProfileScreenProps {
  navigation: CustomizeProfileScreenNavigationProp;
}

const USER_STORAGE_KEY = "user";

const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.mergeItem(USER_STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

const CustomizeProfileScreen: React.FC<CustomizeProfileScreenProps> = ({
  navigation,
}) => {
  const [profile, setProfile] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
  });

  const { weight, height, age, gender } = profile;

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const validateInputs = () => {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid weight.");
      return false;
    }
    if (!height || isNaN(Number(height)) || Number(height) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid height.");
      return false;
    }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid age.");
      return false;
    }
    if (!gender) {
      Alert.alert("Invalid Input", "Please select your gender.");
      return false;
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateInputs()) {
      return;
    }

    const updatedProfile = {
      weight,
      height,
      age,
      gender,
    };

    await saveUserData(updatedProfile);
    Alert.alert("Success", "Profile saved successfully.");
    navigation.navigate("DiseasesScreen");
  };

  const isDarkMode = useColorScheme() === "dark";

  const themeStyles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.innerContainer}>
        <Text style={[styles.title, themeStyles.text]}>
          Customize Your Profile
        </Text>

        <ProfileInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={(value) => handleInputChange("weight", value)}
          keyboardType="numeric"
          themeStyles={themeStyles}
          isDarkMode={isDarkMode}
        />

        <ProfileInput
          placeholder="Height (cm)"
          value={height}
          onChangeText={(value) => handleInputChange("height", value)}
          keyboardType="numeric"
          themeStyles={themeStyles}
          isDarkMode={isDarkMode}
        />

        <ProfileInput
          placeholder="Age"
          value={age}
          onChangeText={(value) => handleInputChange("age", value)}
          keyboardType="numeric"
          themeStyles={themeStyles}
          isDarkMode={isDarkMode}
        />

        <RNPickerSelect
          onValueChange={(value) => handleInputChange("gender", value)}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          style={{
            inputIOS: [styles.input, themeStyles.input],
            inputAndroid: [styles.input, themeStyles.input],
          }}
          placeholder={{
            label: "Select your gender",
            value: null,
            color: isDarkMode ? "#8E8E93" : "#000",
          }}
          value={gender}
        />

        <TouchableOpacity
          style={[styles.button, themeStyles.button]}
          onPress={handleSaveProfile}
        >
          <Text style={[styles.buttonText, themeStyles.buttonText]}>
            Save Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomizeProfileScreen;

// Reusable Input Component
const ProfileInput: React.FC<{
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric";
  themeStyles: any;
  isDarkMode: boolean;
}> = ({ placeholder, value, onChangeText, keyboardType, themeStyles, isDarkMode }) => (
  <TextInput
    style={[styles.input, themeStyles.input]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
  />
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    marginBottom: 20,
    color: "#000",
    borderWidth: 1,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
});

// Light Theme Styles
const lightThemeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f7",
  },
  text: {
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#C7C7CC",
    color: "#000",
  },
  button: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
  },
});

// Dark Theme Styles
const darkThemeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
  },
  text: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#3a3a3c",
    color: "#fff",
  },
  button: {
    backgroundColor: "#0a84ff",
  },
  buttonText: {
    color: "#fff",
  },
});
