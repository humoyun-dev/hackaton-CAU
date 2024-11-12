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
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";

const RegisterScreen: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const [data, setData] = useState<{
    name: string;
    email: string;
    password: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
  }>({
    name: "",
    email: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    gender: "m",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateInput = () => {
    if (!data.name || !data.email || !data.password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return false;
    }
    if (data.password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(data.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!validateInput()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://ultimate-octopus-visually.ngrok-free.app/api/user/register",
        data
      );

      if (res.status === 201) {
        login(res.data.token);
        await AsyncStorage.setItem("token", res.data.token);
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "You have successfully registered!",
        });
        setConfirmPassword("");
        setData({
          name: "",
          email: "",
          password: "",
          weight: "",
          height: "",
          age: "",
          gender: "m",
        });
        navigation.navigate("Home" as never);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
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
    <SafeAreaView className="mx-4" style={styles.container}>
      <Text style={styles.headerText}>Register</Text>

      <TextInput
        placeholder="Full Name"
        value={data.name}
        onChangeText={(e) => handleChange("name", e)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={data.email}
        onChangeText={(e) => handleChange("email", e)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={data.password}
        onChangeText={(e) => handleChange("password", e)}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Weight (kg)"
        value={data.weight}
        onChangeText={(e) => handleChange("weight", e)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Height (cm)"
        value={data.height}
        onChangeText={(e) => handleChange("height", e)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        value={data.age}
        onChangeText={(e) => handleChange("age", e)}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => handleChange("gender", value)}
          items={[
            { label: "Male", value: "m" },
            { label: "Female", value: "f" },
          ]}
          placeholder={{ label: "Select Gender", value: null }}
        />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        disabled={isLoading}
        style={[
          styles.registerButton,
          { backgroundColor: isLoading ? "#93c5fd" : "#2563eb" },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 20,
  },
  input: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    color: "#1f2937",
  },
  dropdownContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  registerButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#6b7280",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#2563eb",
  },
});

export default RegisterScreen;
