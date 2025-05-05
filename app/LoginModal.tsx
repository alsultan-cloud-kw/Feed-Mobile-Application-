// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
// } from "react-native";
// import { useAuth } from "./contexts/useAuth";
// import { GoogleIcon } from "./Icons/Icons"; // Create this component
// import { useRouter } from "expo-router";
// import { LoginPattern } from "./Icons/Icons"; // Create this component
// const LoginScreen = ({ navigation }: { navigation: any }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const { googleSignIn, phoneSignIn } = useAuth();

//   const handleGoogleSignIn = async () => {
//     await googleSignIn();
//     // Navigation handled in AuthContext
//   };

//   const handlePhoneSignIn = async () => {
//     await phoneSignIn(phoneNumber, password);
//     // Navigation handled in AuthContext
//   };
//   const router = useRouter();
//   return (
//     <ImageBackground source={LoginPattern} style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.googleButton}
//           onPress={handleGoogleSignIn}
//         >
//           <Image source={GoogleIcon} className="w-10 h-10" />
//           <Text style={styles.googleButtonText}>Continue with Google</Text>
//         </TouchableOpacity>

//         <View style={styles.divider}>
//           <Text style={styles.dividerText}>______ OR ______</Text>
//         </View>

//         <TextInput
//           placeholder="Mobile Number"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           style={styles.input}
//           keyboardType="phone-pad"
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           style={styles.input}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={handlePhoneSignIn}
//         >
//           <Text style={styles.continueButtonText}>Continue</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.skipButton}
//           onPress={() => router.push("/(root)/(tabs)")}
//         >
//           <Text style={styles.skipButtonText}>Skip for Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#F5F5F5",
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "red",
//     padding: 15,
//     borderRadius: 5,
//   },
//   googleButtonText: {
//     marginLeft: 10,
//     color: "red",
//   },
//   divider: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   dividerText: {
//     color: "#888",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#DDD",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   continueButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   continueButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   skipButton: {
//     marginTop: 15,
//     alignItems: "center",
//   },
//   skipButtonText: {
//     color: "#888",
//   },
// });

// export default LoginScreen;

/******************************** */
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   Alert,
// } from "react-native";
// import { useAuth } from "./contexts/useAuth";
// import { useRouter } from "expo-router";
// import { LoginPattern } from "./Icons/Icons"; // Create this component
// import { GoogleIcon } from "./Icons/Icons"; // Create this component

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn, signOut, user, loading, error } = useAuth();

//   const router = useRouter();

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn();
//       if (user) {
//         Alert.alert("Success", `Welcome ${user.name}`);
//         router.push("/(root)/(tabs)"); // Navigate after successful login
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Failed to sign in with Google");
//     }
//   };

//   return (
//     <ImageBackground source={LoginPattern} style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.googleButton}
//           onPress={handleGoogleSignIn}
//           disabled={loading}
//         >
//           <Image source={GoogleIcon} className="w-10 h-10" />
//           <Text style={styles.googleButtonText}>
//             {loading ? "Signing in..." : "Continue with Google"}
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.divider}>
//           <Text style={styles.dividerText}>______ OR ______</Text>
//         </View>

