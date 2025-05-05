// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import { Text, View, Button } from "react-native";
// import { Link } from "expo-router";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";

// export const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     // Warm up the android browser to improve UX
//     // https://docs.expo.dev/guides/authentication/#improving-user-experience
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function Page() {
//   useWarmUpBrowser();

//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } =
//         await startOAuthFlow({
//           redirectUrl: Linking.createURL("/(root)/(tabs)", {
//             scheme: "myapp",
//           }),
//         });

//       // If sign in was successful, set the active session
//       if (createdSessionId) {
//         setActive!({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp returned from startOAuthFlow
//         // for next steps, such as MFA
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   }, []);

//   return (
//     <View>
//       <Link href="/(root)/(tabs)">
//         <Text>Home</Text>
//       </Link>
//       <Button title="Sign in with Google" onPress={onPress} />
//     </View>
//   );
// }

/***************************************************************** */

// // app/(root)/(auth)/sign-in.tsx
// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { saveUserToStrapi } from "../../Utils/api";
// import { GoogleIcon } from "@/app/Icons/Icons";
// export const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   useWarmUpBrowser();
//   const { user } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = React.useCallback(async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi if it's their first sign-in
//         if (user) {
//           await saveUserToStrapi({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress?.emailAddress || "",
//             ImageURL: user.imageUrl || "",
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//     }
//   }, [user]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={GoogleIcon} style={styles.logo} />
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </View>

//       <TouchableOpacity style={styles.googleButton} onPress={handleSignIn}>
//         <Image source={GoogleIcon} style={styles.googleIcon} />
//         <Text style={styles.buttonText}>Continue with Google</Text>
//       </TouchableOpacity>

//       <Link href="/(root)/(tabs)" asChild>
//         <TouchableOpacity style={styles.skipButton}>
//           <Text style={styles.skipText}>Continue as Guest</Text>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#E53935", // Reddish
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 30,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "600",
//   },
//   skipButton: {
//     padding: 16,
//     alignItems: "center",
//   },
//   skipText: {
//     color: "#4CAF50", // Greenish
//     fontSize: 16,
//   },
// });

/************************************************ */

// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { saveUserToStrapi } from "../../Utils/api";
// import { GoogleIcon } from "@/app/Icons/Icons";

// export const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   useWarmUpBrowser();
//   const { user } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = React.useCallback(async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi if it's their first sign-in
//         if (user) {
//           await saveUserToStrapi({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress?.emailAddress || "",
//             ImageURL: user.imageUrl || "",
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//     }
//   }, [user]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={GoogleIcon} style={styles.logo} />
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </View>

//       <TouchableOpacity style={styles.googleButton} onPress={handleSignIn}>
//         <Image source={GoogleIcon} style={styles.googleIcon} />
//         <Text style={styles.buttonText}>Continue with Google</Text>
//       </TouchableOpacity>

//       <Link href="/(root)/(tabs)" asChild>
//         <TouchableOpacity style={styles.skipButton}>
//           <Text style={styles.skipText}>Continue as Guest</Text>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#E53935", // Reddish
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 30,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "600",
//   },
//   skipButton: {
//     padding: 16,
//     alignItems: "center",
//   },
//   skipText: {
//     color: "#4CAF50", // Greenish
//     fontSize: 16,
//   },
// });

/*************************************** */

// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { saveUserToStrapi } from "../../Utils/api";
// import { GoogleIcon } from "@/app/Icons/Icons";

// export const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   useWarmUpBrowser();
//   const { isSignedIn, user } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = React.useCallback(async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi if it's their first sign-in
//         if (user) {
//           await saveUserToStrapi({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress?.emailAddress || "",
//             ImageURL: user.imageUrl || "",
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//     }
//   }, [user]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={GoogleIcon} style={styles.logo} />
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </View>

//       <TouchableOpacity style={styles.googleButton} onPress={handleSignIn}>
//         <Image source={GoogleIcon} style={styles.googleIcon} />
//         <Text style={styles.buttonText}>Continue with Google</Text>
//       </TouchableOpacity>

//       <Link href="/(root)/(tabs)" asChild>
//         <TouchableOpacity style={styles.skipButton}>
//           <Text style={styles.skipText}>Continue as Guest</Text>
//         </TouchableOpacity>
//       </Link>

//       <Text style={styles.terms}>
//         By signing in, you agree to our{" "}
//         <Text style={styles.link}>Terms of Service</Text> and{" "}
//         <Text style={styles.link}>Privacy Policy</Text>.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#E53935", // Reddish
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 30,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "600",
//   },
//   skipButton: {
//     padding: 16,
//     alignItems: "center",
//   },
//   skipText: {
//     color: "#4CAF50", // Greenish
//     fontSize: 16,
//   },
//   terms: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#666",
//     fontSize: 14,
//   },
//   link: {
//     color: "#E53935",
//     textDecorationLine: "underline",
//   },
// });

/**************************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   Alert,
//   Dimensions,
// } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import * as Linking from "expo-linking";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { useStrapiUser } from "../../contexts/UserContext";
// import { createOrUpdateUser } from "../../Utils/api.auth";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   SlideInDown,
// } from "react-native-reanimated";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // URL configuration
// const REDIRECT_URL = Linking.createURL("/(root)/(tabs)", {
//   scheme: "your-scheme", // Replace with your app's scheme
// });

// // Warm up browser for better performance
// WebBrowser.maybeCompleteAuthSession();

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// interface SignInErrorState {
//   message: string;
//   code?: string;
//   isVisible: boolean;
// }

// export default function SignIn() {
//   useWarmUpBrowser();
//   const insets = useSafeAreaInsets();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const { refreshStrapiUser } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInErrorState>({
//     message: "",
//     isVisible: false,
//   });

//   // Handle user sync with Strapi
//   const syncUserWithStrapi = useCallback(async () => {
//     if (!user?.primaryEmailAddress?.emailAddress) return;

//     try {
//       await createOrUpdateUser({
//         Username: user.username || user.firstName || "User",
//         Email: user.primaryEmailAddress.emailAddress,
//         ProfileIMG: user.imageUrl || "",
//         LastLogin: new Date().toISOString(),
//       });
//       await refreshStrapiUser(); // Refresh context
//     } catch (err) {
//       console.error("Error syncing with Strapi:", err);
//       setError({
//         message: "Failed to sync user data. Please try again.",
//         isVisible: true,
//       });
//     }
//   }, [user, refreshStrapiUser]);

//   // Effect to handle automatic sign-in
//   useEffect(() => {
//     if (isUserLoaded && user) {
//       void syncUserWithStrapi();
//       router.replace("/(root)/(tabs)");
//     }
//   }, [isUserLoaded, user]);

//   const handleSignIn = async () => {
//     try {
//       setIsLoading(true);
//       setError({ message: "", isVisible: false });

//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: REDIRECT_URL,
//       });

//       if (!createdSessionId) {
//         throw new Error("Failed to create session");
//       }

//       await setActive({ session: createdSessionId });
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : undefined,
//         isVisible: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar style="dark" />

//       <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </Animated.View>

//       <Animated.View
//         entering={SlideInDown.delay(600)}
//         style={styles.buttonsContainer}
//       >
//         <TouchableOpacity
//           style={[styles.signInButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name="logo-google" size={24} color="#fff" />
//               <Text style={styles.signInButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.skipButton}
//           onPress={() => router.replace("/(root)/(tabs)")}
//           disabled={isLoading}
//         >
//           <Text style={styles.skipButtonText}>Continue as Guest</Text>
//         </TouchableOpacity>
//       </Animated.View>

//       {error.isVisible && (
//         <Animated.View
//           entering={FadeIn}
//           exiting={FadeOut}
//           style={styles.errorContainer}
//         >
//           <TouchableOpacity
//             style={styles.errorContent}
//             onPress={() => setError({ ...error, isVisible: false })}
//           >
//             <Ionicons name="alert-circle" size={24} color="#E53E3E" />
//             <Text style={styles.errorText}>{error.message}</Text>
//             <Ionicons name="close" size={20} color="#666" />
//           </TouchableOpacity>
//         </Animated.View>
//       )}

//       <Animated.Text entering={FadeIn.delay(900)} style={styles.terms}>
//         By signing in, you agree to our{" "}
//         <Text style={styles.link}>Terms of Service</Text> and{" "}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 60,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonsContainer: {
//     width: "100%",
//     maxWidth: SCREEN_WIDTH * 0.9,
//     gap: 16,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     gap: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   signInButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   skipButton: {
//     padding: 16,
//     alignItems: "center",
//   },
//   skipButtonText: {
//     color: "#4A5568",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   errorContainer: {
//     position: "absolute",
//     top: 100,
//     left: 20,
//     right: 20,
//     backgroundColor: "#FFF5F5",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#FED7D7",
//     overflow: "hidden",
//   },
//   errorContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     gap: 12,
//   },
//   errorText: {
//     flex: 1,
//     color: "#E53E3E",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   terms: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     marginBottom: 20,
//     paddingHorizontal: 20,
//   },
//   link: {
//     color: "#E53E3E",
//     textDecorationLine: "underline",
//   },
// });

/**************************** */

// import React, { useCallback } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import * as Linking from "expo-linking";
// import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import { createOrUpdateUser } from "../../Utils/api.auth";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// // Initialize WebBrowser
// WebBrowser.maybeCompleteAuthSession();

// // Warm up browser for better performance
// const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// const REDIRECT_URL = Linking.createURL("/(auth)/sign-in");

// export default function SignIn() {
//   useWarmUpBrowser();
//   const insets = useSafeAreaInsets();
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);

//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onSignInPress = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, signIn, signUp, setActive } =
//         await startOAuthFlow();

//       if (createdSessionId) {
//         setActive({ session: createdSessionId });

//         // Get user data from the active session
//         const user = signIn?.createdUserId
//           ? await signIn.user
//           : signUp?.createdUserId
//           ? await signUp.user
//           : null;

//         if (user) {
//           // Save user to Strapi
//           await createOrUpdateUser({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress?.emailAddress || "",
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: new Date().toISOString(),
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError("Failed to sign in. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar style="dark" />

//       <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>
//           Sign in with Google to continue shopping
//         </Text>
//       </Animated.View>

//       <Animated.View
//         entering={SlideInUp.delay(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={onSignInPress}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name="logo-google" size={24} color="#fff" />
//               <Text style={styles.buttonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && <Text style={styles.errorText}>{error}</Text>}
//       </Animated.View>

//       <Animated.Text entering={FadeIn.delay(900)} style={styles.terms}>
//         By continuing, you agree to our{" "}
//         <Text style={styles.link}>Terms of Service</Text> and{" "}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 60,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     alignItems: "center",
//     gap: 16,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//     gap: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   errorText: {
//     color: "#E53E3E",
//     fontSize: 14,
//     textAlign: "center",
//   },
//   terms: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   link: {
//     color: "#E53E3E",
//     textDecorationLine: "underline",
//   },
// });

/********************************** */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { uploadImageToStrapi, saveUserToStrapi } from "../../Utils/api.auth";
// import { Link, router } from "expo-router";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChangeProfilePicture = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert("Permission to access camera roll is required!");
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: [ImagePicker.MediaType.Images],
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUrl(result.assets[0].uri);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     try {
//       let profileImgUrl = imageUrl;
//       if (imageUrl && !imageUrl.startsWith("http")) {
//         const uploadResponse = await uploadImageToStrapi(imageUrl);
//         profileImgUrl = uploadResponse.url;
//       }

//       await saveUserToStrapi({
//         Username: username,
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ProfileIMG: profileImgUrl,
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", `Failed to save changes: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.prompt}>Please sign in to access settings.</Text>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//           style={styles.profileImage}
//         />
//         <TouchableOpacity
//           style={styles.changePictureButton}
//           onPress={handleChangeProfilePicture}
//         >
//           <Ionicons name="camera" size={20} color="#fff" />
//           <Text style={styles.changePictureButtonText}>Change Picture</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.form}>
//         <Text style={styles.label}>Username</Text>
//         <TextInput
//           style={styles.input}
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSaveChanges}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Order History</Text>
//         <Text style={styles.noOrdersText}>No orders yet.</Text>
//       </View>

//       <View style={styles.divider} />

//       <TouchableOpacity
//         style={styles.signOutButton}
//         onPress={handleSignOut}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="log-out-outline" size={20} color="#fff" />
//             <Text style={styles.signOutButtonText}>Sign Out</Text>
//           </>
//         )}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   changePictureButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 8,
//   },
//   changePictureButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//   },
//   form: {
//     marginBottom: 20,
//     width: "100%",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     marginVertical: 20,
//     width: "100%",
//   },
//   section: {
//     marginBottom: 20,
//     width: "100%",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 10,
//   },
//   noOrdersText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E53935",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   prompt: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   signInButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   signInButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/*********************************** */

// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Image,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { saveUserToStrapi } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";

// // Initialize WebBrowser for OAuth
// WebBrowser.maybeCompleteAuthSession();

// // Browser warm-up hook
// const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// export default function SignIn() {
//   useWarmUpBrowser();
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = React.useState(false);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = React.useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi with current UTC timestamp
//         if (user) {
//           await saveUserToStrapi({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress?.emailAddress || "",
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar style="dark" />

//       <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color="#E53E3E" />
//         </View>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInDown.delay(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#E53E3E" />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <Link href="/(root)/(tabs)" asChild>
//           <TouchableOpacity style={styles.skipButton}>
//             <Text style={styles.skipButtonText}>Continue as Guest</Text>
//             <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//           </TouchableOpacity>
//         </Link>
//       </Animated.View>

//       <Animated.Text entering={FadeIn.delay(900)} style={styles.terms}>
//         By continuing, you agree to our{" "}
//         <Text style={styles.link}>Terms of Service</Text> and{" "}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 40,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#E53E3E",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     gap: 16,
//     width: "100%",
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   skipButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   skipButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   terms: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   link: {
//     color: "#E53E3E",
//     textDecorationLine: "underline",
//   },
// });

/*********************************** */

// // /app/(root)/(auth)/sign-in.tsx

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
// } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
//   SlideInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { saveUserToStrapi } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";

// // Initialize WebBrowser
// WebBrowser.maybeCompleteAuthSession();

// const THEME_COLOR = "#E53E3E";

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   // Warm up browser for better performance
//   useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi
//         if (user?.primaryEmailAddress?.emailAddress) {
//           await saveUserToStrapi({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress.emailAddress,
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: new Date().toISOString().slice(0, 19).replace("T", " "),
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError("Failed to sign in. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Text style={styles.title}>Welcome Back</Text>
//         <Text style={styles.subtitle}>Sign in to continue shopping</Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInDown.delay(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error}
//           </Animated.Text>
//         )}

//         <Link href="/(root)/(tabs)" asChild>
//           <TouchableOpacity style={styles.skipButton}>
//             <Text style={styles.skipButtonText}>Continue as Guest</Text>
//             <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//           </TouchableOpacity>
//         </Link>
//       </Animated.View>

//       <Animated.Text entering={FadeIn.delay(900)} style={styles.terms}>
//         By continuing, you agree to our{" "}
//         <Text
//           style={styles.link}
//           onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//         >
//           Terms of Service
//         </Text>{" "}
//         and{" "}
//         <Text
//           style={styles.link}
//           onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//         >
//           Privacy Policy
//         </Text>
//       </Animated.Text>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 40,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     gap: 16,
//     width: "100%",
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   skipButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   skipButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   terms: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     marginTop: 8,
//   },
// });

/********************************************** */
// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Link, router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
//   SlideInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { createOrUpdateUser } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";

// // Initialize WebBrowser
// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   // Warm up browser for better performance
//   useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const formatCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/(root)/(tabs)", { scheme: "myapp" }),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Save user to Strapi
//         if (user?.primaryEmailAddress?.emailAddress) {
//           await createOrUpdateUser({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress.emailAddress,
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: formatCurrentDateTime(),
//           });
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome to Our Store
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to start shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/******************************************* */
// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { ensureUserExists } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   useEffect(() => {
//     if (isSignedIn) {
//       router.replace("/(root)/(tabs)");
//     }
//   }, [isSignedIn]);

//   const formatCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Ensure user exists in Strapi
//         if (user?.primaryEmailAddress?.emailAddress) {
//           const documentId = await ensureUserExists({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress.emailAddress,
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: formatCurrentDateTime(),
//           });

//           if (!documentId) {
//             Alert.alert(
//               "Error",
//               "Failed to create user profile. Some features may be limited."
//             );
//           }
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/***************************************** */
// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// // import * as Linking from "expo-linking";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { ensureUserExists } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   useEffect(() => {
//     if (isSignedIn) {
//       router.replace("/(root)/(tabs)");
//     }
//   }, [isSignedIn]);

//   const formatCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Ensure user exists in Strapi
//         if (user?.primaryEmailAddress?.emailAddress) {
//           const documentId = await ensureUserExists({
//             Username: user.username || user.firstName || "User",
//             Email: user.primaryEmailAddress.emailAddress,
//             ProfileIMG: user.imageUrl || "",
//             LastLogin: formatCurrentDateTime(),
//           });

//           if (!documentId) {
//             Alert.alert(
//               "Error",
//               "Failed to create user profile. Some features may be limited."
//             );
//           }
//         }

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/********************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { getStrapiUserByEmail } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { useStrapiUser } from "../../contexts/UserContext";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// // //redirect url for authentication
// // const redirectUrl = Platform.select({
// //   // native: "exp://192.168.8.145:8081/oauth-native-callback",
// //   default: "myapp://oauth-native-callback",
// // });

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const { setStrapiUser, strapiUser } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const { startOAuthFlow } = useOAuth({
//     strategy: "oauth_google",
//     // redirectUrl,
//   });
//   // Check if user exists in Strapi without creating/updating
//   const checkStrapiUser = useCallback(
//     async (email: string) => {
//       try {
//         const existingUser = await getStrapiUserByEmail(email);
//         if (existingUser) {
//           setStrapiUser(existingUser);
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error("Error checking Strapi user:", error);
//         return false;
//       }
//     },
//     [setStrapiUser]
//   );

//   // Redirect if already signed in
//   useEffect(() => {
//     const redirectIfAuthenticated = async () => {
//       if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
//         const exists = await checkStrapiUser(
//           user.primaryEmailAddress.emailAddress
//         );
//         if (exists) {
//           router.replace("/(root)/(tabs)");
//         } else {
//           // Handle case where user exists in Clerk but not in Strapi
//           Alert.alert(
//             "Account Error",
//             "There was an issue with your account. Please contact support."
//           );
//         }
//       }
//     };

//     redirectIfAuthenticated();
//   }, [isSignedIn, user, checkStrapiUser]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // The redirect will be handled by the useEffect above
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   // Early return if already signed in
//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/*********************** */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { getStrapiUserByEmail } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { useStrapiUser } from "../../contexts/UserContext";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// // Redirect URL configuration based on environment
// // const redirectUrl = Platform.select({
// //   native: __DEV__
// //     ? "exp://192.168.8.145:8081/--/oauth-native-callback"
// //     : "myapp://oauth-native-callback",
// //   default: "myapp://oauth-native-callback",
// // });

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const { setStrapiUser } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);

//   const { startOAuthFlow } = useOAuth({
//     strategy: "oauth_google",
//   });

//   // Initialize WebBrowser
//   useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const checkStrapiUser = useCallback(
//     async (email: string) => {
//       try {
//         const existingUser = await getStrapiUserByEmail(email);
//         if (existingUser) {
//           setStrapiUser(existingUser);
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error("Error checking Strapi user:", error);
//         return false;
//       }
//     },
//     [setStrapiUser]
//   );

//   useEffect(() => {
//     if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
//       checkStrapiUser(user.primaryEmailAddress.emailAddress).then((exists) => {
//         if (exists) {
//           // Add a small delay to ensure smooth transition
//           setTimeout(() => {
//             router.replace("/(root)/(tabs)");
//           }, 100);
//         } else {
//           Alert.alert(
//             "Account Error",
//             "There was an issue with your account. Please contact support."
//           );
//         }
//       });
//     }
//   }, [isSignedIn, user, checkStrapiUser]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (!createdSessionId) {
//         throw new Error("Failed to complete sign in");
//       }

//       if (setActive) {
//         await setActive({ session: createdSessionId });

//         // WebBrowser cleanup after successful sign-in
//         await WebBrowser.coolDownAsync();
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });

//       // Ensure WebBrowser is closed on error
//       await WebBrowser.coolDownAsync();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [startOAuthFlow]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/*************************************** */
// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { getStrapiUserByEmail } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { useStrapiUser } from "../../contexts/UserContext";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const { setStrapiUser } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const { startOAuthFlow } = useOAuth({
//     strategy: "oauth_google",
//   });

//   // Initialize WebBrowser
//   useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const checkStrapiUser = useCallback(
//     async (email: string) => {
//       try {
//         const existingUser = await getStrapiUserByEmail(email);
//         if (existingUser) {
//           setStrapiUser(existingUser);
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error("Error checking Strapi user:", error);
//         return false;
//       }
//     },
//     [setStrapiUser]
//   );

//   useEffect(() => {
//     if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
//       checkStrapiUser(user.primaryEmailAddress.emailAddress).then((exists) => {
//         if (exists) {
//           setShowSuccessMessage(true);
//           // Hide success message after 2 seconds
//           setTimeout(() => {
//             setShowSuccessMessage(false);
//             router.replace("/(root)/(tabs)");
//           }, 2000);
//         } else {
//           Alert.alert(
//             "Account Error",
//             "There was an issue with your account. Please contact support."
//           );
//         }
//       });
//     }
//   }, [isSignedIn, user, checkStrapiUser]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (!createdSessionId) {
//         throw new Error("Failed to complete sign in");
//       }

//       if (setActive) {
//         await setActive({ session: createdSessionId });
//         await WebBrowser.coolDownAsync(); // Ensure web browser is closed
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//       await WebBrowser.coolDownAsync(); // Ensure web browser is closed even on error
//     } finally {
//       setIsLoading(false);
//     }
//   }, [startOAuthFlow]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   if (showSuccessMessage) {
//     return (
//       <View style={styles.successContainer}>
//         <Animated.View
//           entering={FadeIn.duration(300)}
//           style={styles.successContent}
//         >
//           <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
//           <Text style={styles.successText}>Successfully signed in!</Text>
//           <ActivityIndicator
//             color={THEME_COLOR}
//             style={styles.successSpinner}
//           />
//         </Animated.View>
//       </View>
//     );
//   }

