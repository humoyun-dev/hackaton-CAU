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
} from "react-native";
import { AuthStackParamList } from "../../navigations/types";
import { StackNavigationProp } from "@react-navigation/stack";

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Register"
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleRegister = () => {
    if (password === confirmPassword) {
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      console.log("Passwords do not match.");
    }
  };

  const themeStyles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={[styles.title, themeStyles.text]}>Register</Text>

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Confirm your password"
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
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.loginText, themeStyles.linkText]}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

// Common styles
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
  loginLink: {
    marginTop: 20,
    alignSelf: "center",
  },
  loginText: {
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
