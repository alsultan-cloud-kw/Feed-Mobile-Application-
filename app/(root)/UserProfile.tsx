// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";
// import { saveUserToStrapi } from "../servicies/strapi";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// interface UserData {
//   username: string;
//   email: string;
//   imageUrl: string;
// }

// export default function SignInScreen() {
//   const { signIn, isLoaded: isClerkLoaded } = useOAuth();
//   const { isSignedIn, user, isLoaded: isUserLoaded } = useUser();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const showErrorToast = (message: string) => {
//     Toast.show({
//       type: "error",
//       text1: "Sign In Error",
//       text2: message,
//       position: "bottom",
//       visibilityTime: 4000,
//     });
//   };

//   const saveUserData = async () => {
//     if (!user) return;

//     const userData: UserData = {
//       username: user.fullName || "",
//       email: user.primaryEmailAddress?.emailAddress || "",
//       imageUrl: user.imageUrl || "",
//     };

//     try {
//       await saveUserToStrapi(userData);
//     } catch (error) {
//       console.error("Failed to save user data to Strapi:", error);
//       showErrorToast("Failed to save user data. Please try again.");
//       throw error;
//     }
//   };

//   const onGoogleSignIn = React.useCallback(async () => {
//     if (!isClerkLoaded) {
//       showErrorToast("Authentication service is not ready. Please try again.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Specify the correct strategy and redirect URL based on platform
//       const redirectUrl = Platform.select({
//         web: process.env.EXPO_PUBLIC_CLERK_REDIRECT_URL,
//         default: "your-app-scheme://oauth-native-callback",
//       });

//       const { createdSessionId, signIn: signInAttempt } = await signIn.create({
//         strategy: "oauth_google",
//         redirectUrl,
//         redirectUrlComplete: redirectUrl,
//       });

//       if (createdSessionId) {
//         await saveUserData();
//         router.push("/(root)/UserProfile");
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//       showErrorToast("Failed to sign in with Google. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isClerkLoaded, signIn, user]);

