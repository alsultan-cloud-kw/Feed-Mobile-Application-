// import React, { useEffect } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import Animated, { FadeIn } from "react-native-reanimated";

// const THEME_COLOR = "#E53E3E";

// export default function OAuthCallback() {
//   const { isSignedIn } = useAuth();

//   useEffect(() => {
//     const handleAuthRedirect = async () => {
//       try {
//         if (isSignedIn) {
//           // Store authentication state
//           await SecureStore.setItemAsync("isAuthenticated", "true");
//           await SecureStore.setItemAsync("lastLogin", new Date().toISOString());

//           // Clear any guest mode flags
//           await SecureStore.deleteItemAsync("isGuestMode");

//           // Show success message and redirect
//           Toast.show({
//             type: "success",
//             text1: "Successfully signed in!",
//             text2: "Welcome back",
//             position: "top",
//             visibilityTime: 2000,
//           });

//           // Redirect to home after a short delay to show the success message
//           setTimeout(() => {
//             router.replace("/(root)/(tabs)");
//           }, 1000);
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Sign-In Error",
//             text2: "Failed to sign in. Please try again.",
//             position: "top",
//           });
//           router.replace("/(root)/(auth)/sign-in");
//         }
//       } catch (error) {
//         console.error("Auth redirect error:", error);
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "An unexpected error occurred",
//           position: "top",
//         });
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     };

//     handleAuthRedirect();
//   }, [isSignedIn]);

//   return (
//     <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
//       <ActivityIndicator size="large" color={THEME_COLOR} />
//       <Toast />
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
// });

/************************************* */

// import React, { useEffect } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import Animated, { FadeIn } from "react-native-reanimated";

// const THEME_COLOR = "#4CAF50";

// export default function OAuthCallback() {
//   const { isSignedIn } = useAuth();

//   useEffect(() => {
//     const handleAuthRedirect = async () => {
//       try {
//         if (isSignedIn) {
//           await SecureStore.setItemAsync("isAuthenticated", "true");
//           await SecureStore.deleteItemAsync("isGuestMode");
//           Toast.show({
//             type: "success",
//             text1: "Successfully signed in!",
//             text2: "Welcome back",
//             position: "top",
//             visibilityTime: 2000,
//           });
//           setTimeout(() => {
//             router.replace("/(root)/(tabs)");
//           }, 1000);
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Sign-In Error",
//             text2: "Failed to sign in. Please try again.",
//             position: "top",
//           });
//           router.replace("/(root)/(auth)/sign-in");
//         }
//       } catch (error) {
//         console.error("Auth redirect error:", error);
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "An unexpected error occurred",
//           position: "top",
//         });
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     };

//     handleAuthRedirect();
//   }, [isSignedIn]);

//   return (
//     <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
//       <ActivityIndicator size="large" color={THEME_COLOR} />
//       <Toast />
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
// });

/******************************************* */

// // oauth-native-callback.tsx

// import React, { useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import { useAuth, useUser } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import Animated, { FadeIn } from "react-native-reanimated";
// import LottieView from "lottie-react-native";

// const THEME_COLOR = "#10B981"; // Matching green theme

// export default function OAuthCallback() {
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     const handleAuthRedirect = async () => {
//       try {
//         if (isSignedIn && user) {
//           // Store essential user data
//           const userData = {
//             userId: user.id,
//             username: user.username || user.firstName || "User",
//             email: user.primaryEmailAddress?.emailAddress,
//             lastLogin: new Date().toISOString(),
//             imageUrl: user.imageUrl,
//           };

//           await Promise.all([
//             SecureStore.setItemAsync("isAuthenticated", "true"),
//             SecureStore.setItemAsync("userData", JSON.stringify(userData)),
//             SecureStore.deleteItemAsync("isGuestMode"),
//           ]);

//           // Show success message
//           Toast.show({
//             type: "success",
//             text1: "Welcome back!",
//             text2: `Hello, ${userData.username}`,
//             position: "top",
//             visibilityTime: 2000,
//           });

//           // Add slight delay for animation
//           timeoutId = setTimeout(() => {
//             router.replace("/(root)/(tabs)");
//           }, 1500);
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Sign-In Error",
//             text2: "Please try again",
//             position: "top",
//             visibilityTime: 3000,
//           });
//           router.replace("/(root)/(auth)/sign-in");
//         }
//       } catch (error) {
//         console.error("Auth callback error:", error);
//         Toast.show({
//           type: "error",
//           text1: "Authentication Error",
//           text2: "Please try again later",
//           position: "top",
//           visibilityTime: 3000,
//         });
//         router.replace("/(root)/(auth)/sign-in");
//       }
//     };

//     handleAuthRedirect();

//     return () => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, [isSignedIn, user]);

//   return (
//     <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
//       <LottieView
//         source={require("../../../assets/lotties/loading.json")}
//         autoPlay
//         loop
//         style={styles.animation}
//         speed={1.5}
//       />
//       <Toast />
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });

/************************************** */

import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import Animated, { FadeIn } from "react-native-reanimated";
import LottieView from "lottie-react-native";

const THEME_COLOR = "#10B981";

export default function OAuthCallback() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const hasRedirected = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleAuthRedirect = async () => {
      if (hasRedirected.current) return;

      if (isSignedIn && user) {
        Toast.show({
          type: "success",
          text1: "Welcome back!",
          text2: `Hello, ${user.username || user.firstName || "User"}`,
          position: "top",
          visibilityTime: 2000,
        });
        // Delay a bit to allow the animation to complete gracefully
        timeoutId = setTimeout(() => {
          hasRedirected.current = true;
          router.replace("/(root)/(tabs)");
        }, 1500);
      } else {
        // Wait a bit to allow potential sign-in propagation before displaying error
        timeoutId = setTimeout(() => {
          if (!isSignedIn) {
            Toast.show({
              type: "error",
              text1: "Sign-In Error",
              text2: "Unable to sign in. Please try again.",
              position: "top",
              visibilityTime: 3000,
            });
            hasRedirected.current = true;
            router.replace("/(root)/(auth)/sign-in");
          }
        }, 2000);
      }
    };

    handleAuthRedirect();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSignedIn, user]);

  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <LottieView
        source={require("../../../assets/lotties/loading.json")}
        autoPlay
        loop
        style={styles.animation}
        speed={1.5}
      />
      <Toast />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animation: {
    width: 200,
    height: 200,
  },
});
