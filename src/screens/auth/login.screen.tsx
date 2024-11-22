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

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const USER_STORAGE_KEY = "user";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (!storedUser) {
        Alert.alert("Error", "No user found. Please register first.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.username === username && user.password === password) {
        Alert.alert("Success", "Login successful!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        Alert.alert("Error", "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const themeStyles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={[styles.title, themeStyles.text]}>Sign In</Text>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter your email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={isDarkMode ? "#8E8E93" : "#C7C7CC"}
        />

        <TouchableOpacity
          style={[styles.button, themeStyles.button]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, themeStyles.buttonText]}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.registerText, themeStyles.linkText]}>
            Don’t have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

// Common styles (unchanged from your code)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  registerLink: {
    marginTop: 20,
    alignSelf: "center",
  },
  registerText: {
    fontSize: 16,
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