//         <TextInput
//           placeholder="Mobile Number"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           style={styles.input}
//           keyboardType="phone-pad"
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           style={styles.input}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={() => {
//             Alert.alert("Not implemented", "Phone sign-in is not implemented");
//           }}
//         >
//           <Text style={styles.continueButtonText}>Continue</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.skipButton}
//           onPress={() => router.push("/(root)/(tabs)")}
//         >
//           <Text style={styles.skipButtonText}>Skip for Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#F5F5F5",
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "red",
//     padding: 15,
//     borderRadius: 5,
//   },
//   googleButtonText: {
//     marginLeft: 10,
//     color: "red",
//   },
//   divider: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   dividerText: {
//     color: "#888",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#DDD",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   continueButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   continueButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   skipButton: {
//     marginTop: 15,
//     alignItems: "center",
//   },
//   skipButtonText: {
//     color: "#888",
//   },
// });

// export default LoginScreen;

/************************************************* */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useGoogleSignIn } from "./contexts/useAuth"; // Import the hook we created earlier
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { GoogleIcon, Logo } from "./Icons/Icons";
// import {} from "./Icons/Icons";

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { user, loading, error, signIn } = useGoogleSignIn();

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn();
//       if (user) {
//         // Navigate to main app or home screen
//         navigation.replace("Home");
//       }
//     } catch (err) {
//       Alert.alert("Sign In Error", error?.message || "Failed to sign in");
//     }
//   };

//   const handlePhoneSignIn = () => {
//     if (!phoneNumber || !password) {
//       Alert.alert("Invalid Input", "Please enter phone number and password");
//       return;
//     }
//     // Implement phone number sign-in logic
//     Alert.alert("Coming Soon", "Phone sign-in is not yet implemented");
//   };

//   return (
//     <LinearGradient
//       colors={["#FF7E7E", "#63D2A4"]}
//       style={styles.gradientContainer}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}
//       >
//         <View style={styles.logoContainer}>
//           <Image source={Logo} style={styles.logo} resizeMode="contain" />
//         </View>

//         <View style={styles.loginContainer}>
//           <TouchableOpacity
//             style={styles.googleButton}
//             onPress={handleGoogleSignIn}
//             disabled={loading}
//           >
//             <Image source={GoogleIcon} style={styles.googleIcon} />
//             <Text style={styles.googleButtonText}>
//               {loading ? "Signing in..." : "Continue with Google"}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Mobile Number"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholderTextColor="#888"
//             />
//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 style={styles.passwordInput}
//                 secureTextEntry={!showPassword}
//                 placeholderTextColor="#888"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.passwordToggle}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-off" : "eye"}
//                   size={24}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.continueButton}
//             onPress={handlePhoneSignIn}
//           >
//             <Text style={styles.continueButtonText}>Continue</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.forgotPasswordContainer}
//             onPress={() =>
//               Alert.alert(
//                 "Forgot Password",
//                 "Reset password feature coming soon"
//               )
//             }
//           >
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity
//               onPress={() =>
//                 Alert.alert("Sign Up", "Sign up feature coming soon")
//               }
//             >
//               <Text style={styles.signupLinkText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 200,
//     height: 100,
//   },
//   loginContainer: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#DB4437",
//     padding: 15,
//     borderRadius: 10,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   googleButtonText: {
//     color: "#DB4437",
//     fontWeight: "bold",
//   },
//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#63D2A4",
//   },
//   dividerText: {
//     marginHorizontal: 10,
//     color: "#888",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#63D2A4",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   passwordInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#63D2A4",
//     borderRadius: 10,
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 15,
//   },
//   passwordToggle: {
//     padding: 10,
//   },
//   continueButton: {
//     backgroundColor: "#63D2A4",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   continueButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   forgotPasswordContainer: {
//     alignItems: "center",
//     marginTop: 15,
//   },
//   forgotPasswordText: {
//     color: "#63D2A4",
//   },
//   signupContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 15,
//   },
//   signupText: {
//     color: "#888",
//   },
//   signupLinkText: {
//     color: "#63D2A4",
//     fontWeight: "bold",
//   },
// });

// export default LoginScreen;

/************************************************ */

// import * as React from "react";
// import { Text, TextInput, Button, View } from "react-native";
// import { useSignUp } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <Button title="Verify" onPress={onVerifyPress} />
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <Button title="Continue" onPress={onSignUpPress} />
//       </>
//     </View>
//   );
// }

/*************************************************** */

// // @/LoginModal.tsx
// import React, { useState } from "react";
// import { View, StyleSheet, Modal } from "react-native";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as WebBrowser from "expo-web-browser";
// import { Button, Text, useTheme } from "@rneui/themed";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// WebBrowser.maybeCompleteAuthSession();

// const LoginModal = ({ visible, onClose }: { visible: any; onClose: any }) => {
//   const { theme } = useTheme();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         Toast.show({
//           type: "success",
//           text1: "Successfully signed in",
//         });
//         onClose(); // Close the modal on successful sign-in
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       Toast.show({
//         type: "error",
//         text1: "Sign in failed",
//         text2: "Please try again",
//       });
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <Animated.View
//           entering={FadeIn.duration(400)}
//           style={[
//             styles.modalContent,
//             { backgroundColor: theme.colors.background },
//           ]}
//         >
//           <View style={styles.closeButton}>
//             <Button
//               type="clear"
//               onPress={onClose}
//               icon={
//                 <Ionicons name="close" size={24} color={theme.colors.grey3} />
//               }
//             />
//           </View>

//           <View style={styles.content}>
//             <Text h2 style={styles.title}>
//               Welcome!
//             </Text>
//             <Text style={styles.description}>
//               Sign in to unlock all features and personalize your experience
//             </Text>

//             <Button
//               title="Continue with Google"
//               onPress={onSignIn}
//               icon={{
//                 name: "google",
//                 type: "font-awesome",
//                 color: "white",
//                 size: 20,
//               }}
//               buttonStyle={{
//                 backgroundColor: theme.colors.primary,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               containerStyle={styles.buttonContainer}
//             />

//             <Button
//               title="Continue as Guest"
//               type="outline"
//               onPress={onClose}
//               buttonStyle={{
//                 borderColor: theme.colors.grey3,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               titleStyle={{ color: theme.colors.grey3 }}
//               containerStyle={styles.buttonContainer}
//             />
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     minHeight: "60%",
//   },
//   closeButton: {
//     alignItems: "flex-end",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   description: {
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#666",
//   },
//   buttonContainer: {
//     width: "100%",
//     marginVertical: 10,
//   },
// });

// export default LoginModal;

/********************************* */

// // @/LoginModal.tsx
// import React, { useState } from "react";
// import { View, StyleSheet, Modal } from "react-native";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as WebBrowser from "expo-web-browser";
// import { Button, Text, useTheme } from "@rneui/themed";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// WebBrowser.maybeCompleteAuthSession();

// const LoginModal = ({
//   visible,
//   onClose,
// }: {
//   visible: boolean;
//   onClose: () => void;
// }) => {
//   const { theme } = useTheme();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         Toast.show({
//           type: "success",
//           text1: "Successfully signed in",
//         });
//         onClose(); // Close the modal on successful sign-in
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       Toast.show({
//         type: "error",
//         text1: "Sign in failed",
//         text2: "Please try again",
//       });
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <Animated.View
//           entering={FadeIn.duration(400)}
//           style={[
//             styles.modalContent,
//             { backgroundColor: theme.colors.background },
//           ]}
//         >
//           <View style={styles.closeButton}>
//             <Button
//               type="clear"
//               onPress={onClose}
//               icon={
//                 <Ionicons name="close" size={24} color={theme.colors.grey3} />
//               }
//             />
//           </View>

//           <View style={styles.content}>
//             <Text h2 style={styles.title}>
//               Welcome!
//             </Text>
//             <Text style={styles.description}>
//               Sign in to unlock all features and personalize your experience
//             </Text>

//             <Button
//               title="Continue with Google"
//               onPress={onSignIn}
//               icon={{
//                 name: "google",
//                 type: "font-awesome",
//                 color: "white",
//                 size: 20,
//               }}
//               buttonStyle={{
//                 backgroundColor: theme.colors.primary,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               containerStyle={styles.buttonContainer}
//             />

//             <Button
//               title="Continue as Guest"
//               type="outline"
//               onPress={onClose}
//               buttonStyle={{
//                 borderColor: theme.colors.grey3,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               titleStyle={{ color: theme.colors.grey3 }}
//               containerStyle={styles.buttonContainer}
//             />
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     minHeight: "60%",
//   },
//   closeButton: {
//     alignItems: "flex-end",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   description: {
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#666",
//   },
//   buttonContainer: {
//     width: "100%",
//     marginVertical: 10,
//   },
// });

// export default LoginModal;

/***************************************************/

// @/LoginModal.tsx

// import React from "react";
// import { View, StyleSheet, Modal } from "react-native";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as WebBrowser from "expo-web-browser";
// import { Button, Text, useTheme } from "@rneui/themed";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import { useAuth } from "@/app/contexts/useAuth";

// WebBrowser.maybeCompleteAuthSession();

// const LoginModal = ({
//   visible,
//   onClose,
// }: {
//   visible: boolean;
//   onClose: () => void;
// }) => {
//   const { theme } = useTheme();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { setContinueAsGuest } = useAuth();

//   const onSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         Toast.show({
//           type: "success",
//           text1: "Successfully signed in",
//         });
//         onClose(); // Close the modal on successful sign-in
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       Toast.show({
//         type: "error",
//         text1: "Sign in failed",
//         text2: "Please try again",
//       });
//     }
//   };

//   const onContinueAsGuest = () => {
//     setContinueAsGuest(true);
//     onClose();
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <Animated.View
//           entering={FadeIn.duration(400)}
//           style={[
//             styles.modalContent,
//             { backgroundColor: theme.colors.background },
//           ]}
//         >
//           <View style={styles.closeButton}>
//             <Button
//               type="clear"
//               onPress={onClose}
//               icon={
//                 <Ionicons name="close" size={24} color={theme.colors.grey3} />
//               }
//             />
//           </View>

//           <View style={styles.content}>
//             <Text h2 style={styles.title}>
//               Welcome!
//             </Text>
//             <Text style={styles.description}>
//               Sign in to unlock all features and personalize your experience
//             </Text>

//             <Button
//               title="Continue with Google"
//               onPress={onSignIn}
//               icon={{
//                 name: "google",
//                 type: "font-awesome",
//                 color: "white",
//                 size: 20,
//               }}
//               buttonStyle={{
//                 backgroundColor: theme.colors.primary,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               containerStyle={styles.buttonContainer}
//             />

//             <Button
//               title="Continue as Guest"
//               type="outline"
//               onPress={onContinueAsGuest}
//               buttonStyle={{
//                 borderColor: theme.colors.grey3,
//                 borderRadius: 12,
//                 padding: 15,
//               }}
//               titleStyle={{ color: theme.colors.grey3 }}
//               containerStyle={styles.buttonContainer}
//             />
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     minHeight: "60%",
//   },
//   closeButton: {
//     alignItems: "flex-end",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   description: {
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#666",
//   },
//   buttonContainer: {
//     width: "100%",
//     marginVertical: 10,
//   },
// });

// export default LoginModal;

/***************************************** */

import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, useTheme } from "@rneui/themed";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useAuth } from "@/app/contexts/useAuth";

WebBrowser.maybeCompleteAuthSession();

const LoginModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { theme } = useTheme();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { setContinueAsGuest } = useAuth();

  const onSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        Toast.show({
          type: "success",
          text1: "Successfully signed in",
        });
        onClose(); // Close the modal on successful sign-in
      }
    } catch (err) {
      console.error("OAuth error:", err);
      Toast.show({
        type: "error",
        text1: "Sign in failed",
        text2: "Please try again",
      });
    }
  };

  const onContinueAsGuest = () => {
    setContinueAsGuest(true);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          entering={FadeIn.duration(400)}
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.closeButton}>
            <Button
              type="clear"
              onPress={onClose}
              icon={
                <Ionicons name="close" size={24} color={theme.colors.grey3} />
              }
            />
          </View>

          <View style={styles.content}>
            <Text h2 style={styles.title}>
              Welcome!
            </Text>
            <Text style={styles.description}>
              Sign in to unlock all features and personalize your experience
            </Text>

            <Button
              title="Continue with Google"
              onPress={onSignIn}
              icon={{
                name: "google",
                type: "font-awesome",
                color: "white",
                size: 20,
              }}
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                padding: 15,
              }}
              containerStyle={styles.buttonContainer}
            />

            <Button
              title="Continue as Guest"
              type="outline"
              onPress={onContinueAsGuest}
              buttonStyle={{
                borderColor: theme.colors.grey3,
                borderRadius: 12,
                padding: 15,
              }}
              titleStyle={{ color: theme.colors.grey3 }}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "60%",
  },
  closeButton: {
    alignItems: "flex-end",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 10,
  },
});

export default LoginModal;
