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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStackParamList } from "../../navigations/types";
// @ts-ignore
import { StackNavigationProp } from "@react-navigation/stack";

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Register"
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const USER_STORAGE_KEY = "user";

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("CustomizeProfile");
    } catch (error) {
      console.error("Failed to register:", error);
      Alert.alert("Error", "An error occurred during registration.");
    }
  };

  const themeStyles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.innerContainer}>
        <Text style={[styles.title, themeStyles.text]}>Create Account</Text>

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TouchableOpacity
          style={[styles.button, themeStyles.button]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, themeStyles.buttonText]}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkContainer}
        >
          <Text style={[styles.linkText, themeStyles.linkText]}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

// Light theme styles
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
  linkText: {
    color: "#007AFF",
  },
});

// Dark theme styles
const darkThemeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
  },
  text: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#2c2c2e",
    borderColor: "#3a3a3c",
    color: "#fff",
  },
  button: {
    backgroundColor: "#0a84ff",
  },
  buttonText: {
    color: "#fff",
  },
  linkText: {
    color: "#0a84ff",
  },
});
