import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface Setting {
  id: string;
  title: string;
  description?: string;
  type: "toggle" | "navigation";
  value?: boolean;
}

const settings: Setting[] = [
  {
    id: "1",
    title: "Allow Notifications",
    description: "Enable notifications for this app.",
    type: "toggle",
    value: true,
  },
  {
    id: "2",
    title: "Sound",
    description: "Choose notification sounds.",
    type: "navigation",
  },
  {
    id: "3",
    title: "Badges",
    description: "Show badges on the app icon.",
    type: "toggle",
    value: false,
  },
  {
    id: "4",
    title: "Notification Style",
    description: "Customize notification appearance.",
    type: "navigation",
  },
];

const NotificationsSettings = () => {
  const [settingsState, setSettingsState] = useState<Setting[]>(settings);

  const handleToggle = (id: string) => {
    setSettingsState((prevState) =>
      prevState.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  const renderSetting = ({ item }: { item: Setting }) => (
    <TouchableOpacity
      style={styles.settingContainer}
      activeOpacity={item.type === "navigation" ? 0.7 : 1}
      onPress={() => {
        if (item.type === "navigation") {
          console.log(`Navigate to ${item.title}`);
        }
      }}
    >
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.settingDescription}>{item.description}</Text>
        )}
      </View>
      {item.type === "toggle" ? (
        <Switch
          value={item.value}
          onValueChange={() => handleToggle(item.id)}
          trackColor={{ false: "#ccc", true: "#007aff" }}
          thumbColor={item.value ? "#fff" : "#f4f3f4"}
        />
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsState}
        renderItem={renderSetting}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.settingsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingsList: {
    padding: 16,
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
  chevron: {
    fontSize: 24,
    color: "#ccc",
  },
});

export default NotificationsSettings;
