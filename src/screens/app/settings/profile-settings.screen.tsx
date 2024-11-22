import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../providers/theme.provider";
import { ProfileHeader } from "../../../ui";
import PersonalInfo from "../../../ui/person-informations";
import { useNavigation } from "@react-navigation/native";

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

const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

const ProfileSettingsScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();

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

  const [user, setUser] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setAge(userData.age || "");
        setGender(userData.gender || "");
        setWeight(userData.weight || "");
        setHeight(userData.height || "");
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      age,
      gender,
      weight,
      height,
    };
    await saveUserData(updatedUser);
    setUser(updatedUser);
    setModalVisible(false);
    navigation.reset({
      index: 0,
      // @ts-ignore
      routes: [{ name: "SettingsMain" }],
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.error("Failed to log out:", error);
    }
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

      {user ? (
        <>
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
            onPress={handleLogout}
          >
            <Text style={[styles.signOutText, { color: colors.signOutText }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.noDataText, { color: colors.subText }]}>
          No data available. Please add your information.
        </Text>
      )}

      {renderEditModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 40,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  signOut: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
