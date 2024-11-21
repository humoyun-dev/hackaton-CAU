import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useTheme } from "../providers/theme.provider";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  onEdit: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  firstName,
  lastName,
  age,
  gender,
  weight,
  height,
  onEdit,
}) => {
  const { isDark } = useTheme();

  // Define theme colors
  const colors = {
    background: isDark ? "#1C1C1E" : "#FFFFFF",
    textPrimary: isDark ? "#FFFFFF" : "#000000",
    textSecondary: isDark ? "#8E8E93" : "#3C3C43",
    separator: isDark ? "#38383A" : "#C6C6C8",
    button: "#007AFF",
  };

  // Reusable method to render personal info items
  const renderInfoItem = (label: string, value: string) => (
    <View>
      <View style={styles.infoItem}>
        <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: colors.textSecondary }]}>
          {value}
        </Text>
      </View>
      <View style={[styles.separator, { backgroundColor: colors.separator }]} />
    </View>
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textSecondary }]}>
          Personal Information
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={[styles.editText, { color: colors.button }]}>Edit</Text>
          <ChevronRight size={20} color={colors.button} />
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={[styles.separator, { backgroundColor: colors.separator }]} />

      {/* Personal Info Items */}
      {renderInfoItem("First Name", firstName)}
      {renderInfoItem("Last Name", lastName)}
      {renderInfoItem("Age", age)}
      {renderInfoItem("Gender", gender)}
      {renderInfoItem("Weight", weight)}
      {renderInfoItem("Height", height)}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 2, // Subtle shadow for card
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    fontSize: 17,
    fontWeight: "400",
    marginRight: 4,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "400",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
});

export default PersonalInfo;
