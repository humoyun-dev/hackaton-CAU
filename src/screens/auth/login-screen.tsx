import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const validateInput = () => {
    if (!data.email.trim() || !data.password.trim()) {
      Alert.alert("Input Error", "Please enter both email and password");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    }
    return true;
  };
  
  const { login } = useContext(AuthContext);


  const handleLogin = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ultimate-octopus-visually.ngrok-free.app/api/user/login",
        data
      );

      if (res.status === 200) {
        await AsyncStorage.setItem("token", res.data.token);
        login(res.data.token);
        Alert.alert("Login Successful", "You have successfully logged in!");
        setData({ email: "", password: "" });
        navigation.navigate("Home" as never);
      } else {
        Alert.alert(
          "Login Failed",
          res.data.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container} className="mx-4">
      <Text style={styles.headerText}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={data.email}
          onChangeText={(e) => handleChange("email", e)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          accessibilityLabel="Email Input"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={data.password}
          onChangeText={(e) => handleChange("password", e)}
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          accessibilityLabel="Password Input"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.iconButton}
          accessibilityLabel={
            isPasswordVisible ? "Hide Password" : "Show Password"
          }
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        style={[
          styles.loginButton,
          { backgroundColor: isLoading ? "#93c5fd" : "#2563eb" },
        ]}
        accessibilityLabel="Login Button"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: "#1f2937",
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  loginButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#6b7280",
  },
  registerLink: {
    fontWeight: "bold",
    color: "#2563eb",
  },
});

export default LoginScreen;