//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
//   // Add these new styles
//   successContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   successContent: {
//     alignItems: "center",
//     padding: 20,
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   successSpinner: {
//     marginTop: 16,
//   },
// });

/************************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { getStrapiUserByEmail, updateLastLogin } from "../../Utils/api.auth";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { useStrapiUser } from "../../contexts/UserContext";
// import Toast from "react-native-toast-message";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// interface AuthState {
//   status: "idle" | "loading" | "success" | "error";
//   message?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const { setStrapiUser } = useStrapiUser();
//   const [authState, setAuthState] = useState<AuthState>({ status: "idle" });
//   const { startOAuthFlow } = useOAuth({
//     strategy: "oauth_google",
//   });

//   useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);

//   const handleStrapiAuthentication = useCallback(
//     async (email: string) => {
//       try {
//         const strapiUser = await getStrapiUserByEmail(email);

//         if (!strapiUser) {
//           throw new Error("User not found in Strapi");
//         }

//         // Update last login time
//         await updateLastLogin(strapiUser.id);

//         // Set user in context
//         setStrapiUser(strapiUser);

//         // Show success state
//         setAuthState({
//           status: "success",
//           message: `Welcome back, ${strapiUser.attributes.Username}!`,
//         });

//         // Show success toast
//         Toast.show({
//           type: "success",
//           text1: "Successfully signed in!",
//           text2: `Welcome back, ${strapiUser.attributes.Username}!`,
//         });

//         // Navigate after a delay
//         setTimeout(() => {
//           router.replace("/(root)/(tabs)");
//         }, 2000);

//         return true;
//       } catch (error) {
//         console.error("Strapi authentication error:", error);
//         setAuthState({
//           status: "error",
//           message:
//             "There was an issue with your account. Please contact support.",
//         });

//         // Show error toast
//         Toast.show({
//           type: "error",
//           text1: "Sign-In Error",
//           text2:
//             "There was an issue with your account. Please contact support.",
//         });

//         return false;
//       }
//     },
//     [setStrapiUser]
//   );

//   useEffect(() => {
//     if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
//       handleStrapiAuthentication(user.primaryEmailAddress.emailAddress);
//     }
//   }, [isSignedIn, user, handleStrapiAuthentication]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setAuthState({ status: "loading" });

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (!createdSessionId) {
//         throw new Error("Failed to complete sign in");
//       }

//       if (setActive) {
//         await setActive({ session: createdSessionId });
//         await WebBrowser.coolDownAsync();
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setAuthState({
//         status: "error",
//         message: "Failed to sign in. Please try again.",
//       });

//       // Show error toast
//       Toast.show({
//         type: "error",
//         text1: "Sign-In Error",
//         text2: "Failed to sign in. Please try again.",
//       });

//       await WebBrowser.coolDownAsync();
//     }
//   }, [startOAuthFlow]);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//   };

//   // Render success state
//   if (authState.status === "success") {
//     return (
//       <Animated.View
//         entering={FadeIn.duration(300)}
//         style={styles.successContainer}
//       >
//         <View style={styles.successContent}>
//           <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
//           <Text style={styles.successText}>{authState.message}</Text>
//           <ActivityIndicator
//             color={THEME_COLOR}
//             style={styles.successSpinner}
//           />
//         </View>
//       </Animated.View>
//     );
//   }

//   // Render loading state
//   if (authState.status === "loading") {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   // Main sign-in UI
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[
//             styles.googleButton,
//             authState.status === "loading" && styles.buttonDisabled,
//           ]}
//           onPress={handleSignIn}
//           disabled={authState.status === "loading"}
//           activeOpacity={0.7}
//         >
//           {authState.status === "loading" ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {authState.status === "error" && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {authState.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
//   successContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   successContent: {
//     alignItems: "center",
//     padding: 20,
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   successSpinner: {
//     marginTop: 16,
//   },
// });

/************************************ */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useStrapiUser } from "../../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import { GoogleIcon } from "@/app/Icons/Icons";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface SignInError {
//   message: string;
//   code?: string;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SignInError | null>(null);
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { checkAndCreateUser } = useStrapiUser();

//   useEffect(() => {
//     if (isSignedIn) {
//       handleSignInSuccess();
//     }
//   }, [isSignedIn]);

//   const handleSignInSuccess = async () => {
//     try {
//       await checkAndCreateUser();
//       router.replace("/(root)/(tabs)");
//       Toast.show({
//         type: "success",
//         text1: "Welcome back!",
//         position: "top",
//       });
//     } catch (error) {
//       console.error("Error during sign in process:", error);
//       Toast.show({
//         type: "error",
//         text1: "Sign-in Error",
//         text2: "There was a problem signing you in",
//         position: "top",
//       });
//     }
//   };

//   const handleSignIn = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError({
//         message: "Failed to sign in. Please try again.",
//         code: err instanceof Error ? err.message : "unknown_error",
//       });
//       Toast.show({
//         type: "error",
//         text1: "Sign-in Error",
//         text2: "Failed to sign in. Please try again.",
//         position: "top",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleContinueAsGuest = () => {
//     router.replace("/(root)/(tabs)");
//     Toast.show({
//       type: "info",
//       text1: "Continuing as guest",
//       position: "top",
//     });
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignIn}
//           disabled={isLoading}
//           activeOpacity={0.7}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {error.message}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//   },
// });

/********************************************************* */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { useUser, useOAuth } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import { GoogleIcon } from "@/app/Icons/Icons";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#E53E3E";

// interface AuthState {
//   isLoading: boolean;
//   error: string | null;
//   isInitializing: boolean;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn, user } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const [authState, setAuthState] = useState<AuthState>({
//     isLoading: false,
//     error: null,
//     isInitializing: true,
//   });

//   // Initialize browser and check auth state
//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await WebBrowser.warmUpAsync();

//         // Check existing auth state
//         const [isAuth, isGuest] = await Promise.all([
//           SecureStore.getItemAsync("isAuthenticated"),
//           SecureStore.getItemAsync("isGuestMode"),
//         ]);

//         if (isAuth === "true" && isSignedIn) {
//           router.replace("/(root)/(tabs)");
//         } else if (isGuest === "true") {
//           router.replace("/(root)/(tabs)");
//         }
//       } catch (error) {
//         console.error("Initialization error:", error);
//       } finally {
//         setAuthState((prev) => ({ ...prev, isInitializing: false }));
//       }
//     };

//     initialize();

//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, [isSignedIn]);

//   const formatDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 19).replace("T", " ");
//   };

//   const handleSignIn = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

//       const { createdSessionId, signIn, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });

//         // Store auth data
//         await Promise.all([
//           SecureStore.setItemAsync("isAuthenticated", "true"),
//           SecureStore.setItemAsync("lastLogin", formatDateTime()),
//           SecureStore.setItemAsync("sessionId", createdSessionId),
//           SecureStore.deleteItemAsync("isGuestMode"), // Clear guest mode
//         ]);

//         Toast.show({
//           type: "success",
//           text1: "Signing in...",
//           position: "top",
//           visibilityTime: 2000,
//         });

//         router.replace("/(root)/(tabs)");
//       } else if (signIn) {
//         // Handle additional sign-in steps if needed
//         console.log("Additional sign-in steps required");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setAuthState((prev) => ({
//         ...prev,
//         error: "Failed to sign in. Please try again.",
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Sign-in Error",
//         text2: "Please try again",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   const handleContinueAsGuest = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true }));

//       // Store guest mode preference
//       await Promise.all([
//         SecureStore.setItemAsync("isGuestMode", "true"),
//         SecureStore.setItemAsync("guestLoginTime", formatDateTime()),
//         SecureStore.deleteItemAsync("isAuthenticated"), // Clear any auth state
//       ]);

//       Toast.show({
//         type: "info",
//         text1: "Continuing as guest",
//         position: "top",
//         visibilityTime: 2000,
//       });

//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Failed to continue as guest",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   if (authState.isInitializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[
//             styles.googleButton,
//             authState.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignIn}
//           disabled={authState.isLoading}
//           activeOpacity={0.7}
//         >
//           {authState.isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {authState.error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {authState.error}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           disabled={authState.isLoading}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>

//       <Toast />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFF5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//     fontFamily: "Cairo-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//     fontFamily: "Cairo",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//     fontFamily: "Cairo",
//   },
//   footer: {
//     width: "100%",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//     fontFamily: "Cairo",
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//     fontFamily: "Cairo-SemiBold",
//   },
//   errorText: {
//     color: THEME_COLOR,
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//     fontFamily: "Cairo",
//   },
// });

/*************************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { useUser, useOAuth } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { useUserContext } from "../../contexts/UserContext";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#4CAF50";

// interface AuthState {
//   isLoading: boolean;
//   error: string | null;
//   isInitializing: boolean;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { isSignedIn } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { setUser } = useUserContext();
//   const [authState, setAuthState] = useState<AuthState>({
//     isLoading: false,
//     error: null,
//     isInitializing: true,
//   });

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await WebBrowser.warmUpAsync();
//         const [isAuth, isGuest] = await Promise.all([
//           SecureStore.getItemAsync("isAuthenticated"),
//           SecureStore.getItemAsync("isGuestMode"),
//         ]);

//         if (isAuth === "true" && isSignedIn) {
//           router.replace("/(root)/(tabs)");
//         } else if (isGuest === "true") {
//           router.replace("/(root)/(tabs)");
//         }
//       } catch (error) {
//         console.error("Initialization error:", error);
//       } finally {
//         setAuthState((prev) => ({ ...prev, isInitializing: false }));
//       }
//     };

//     initialize();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, [isSignedIn]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         await SecureStore.setItemAsync("isAuthenticated", "true");
//         await SecureStore.deleteItemAsync("isGuestMode");
//         Toast.show({
//           type: "success",
//           text1: "Signing in...",
//           position: "top",
//           visibilityTime: 2000,
//         });
//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       setAuthState((prev) => ({
//         ...prev,
//         error: "Failed to sign in. Please try again.",
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Sign-in Error",
//         text2: "Please try again",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   const handleContinueAsGuest = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true }));
//       await SecureStore.setItemAsync("isGuestMode", "true");
//       await SecureStore.deleteItemAsync("isAuthenticated");
//       Toast.show({
//         type: "info",
//         text1: "Continuing as guest",
//         position: "top",
//         visibilityTime: 2000,
//       });
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Failed to continue as guest",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   if (authState.isInitializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />
//       <Animated.View
//         entering={FadeIn.delay(300).duration(600)}
//         style={styles.header}
//       >
//         <View style={styles.logoContainer}>
//           <Ionicons name="cart" size={64} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(450).duration(600)}
//           style={styles.title}
//         >
//           Welcome Back
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(600).duration(600)}
//           style={styles.subtitle}
//         >
//           Sign in to continue shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(750).duration(600)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[
//             styles.googleButton,
//             authState.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignIn}
//           disabled={authState.isLoading}
//           activeOpacity={0.7}
//         >
//           {authState.isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {authState.error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {authState.error}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           disabled={authState.isLoading}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={20} color="#4A5568" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(900).duration(600)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms of Service
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>

//       <Toast />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   logoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 8,
//     textAlign: "center",
//     fontFamily: "Cairo-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//     fontFamily: "Cairo",
//   },
//   buttonContainer: {
//     width: 100,
//     gap: 16,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#1A202C",
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//     fontFamily: "Cairo",
//   },
//   footer: {
//     width: "100",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#4A5568",
//     fontSize: 14,
//     lineHeight: 20,
//     fontFamily: "Cairo",
//   },
//   link: {
//     color: THEME_COLOR,
//     textDecorationLine: "underline",
//     fontFamily: "Cairo-SemiBold",
//   },
//   errorText: {
//     color: "#E53E3E",
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//     fontFamily: "Cairo",
//   },
// });

/************************************ */

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { useUser, useOAuth } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import { GoogleIcon } from "@/app/Icons/Icons";
// import { clearSecureStorage } from "@/app/Utils/Storage";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#10B981"; // Changed to green

// interface AuthState {
//   isLoading: boolean;
//   error: string | null;
//   isInitializing: boolean;
// }

