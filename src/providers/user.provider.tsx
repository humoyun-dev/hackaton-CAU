// storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";

export const saveUserToStorage = async (user:any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const storedUser = await AsyncStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
    return null;
  }
};

export const clearUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Failed to clear user data:", error);
  }
};
