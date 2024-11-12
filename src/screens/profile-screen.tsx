import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ProfileCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  icon,
  title,
  description,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
    <Ionicons name={icon} size={30} color="#2563eb" style={styles.icon} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const profileSections = [
    {
      id: "1",
      icon: "checkmark-done-outline",
      title: "Tasks",
      description: "Manage your tasks and track progress.",
      onPress: () => navigation.navigate("Tasks"),
    },
    {
      id: "2",
      icon: "heart-outline",
      title: "Health Profile",
      description:
        "View your health statistics, wellness tips, and personal goals.",
      onPress: () => navigation.navigate("HealthProfile"),
    },
    {
      id: "3",
      icon: "time-outline",
      title: "View History",
      description: "Access your past activities and track your history.",
      onPress: () => navigation.navigate("History"),
    },
    {
      id: "4",
      icon: "settings-outline",
      title: "Settings",
      description: "Adjust your preferences and app settings.",
      onPress: () => navigation.navigate("Settings"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <FlatList
        data={profileSections}
        renderItem={({ item }) => (
          <ProfileCard
            icon={item.icon}
            title={item.title}
            description={item.description}
            onPress={item.onPress}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
  },
  icon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardDescription: {
    marginTop: 4,
    fontSize: 14,
    color: "#6b7280",
  },
});

export default ProfileScreen;