// function SignIn() {
//   useEffect(() => {
//     const checkAndClearStorage = async () => {
//       try {
//         const isAuth = await SecureStore.getItemAsync("isAuthenticated");

//         if (isAuth === "true") {
//           // Clear storage if you're getting redirected unexpectedly
//           await clearSecureStorage();
//           console.log("Storage cleared for user: MohamedAbbas004");
//         }
//       } catch (error) {
//         console.error("Storage check error:", error);
//       }
//     };

//     checkAndClearStorage();
//   }, []);

//   const insets = useSafeAreaInsets();
//   const { isSignedIn } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const [authState, setAuthState] = useState<AuthState>({
//     isLoading: false,
//     error: null,
//     isInitializing: true,
//   });

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const [isAuth, isGuest] = await Promise.all([
//           SecureStore.getItemAsync("isAuthenticated"),
//           SecureStore.getItemAsync("isGuestMode"),
//         ]);

//         if (isAuth === "true" && isSignedIn) {
//           router.replace("/(root)/(tabs)");
//         } else if (isGuest === "true") {
//           router.replace("/(root)/(tabs)");
//         }
//       } catch (error) {
//         console.error("Auth initialization error:", error);
//       } finally {
//         // Add a small delay to prevent flash
//         setTimeout(() => {
//           setAuthState((prev) => ({ ...prev, isInitializing: false }));
//         }, 500);
//       }
//     };

//     initializeAuth();
//   }, [isSignedIn]);

//   const handleSignIn = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

//       const { createdSessionId, setActive } = await startOAuthFlow();

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         await SecureStore.setItemAsync("isAuthenticated", "true");
//         await SecureStore.setItemAsync("lastLogin", new Date().toISOString());
//         await SecureStore.deleteItemAsync("isGuestMode");

//         Toast.show({
//           type: "success",
//           text1: "Welcome back!",
//           position: "top",
//           visibilityTime: 2000,
//         });

//         router.replace("/(root)/(tabs)");
//       }
//     } catch (err) {
//       console.error("Sign-in error:", err);
//       setAuthState((prev) => ({
//         ...prev,
//         error: "Sign-in failed. Please try again.",
//       }));
//       Toast.show({
//         type: "error",
//         text1: "Sign-in failed",
//         text2: "Please try again",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   const handleContinueAsGuest = useCallback(async () => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true }));

//       await Promise.all([
//         SecureStore.setItemAsync("isGuestMode", "true"),
//         SecureStore.setItemAsync("guestLoginTime", new Date().toISOString()),
//         SecureStore.deleteItemAsync("isAuthenticated"),
//       ]);

//       Toast.show({
//         type: "info",
//         text1: "Continuing as guest",
//         position: "top",
//         visibilityTime: 2000,
//       });

//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Guest mode error:", error);
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Failed to continue as guest",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   if (authState.isInitializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />

//       <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Ionicons name="leaf" size={48} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.duration(400).delay(200)}
//           style={styles.title}
//         >
//           Welcome
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.duration(400).delay(300)}
//           style={styles.subtitle}
//         >
//           Start your shopping journey
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInDown.duration(400).delay(400)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[
//             styles.googleButton,
//             authState.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignIn}
//           disabled={authState.isLoading}
//           activeOpacity={0.8}
//         >
//           {authState.isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image source={GoogleIcon} style={styles.googleIcon} />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           disabled={authState.isLoading}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={18} color="#6B7280" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.duration(400).delay(500)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Terms")}
//           >
//             Terms
//           </Text>{" "}
//           and{" "}
//           <Text
//             style={styles.link}
//             onPress={() => router.push("/(root)/(tabs)/(more)/Privacy")}
//           >
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>

//       <Toast />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//     paddingHorizontal: 24,
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ECFDF5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#047857",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 8,
//     textAlign: "center",
//     fontFamily: "Cairo-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#6B7280",
//     textAlign: "center",
//     fontFamily: "Cairo",
//   },
//   buttonContainer: {
//     paddingHorizontal: 24,
//     gap: 16,
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.05,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//   },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#6B7280",
//     fontWeight: "500",
//     fontFamily: "Cairo",
//   },
//   footer: {
//     paddingHorizontal: 24,
//     marginTop: "auto",
//   },
//   termsText: {
//     textAlign: "center",
//     color: "#6B7280",
//     fontSize: 14,
//     lineHeight: 20,
//     fontFamily: "Cairo",
//   },
//   link: {
//     color: "#10B981",
//     textDecorationLine: "underline",
//     fontFamily: "Cairo-SemiBold",
//   },
// });

// export default React.memo(SignIn);

/************************************************/

// import React, { useCallback, useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Platform,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { useOAuth } from "@clerk/clerk-expo";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   FadeInUp,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import * as SecureStore from "expo-secure-store";
// import { useUserContext } from "../../contexts/UserContext";

// WebBrowser.maybeCompleteAuthSession();

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const THEME_COLOR = "#10B981";

// interface AuthState {
//   isLoading: boolean;
//   error: string | null;
//   isInitializing: boolean;
//   success: boolean;
// }

// export default function SignIn() {
//   const insets = useSafeAreaInsets();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { setGuestMode, userData, isInitialized } = useUserContext();
//   const [authState, setAuthState] = useState<AuthState>({
//     isLoading: false,
//     error: null,
//     isInitializing: true,
//     success: false,
//   });

//   useEffect(() => {
//     const initialize = async () => {
//       await WebBrowser.warmUpAsync();
//       if (isInitialized && userData) {
//         router.replace("/(root)/(tabs)");
//       }
//       setAuthState((prev) => ({ ...prev, isInitializing: false }));
//     };
//     initialize();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, [isInitialized, userData]);

//   const handleSignIn = useCallback(async () => {
//     setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         await SecureStore.setItemAsync(STORAGE_KEYS.IS_AUTHENTICATED, "true");
//         await SecureStore.deleteItemAsync(STORAGE_KEYS.IS_GUEST_MODE);
//         setAuthState((prev) => ({ ...prev, success: true }));
//         Toast.show({
//           type: "success",
//           text1: "Signed in successfully",
//           position: "top",
//           visibilityTime: 2000,
//         });
//         setTimeout(() => router.replace("/(root)/(tabs)"), 1500);
//       }
//     } catch (error) {
//       setAuthState((prev) => ({ ...prev, error: "Sign-in failed" }));
//       Toast.show({
//         type: "error",
//         text1: "Sign-in Failed",
//         text2: "Please try again",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   const handleContinueAsGuest = useCallback(async () => {
//     setAuthState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       await setGuestMode(true);
//       Toast.show({
//         type: "info",
//         text1: "Continuing as guest",
//         position: "top",
//         visibilityTime: 2000,
//       });
//     } catch (error) {
//       setAuthState((prev) => ({ ...prev, error: "Guest mode failed" }));
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Failed to continue as guest",
//         position: "top",
//       });
//     } finally {
//       setAuthState((prev) => ({ ...prev, isLoading: false }));
//     }
//   }, [setGuestMode]);

//   if (authState.isInitializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   if (authState.success) {
//     return (
//       <View style={styles.successContainer}>
//         <Animated.View
//           entering={FadeIn.duration(500)}
//           style={styles.successIcon}
//         >
//           <Ionicons name="checkmark-circle" size={80} color={THEME_COLOR} />
//         </Animated.View>
//         <Text style={styles.successText}>Signed In Successfully</Text>
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       <StatusBar style="dark" />
//       <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Ionicons name="leaf" size={48} color={THEME_COLOR} />
//         </View>
//         <Animated.Text
//           entering={FadeInDown.delay(200).duration(400)}
//           style={styles.title}
//         >
//           Welcome
//         </Animated.Text>
//         <Animated.Text
//           entering={FadeInDown.delay(300).duration(400)}
//           style={styles.subtitle}
//         >
//           Sign in to start shopping
//         </Animated.Text>
//       </Animated.View>

//       <Animated.View
//         entering={FadeInUp.delay(400).duration(400)}
//         style={styles.buttonContainer}
//       >
//         <TouchableOpacity
//           style={[
//             styles.googleButton,
//             authState.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignIn}
//           disabled={authState.isLoading}
//           activeOpacity={0.8}
//         >
//           {authState.isLoading ? (
//             <ActivityIndicator color={THEME_COLOR} />
//           ) : (
//             <>
//               <Image
//                 source={require("../../../assets/Icons/google-icon.png")}
//                 style={styles.googleIcon}
//               />
//               <Text style={styles.googleButtonText}>Continue with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {authState.error && (
//           <Animated.Text
//             entering={FadeInUp.duration(300)}
//             style={styles.errorText}
//           >
//             {authState.error}
//           </Animated.Text>
//         )}

//         <TouchableOpacity
//           style={styles.guestButton}
//           onPress={handleContinueAsGuest}
//           disabled={authState.isLoading}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.guestButtonText}>Continue as Guest</Text>
//           <Ionicons name="arrow-forward" size={18} color="#6B7280" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         entering={FadeIn.delay(500).duration(400)}
//         style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
//       >
//         <Text style={styles.termsText}>
//           By continuing, you agree to our{" "}
//           <Text style={styles.link} onPress={() => router.push("/terms")}>
//             Terms
//           </Text>{" "}
//           and{" "}
//           <Text style={styles.link} onPress={() => router.push("/privacy")}>
//             Privacy Policy
//           </Text>
//         </Text>
//       </Animated.View>

//       <Toast />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   successContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   successIcon: { marginBottom: 20 },
//   successText: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#111827",
//     fontFamily: "Cairo-SemiBold",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.1,
//     paddingHorizontal: 24,
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ECFDF5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#047857",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: { elevation: 4 },
//     }),
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 8,
//     textAlign: "center",
//     fontFamily: "Cairo-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#6B7280",
//     textAlign: "center",
//     fontFamily: "Cairo",
//   },
//   buttonContainer: {
//     paddingHorizontal: 24,
//     gap: 16,
//     marginTop: SCREEN_HEIGHT * 0.1,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.05,
//         shadowRadius: 4,
//       },
//       android: { elevation: 2 },
//     }),
//   },
//   buttonDisabled: { opacity: 0.7 },
//   googleIcon: { width: 20, height: 20, marginRight: 12 },
//   googleButtonText: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   guestButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//   },
//   guestButtonText: {
//     fontSize: 16,
//     color: "#6B7280",
//     fontWeight: "500",
//     fontFamily: "Cairo",
//   },
//   footer: { paddingHorizontal: 24, marginTop: "auto" },
//   termsText: {
//     textAlign: "center",
//     color: "#6B7280",
//     fontSize: 14,
//     lineHeight: 20,
//     fontFamily: "Cairo",
//   },
//   link: {
//     color: "#10B981",
//     textDecorationLine: "underline",
//     fontFamily: "Cairo-SemiBold",
//   },
//   errorText: {
//     color: "#EF4444",
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 8,
//     fontFamily: "Cairo",
//   },
// });

/************************************** */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useOAuth } from "@clerk/clerk-expo";
import { useUserContext } from "../../contexts/UserContext";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setGuestMode } = useUserContext();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("OAuth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestMode = async () => {
    try {
      setIsLoading(true);
      await setGuestMode(true);
    } catch (error) {
      console.error("Guest mode error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000)}
          style={styles.logoContainer}
        >
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000)}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Sign in to access all features and sync your data
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(600).duration(1000)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={onSignInWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.guestButton]}
            onPress={handleGuestMode}
            disabled={isLoading}
          >
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text style={[styles.buttonText, styles.guestButtonText]}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButton: {
    backgroundColor: "#4285F4",
  },
  guestButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  guestButtonText: {
    color: "#333",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default SignInScreen;
