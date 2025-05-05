// import * as SecureStore from "expo-secure-store";

// export const StorageKeys = {
//   SESSION: "auth_session",
//   GUEST_MODE: "guest_mode",
//   USER_PREFERENCES: "user_preferences",
//   LAST_LOGIN: "last_login",
// } as const;

// export interface UserPreferences {
//   isGuestMode: boolean;
//   lastLoginDate?: string;
//   theme?: "light" | "dark";
// }

// export const Storage = {
//   async saveSession(sessionId: string): Promise<void> {
//     try {
//       await SecureStore.setItemAsync(StorageKeys.SESSION, sessionId);
//     } catch (error) {
//       console.error("Error saving session:", error);
//     }
//   },

//   async getSession(): Promise<string | null> {
//     try {
//       return await SecureStore.getItemAsync(StorageKeys.SESSION);
//     } catch (error) {
//       console.error("Error getting session:", error);
//       return null;
//     }
//   },

//   async clearSession(): Promise<void> {
//     try {
//       await SecureStore.deleteItemAsync(StorageKeys.SESSION);
//     } catch (error) {
//       console.error("Error clearing session:", error);
//     }
//   },

//   async saveUserPreferences(preferences: UserPreferences): Promise<void> {
//     try {
//       await SecureStore.setItemAsync(
//         StorageKeys.USER_PREFERENCES,
//         JSON.stringify(preferences)
//       );
//     } catch (error) {
//       console.error("Error saving user preferences:", error);
//     }
//   },

//   async getUserPreferences(): Promise<UserPreferences | null> {
//     try {
//       const data = await SecureStore.getItemAsync(StorageKeys.USER_PREFERENCES);
//       return data ? JSON.parse(data) : null;
//     } catch (error) {
//       console.error("Error getting user preferences:", error);
//       return null;
//     }
//   },

//   async setGuestMode(isGuest: boolean): Promise<void> {
//     try {
//       const preferences = (await this.getUserPreferences()) || {
//         isGuestMode: false,
//       };
//       await this.saveUserPreferences({
//         ...preferences,
//         isGuestMode: isGuest,
//         lastLoginDate: isGuest
//           ? new Date().toISOString()
//           : preferences.lastLoginDate,
//       });
//     } catch (error) {
//       console.error("Error setting guest mode:", error);
//     }
//   },
// };

/****************************** */

// utils/storage.ts

import * as SecureStore from "expo-secure-store";

const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  IS_AUTHENTICATED: "isAuthenticated",
  IS_GUEST_MODE: "isGuestMode",
  LAST_LOGIN: "lastLogin",
  SESSION_ID: "sessionId",
  SETTINGS: "settings",
};

export const clearSecureStorage = async () => {
  try {
    const deletePromises = Object.values(STORAGE_KEYS).map((key) =>
      SecureStore.deleteItemAsync(key)
    );

    await Promise.all(deletePromises);
    console.log(
      "Secure storage cleared successfully at:",
      "2025-03-01 12:37:44"
    );
    return true;
  } catch (error) {
    console.error("Error clearing secure storage:", error);
    return false;
  }
};

// Add this to your sign-in screen to check and clear storage if needed:
