// import React, { createContext, useState, useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";

// WebBrowser.maybeCompleteAuthSession();

// interface AuthContextType {
//   user: any;
//   isLoading: boolean;
//   googleSignIn: () => Promise<void>;
//   phoneSignIn: (phoneNumber: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: `${process.env.ANDROID_CLIENT_ID}`,
//     iosClientId: "YOUR_IOS_CLIENT_ID",
//     webClientId: `{${process.env.ANDROID_CLIENT_ID}}`,
//     redirectUri: AuthSession.makeRedirectUri({
//       scheme: "myapp", // Use the scheme defined in your `app.json`
//     }),
//   });

//   useEffect(() => {
//     // Check for persisted user on app launch
//     const checkStoredUser = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         }
//         setIsLoading(false);
//       } catch (error) {
//         setIsLoading(false);
//       }
//     };
//     checkStoredUser();
//   }, []);

//   useEffect(() => {
//     const handleGoogleSignIn = async () => {
//       if (response?.type === "success") {
//         const { authentication } = response;
//         // Verify token with your backend
//         const userInfo = await fetch(
//           "https://www.googleapis.com/userinfo/v2/me",
//           {
//             headers: { Authorization: `Bearer ${authentication?.accessToken}` },
//           }
//         ).then((res) => res.json());

//         await storeUser(userInfo);
//       }
//     };

//     handleGoogleSignIn();
//   }, [response]);

//   const storeUser = async (userData: any) => {
//     try {
//       await AsyncStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       console.error("Error storing user", error);
//     }
//   };

//   const googleSignIn = async () => {
//     try {
//       await promptAsync();
//     } catch (error) {
//       console.error("Google Sign-In Error", error);
//     }
//   };

//   const phoneSignIn = async (phoneNumber: string, password: string) => {
//     try {
//       // Implement phone number sign-in with Strapi backend
//       const response = await fetch("YOUR_STRAPI_AUTH_ENDPOINT", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, password }),
//       });
//       const userData = await response.json();
//       await storeUser(userData);
//     } catch (error) {
//       console.error("Phone Sign-In Error", error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem("user");
//       setUser(null);
//     } catch (error) {
//       console.error("Logout Error", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         googleSignIn,
//         phoneSignIn,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/*********************************** */

// import React, { useState, createContext, useContext } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Ensure you have these installed:
// // npm install expo-auth-session expo-web-browser @react-native-async-storage/async-storage

// export const useGoogleSignIn = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
//     iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
//     webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
//     scopes: ["profile", "email"],
//   });

//   React.useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const signIn = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const result = await promptAsync();
//       if (result.type === "success") {
//         const { authentication } = result;
//         const userInfoResponse = await fetch(
//           "https://www.googleapis.com/userinfo/v2/me",
//           {
//             headers: {
//               Authorization: `Bearer ${authentication!.accessToken}`,
//             },
//           }
//         );
//         const userInfo = await userInfoResponse.json();

//         // Store user info in AsyncStorage
//         await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
//         setUser(userInfo);
//       }
//     } catch (err: any) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signOut = async () => {
//     setLoading(true);
//     try {
//       // Clear AsyncStorage
//       await AsyncStorage.removeItem("userInfo");
//       setUser(null);
//     } catch (err: any) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const restoreUser = async () => {
//     try {
//       const storedUser = await AsyncStorage.getItem("userInfo");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (err: any) {
//       setError(err);
//     }
//   };

//   React.useEffect(() => {
//     restoreUser();
//   }, []);

//   return {
//     user,
//     loading,
//     error,
//     signIn,
//     signOut,
//   };
// };

// const AuthContext = createContext(null);
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const googleSignIn = useGoogleSignIn();

//   return (
//     <AuthContext.Provider value={googleSignIn}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/****************************************************** */

// // app/contexts/useAuth.tsx
// import { createContext, useContext, useEffect, ReactNode } from "react";
// import { useRouter, useSegments } from "expo-router";
// import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

// type AuthContextType = {
//   signOut: () => Promise<void>;
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, signOut } = useClerkAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inTabsGroup = segments[0] === "(tabs)";
//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && !inTabsGroup) {
//       router.replace("/(tabs)");
//     } else if (!isSignedIn && !inAuthGroup) {
//       router.replace("/(auth)/SignIn");
//     }
//   }, [isSignedIn, segments]);

//   return (
//     <AuthContext.Provider value={{ signOut, isLoaded, isSignedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/***************************************************** */

// // app/contexts/useAuth.tsx
// import { createContext, useContext, useEffect, ReactNode } from "react";
// import { useRouter, useSegments } from "expo-router";
// import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

// type AuthContextType = {
//   signOut: () => Promise<void>;
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, signOut } = useClerkAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inTabsGroup = segments[0] === "(tabs)";
//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && !inTabsGroup) {
//       router.replace("/(root)/(tabs)");
//     } else if (!isSignedIn && !inAuthGroup) {
//       router.replace("/LoginModal");
//     }
//   }, [isSignedIn, segments]);

//   return (
//     <AuthContext.Provider value={{ signOut, isLoaded, isSignedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/******************************** */

// // app/contexts/useAuth.tsx
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { useRouter, useSegments } from "expo-router";
// import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

// type AuthContextType = {
//   signOut: () => Promise<void>;
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
//   showModal: boolean;
//   setShowModal: (visible: boolean) => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, signOut } = useClerkAuth();
//   const [showModal, setShowModal] = useState(false);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inTabsGroup = segments[0] === "(tabs)";
//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && !inTabsGroup) {
//       router.replace("/(root)/(tabs)");
//     } else if (!isSignedIn && !inAuthGroup) {
//       setShowModal(true); // Show modal if not signed in
//     }
//   }, [isSignedIn, segments]);

//   return (
//     <AuthContext.Provider
//       value={{ signOut, isLoaded, isSignedIn, showModal, setShowModal }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/*****************************************************/

// // app/contexts/useAuth.tsx

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { useRouter, useSegments } from "expo-router";
// import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

// type AuthContextType = {
//   signOut: () => Promise<void>;
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
//   showModal: boolean;
//   setShowModal: (visible: boolean) => void;
//   continueAsGuest: boolean;
//   setContinueAsGuest: (continueAsGuest: boolean) => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, signOut } = useClerkAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [continueAsGuest, setContinueAsGuest] = useState(false);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inTabsGroup = segments[0] === "(tabs)";
//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && !inTabsGroup) {
//       router.replace("/(root)/(tabs)");
//     } else if (!isSignedIn && !inAuthGroup && !continueAsGuest) {
//       setShowModal(true); // Show modal if not signed in and not continuing as guest
//     }
//   }, [isSignedIn, segments, continueAsGuest]);

//   return (
//     <AuthContext.Provider
//       value={{
//         signOut,
//         isLoaded,
//         isSignedIn,
//         showModal,
//         setShowModal,
//         continueAsGuest,
//         setContinueAsGuest,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

/******************************************** */

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useCallback,
// } from "react";
// import { useRouter, useSegments } from "expo-router";
// import { useAuth as useClerkAuth } from "@clerk/clerk-expo";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const GUEST_MODE_KEY = "auth_guest_mode";

// type AuthContextType = {
//   signOut: () => Promise<void>;
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
//   showModal: boolean;
//   setShowModal: (visible: boolean) => void;
//   continueAsGuest: boolean;
//   setContinueAsGuest: (continueAsGuest: boolean) => void;
//   resetAuth: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, signOut: clerkSignOut } = useClerkAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [continueAsGuest, setContinueAsGuest] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const segments = useSegments();
//   const router = useRouter();

//   // Initialize auth state from storage
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const guestMode = await AsyncStorage.getItem(GUEST_MODE_KEY);
//         setContinueAsGuest(guestMode === "true");
//       } catch (error) {
//         console.error("Failed to initialize auth:", error);
//       } finally {
//         setIsInitialized(true);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Persist guest mode changes
//   useEffect(() => {
//     if (isInitialized) {
//       AsyncStorage.setItem(GUEST_MODE_KEY, String(continueAsGuest));
//     }
//   }, [continueAsGuest, isInitialized]);

//   // Routing logic
//   useEffect(() => {
//     if (!isLoaded || !isInitialized) return;

//     const inTabsGroup = segments[0] === "(tabs)";
//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && !inTabsGroup) {
//       router.replace("/(root)/(tabs)");
//     } else if (!isSignedIn && !continueAsGuest && !inAuthGroup) {
//       setShowModal(true);
//     }
//   }, [isSignedIn, segments, continueAsGuest, isInitialized, isLoaded]);

//   // Enhanced sign out with cleanup
//   const signOut = useCallback(async () => {
//     try {
//       await clerkSignOut();
//       await resetAuth();
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       throw error;
//     }
//   }, [clerkSignOut, router]);

//   // Reset auth state
//   const resetAuth = useCallback(async () => {
//     try {
//       await AsyncStorage.removeItem(GUEST_MODE_KEY);
//       setContinueAsGuest(false);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Reset auth error:", error);
//       throw error;
//     }
//   }, []);

//   if (!isInitialized) {
//     return null; // Or a loading spinner if you prefer
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         signOut,
//         isLoaded,
//         isSignedIn,
//         showModal,
//         setShowModal,
//         continueAsGuest,
//         setContinueAsGuest,
//         resetAuth,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export default useAuth;

/*********************************************** */

// import { useEffect } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as SecureStore from "expo-secure-store";
// import { useSSO, useUser, useAuth } from "@clerk/clerk-expo";
// import * as AuthSession from "expo-auth-session";
// import { router } from "expo-router";

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// export const useAuthenticatedUser = () => {
//   const { isSignedIn, user } = useUser();
//   const { startSSOFlow } = useSSO();
//   const { signOut } = useAuth();

//   const persistSession = async (sessionId: string) => {
//     try {
//       await SecureStore.setItemAsync("session", sessionId);
//     } catch (error) {
//       console.error("Error persisting session:", error);
//     }
//   };

//   const clearSession = async () => {
//     try {
//       await SecureStore.deleteItemAsync("session");
//     } catch (error) {
//       console.error("Error clearing session:", error);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       const { createdSessionId, setActive } = await startSSOFlow({
//         strategy: "oauth_google",
//         redirectUrl: AuthSession.makeRedirectUri({
//           scheme: "myapp",
//           path: "oauth-native-callback",
//         }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         await persistSession(createdSessionId);
//         return { success: true, sessionId: createdSessionId };
//       }

//       return { success: false, error: "No session created" };
//     } catch (error) {
//       console.error("Sign in error:", error);
//       return {
//         success: false,
//         error: error instanceof Error ? error.message : "Sign in failed",
//       };
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       await clearSession();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       throw error;
//     }
//   };

//   return {
//     isSignedIn,
//     user,
//     signInWithGoogle,
//     handleSignOut,
//   };
// };

/************************************************** */

// import { useState, useEffect, useCallback } from "react";
// import { useSSO, useUser, useClerk } from "@clerk/clerk-expo";
// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";
// import { router } from "expo-router";
// import { Storage } from "../Utils/Storage";
// import { showToast } from "../Utils/Toast";
// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// export const useAuth = () => {
//   const { startSSOFlow } = useSSO();
//   const { isSignedIn, user } = useUser();
//   const { signOut } = useClerk();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGuestMode, setIsGuestMode] = useState(false);

//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       setIsLoading(true);
//       const preferences = await Storage.getUserPreferences();
//       const sessionId = await Storage.getSession();

//       if (preferences?.isGuestMode) {
//         setIsGuestMode(true);
//         router.replace("/(root)/(tabs)");
//       } else if (sessionId && isSignedIn) {
//         router.replace("/(root)/(tabs)");
//       }
//     } catch (error) {
//       console.error("Error checking auth state:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       setIsLoading(true);
//       const { createdSessionId, setActive } = await startSSOFlow({
//         strategy: "oauth_google",
//         redirectUrl: AuthSession.makeRedirectUri({
//           scheme: "myapp",
//           path: "oauth-native-callback",
//         }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         await Storage.saveSession(createdSessionId);
//         await Storage.setGuestMode(false);
//         showToast("success", "Welcome back!", user?.username || "User");
//         router.replace("/(root)/(tabs)");
//       }
//     } catch (error) {
//       console.error("Sign in error:", error);
//       showToast("error", "Sign-in Error", "Failed to sign in with Google");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const continueAsGuest = async () => {
//     try {
//       setIsLoading(true);
//       await Storage.setGuestMode(true);
//       setIsGuestMode(true);
//       showToast("info", "Guest Mode", "You're browsing as a guest");
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Error continuing as guest:", error);
//       showToast("error", "Error", "Failed to continue as guest");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       setIsLoading(true);
//       if (isSignedIn) {
//         await signOut();
//         await Storage.clearSession();
//       }
//       await Storage.setGuestMode(false);
//       setIsGuestMode(false);
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       showToast("error", "Error", "Failed to sign out");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLoading,
//     isSignedIn,
//     isGuestMode,
//     user,
//     signInWithGoogle,
//     continueAsGuest,
//     handleSignOut,
//   };
// };

/********************************* */

import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { GoogleIcon } from "@/app/Icons/Icons";

// Ensure WebBrowser handles auth sessions
WebBrowser.maybeCompleteAuthSession();

const SCREEN_HEIGHT = Dimensions.get("window").height;
const THEME_COLOR = "#E53E3E";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  isInitializing: boolean;
}

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const { isSignedIn, user } = useUser();
  const { startSSOFlow } = useSSO();
  const [authState, setAuthState] = React.useState<AuthState>({
    isLoading: false,
    error: null,
    isInitializing: true,
  });

  // Warm up browser for better performance
  useEffect(() => {
    const warmUpBrowser = async () => {
      await WebBrowser.warmUpAsync();
    };
    warmUpBrowser();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  // Check for existing session
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const sessionId = await SecureStore.getItemAsync("clerk_session");
        const userPreferences = await SecureStore.getItemAsync(
          "user_preferences"
        );

        if (sessionId && isSignedIn) {
          await handleRedirectToHome();
        } else if (userPreferences) {
          const { isGuestMode } = JSON.parse(userPreferences);
          if (isGuestMode) {
            await handleGuestMode();
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setAuthState((prev) => ({ ...prev, isInitializing: false }));
      }
    };

    checkExistingSession();
  }, [isSignedIn]);

  const handleRedirectToHome = async () => {
    try {
      await SecureStore.setItemAsync("last_login", new Date().toISOString());
      router.replace("/(root)/(tabs)");
    } catch (error) {
      console.error("Error redirecting to home:", error);
    }
  };

  const handleGuestMode = async () => {
    try {
      await SecureStore.setItemAsync(
        "user_preferences",
        JSON.stringify({
          isGuestMode: true,
          lastAccess: new Date().toISOString(),
        })
      );
      router.replace("/(root)/(tabs)");
    } catch (error) {
      console.error("Error setting guest mode:", error);
      showToast("error", "Failed to continue as guest");
    }
  };

  const showToast = (type: "success" | "error" | "info", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: insets.top + 10,
    });
  };

  const handleSignIn = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "myapp",
          path: "oauth-native-callback",
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        await SecureStore.setItemAsync("clerk_session", createdSessionId);
        await SecureStore.setItemAsync(
          "user_preferences",
          JSON.stringify({
            isGuestMode: false,
            lastLogin: new Date().toISOString(),
          })
        );

        showToast("success", "Successfully signed in!");
        await handleRedirectToHome();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: "Failed to sign in. Please try again.",
      }));
      showToast("error", "Sign-in failed. Please try again.");
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleContinueAsGuest = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      await handleGuestMode();
      showToast("info", "Continuing as guest");
    } catch (error) {
      console.error("Error continuing as guest:", error);
      showToast("error", "Failed to continue as guest");
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  if (authState.isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLOR} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeIn.delay(300).duration(600)}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="cart" size={64} color={THEME_COLOR} />
        </View>
        <Animated.Text
          entering={FadeInDown.delay(450).duration(600)}
          style={styles.title}
        >
          Welcome Back
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.subtitle}
        >
          Sign in to continue shopping
        </Animated.Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(750).duration(600)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={[
            styles.googleButton,
            authState.isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSignIn}
          disabled={authState.isLoading}
          activeOpacity={0.7}
        >
          {authState.isLoading ? (
            <ActivityIndicator color={THEME_COLOR} />
          ) : (
            <>
              <Image source={GoogleIcon} style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        {authState.error && (
          <Animated.Text
            entering={SlideInUp.duration(300)}
            style={styles.errorText}
          >
            {authState.error}
          </Animated.Text>
        )}

        <TouchableOpacity
          style={styles.guestButton}
          onPress={handleContinueAsGuest}
          disabled={authState.isLoading}
          activeOpacity={0.7}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
          <Ionicons name="arrow-forward" size={20} color="#4A5568" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(900).duration(600)}
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
      >
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
          >
            Privacy Policy
          </Text>
        </Text>
      </Animated.View>

      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: THEME_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A202C",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Cairo-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    fontFamily: "Cairo",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#1A202C",
    fontWeight: "600",
    fontFamily: "Cairo-SemiBold",
  },
  guestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  guestButtonText: {
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
    fontFamily: "Cairo",
  },
  footer: {
    width: "100%",
  },
  termsText: {
    textAlign: "center",
    color: "#4A5568",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Cairo",
  },
  link: {
    color: THEME_COLOR,
    textDecorationLine: "underline",
    fontFamily: "Cairo-SemiBold",
  },
  errorText: {
    color: THEME_COLOR,
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Cairo",
  },
});
