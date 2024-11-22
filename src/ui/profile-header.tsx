import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../providers/theme.provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage key
const USER_STORAGE_KEY = "user";

const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load user data:", error);
    return null;
  }
};

const ProfileHeader: React.FC = React.memo(() => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const [user, setUser] = useState<any>(null);

  const colors = {
    background: isDark ? "#1C1C1E" : "#FFFFFF",
    textPrimary: isDark ? "#FFFFFF" : "#000000",
    textSecondary: "#8E8E93",
    borderColor: isDark ? "#38383A" : "#C6C6C8",
    chevronColor: "#8E8E93",
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
        accessible={true}
        accessibilityLabel="Profile header with no data"
      >
        <View style={styles.profileHeader}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            No data available
          </Text>
        </View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Text
            style={[
              styles.email,
              { color: colors.textSecondary, marginTop: 10 },
            ]}
          >
            Add your information
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { firstName, lastName, email, avatarUrl } = user;

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("ProfileSettings")}
      style={[styles.container, { backgroundColor: colors.background }]}
      accessible={true}
      accessibilityLabel="Profile header"
    >
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: avatarUrl || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
          accessible={true}
          accessibilityLabel="Profile image"
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {email}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Apple ID, iCloud, Media & Purchases
          </Text>
        </View>
        <ChevronRight size={20} color={colors.chevronColor} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
  },
  email: {
    fontSize: 15,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default ProfileHeader;
