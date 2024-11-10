import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>App Settings</Text>

      <View className="mx-3" style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      <View className="mx-3" style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={(value) => setDarkModeEnabled(value)}
        />
      </View>

      <TouchableOpacity className="mx-3" style={styles.settingItem}>
        <Text style={styles.settingText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mx-3" style={styles.settingItem}>
        <Text style={styles.settingText}>Privacy and Security</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mx-3" style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mx-3" onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingText: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SettingsScreen;
