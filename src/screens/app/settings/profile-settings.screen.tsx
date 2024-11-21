import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { X } from "lucide-react-native";
import PersonalInfo from "../../../ui/person-informations";
import { useTheme } from "../../../providers/theme.provider";
import { mockUser } from "../../../data/user"; // Import user data
import { ProfileHeader } from "../../../ui";

const ProfileSettingsScreen = () => {
  const { isDark } = useTheme();

  const colors = {
    background: isDark ? "#000000" : "#F2F2F7",
    cardBackground: isDark ? "#1C1C1E" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    subText: isDark ? "#8E8E93" : "#3C3C43",
    separator: isDark ? "#38383A" : "#C6C6C8",
    modalBackground: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
    buttonText: "#007AFF",
    signOutText: "#FF3B30",
  };

  // Initialize state with user data
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(mockUser.name.split(" ")[0]);
  const [lastName, setLastName] = useState(
    mockUser.name.split(" ").slice(1).join(" ")
  );
  const [email, setEmail] = useState(mockUser.email);
  const [age, setAge] = useState("30"); 
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("75 kg"); 
  const [height, setHeight] = useState("180 cm"); 

  const handleSave = () => {
    console.log("User data saved:", {
      firstName,
      lastName,
      email,
      age,
      gender,
      weight,
      height,
    });
    setModalVisible(false);
  };

  const renderEditField = (
    label: string,
    value: string,
    setValue: (value: string) => void
  ) => (
    <View style={styles.editField}>
      <Text style={[styles.editFieldLabel, { color: colors.text }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.editFieldInput,
          { color: colors.text, borderColor: colors.separator },
        ]}
        value={value}
        onChangeText={setValue}
        placeholderTextColor={colors.subText}
      />
    </View>
  );

  const renderEditModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colors.modalBackground },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Edit Personal Info
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={[styles.saveButton, { color: colors.buttonText }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {renderEditField("First Name", firstName, setFirstName)}
            {renderEditField("Last Name", lastName, setLastName)}
            {renderEditField("Email", email, setEmail)}
            {renderEditField("Age", age, setAge)}
            {renderEditField("Gender", gender, setGender)}
            {renderEditField("Weight", weight, setWeight)}
            {renderEditField("Height", height, setHeight)}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ProfileHeader />

      <PersonalInfo
        firstName={firstName}
        lastName={lastName}
        age={age}
        gender={gender}
        weight={weight}
        height={height}
        onEdit={() => setModalVisible(true)}
      />

      <TouchableOpacity
        style={[styles.signOut, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={[styles.signOutText, { color: colors.signOutText }]}>
          Sign Out
        </Text>
      </TouchableOpacity>

      {renderEditModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOut: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  signOutText: {
    fontSize: 17,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    fontSize: 17,
    fontWeight: "600",
  },
  editField: {
    marginBottom: 20,
  },
  editFieldLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  editFieldInput: {
    fontSize: 17,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default ProfileSettingsScreen;