//   if (!isClerkLoaded || !isUserLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#E53E3E" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="dark" />
//       {isSignedIn ? (
//         <View style={styles.content}>
//           <View style={styles.profileContainer}>
//             <Image
//               source={{ uri: user?.imageUrl }}
//               style={styles.profileImage}
//               defaultSource={require("../../assets/default-avatar.png")}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.welcomeText}>Welcome back,</Text>
//               <Text style={styles.nameText}>{user?.fullName}</Text>
//               <Text style={styles.emailText}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles.continueButton}
//             onPress={() => router.push("/(root)/UserProfile")}
//           >
//             <Text style={styles.continueButtonText}>Continue to Profile</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.content}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Welcome to Our Store</Text>
//             <Text style={styles.subtitle}>
//               Sign in to unlock exclusive benefits:
//             </Text>
//             <View style={styles.benefitsList}>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons
//                   name="package-variant"
//                   size={24}
//                   color="#E53E3E"
//                 />
//                 <Text style={styles.benefitText}>
//                   Track your orders in real-time
//                 </Text>
//               </View>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons
//                   name="history"
//                   size={24}
//                   color="#E53E3E"
//                 />
//                 <Text style={styles.benefitText}>Access order history</Text>
//               </View>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons name="bell" size={24} color="#E53E3E" />
//                 <Text style={styles.benefitText}>
//                   Get exclusive offers and updates
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity
//               style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//               onPress={onGoogleSignIn}
//               disabled={isLoading}
//             >
//               <View style={styles.googleButtonContent}>
//                 <MaterialCommunityIcons
//                   name="google"
//                   size={24}
//                   color="white"
//                   style={styles.googleIcon}
//                 />
//                 <Text style={styles.buttonText}>
//                   {isLoading ? "Signing in..." : "Continue with Google"}
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.skipButton}
//               onPress={() => router.push("/(root)/(tabs)")}
//             >
//               <Text style={styles.skipButtonText}>Continue as guest</Text>
//               <Text style={styles.skipDescription}>
//                 Some features will be limited
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.termsText}>
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </Text>
//         </View>
//       )}
//       <Toast />
//     </SafeAreaView>
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
//   content: {
//     flex: 1,
//     justifyContent: "space-between",
//     padding: 24,
//   },
//   headerContainer: {
//     marginTop: 40,
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#111827",
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//     color: "#4B5563",
//     marginBottom: 24,
//   },
//   benefitsList: {
//     width: "100%",
//     marginTop: 20,
//     gap: 16,
//   },
//   benefitItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 8,
//   },
//   benefitText: {
//     fontSize: 16,
//     color: "#4B5563",
//     flex: 1,
//   },
//   buttonsContainer: {
//     width: "100%",
//     gap: 16,
//     marginTop: 32,
//   },
//   googleButton: {
//     backgroundColor: "#4285F4",
//     paddingVertical: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   googleButtonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   googleIcon: {
//     marginRight: 12,
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   skipButton: {
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   skipButtonText: {
//     color: "#6B7280",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   skipDescription: {
//     color: "#9CA3AF",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   termsText: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textAlign: "center",
//     marginTop: 24,
//     paddingHorizontal: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginTop: 60,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 24,
//   },
//   profileInfo: {
//     alignItems: "center",
//   },
//   welcomeText: {
//     fontSize: 20,
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   emailText: {
//     fontSize: 16,
//     color: "#6B7280",
//   },
//   continueButton: {
//     backgroundColor: "#E53E3E",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 32,
//   },
//   continueButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

/************************************************************** */

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";
// import { saveUserToStrapi } from "../servicies/strapi";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// // Ensure environment variables are set
// if (!process.env.EXPO_PUBLIC_CLERK_REDIRECT_URL) {
//   throw new Error(
//     "Missing EXPO_PUBLIC_CLERK_REDIRECT_URL in environment variables"
//   );
// }

// interface UserData {
//   username: string;
//   email: string;
//   imageUrl: string;
// }

// export default function SignInScreen() {
//   const { startOAuthFlow, isLoaded: isClerkLoaded } = useOAuth({
//     strategy: "oauth_google",
//   });
//   const { isSignedIn, user, isLoaded: isUserLoaded } = useUser();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Check if Clerk is loaded
//     if (!isClerkLoaded) {
//       showErrorToast("Clerk service is not ready. Please try again later.");
//     }
//   }, [isClerkLoaded]);

//   const showErrorToast = (message: string) => {
//     Toast.show({
//       type: "error",
//       text1: "Sign In Error",
//       text2: message,
//       position: "bottom",
//       visibilityTime: 4000,
//     });
//   };

//   const saveUserData = async () => {
//     if (!user) return;

//     const userData: UserData = {
//       username: user.fullName || "",
//       email: user.primaryEmailAddress?.emailAddress || "",
//       imageUrl: user.imageUrl || "",
//     };

//     try {
//       await saveUserToStrapi(userData);
//     } catch (error) {
//       console.error("Failed to save user data to Strapi:", error);
//       showErrorToast("Failed to save user data. Please try again.");
//       throw error;
//     }
//   };

//   const onGoogleSignIn = React.useCallback(async () => {
//     if (!isClerkLoaded) {
//       showErrorToast("Authentication service is not ready. Please try again.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Specify the correct strategy and redirect URL based on platform
//       const redirectUrl = Platform.select({
//         web: process.env.EXPO_PUBLIC_CLERK_REDIRECT_URL,
//         default: "your-app-scheme://oauth-native-callback",
//       });

//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl,
//       });

//       if (createdSessionId) {
//         console.log("Session created, setting active session...");
//         await setActive({ session: createdSessionId });
//         await saveUserData();
//         console.log("User data saved, routing to UserProfile...");
//         router.push("/(root)/UserProfile");
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//       showErrorToast("Failed to sign in with Google. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isClerkLoaded, startOAuthFlow, user]);

//   if (!isClerkLoaded || !isUserLoaded || isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#E53E3E" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="dark" />
//       {isSignedIn ? (
//         <View style={styles.content}>
//           <View style={styles.profileContainer}>
//             <Image
//               source={{ uri: user?.imageUrl }}
//               style={styles.profileImage}
//               defaultSource={require("../../assets/default-avatar.png")}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.welcomeText}>Welcome back,</Text>
//               <Text style={styles.nameText}>{user?.fullName}</Text>
//               <Text style={styles.emailText}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles.continueButton}
//             onPress={() => router.push("/(root)/UserProfile")}
//           >
//             <Text style={styles.continueButtonText}>Continue to Profile</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.content}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Welcome to Our Store</Text>
//             <Text style={styles.subtitle}>
//               Sign in to unlock exclusive benefits:
//             </Text>
//             <View style={styles.benefitsList}>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons
//                   name="package-variant"
//                   size={24}
//                   color="#E53E3E"
//                 />
//                 <Text style={styles.benefitText}>
//                   Track your orders in real-time
//                 </Text>
//               </View>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons
//                   name="history"
//                   size={24}
//                   color="#E53E3E"
//                 />
//                 <Text style={styles.benefitText}>Access order history</Text>
//               </View>
//               <View style={styles.benefitItem}>
//                 <MaterialCommunityIcons name="bell" size={24} color="#E53E3E" />
//                 <Text style={styles.benefitText}>
//                   Get exclusive offers and updates
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity
//               style={[styles.googleButton, isLoading && styles.buttonDisabled]}
//               onPress={onGoogleSignIn}
//               disabled={isLoading}
//             >
//               <View style={styles.googleButtonContent}>
//                 <MaterialCommunityIcons
//                   name="google"
//                   size={24}
//                   color="white"
//                   style={styles.googleIcon}
//                 />
//                 <Text style={styles.buttonText}>
//                   {isLoading ? "Signing in..." : "Continue with Google"}
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.skipButton}
//               onPress={() => router.push("/(root)/(tabs)")}
//             >
//               <Text style={styles.skipButtonText}>Continue as guest</Text>
//               <Text style={styles.skipDescription}>
//                 Some features will be limited
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.termsText}>
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </Text>
//         </View>
//       )}
//       <Toast />
//     </SafeAreaView>
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
//   content: {
//     flex: 1,
//     justifyContent: "space-between",
//     padding: 24,
//   },
//   headerContainer: {
//     marginTop: 40,
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#111827",
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//     color: "#4B5563",
//     marginBottom: 24,
//   },
//   benefitsList: {
//     width: "100%",
//     marginTop: 20,
//     gap: 16,
//   },
//   benefitItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 8,
//   },
//   benefitText: {
//     fontSize: 16,
//     color: "#4B5563",
//     flex: 1,
//   },
//   buttonsContainer: {
//     width: "100%",
//     gap: 16,
//     marginTop: 32,
//   },
//   googleButton: {
//     backgroundColor: "#4285F4",
//     paddingVertical: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   googleButtonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   googleIcon: {
//     marginRight: 12,
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   skipButton: {
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   skipButtonText: {
//     color: "#6B7280",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   skipDescription: {
//     color: "#9CA3AF",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   termsText: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textAlign: "center",
//     marginTop: 24,
//     paddingHorizontal: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginTop: 60,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 24,
//   },
//   profileInfo: {
//     alignItems: "center",
//   },
//   welcomeText: {
//     fontSize: 20,
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   emailText: {
//     fontSize: 16,
//     color: "#6B7280",
//   },
//   continueButton: {
//     backgroundColor: "#E53E3E",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 32,
//   },
//   continueButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

/*********************************************** */
// import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// import { Link } from "expo-router";
// import { Text, View } from "react-native";

// export default function UserProfile() {
//   const { user } = useUser();

//   return (
//     <View>
//       <SignedIn>
//         <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//       </SignedIn>
//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in">
//           <Text>Sign in</Text>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

/********************************************************* */

// // app/(root)/UserProfile.tsx
// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     if (!user?.primaryEmailAddress?.verification.status) {
//       return false;
//     }
//     return user.primaryEmailAddress.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <TouchableOpacity
//           onPress={() => setModalVisible(true)}
//           style={styles.profileButton}
//         >
//           <Image
//             source={{ uri: user?.imageUrl || "https://via.placeholder.com/40" }}
//             style={styles.profileImage}
//           />
//           <View style={styles.profileInfo}>
//             <Text style={styles.username}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.email} numberOfLines={1}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable
//             style={styles.modalOverlay}
//             onPress={() => setModalVisible(false)}
//           >
//             <Pressable
//               style={styles.modalView}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Profile</Text>
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "User"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>

//                 {!getVerificationStatus() && (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 )}

//                 {getVerificationStatus() && (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                   <TouchableOpacity style={styles.settingsButton}>
//                     <Ionicons
//                       name="settings-outline"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.settingsButtonText}>Settings</Text>
//                   </TouchableOpacity>
//                 </Link>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Pressable>
//           </Pressable>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   profileInfo: {
//     marginLeft: 12,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   email: {
//     fontSize: 14,
//     color: "#666",
//     maxWidth: 200,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 24,
//   },

//   settingsButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//     width: "100%",
//     marginBottom: 12,
//   },
//   settingsButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E53935",
//     padding: 12,
//     borderRadius: 8,
//     width: "100%",
//   },
//   signOutButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   signInButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E8F5E9",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     marginBottom: 16,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
// });

/**************************************************** */

// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     if (!user?.primaryEmailAddress?.verification.status) {
//       return false;
//     }
//     return user.primaryEmailAddress.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <TouchableOpacity
//           onPress={() => setModalVisible(true)}
//           style={styles.profileButton}
//         >
//           <Image
//             source={{ uri: user?.imageUrl || "https://via.placeholder.com/40" }}
//             style={styles.profileImage}
//           />
//           <View style={styles.profileInfo}>
//             <Text style={styles.username}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.email} numberOfLines={1}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable
//             style={styles.modalOverlay}
//             onPress={() => setModalVisible(false)}
//           >
//             <Pressable
//               style={styles.modalView}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Profile</Text>
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "User"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>

//                 {!getVerificationStatus() && (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 )}

//                 {getVerificationStatus() && (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                   <TouchableOpacity style={styles.settingsButton}>
//                     <Ionicons
//                       name="settings-outline"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.settingsButtonText}>Settings</Text>
//                   </TouchableOpacity>
//                 </Link>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Pressable>
//           </Pressable>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   profileInfo: {
//     marginLeft: 12,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   email: {
//     fontSize: 14,
//     color: "#666",
//     maxWidth: 200,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 24,
//   },
//   settingsButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//     width: "100%",
//     marginBottom: 12,
//   },
//   settingsButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E53935",
//     padding: 12,
//     borderRadius: 8,
//     width: "100%",
//   },
//   signOutButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   signInButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E8F5E9",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     marginBottom: 16,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
// });

/******************************************* */

// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     if (!user?.primaryEmailAddress?.verification.status) {
//       return false;
//     }
//     return user.primaryEmailAddress.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <TouchableOpacity
//           onPress={() => setModalVisible(true)}
//           style={styles.profileButton}
//         >
//           <Image
//             source={{ uri: user?.imageUrl || "https://via.placeholder.com/40" }}
//             style={styles.profileImage}
//           />
//           <View style={styles.profileInfo}>
//             <Text style={styles.username}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.email} numberOfLines={1}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable
//             style={styles.modalOverlay}
//             onPress={() => setModalVisible(false)}
//           >
//             <Pressable
//               style={styles.modalView}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Profile</Text>
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "User"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>

//                 {!getVerificationStatus() && (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 )}

//                 {getVerificationStatus() && (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                   <TouchableOpacity style={styles.settingsButton}>
//                     <Ionicons
//                       name="settings-outline"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.settingsButtonText}>Settings</Text>
//                   </TouchableOpacity>
//                 </Link>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Pressable>
//           </Pressable>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   profileInfo: {
//     marginLeft: 12,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   email: {
//     fontSize: 14,
//     color: "#666",
//     maxWidth: 200,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 24,
//   },
//   settingsButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//     width: "100%",
//     marginBottom: 12,
//   },
//   settingsButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E53935",
//     padding: 12,
//     borderRadius: 8,
//     width: "100%",
//   },
//   signOutButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   signInButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E8F5E9",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     marginBottom: 16,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
// });

/********************************************* */

// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// const SCREEN_HEIGHT = Dimensions.get("window").height;

// export default function UserProfile({
//   visible,
//   onClose,
// }: {
//   visible: any;
//   onClose: () => void;
// }) {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const slideAnim = useState(new Animated.Value(SCREEN_HEIGHT))[0];

//   useEffect(() => {
//     if (visible) {
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();
//     } else {
//       Animated.timing(slideAnim, {
//         toValue: SCREEN_HEIGHT,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [visible]);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       onClose();
//       router.push("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignIn = () => {
//     onClose();
//     router.push("/(root)/(auth)/sign-in");
//   };

//   const renderContent = () => (
//     <Animated.View
//       style={[
//         styles.modalContent,
//         {
//           transform: [{ translateY: slideAnim }],
//         },
//       ]}
//     >
//       <View style={styles.contentContainer}>
//         <View style={styles.handle} />

//         {user ? (
//           <>
//             <View style={styles.header}>
//               <Image
//                 source={{
//                   uri: user?.imageUrl || "https://via.placeholder.com/80",
//                 }}
//                 style={styles.profileImage}
//               />
//               <Text style={styles.username}>
//                 {user?.username || user?.firstName || "User"}
//               </Text>
//               <Text style={styles.email}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>

//             <View style={styles.actionButtons}>
//               <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                 <TouchableOpacity style={styles.actionButton} onPress={onClose}>
//                   <Ionicons name="settings-outline" size={24} color="#4CAF50" />
//                   <Text style={styles.actionButtonText}>Settings</Text>
//                 </TouchableOpacity>
//               </Link>

//               <TouchableOpacity
//                 style={[styles.actionButton, styles.signOutButton]}
//                 onPress={handleSignOut}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <>
//                     <Ionicons name="log-out-outline" size={24} color="#fff" />
//                     <Text style={styles.signOutButtonText}>Sign Out</Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           <View style={styles.signInContainer}>
//             <Text style={styles.signInPrompt}>
//               Sign in to access your account
//             </Text>
//             <TouchableOpacity
//               style={styles.signInButton}
//               onPress={handleSignIn}
//             >
//               <Ionicons name="log-in-outline" size={24} color="#fff" />
//               <Text style={styles.signInButtonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </Animated.View>
//   );

//   if (!visible) return null;

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="none"
//       onRequestClose={onClose}
//     >
//       <Pressable style={styles.overlay} onPress={onClose}>
//         {renderContent()}
//       </Pressable>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     height: SCREEN_HEIGHT * 0.7,
//     backgroundColor: "transparent",
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   handle: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#DDD",
//     borderRadius: 2,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//     backgroundColor: "#f5f5f5",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   email: {
//     fontSize: 16,
//     color: "#666",
//   },
//   actionButtons: {
//     gap: 12,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//     borderRadius: 12,
//     gap: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   actionButtonText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "600",
//   },
//   signOutButton: {
//     backgroundColor: "#E53935",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   signInContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   signInPrompt: {
//     fontSize: 18,
//     color: "#333",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     gap: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   signInButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

/************************************* */

// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Alert,
//   Pressable,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   SlideInUp,
//   withSpring,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { saveUserToStrapi } from "../Utils/api.auth";

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// const getCurrentDateTime = () => {
//   return formatUTCDateTime(new Date());
// };

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentLogin] = useState(getCurrentDateTime());

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: withSpring(modalVisible ? 0 : 400, {
//           damping: 20,
//           stiffness: 90,
//         }),
//       },
//     ],
//   }));

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         await saveUserToStrapi({
//           Username: user?.username || user?.firstName || "MohamedAbbas004",
//           Email: user.primaryEmailAddress.emailAddress,
//           LastLogin: currentLogin,
//         });
//       }
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     return user?.primaryEmailAddress?.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <Animated.View entering={FadeIn.duration(300)}>
//           <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={styles.profileButton}
//           >
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/40",
//               }}
//               style={styles.profileImage}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.username}>
//                 {user?.username || user?.firstName || "MohamedAbbas004"}
//               </Text>
//               <Text style={styles.email} numberOfLines={1}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>
//             <View style={styles.loginInfo}>
//               <Text style={styles.loginTime}>{currentLogin}</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>

//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Animated.View style={[styles.backdrop, backdropStyle]}>
//               <Pressable
//                 style={{ flex: 1 }}
//                 onPress={() => setModalVisible(false)}
//               />
//             </Animated.View>

//             <Animated.View
//               style={[
//                 styles.modalView,
//                 modalStyle,
//                 { paddingBottom: insets.bottom + 20 },
//               ]}
//             >
//               <View style={styles.modalHeader}>
//                 <View style={styles.handleBar} />
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "MohamedAbbas004"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>
//                 <Text style={styles.lastLogin}>Last Login: {currentLogin}</Text>

//                 {!getVerificationStatus() ? (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <View style={styles.menuSection}>
//                   <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="settings-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Settings</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>

//                   <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="receipt-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Orders</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </View>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   loginInfo: {
//     alignItems: "flex-end",
//   },
//   loginTime: {
//     fontSize: 12,
//     color: "#718096",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//     marginBottom: 20,
//   },
//   closeButton: {
//     position: "absolute",
//     right: 0,
//     top: -10,
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 16,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0FFF4",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/***************************************** */

// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Alert,
//   Pressable,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   SlideInUp,
//   useAnimatedStyle,
//   withSpring,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { saveUserToStrapi } from "../Utils/api.auth";

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// const getCurrentDateTime = () => {
//   return formatUTCDateTime(new Date());
// };

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentLogin] = useState(getCurrentDateTime());

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: withSpring(modalVisible ? 0 : 400, {
//           damping: 20,
//           stiffness: 90,
//         }),
//       },
//     ],
//   }));

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         await saveUserToStrapi({
//           Username: user?.username || user?.firstName || "User",
//           Email: user.primaryEmailAddress.emailAddress,
//           LastLogin: currentLogin,
//         });
//       }
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     return user?.primaryEmailAddress?.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <Animated.View entering={FadeIn.duration(300)}>
//           <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={styles.profileButton}
//           >
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/40",
//               }}
//               style={styles.profileImage}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.username}>
//                 {user?.username || user?.firstName || "User"}
//               </Text>
//               <Text style={styles.email} numberOfLines={1}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>
//             <View style={styles.loginInfo}>
//               <Text style={styles.loginTime}>{currentLogin}</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>

//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Animated.View style={[styles.backdrop, backdropStyle]}>
//               <Pressable
//                 style={{ flex: 1 }}
//                 onPress={() => setModalVisible(false)}
//               />
//             </Animated.View>

//             <Animated.View
//               style={[
//                 styles.modalView,
//                 modalStyle,
//                 { paddingBottom: insets.bottom + 20 },
//               ]}
//             >
//               <View style={styles.modalHeader}>
//                 <View style={styles.handleBar} />
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "User"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>
//                 <Text style={styles.lastLogin}>Last Login: {currentLogin}</Text>

//                 {!getVerificationStatus() ? (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <View style={styles.menuSection}>
//                   <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="settings-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Settings</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>

//                   <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="receipt-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Orders</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </View>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   loginInfo: {
//     alignItems: "flex-end",
//   },
//   loginTime: {
//     fontSize: 12,
//     color: "#718096",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//     marginBottom: 20,
//   },
//   closeButton: {
//     position: "absolute",
//     right: 0,
//     top: -10,
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 16,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0FFF4",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/****************************************** */

// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Alert,
//   Pressable,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   SlideInUp,
//   useAnimatedStyle,
//   withSpring,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { saveUserToStrapi } from "../Utils/api.auth";

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// const getCurrentDateTime = () => {
//   return formatUTCDateTime(new Date());
// };

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentLogin] = useState(getCurrentDateTime());

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: withSpring(modalVisible ? 0 : 400, {
//           damping: 20,
//           stiffness: 90,
//         }),
//       },
//     ],
//   }));

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         await saveUserToStrapi({
//           Username: user?.username || user?.firstName || "User",
//           Email: user.primaryEmailAddress.emailAddress,
//           LastLogin: currentLogin,
//         });
//       }
//       await signOut();
//       setModalVisible(false);
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyEmail = async () => {
//     try {
//       if (user?.primaryEmailAddress) {
//         await user.primaryEmailAddress.prepareVerification({
//           strategy: "email_code",
//         });
//         setModalVisible(false);
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       console.error("Error preparing verification:", error);
//       Alert.alert(
//         "Error",
//         "Failed to send verification code. Please try again."
//       );
//     }
//   };

//   const getVerificationStatus = () => {
//     return user?.primaryEmailAddress?.verification.status === "verified";
//   };

//   return (
//     <View>
//       <SignedIn>
//         <Animated.View entering={FadeIn.duration(300)}>
//           <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={styles.profileButton}
//           >
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/40",
//               }}
//               style={styles.profileImage}
//             />
//             <View style={styles.profileInfo}>
//               <Text style={styles.username}>
//                 {user?.username || user?.firstName || "User"}
//               </Text>
//               <Text style={styles.email} numberOfLines={1}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>
//             <View style={styles.loginInfo}>
//               <Text style={styles.loginTime}>{currentLogin}</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>

//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <Animated.View style={[styles.backdrop, backdropStyle]}>
//               <Pressable
//                 style={{ flex: 1 }}
//                 onPress={() => setModalVisible(false)}
//               />
//             </Animated.View>

//             <Animated.View
//               style={[
//                 styles.modalView,
//                 modalStyle,
//                 { paddingBottom: insets.bottom + 20 },
//               ]}
//             >
//               <View style={styles.modalHeader}>
//                 <View style={styles.handleBar} />
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Ionicons name="close" size={24} color="#666" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.modalContent}>
//                 <Image
//                   source={{
//                     uri: user?.imageUrl || "https://via.placeholder.com/80",
//                   }}
//                   style={styles.modalProfileImage}
//                 />
//                 <Text style={styles.modalUsername}>
//                   {user?.username || user?.firstName || "User"}
//                 </Text>
//                 <Text style={styles.modalEmail}>
//                   {user?.primaryEmailAddress?.emailAddress}
//                 </Text>
//                 <Text style={styles.lastLogin}>Last Login: {currentLogin}</Text>

//                 {!getVerificationStatus() ? (
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyEmail}
//                   >
//                     <Ionicons
//                       name="mail-unread-outline"
//                       size={20}
//                       color="#fff"
//                     />
//                     <Text style={styles.verifyButtonText}>Verify Email</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <View style={styles.verifiedBadge}>
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={20}
//                       color="#4CAF50"
//                     />
//                     <Text style={styles.verifiedText}>Email Verified</Text>
//                   </View>
//                 )}

//                 <View style={styles.menuSection}>
//                   <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="settings-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Settings</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>

//                   <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                     <TouchableOpacity style={styles.menuButton}>
//                       <Ionicons
//                         name="receipt-outline"
//                         size={24}
//                         color="#4A5568"
//                       />
//                       <Text style={styles.menuButtonText}>Orders</Text>
//                       <Ionicons
//                         name="chevron-forward"
//                         size={20}
//                         color="#A0AEC0"
//                       />
//                     </TouchableOpacity>
//                   </Link>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.signOutButton}
//                   onPress={handleSignOut}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <>
//                       <Ionicons name="log-out-outline" size={20} color="#fff" />
//                       <Text style={styles.signOutButtonText}>Sign Out</Text>
//                     </>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </View>
//         </Modal>
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   loginInfo: {
//     alignItems: "flex-end",
//   },
//   loginTime: {
//     fontSize: 12,
//     color: "#718096",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//     marginBottom: 20,
//   },
//   closeButton: {
//     position: "absolute",
//     right: 0,
//     top: -10,
//     padding: 8,
//   },
//   modalContent: {
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 16,
//   },
//   verifyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   verifiedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0FFF4",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   verifiedText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "500",
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/***************************************** */

// import React, { useState, useCallback } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { updateLastLogin } from "../Utils/api.auth";
// import { StatusBar } from "expo-status-bar";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// const MODAL_HEIGHT = SCREEN_HEIGHT * 0.7;

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function UserProfile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const translateY = useSharedValue(MODAL_HEIGHT);

//   const showModal = useCallback(() => {
//     setModalVisible(true);
//     translateY.value = withSpring(0, {
//       damping: 20,
//       stiffness: 90,
//     });
//   }, [translateY]);

//   const hideModal = useCallback(() => {
//     translateY.value = withTiming(
//       MODAL_HEIGHT,
//       {
//         duration: 300,
//       },
//       () => {
//         runOnJS(setModalVisible)(false);
//       }
//     );
//   }, [translateY]);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         await updateLastLogin(user.id, formatUTCDateTime());
//       }
//       await signOut();
//       hideModal();
//     } catch (error) {
//       console.error("Error signing out:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const renderUserInfo = () => (
//     <Animated.View entering={FadeIn.duration(300)}>
//       <TouchableOpacity
//         onPress={showModal}
//         style={styles.profileButton}
//         activeOpacity={0.7}
//       >
//         <Image
//           source={{
//             uri: user?.imageUrl || "https://via.placeholder.com/40",
//           }}
//           style={styles.profileImage}
//         />
//         <View style={styles.profileInfo}>
//           <Text style={styles.username} numberOfLines={1}>
//             {user?.username || user?.firstName || "User"}
//           </Text>
//           <Text style={styles.email} numberOfLines={1}>
//             {user?.primaryEmailAddress?.emailAddress}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderModal = () => (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={hideModal}
//       statusBarTranslucent
//     >
//       <StatusBar style="light" />
//       <View style={styles.modalContainer}>
//         <Animated.View style={[styles.backdrop, backdropStyle]}>
//           <Pressable style={styles.backdropPressable} onPress={hideModal} />
//         </Animated.View>

//         <Animated.View style={[styles.modalView, modalStyle]}>
//           <View style={styles.modalHeader}>
//             <View style={styles.handleBar} />
//           </View>

//           <View style={styles.modalContent}>
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/80",
//               }}
//               style={styles.modalProfileImage}
//             />
//             <Text style={styles.modalUsername}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.modalEmail}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>

//             <View style={styles.menuSection}>
//               <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                 <TouchableOpacity
//                   style={styles.menuButton}
//                   onPress={() => {
//                     hideModal();
//                   }}
//                 >
//                   <Ionicons name="settings-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Settings</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>

//               <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                 <TouchableOpacity
//                   style={styles.menuButton}
//                   onPress={() => {
//                     hideModal();
//                   }}
//                 >
//                   <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Order History</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>
//             </View>

//             <TouchableOpacity
//               style={[styles.signOutButton, isLoading && styles.disabledButton]}
//               onPress={handleSignOut}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Ionicons name="log-out-outline" size={20} color="#fff" />
//                   <Text style={styles.signOutButtonText}>Sign Out</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//       <SignedIn>
//         {renderUserInfo()}
//         {renderModal()}
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F7FAFC",
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 12,
//     marginRight: 8,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   backdropPressable: {
//     flex: 1,
//   },
//   modalView: {
//     height: MODAL_HEIGHT,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//   },
//   modalContent: {
//     flex: 1,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 24,
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//     marginTop: "auto",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/************************************** */

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Pressable,
//   Alert,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { getUserByEmail, updateLastLogin } from "../Utils/api.auth";

// interface UserProfileProps {
//   redirectToSignIn?: boolean;
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function UserProfile({
//   redirectToSignIn = true,
// }: UserProfileProps) {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [documentId, setDocumentId] = useState<string | null>(null);
//   const translateY = useSharedValue(500);

//   useEffect(() => {
//     const initializeUser = async () => {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         const id = await getUserByEmail(user.primaryEmailAddress.emailAddress);
//         setDocumentId(id);
//       }
//     };

//     initializeUser();
//   }, [user]);

//   useEffect(() => {
//     if (redirectToSignIn && !user) {
//       router.replace("/(root)/(auth)/sign-in");
//     }
//   }, [user, redirectToSignIn]);

//   const showModal = useCallback(() => {
//     setModalVisible(true);
//     translateY.value = withSpring(0, {
//       damping: 20,
//       stiffness: 90,
//     });
//   }, [translateY]);

//   const hideModal = useCallback(() => {
//     translateY.value = withTiming(
//       500,
//       {
//         duration: 300,
//       },
//       () => {
//         runOnJS(setModalVisible)(false);
//       }
//     );
//   }, [translateY]);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (documentId) {
//         const success = await updateLastLogin(documentId);
//         if (!success) {
//           console.warn("Failed to update last login time");
//         }
//       }
//       await signOut();
//       hideModal();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out properly. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const renderUserInfo = () => (
//     <Animated.View entering={FadeIn.duration(300)}>
//       <TouchableOpacity
//         onPress={showModal}
//         style={styles.profileButton}
//         activeOpacity={0.7}
//       >
//         <Image
//           source={{
//             uri: user?.imageUrl || "https://via.placeholder.com/40",
//           }}
//           style={styles.profileImage}
//         />
//         <View style={styles.profileInfo}>
//           <Text style={styles.username} numberOfLines={1}>
//             {user?.username || user?.firstName || "User"}
//           </Text>
//           <Text style={styles.email} numberOfLines={1}>
//             {user?.primaryEmailAddress?.emailAddress}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderModal = () => (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={hideModal}
//       statusBarTranslucent
//     >
//       <StatusBar style="light" />
//       <View style={styles.modalContainer}>
//         <Animated.View style={[styles.backdrop, backdropStyle]}>
//           <Pressable style={styles.backdropPressable} onPress={hideModal} />
//         </Animated.View>

//         <Animated.View style={[styles.modalView, modalStyle]}>
//           <View style={styles.modalHeader}>
//             <View style={styles.handleBar} />
//           </View>

//           <View style={styles.modalContent}>
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/80",
//               }}
//               style={styles.modalProfileImage}
//             />
//             <Text style={styles.modalUsername}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.modalEmail}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>

//             <View style={styles.menuSection}>
//               <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                 <TouchableOpacity style={styles.menuButton} onPress={hideModal}>
//                   <Ionicons name="settings-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Settings</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>

//               <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                 <TouchableOpacity style={styles.menuButton} onPress={hideModal}>
//                   <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Order History</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>
//             </View>

//             <TouchableOpacity
//               style={[styles.signOutButton, isLoading && styles.disabledButton]}
//               onPress={handleSignOut}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Ionicons name="log-out-outline" size={20} color="#fff" />
//                   <Text style={styles.signOutButtonText}>Sign Out</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );

//   if (!user && redirectToSignIn) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <SignedIn>
//         {renderUserInfo()}
//         {renderModal()}
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F7FAFC",
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 12,
//     marginRight: 8,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   backdropPressable: {
//     flex: 1,
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     minHeight: 400,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//   },
//   modalContent: {
//     padding: 20,
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 24,
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/****************************************** */

// import React, { useCallback, useState, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Pressable,
//   Alert,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { getUserByEmail, updateLastLogin } from "../Utils/api.auth";

// interface UserProfileProps {
//   redirectToSignIn?: boolean;
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function UserProfile({
//   redirectToSignIn = true,
// }: UserProfileProps) {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [documentId, setDocumentId] = useState<string | null>(null);
//   const translateY = useSharedValue(500);

//   useEffect(() => {
//     const initializeUser = async () => {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         const id = await getUserByEmail(user.primaryEmailAddress.emailAddress);
//         setDocumentId(id);
//       }
//     };

//     initializeUser();
//   }, [user]);

//   useEffect(() => {
//     if (redirectToSignIn && !user) {
//       router.replace("/(root)/(auth)/sign-in");
//     }
//   }, [user, redirectToSignIn]);

//   const showModal = useCallback(() => {
//     setModalVisible(true);
//     translateY.value = withSpring(0, {
//       damping: 20,
//       stiffness: 90,
//     });
//   }, [translateY]);

//   const hideModal = useCallback(() => {
//     translateY.value = withTiming(
//       500,
//       {
//         duration: 300,
//       },
//       () => {
//         runOnJS(setModalVisible)(false);
//       }
//     );
//   }, [translateY]);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       if (documentId) {
//         const success = await updateLastLogin(documentId);
//         if (!success) {
//           console.warn("Failed to update last login time");
//         }
//       }
//       await signOut();
//       hideModal();
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", "Failed to sign out properly. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(modalVisible ? 0.5 : 0),
//   }));

//   const renderUserInfo = () => (
//     <Animated.View entering={FadeIn.duration(300)}>
//       <TouchableOpacity
//         onPress={showModal}
//         style={styles.profileButton}
//         activeOpacity={0.7}
//       >
//         <Image
//           source={{
//             uri: user?.imageUrl || "https://via.placeholder.com/40",
//           }}
//           style={styles.profileImage}
//         />
//         <View style={styles.profileInfo}>
//           <Text style={styles.username} numberOfLines={1}>
//             {user?.username || user?.firstName || "User"}
//           </Text>
//           <Text style={styles.email} numberOfLines={1}>
//             {user?.primaryEmailAddress?.emailAddress}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderModal = () => (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={hideModal}
//       statusBarTranslucent
//     >
//       <StatusBar style="light" />
//       <View style={styles.modalContainer}>
//         <Animated.View style={[styles.backdrop, backdropStyle]}>
//           <Pressable style={styles.backdropPressable} onPress={hideModal} />
//         </Animated.View>

//         <Animated.View style={[styles.modalView, modalStyle]}>
//           <View style={styles.modalHeader}>
//             <View style={styles.handleBar} />
//           </View>

//           <View style={styles.modalContent}>
//             <Image
//               source={{
//                 uri: user?.imageUrl || "https://via.placeholder.com/80",
//               }}
//               style={styles.modalProfileImage}
//             />
//             <Text style={styles.modalUsername}>
//               {user?.username || user?.firstName || "User"}
//             </Text>
//             <Text style={styles.modalEmail}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>

//             <View style={styles.menuSection}>
//               <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                 <TouchableOpacity style={styles.menuButton} onPress={hideModal}>
//                   <Ionicons name="settings-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Settings</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>

//               <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                 <TouchableOpacity style={styles.menuButton} onPress={hideModal}>
//                   <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Order History</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>
//             </View>

//             <TouchableOpacity
//               style={[styles.signOutButton, isLoading && styles.disabledButton]}
//               onPress={handleSignOut}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Ionicons name="log-out-outline" size={20} color="#fff" />
//                   <Text style={styles.signOutButtonText}>Sign Out</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );

//   if (!user && redirectToSignIn) {
//     return (
//       <View style={styles.container}>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <SignedIn>
//         {renderUserInfo()}
//         {renderModal()}
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   profileButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     margin: 16,
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
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F7FAFC",
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 12,
//     marginRight: 8,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   backdropPressable: {
//     flex: 1,
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     minHeight: 400,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//   },
//   modalContent: {
//     padding: 20,
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 24,
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

/*************************************************** */

// import React, { useCallback, useState, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   Pressable,
// } from "react-native";
// import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
// import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { useStrapiUser } from "../contexts/UserContext";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";

// const THEME_COLOR = "#E53E3E";

// interface ProfileModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSignOut: () => Promise<void>;
//   isLoading: boolean;
//   strapiUser: any;
// }

// const ProfileModal: React.FC<ProfileModalProps> = ({
//   visible,
//   onClose,
//   onSignOut,
//   isLoading,
//   strapiUser,
// }) => {
//   const translateY = useSharedValue(500);
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     if (visible) {
//       translateY.value = withSpring(0, {
//         damping: 20,
//         stiffness: 90,
//       });
//     }
//   }, [visible]);

//   const handleClose = () => {
//     translateY.value = withTiming(
//       500,
//       {
//         duration: 300,
//       },
//       () => {
//         runOnJS(onClose)();
//       }
//     );
//   };

//   const modalStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   const backdropStyle = useAnimatedStyle(() => ({
//     opacity: withSpring(visible ? 0.5 : 0),
//   }));

//   const formatDateTime = (dateString: string): string => {
//     try {
//       return new Date(dateString).toISOString().slice(0, 19).replace("T", " ");
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   return (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={visible}
//       onRequestClose={handleClose}
//       statusBarTranslucent
//     >
//       <StatusBar style="light" />
//       <View style={styles.modalContainer}>
//         <Animated.View style={[styles.backdrop, backdropStyle]}>
//           <Pressable style={styles.backdropPressable} onPress={handleClose} />
//         </Animated.View>

//         <Animated.View style={[styles.modalView, modalStyle]}>
//           <View style={styles.modalHeader}>
//             <View style={styles.handleBar} />
//           </View>

//           <View style={styles.modalContent}>
//             <Image
//               source={{
//                 uri:
//                   strapiUser?.attributes?.ProfileIMG ||
//                   "https://via.placeholder.com/80",
//               }}
//               style={styles.modalProfileImage}
//             />
//             <Text style={styles.modalUsername}>
//               {strapiUser?.attributes?.Username || "User"}
//             </Text>
//             <Text style={styles.modalEmail}>
//               {strapiUser?.attributes?.Email || ""}
//             </Text>
//             <Text style={styles.lastLoginText}>
//               Last Login:{" "}
//               {formatDateTime(strapiUser?.attributes?.LastLogin || "")}
//             </Text>

//             <View style={styles.menuSection}>
//               <Link href="/(root)/(tabs)/(more)/(Settings)" asChild>
//                 <TouchableOpacity
//                   style={styles.menuButton}
//                   onPress={handleClose}
//                 >
//                   <Ionicons name="settings-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Settings</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>

//               <Link href="/(root)/(tabs)/(more)/(Settings)/Orders" asChild>
//                 <TouchableOpacity
//                   style={styles.menuButton}
//                   onPress={handleClose}
//                 >
//                   <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//                   <Text style={styles.menuButtonText}>Order History</Text>
//                   <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//                 </TouchableOpacity>
//               </Link>
//             </View>

//             <TouchableOpacity
//               style={[styles.signOutButton, isLoading && styles.disabledButton]}
//               onPress={onSignOut}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <Ionicons name="log-out-outline" size={20} color="#fff" />
//                   <Text style={styles.signOutButtonText}>Sign Out</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// export default function UserProfile() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const { strapiUser } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Auto-show modal if user is signed in
//   useEffect(() => {
//     if (isSignedIn && strapiUser) {
//       setModalVisible(true);
//     }
//   }, [isSignedIn, strapiUser]);

//   // Redirect if not signed in
//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace("/(root)/(auth)/sign-in");
//     }
//   }, [isSignedIn]);

//   const handleSignOut = async () => {
//     try {
//       setIsLoading(true);
//       await SecureStore.deleteItemAsync("clerk_session");
//       await SecureStore.deleteItemAsync("user_preferences");
//       await signOut();
//       setModalVisible(false);
//       Toast.show({
//         type: "success",
//         text1: "Signed out successfully",
//         position: "top",
//       });
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       Toast.show({
//         type: "error",
//         text1: "Failed to sign out",
//         position: "top",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <SignedIn>
//         <ProfileModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSignOut={handleSignOut}
//           isLoading={isLoading}
//           strapiUser={strapiUser}
//         />
//       </SignedIn>

//       <SignedOut>
//         <Link href="/(root)/(auth)/sign-in" asChild>
//           <TouchableOpacity style={styles.signInButton}>
//             <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </SignedOut>

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//   },
//   backdropPressable: {
//     flex: 1,
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     minHeight: 400,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   modalHeader: {
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 2,
//   },
//   modalContent: {
//     padding: 20,
//     alignItems: "center",
//   },
//   modalProfileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
//   },
//   modalUsername: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//     fontFamily: "Cairo-Bold",
//   },
//   modalEmail: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//     fontFamily: "Cairo",
//   },
//   lastLoginText: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 24,
//     fontFamily: "Cairo",
//   },
//   menuSection: {
//     width: "100%",
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuButtonText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#4A5568",
//     marginLeft: 12,
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: THEME_COLOR,
//     padding: 16,
//     borderRadius: 12,
//     width: "100%",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//     fontFamily: "Cairo-SemiBold",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   signInButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#4CAF50",
//   },
//   signInButtonText: {
//     color: "#4CAF50",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//     fontFamily: "Cairo-SemiBold",
//   },
// });

/**************************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Platform,
//   RefreshControl,
//   ScrollView,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";

// const THEME_COLOR = "#E53E3E";

// interface UserSessionInfo {
//   lastLogin: string;
//   username: string;
//   email: string;
//   photoUrl: string;
// }

// export default function UserProfile() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [sessionInfo, setSessionInfo] = useState<UserSessionInfo | null>(null);

//   // Check authentication and load user data
//   useEffect(() => {
//     checkAuthAndLoadData();
//   }, []);

//   const checkAuthAndLoadData = async () => {
//     try {
//       const [isAuth, isGuest] = await Promise.all([
//         SecureStore.getItemAsync("isAuthenticated"),
//         SecureStore.getItemAsync("isGuestMode"),
//       ]);

//       if (isAuth !== "true" && isGuest !== "true") {
//         router.replace("/(root)/(auth)/sign-in");
//         return;
//       }

//       if (isAuth === "true" && isSignedIn) {
//         await loadUserSessionInfo();
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       showToast("error", "Failed to load user data");
//     }
//   };

//   const loadUserSessionInfo = async () => {
//     try {
//       const [lastLogin, savedUsername] = await Promise.all([
//         SecureStore.getItemAsync("lastLogin"),
//         SecureStore.getItemAsync("username"),
//       ]);

//       if (user) {
//         setSessionInfo({
//           lastLogin: lastLogin || new Date().toISOString(),
//           username: savedUsername || user.username || "User",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           photoUrl: user.imageUrl || "",
//         });

//         // Update last login if needed
//         if (!lastLogin) {
//           await SecureStore.setItemAsync("lastLogin", new Date().toISOString());
//         }
//       }
//     } catch (error) {
//       console.error("Error loading session info:", error);
//       showToast("error", "Failed to load session information");
//     }
//   };

//   const formatDateTime = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       return date.toISOString().slice(0, 19).replace("T", " ");
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   const showToast = (type: "success" | "error" | "info", message: string) => {
//     Toast.show({
//       type,
//       text1: message,
//       position: "top",
//       visibilityTime: 3000,
//       topOffset: insets.top + 10,
//     });
//   };

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSessionInfo();
//       showToast("success", "Profile refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh profile");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       // Clear all auth-related storage
//       await Promise.all([
//         SecureStore.deleteItemAsync("isAuthenticated"),
//         SecureStore.deleteItemAsync("sessionId"),
//         SecureStore.deleteItemAsync("lastLogin"),
//         SecureStore.deleteItemAsync("username"),
//         SecureStore.deleteItemAsync("isGuestMode"),
//       ]);

//       await signOut();
//       showToast("success", "Successfully signed out");
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       showToast("error", "Failed to sign out");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!sessionInfo && !isSignedIn) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <Image
//             source={{
//               uri: sessionInfo?.photoUrl || "https://via.placeholder.com/100",
//             }}
//             style={styles.profileImage}
//           />
//           <Animated.Text
//             entering={FadeInDown.delay(200)}
//             style={styles.username}
//           >
//             {sessionInfo?.username || "Guest User"}
//           </Animated.Text>
//           {sessionInfo?.email && (
//             <Animated.Text
//               entering={FadeInDown.delay(300)}
//               style={styles.email}
//             >
//               {sessionInfo.email}
//             </Animated.Text>
//           )}
//           <Animated.Text
//             entering={FadeInDown.delay(400)}
//             style={styles.lastLogin}
//           >
//             Last Login: {formatDateTime(sessionInfo?.lastLogin || "")}
//           </Animated.Text>
//         </Animated.View>

//         <Animated.View
//           entering={FadeInDown.delay(500)}
//           layout={Layout.springify()}
//           style={styles.menuSection}
//         >
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)")}
//           >
//             <Ionicons name="settings-outline" size={24} color="#4A5568" />
//             <Text style={styles.menuItemText}>Settings</Text>
//             <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() =>
//               router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//             }
//           >
//             <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//             <Text style={styles.menuItemText}>Order History</Text>
//             <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//           </TouchableOpacity>
//         </Animated.View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignOut}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name="log-out-outline" size={20} color="#fff" />
//               <Text style={styles.signOutButtonText}>Sign Out</Text>
//             </>
//           )}
//         </TouchableOpacity>
//       </ScrollView>

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
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
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 4,
//     fontFamily: "Cairo-Bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//     fontFamily: "Cairo",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     fontFamily: "Cairo",
//   },
//   menuSection: {
//     marginBottom: 32,
//     gap: 12,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
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
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: THEME_COLOR,
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
// });

/***************************** */

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Platform,
//   RefreshControl,
//   ScrollView,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../contexts/UserContext";

// const THEME_COLOR = "#4CAF50";

// interface UserSessionInfo {
//   lastLogin: string;
//   username: string;
//   email: string;
//   photoUrl: string;
// }

// export default function UserProfile() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const { userData, formatDateTime } = useUserContext();
//   const insets = useSafeAreaInsets();
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [sessionInfo, setSessionInfo] = useState<UserSessionInfo | null>(null);

//   useEffect(() => {
//     checkAuthAndLoadData();
//   }, []);

//   const checkAuthAndLoadData = async () => {
//     try {
//       const [isAuth, isGuest] = await Promise.all([
//         SecureStore.getItemAsync("isAuthenticated"),
//         SecureStore.getItemAsync("isGuestMode"),
//       ]);

//       if (isAuth !== "true" && isGuest !== "true") {
//         router.replace("/(root)/(auth)/sign-in");
//         return;
//       }

//       if (isAuth === "true" && isSignedIn) {
//         await loadUserSessionInfo();
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       showToast("error", "Failed to load user data");
//     }
//   };

//   const loadUserSessionInfo = async () => {
//     try {
//       if (userData) {
//         setSessionInfo({
//           lastLogin: userData.lastLogin,
//           username: userData.username,
//           email: userData.email,
//           photoUrl: userData.imageUrl,
//         });
//       }
//     } catch (error) {
//       console.error("Error loading session info:", error);
//       showToast("error", "Failed to load session information");
//     }
//   };

//   const showToast = (type: "success" | "error" | "info", message: string) => {
//     Toast.show({
//       type,
//       text1: message,
//       position: "top",
//       visibilityTime: 3000,
//       topOffset: insets.top + 10,
//     });
//   };

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSessionInfo();
//       showToast("success", "Profile refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh profile");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       await signOut();
//       showToast("success", "Successfully signed out");
//       router.replace("/(root)/(auth)/sign-in");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       showToast("error", "Failed to sign out");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!sessionInfo && !isSignedIn) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <Image
//             source={{
//               uri: sessionInfo?.photoUrl || "https://via.placeholder.com/100",
//             }}
//             style={styles.profileImage}
//           />
//           <Animated.Text
//             entering={FadeInDown.delay(200)}
//             style={styles.username}
//           >
//             {sessionInfo?.username || "Guest User"}
//           </Animated.Text>
//           {sessionInfo?.email && (
//             <Animated.Text
//               entering={FadeInDown.delay(300)}
//               style={styles.email}
//             >
//               {sessionInfo.email}
//             </Animated.Text>
//           )}
//           <Animated.Text
//             entering={FadeInDown.delay(400)}
//             style={styles.lastLogin}
//           >
//             Last Login: {formatDateTime(new Date(sessionInfo?.lastLogin || ""))}
//           </Animated.Text>
//         </Animated.View>

//         <Animated.View
//           entering={FadeInDown.delay(500)}
//           layout={Layout.springify()}
//           style={styles.menuSection}
//         >
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)")}
//           >
//             <Ionicons name="settings-outline" size={24} color="#4A5568" />
//             <Text style={styles.menuItemText}>Settings</Text>
//             <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() =>
//               router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//             }
//           >
//             <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//             <Text style={styles.menuItemText}>Order History</Text>
//             <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//           </TouchableOpacity>
//         </Animated.View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
//           onPress={handleSignOut}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name="log-out-outline" size={20} color="#fff" />
//               <Text style={styles.signOutButtonText}>Sign Out</Text>
//             </>
//           )}
//         </TouchableOpacity>
//       </ScrollView>

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//     backgroundColor: "#F7FAFC",
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
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1A202C",
//     marginBottom: 4,
//     fontFamily: "Cairo-Bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 8,
//     fontFamily: "Cairo",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     fontFamily: "Cairo",
//   },
//   menuSection: {
//     marginBottom: 32,
//     gap: 12,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
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
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
// });

/********************************* */

// // UserProfile.tsx

// import React, { useCallback, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../contexts/UserContext";
// import { LinearGradient } from "expo-linear-gradient";

// const THEME_COLOR = "#10B981";
// const SCREEN_WIDTH = Dimensions.get("window").width;

// function UserProfile() {
//   const { userData, isLoading, signOutUser, refreshUserData, formatDateTime } =
//     useUserContext();
//   const insets = useSafeAreaInsets();
//   const [refreshing, setRefreshing] = useState(false);

//   const showToast = useCallback(
//     (type: "success" | "error", message: string) => {
//       Toast.show({
//         type,
//         text1: message,
//         position: "top",
//         visibilityTime: 2000,
//         topOffset: insets.top + 10,
//       });
//     },
//     [insets.top]
//   );

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await refreshUserData();
//       showToast("success", "Profile updated");
//     } catch (error) {
//       showToast("error", "Failed to refresh profile");
//     } finally {
//       setRefreshing(false);
//     }
//   }, [refreshUserData, showToast]);

//   const handleSignOut = useCallback(async () => {
//     try {
//       await signOutUser();
//       showToast("success", "Successfully signed out");
//     } catch (error) {
//       showToast("error", "Failed to sign out");
//     }
//   }, [signOutUser, showToast]);

//   if (isLoading && !userData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             tintColor={THEME_COLOR}
//           />
//         }
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
//           <LinearGradient
//             colors={["rgba(16, 185, 129, 0.1)", "transparent"]}
//             style={styles.headerGradient}
//           >
//             <Image
//               source={{
//                 uri:
//                   userData?.imageUrl ||
//                   `https://ui-avatars.com/api/?name=${
//                     userData?.username || "Guest"
//                   }&background=10B981&color=fff`,
//               }}
//               style={styles.profileImage}
//             />
//             <Animated.Text
//               entering={FadeInDown.delay(200)}
//               style={styles.username}
//             >
//               {userData?.username || "MohamedAbbas004"}
//             </Animated.Text>
//             {userData?.email && (
//               <Animated.Text
//                 entering={FadeInDown.delay(300)}
//                 style={styles.email}
//               >
//                 {userData.email}
//               </Animated.Text>
//             )}
//             <Animated.Text
//               entering={FadeInDown.delay(400)}
//               style={styles.lastLogin}
//             >
//               Last Login: {formatDateTime(new Date("2025-03-01 12:24:18"))}
//             </Animated.Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View
//           entering={SlideInRight.delay(500)}
//           layout={Layout.springify()}
//           style={styles.menuSection}
//         >
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)")}
//           >
//             <View style={styles.menuItemContent}>
//               <Ionicons name="settings-outline" size={24} color={THEME_COLOR} />
//               <Text style={styles.menuItemText}>Settings</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() =>
//               router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//             }
//           >
//             <View style={styles.menuItemContent}>
//               <Ionicons name="receipt-outline" size={24} color={THEME_COLOR} />
//               <Text style={styles.menuItemText}>Order History</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//           </TouchableOpacity>

//           {userData?.isGuestMode && (
//             <TouchableOpacity
//               style={styles.signInPrompt}
//               onPress={() => router.push("/(root)/(auth)/sign-in")}
//             >
//               <Text style={styles.signInPromptText}>
//                 Sign in to access your full profile
//               </Text>
//               <Ionicons name="arrow-forward" size={20} color={THEME_COLOR} />
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         {!userData?.isGuestMode && (
//           <TouchableOpacity
//             style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
//             onPress={handleSignOut}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="log-out-outline" size={20} color="#fff" />
//                 <Text style={styles.signOutButtonText}>Sign Out</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     width: SCREEN_WIDTH - 32,
//     borderRadius: 16,
//     overflow: "hidden",
//     marginVertical: 16,
//   },
//   headerGradient: {
//     padding: 24,
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//     backgroundColor: "#F3F4F6",
//     borderWidth: 3,
//     borderColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 4,
//     fontFamily: "Cairo-Bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "#4B5563",
//     marginBottom: 8,
//     fontFamily: "Cairo",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#6B7280",
//     fontFamily: "Cairo",
//   },
//   menuSection: {
//     gap: 12,
//     marginBottom: 24,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F9FAFB",
//     padding: 16,
//     borderRadius: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   menuItemContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: "#374151",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signInPrompt: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#ECFDF5",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   signInPromptText: {
//     fontSize: 14,
//     color: "#065F46",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#EF4444",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//     marginTop: "auto",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
// });

// export default React.memo(UserProfile);

/*********************************** */

// import React, { useCallback, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../contexts/UserContext";
// import { LinearGradient } from "expo-linear-gradient";

// const THEME_COLOR = "#10B981";
// const SCREEN_WIDTH = Dimensions.get("window").width;

// export default function UserProfile() {
//   const { userData, isLoading, signOutUser, refreshUserData, formatDateTime } =
//     useUserContext();
//   const insets = useSafeAreaInsets();
//   const [refreshing, setRefreshing] = useState(false);

//   const showToast = useCallback(
//     (type: "success" | "error", message: string) => {
//       Toast.show({
//         type,
//         text1: message,
//         position: "top",
//         visibilityTime: 2000,
//         topOffset: insets.top + 10,
//       });
//     },
//     [insets.top]
//   );

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await refreshUserData();
//       showToast("success", "Profile updated");
//     } catch (error) {
//       showToast("error", "Failed to refresh profile");
//     } finally {
//       setRefreshing(false);
//     }
//   }, [refreshUserData, showToast]);

//   const handleSignOut = useCallback(async () => {
//     try {
//       await signOutUser();
//       showToast("success", "Successfully signed out");
//     } catch (error) {
//       showToast("error", "Failed to sign out");
//     }
//   }, [signOutUser, showToast]);

//   if (isLoading && !userData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={THEME_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             tintColor={THEME_COLOR}
//           />
//         }
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
//           <LinearGradient
//             colors={["rgba(16, 185, 129, 0.1)", "transparent"]}
//             style={styles.headerGradient}
//           >
//             <Image
//               source={{
//                 uri:
//                   userData?.imageUrl ||
//                   `https://ui-avatars.com/api/?name=${
//                     userData?.username || "Guest"
//                   }&background=10B981&color=fff`,
//               }}
//               style={styles.profileImage}
//             />
//             <Animated.Text
//               entering={FadeInDown.delay(200)}
//               style={styles.username}
//             >
//               {userData?.username || "Guest User"}
//             </Animated.Text>
//             {userData?.email && (
//               <Animated.Text
//                 entering={FadeInDown.delay(300)}
//                 style={styles.email}
//               >
//                 {userData.email}
//               </Animated.Text>
//             )}
//             <Animated.Text
//               entering={FadeInDown.delay(400)}
//               style={styles.lastLogin}
//             >
//               Last Login: {formatDateTime(new Date(userData?.lastLogin || ""))}
//             </Animated.Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View
//           entering={FadeInDown.delay(500)}
//           layout={Layout.springify()}
//           style={styles.menuSection}
//         >
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)")}
//           >
//             <View style={styles.menuItemContent}>
//               <Ionicons name="settings-outline" size={24} color={THEME_COLOR} />
//               <Text style={styles.menuItemText}>Settings</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() =>
//               router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//             }
//           >
//             <View style={styles.menuItemContent}>
//               <Ionicons name="receipt-outline" size={24} color={THEME_COLOR} />
//               <Text style={styles.menuItemText}>Order History</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//           </TouchableOpacity>
//           {userData?.isGuestMode && (
//             <TouchableOpacity
//               style={styles.signInPrompt}
//               onPress={() => router.push("/(root)/(auth)/sign-in")}
//             >
//               <Text style={styles.signInPromptText}>
//                 Sign in to access your full profile
//               </Text>
//               <Ionicons name="arrow-forward" size={20} color={THEME_COLOR} />
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         {!userData?.isGuestMode && (
//           <TouchableOpacity
//             style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
//             onPress={handleSignOut}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="log-out-outline" size={20} color="#fff" />
//                 <Text style={styles.signOutButtonText}>Sign Out</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     width: SCREEN_WIDTH - 32,
//     borderRadius: 16,
//     overflow: "hidden",
//     marginVertical: 16,
//   },
//   headerGradient: { padding: 24, alignItems: "center" },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//     backgroundColor: "#F3F4F6",
//     borderWidth: 3,
//     borderColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: { elevation: 4 },
//     }),
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 4,
//     fontFamily: "Cairo-Bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "#4B5563",
//     marginBottom: 8,
//     fontFamily: "Cairo",
//   },
//   lastLogin: { fontSize: 14, color: "#6B7280", fontFamily: "Cairo" },
//   menuSection: { gap: 12, marginBottom: 24 },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F9FAFB",
//     padding: 16,
//     borderRadius: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 4,
//       },
//       android: { elevation: 2 },
//     }),
//   },
//   menuItemContent: { flexDirection: "row", alignItems: "center", gap: 12 },
//   menuItemText: {
//     fontSize: 16,
//     color: "#374151",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signInPrompt: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#ECFDF5",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   signInPromptText: {
//     fontSize: 14,
//     color: "#065F46",
//     fontWeight: "500",
//     fontFamily: "Cairo-SemiBold",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#EF4444",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//     marginTop: "auto",
//   },
//   signOutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   buttonDisabled: { opacity: 0.7 },
// });

/********************************** */

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const THEME_COLOR = "#10B981";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function UserProfile() {
  const { userData, isLoading, signOutUser, refreshUserData, formatDateTime } =
    useUserContext();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error" | "info", message: string) => {
      Toast.show({
        type,
        text1: message,
        position: "top",
        visibilityTime: 2000,
        topOffset: insets.top + 10,
      });
    },
    [insets.top]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshUserData();
      showToast("success", "Profile updated");
    } catch (error) {
      showToast("error", "Failed to refresh profile");
    } finally {
      setRefreshing(false);
    }
  }, [refreshUserData, showToast]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOutUser();
      showToast("success", "Successfully signed out");
    } catch (error) {
      showToast("error", "Failed to sign out");
    }
  }, [signOutUser, showToast]);

  if (isLoading && !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLOR} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* <Stack screenOptions={{ headerShown: true }} /> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={THEME_COLOR}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <LinearGradient
            colors={["rgba(16, 185, 129, 0.1)", "transparent"]}
            style={styles.headerGradient}
          >
            <Image
              source={{
                uri:
                  userData?.imageUrl ||
                  `https://ui-avatars.com/api/?name=${
                    userData?.username || "Guest"
                  }&background=10B981&color=fff`,
              }}
              style={styles.profileImage}
            />
            <Animated.Text
              entering={FadeInDown.delay(200)}
              style={styles.username}
            >
              {userData?.username || "Guest User"}
            </Animated.Text>
            {userData?.email && (
              <Animated.Text
                entering={FadeInDown.delay(300)}
                style={styles.email}
              >
                {userData.email}
              </Animated.Text>
            )}
            <Animated.Text
              entering={FadeInDown.delay(400)}
              style={styles.lastLogin}
            >
              Last Login: {formatDateTime(new Date(userData?.lastLogin || ""))}
            </Animated.Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(500)}
          layout={Layout.springify()}
          style={styles.menuSection}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)")}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="settings-outline" size={24} color={THEME_COLOR} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
            }
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="receipt-outline" size={24} color={THEME_COLOR} />
              <Text style={styles.menuItemText}>Order History</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          {userData?.isGuestMode && (
            <TouchableOpacity
              style={styles.signInPrompt}
              onPress={() => router.push("/(root)/(auth)/sign-in")}
            >
              <Text style={styles.signInPromptText}>
                Sign in to access your full profile
              </Text>
              <Ionicons name="arrow-forward" size={20} color={THEME_COLOR} />
            </TouchableOpacity>
          )}
        </Animated.View>

        {!userData?.isGuestMode && (
          <TouchableOpacity
            style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
            onPress={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: SCREEN_WIDTH - 32,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
  },
  headerGradient: { padding: 24, alignItems: "center" },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: "#F3F4F6",
    borderWidth: 3,
    borderColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 8,
  },
  lastLogin: { fontSize: 14, color: "#6B7280" },
  menuSection: { gap: 12, marginBottom: 24 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  menuItemContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuItemText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  signInPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  signInPromptText: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "500",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: "auto",
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: { opacity: 0.7 },
});
