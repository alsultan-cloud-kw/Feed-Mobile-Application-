// // import React from "react";
// // import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// // import { Link } from "expo-router";

// // const SettingsScreen: React.FC = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Settings</Text>
// //       <Link href="/Profile" style={styles.link}>
// //         <Text style={styles.linkText}>Profile</Text>
// //       </Link>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#ff6347", // Redish color
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     color: "#fff",
// //     marginBottom: 20,
// //   },
// //   link: {
// //     backgroundColor: "#32CD32", // Greenish color
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 8,
// //   },
// //   linkText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// // });

// // export default SettingsScreen;

// /********************************************* */

// // // app/(tabs)/more/settings.tsx
// // import { View, StyleSheet, ScrollView } from "react-native";
// // import { useUser } from "@clerk/clerk-expo";
// // import { Button, Input, Text, useTheme, Divider } from "@rneui/themed";
// // import { useState } from "react";
// // import Toast from "react-native-toast-message";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function Settings() {
// //   const { user } = useUser();
// //   const { theme } = useTheme();
// //   const [loading, setLoading] = useState(false);
// //   const [username, setUsername] = useState(user?.username || "");
// //   const [phoneNumber, setPhoneNumber] = useState(
// //     user?.phoneNumbers[0]?.phoneNumber || ""
// //   );

// //   const updateProfile = async () => {
// //     if (!user) return;
// //     setLoading(true);
// //     try {
// //       await user.update({
// //         username: username,
// //       });

// //       if (phoneNumber && !user.phoneNumbers[0]) {
// //         await user.createPhoneNumber({ phoneNumber });
// //       } else if (phoneNumber && user.phoneNumbers[0]) {
// //         await user.phoneNumbers[0].update({ phoneNumber });
// //       }

// //       Toast.show({
// //         type: "success",
// //         text1: "Profile updated successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to update profile",
// //         text2: "Please try again",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sendVerificationEmail = async () => {
// //     try {
// //       await user?.emailAddresses[0]?.createVerification();
// //       Toast.show({
// //         type: "success",
// //         text1: "Verification email sent",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to send verification email",
// //       });
// //     }
// //   };

// //   const deleteAccount = async () => {
// //     try {
// //       await user?.delete();
// //       Toast.show({
// //         type: "success",
// //         text1: "Account deleted successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to delete account",
// //       });
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text h4 style={styles.sectionTitle}>
// //         Account Settings
// //       </Text>

// //       <View style={styles.section}>
// //         <Input
// //           placeholder="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           leftIcon={
// //             <Ionicons
// //               name="person-outline"
// //               size={24}
// //               color={theme.colors.grey3}
// //             />
// //           }
// //         />

// //         <Input
// //           placeholder="Phone Number"
// //           value={phoneNumber}
// //           onChangeText={setPhoneNumber}
// //           leftIcon={
// //             <Ionicons
// //               name="call-outline"
// //               size={24}
// //               color={theme.colors.grey3}
// //             />
// //           }
// //           keyboardType="phone-pad"
// //         />

// //         <Button
// //           title="Save Changes"
// //           loading={loading}
// //           onPress={updateProfile}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Verification
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Send Verification Email"
// //           type="outline"
// //           onPress={sendVerificationEmail}
// //           buttonStyle={{
// //             borderColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           titleStyle={{ color: theme.colors.primary }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Orders
// //       </Text>
// //       <View style={styles.section}>
// //         <Text style={styles.placeholderText}>No orders yet</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Danger Zone
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Delete Account"
// //           onPress={deleteAccount}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.error,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   sectionTitle: {
// //     marginBottom: 20,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //   },
// //   divider: {
// //     marginVertical: 20,
// //   },
// //   placeholderText: {
// //     textAlign: "center",
// //     color: "#666",
// //     fontStyle: "italic",
// //   },
// // });

// /*************************************************** */

// // // app/(tabs)/more/settings.tsx
// // import { View, StyleSheet, ScrollView } from "react-native";
// // import { useUser } from "@clerk/clerk-expo";
// // import { Button, Input, Text, useTheme, Divider } from "@rneui/themed";
// // import { useState } from "react";
// // import Toast from "react-native-toast-message";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function Settings() {
// //   const { user } = useUser();
// //   const { theme } = useTheme();
// //   const [loading, setLoading] = useState(false);
// //   const [username, setUsername] = useState(user?.username || "");
// //   const [phoneNumber, setPhoneNumber] = useState(
// //     user?.phoneNumbers[0]?.phoneNumber || ""
// //   );

// //   const updateProfile = async () => {
// //     if (!user) return;
// //     setLoading(true);
// //     try {
// //       await user.update({
// //         username: username,
// //       });

// //       if (phoneNumber && !user.phoneNumbers[0]) {
// //         await user.createPhoneNumber({ phoneNumber });
// //       } else if (phoneNumber && user.phoneNumbers[0]) {
// //         await user.phoneNumbers[0].update({ phoneNumber });
// //       }

// //       Toast.show({
// //         type: "success",
// //         text1: "Profile updated successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to update profile",
// //         text2: "Please try again",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sendVerificationEmail = async () => {
// //     try {
// //       await user?.emailAddresses[0]?.createVerification();
// //       Toast.show({
// //         type: "success",
// //         text1: "Verification email sent",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to send verification email",
// //       });
// //     }
// //   };

// //   const deleteAccount = async () => {
// //     try {
// //       await user?.delete();
// //       Toast.show({
// //         type: "success",
// //         text1: "Account deleted successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to delete account",
// //       });
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text h4 style={styles.sectionTitle}>
// //         Account Settings
// //       </Text>

// //       <View style={styles.section}>
// //         <Input
// //           placeholder="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           leftIcon={
// //             <Ionicons
// //               name="person-outline"
// //               size={24}
// //               color={theme.colors.grey3}
// //             />
// //           }
// //         />

// //         <Input
// //           placeholder="Phone Number"
// //           value={phoneNumber}
// //           onChangeText={setPhoneNumber}
// //           leftIcon={
// //             <Ionicons
// //               name="call-outline"
// //               size={24}
// //               color={theme.colors.grey3}
// //             />
// //           }
// //           keyboardType="phone-pad"
// //         />

// //         <Button
// //           title="Save Changes"
// //           loading={loading}
// //           onPress={updateProfile}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Verification
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Send Verification Email"
// //           type="outline"
// //           onPress={sendVerificationEmail}
// //           buttonStyle={{
// //             borderColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           titleStyle={{ color: theme.colors.primary }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Orders
// //       </Text>
// //       <View style={styles.section}>
// //         <Text style={styles.placeholderText}>No orders yet</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Danger Zone
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Delete Account"
// //           onPress={deleteAccount}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.error,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   sectionTitle: {
// //     marginBottom: 20,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //   },
// //   divider: {
// //     marginVertical: 20,
// //   },
// //   placeholderText: {
// //     textAlign: "center",
// //     color: "#666",
// //     fontStyle: "italic",
// //   },
// // });

// /*******************************************************/

// // import React, { useState } from "react";
// // import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
// // import { useUser } from "@clerk/clerk-expo";
// // import { Button, Input, Text, useTheme, Divider } from "@rneui/themed";
// // import Toast from "react-native-toast-message";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function Settings() {
// //   const { user } = useUser();
// //   const { theme } = useTheme();
// //   const [loading, setLoading] = useState(false);
// //   const [username, setUsername] = useState(user?.username || "");
// //   const [password, setPassword] = useState(""); // Placeholder for password
// //   const [phoneNumber, setPhoneNumber] = useState(
// //     user?.phoneNumbers[0]?.phoneNumber || ""
// //   );

// //   const updateProfile = async () => {
// //     if (!user) return;
// //     setLoading(true);
// //     try {
// //       await user.update({
// //         username: username,
// //       });

// //       if (phoneNumber && !user.phoneNumbers[0]) {
// //         await user.createPhoneNumber({ phoneNumber });
// //       } else if (phoneNumber && user.phoneNumbers[0]) {
// //         await user.phoneNumbers[0].update({ phoneNumber });
// //       }

// //       Toast.show({
// //         type: "success",
// //         text1: "Profile updated successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to update profile",
// //         text2: "Please try again",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sendVerificationEmail = async () => {
// //     try {
// //       await user?.emailAddresses[0]?.createVerification();
// //       Toast.show({
// //         type: "success",
// //         text1: "Verification email sent",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to send verification email",
// //       });
// //     }
// //   };

// //   const confirmDeleteAccount = () => {
// //     Alert.alert(
// //       "Confirm Delete",
// //       "Are you sure you want to delete your account? This action cannot be undone.",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //         },
// //         {
// //           text: "Delete",
// //           style: "destructive",
// //           onPress: deleteAccount,
// //         },
// //       ]
// //     );
// //   };

// //   const deleteAccount = async () => {
// //     try {
// //       await user?.delete();
// //       Toast.show({
// //         type: "success",
// //         text1: "Account deleted successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to delete account",
// //       });
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.profileSection}>
// //         {user?.profileImageUrl && (
// //           <Image
// //             source={{ uri: user.profileImageUrl }}
// //             style={styles.profileImage}
// //           />
// //         )}
// //         <Text h4>
// //           {user?.firstName} {user?.lastName}
// //         </Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Profile Information
// //       </Text>
// //       <View style={styles.section}>
// //         <Input
// //           label="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           autoCapitalize="none"
// //         />
// //         <Input
// //           label="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           autoCapitalize="none"
// //           secureTextEntry
// //           placeholder="********"
// //         />
// //         <Button
// //           title="Update Profile"
// //           onPress={updateProfile}
// //           loading={loading}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Orders
// //       </Text>
// //       <View style={styles.section}>
// //         <Text style={styles.placeholderText}>No orders yet</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Danger Zone
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Delete Account"
// //           onPress={confirmDeleteAccount}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.error,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   profileSection: {
// //     alignItems: "center",
// //     marginBottom: 20,
// //   },
// //   profileImage: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     marginBottom: 10,
// //   },
// //   sectionTitle: {
// //     marginBottom: 20,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //   },
// //   divider: {
// //     marginVertical: 20,
// //   },
// //   placeholderText: {
// //     textAlign: "center",
// //     color: "#666",
// //     fontStyle: "italic",
// //   },
// // });

// /*******************************************************************/

// // import React, { useState } from "react";
// // import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
// // import { useUser, useAuth } from "@clerk/clerk-expo";
// // import { Button, Input, Text, useTheme, Divider } from "@rneui/themed";
// // import Toast from "react-native-toast-message";
// // import { useRouter } from "expo-router";

// // export default function Settings() {
// //   const { user } = useUser();
// //   const { signOut } = useAuth();
// //   const { theme } = useTheme();
// //   const [loading, setLoading] = useState(false);
// //   const [username, setUsername] = useState(user?.username || "");
// //   const [email, setEmail] = useState(
// //     user?.primaryEmailAddress?.emailAddress || ""
// //   );
// //   const [password, setPassword] = useState(""); // Placeholder for password
// //   const router = useRouter();

// //   const updateProfile = async () => {
// //     if (!user) return;
// //     setLoading(true);
// //     try {
// //       await user.update({
// //         username: username,
// //       });

// //       Toast.show({
// //         type: "success",
// //         text1: "Profile updated successfully",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to update profile",
// //         text2: "Please try again",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sendVerificationEmail = async () => {
// //     try {
// //       await user?.emailAddresses[0]?.createVerification();
// //       Toast.show({
// //         type: "success",
// //         text1: "Verification email sent",
// //       });
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to send verification email",
// //       });
// //     }
// //   };

// //   const confirmDeleteAccount = () => {
// //     Alert.alert(
// //       "Confirm Delete",
// //       "Are you sure you want to delete your account? This action cannot be undone.",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //         },
// //         {
// //           text: "Delete",
// //           style: "destructive",
// //           onPress: deleteAccount,
// //         },
// //       ]
// //     );
// //   };

// //   const deleteAccount = async () => {
// //     try {
// //       await user?.delete();
// //       Toast.show({
// //         type: "success",
// //         text1: "Account deleted successfully",
// //       });
// //       await signOut();
// //       router.replace("/sign-in");
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to delete account",
// //       });
// //     }
// //   };

// //   if (!user) {
// //     return (
// //       <View style={styles.container}>
// //         <Text h4>Welcome to Animal Feed</Text>
// //         <Text>
// //           Sign in to manage your account and view your profile information.
// //         </Text>
// //         <Button
// //           title="Sign In"
// //           onPress={() => router.replace("/sign-in")}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.profileSection}>
// //         {user?.profileImageUrl && (
// //           <Image
// //             source={{ uri: user.profileImageUrl }}
// //             style={styles.profileImage}
// //           />
// //         )}
// //         <Text h4>
// //           {user?.firstName} {user?.lastName}
// //         </Text>
// //         <Text>{email}</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Profile Information
// //       </Text>
// //       <View style={styles.section}>
// //         <Input
// //           label="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           autoCapitalize="none"
// //         />
// //         <Input
// //           label="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           autoCapitalize="none"
// //           secureTextEntry
// //           placeholder="********"
// //         />
// //         <Button
// //           title="Update Profile"
// //           onPress={updateProfile}
// //           loading={loading}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Orders
// //       </Text>
// //       <View style={styles.section}>
// //         <Text style={styles.placeholderText}>No orders yet</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Danger Zone
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Delete Account"
// //           onPress={confirmDeleteAccount}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.error,
// //             borderRadius: 12,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   profileSection: {
// //     alignItems: "center",
// //     marginBottom: 20,
// //   },
// //   profileImage: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     marginBottom: 10,
// //   },
// //   sectionTitle: {
// //     marginBottom: 20,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //   },
// //   divider: {
// //     marginVertical: 20,
// //   },
// //   placeholderText: {
// //     textAlign: "center",
// //     color: "#666",
// //     fontStyle: "italic",
// //   },
// // });

// /************************************ */

// // import React from "react";
// // import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
// // import { useUser } from "@clerk/clerk-expo";
// // import { Button, Text, useTheme, Divider } from "@rneui/themed";
// // import Toast from "react-native-toast-message";
// // import { useRouter } from "expo-router";
// // import { useAuth } from "@/app/contexts/useAuth"; // Using our custom useAuth

// // export default function Settings() {
// //   const { user } = useUser();
// //   const { signOut, setContinueAsGuest } = useAuth(); // Using our custom auth hook
// //   const { theme } = useTheme();
// //   const router = useRouter();

// //   const handleSignOut = async () => {
// //     try {
// //       await signOut();
// //       setContinueAsGuest(false); // Reset guest mode
// //       Toast.show({
// //         type: "success",
// //         text1: "Signed out successfully",
// //       });
// //       router.replace("/(root)/(tabs)");
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to sign out",
// //         text2: "Please try again",
// //       });
// //     }
// //   };

// //   const confirmDeleteAccount = () => {
// //     Alert.alert(
// //       "Confirm Delete",
// //       "Are you sure you want to delete your account? This action cannot be undone.",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //         },
// //         {
// //           text: "Delete",
// //           style: "destructive",
// //           onPress: deleteAccount,
// //         },
// //       ]
// //     );
// //   };

// //   const deleteAccount = async () => {
// //     try {
// //       await user?.delete();
// //       Toast.show({
// //         type: "success",
// //         text1: "Account deleted successfully",
// //       });
// //       await signOut();
// //       setContinueAsGuest(false); // Reset guest mode
// //       router.replace("/(root)/(tabs)");
// //     } catch (error) {
// //       Toast.show({
// //         type: "error",
// //         text1: "Failed to delete account",
// //         text2: "Please try again later",
// //       });
// //     }
// //   };

// //   // Guest user view
// //   if (!user) {
// //     return (
// //       <View style={styles.container}>
// //         <View style={styles.centerContent}>
// //           <Text h4 style={styles.title}>
// //             Welcome to Animal Feed
// //           </Text>
// //           <Text style={styles.description}>
// //             Sign in to access your profile and account settings.
// //           </Text>
// //           <Button
// //             title="Sign In"
// //             onPress={() => router.replace("/(root)/(tabs)")}
// //             buttonStyle={{
// //               backgroundColor: theme.colors.primary,
// //               borderRadius: 12,
// //               padding: 15,
// //             }}
// //             containerStyle={styles.buttonContainer}
// //           />
// //         </View>
// //       </View>
// //     );
// //   }

// //   // Authenticated user view
// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.profileSection}>
// //         {user?.profileImageUrl && (
// //           <Image
// //             source={{ uri: user.profileImageUrl }}
// //             style={styles.profileImage}
// //           />
// //         )}
// //         <Text h4 style={styles.userName}>
// //           {user?.firstName} {user?.lastName}
// //         </Text>
// //         <Text style={styles.userEmail}>
// //           {user?.primaryEmailAddress?.emailAddress}
// //         </Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Account Actions
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Sign Out"
// //           onPress={handleSignOut}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.primary,
// //             borderRadius: 12,
// //             padding: 15,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Orders
// //       </Text>
// //       <View style={styles.section}>
// //         <Text style={styles.placeholderText}>No orders yet</Text>
// //       </View>

// //       <Divider style={styles.divider} />

// //       <Text h4 style={styles.sectionTitle}>
// //         Danger Zone
// //       </Text>
// //       <View style={styles.section}>
// //         <Button
// //           title="Delete Account"
// //           onPress={confirmDeleteAccount}
// //           buttonStyle={{
// //             backgroundColor: theme.colors.error,
// //             borderRadius: 12,
// //             padding: 15,
// //           }}
// //           containerStyle={styles.buttonContainer}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   centerContent: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   profileSection: {
// //     alignItems: "center",
// //     marginBottom: 20,
// //     paddingVertical: 20,
// //   },
// //   profileImage: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     marginBottom: 10,
// //   },
// //   userName: {
// //     marginBottom: 5,
// //     textAlign: "center",
// //   },
// //   userEmail: {
// //     color: "#666",
// //     textAlign: "center",
// //   },
// //   title: {
// //     marginBottom: 10,
// //     textAlign: "center",
// //   },
// //   description: {
// //     textAlign: "center",
// //     marginBottom: 20,
// //     color: "#666",
// //   },
// //   sectionTitle: {
// //     marginBottom: 20,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //     width: "100%",
// //   },
// //   divider: {
// //     marginVertical: 20,
// //   },
// //   placeholderText: {
// //     textAlign: "center",
// //     color: "#666",
// //     fontStyle: "italic",
// //   },
// // });

// /********************************************** */

// import React from "react";
// import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
// import { useOAuth, useUser } from "@clerk/clerk-expo";
// import { Button, Text, useTheme, Divider } from "@rneui/themed";
// import Toast from "react-native-toast-message";
// import { useRouter } from "expo-router";
// import { useAuth } from "@/app/contexts/useAuth"; // Using our custom useAuth

// export default function Settings() {
//   const { user } = useUser();
//   const { signOut, setContinueAsGuest } = useAuth(); // Using our custom auth hook
//   const { theme } = useTheme();
//   const router = useRouter();

//   //  const onSignIn = async () => {
//   //     try {
//   //       const { createdSessionId, setActive } = await startOAuthFlow();
//   //       if (createdSessionId && setActive) {
//   //         await setActive({ session: createdSessionId });
//   //         Toast.show({
//   //           type: "success",
//   //           text1: "Successfully signed in",
//   //         });
//   //         onClose(); // Close the modal on successful sign-in
//   //       }
//   //     } catch (err) {
//   //       console.error("OAuth error:", err);
//   //       Toast.show({
//   //         type: "error",
//   //         text1: "Sign in failed",
//   //         text2: "Please try again",
//   //       });
//   //     }
//   //   };
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         Toast.show({
//           type: "success",
//           text1: "Successfully signed in",
//         });
//       }

//       setContinueAsGuest(false); // Reset guest mode
//       Toast.show({
//         type: "success",
//         text1: "Signed in successfully",
//       });
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Failed to sign in",
//         text2: "Please try again",
//       });
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       setContinueAsGuest(false); // Reset guest mode
//       Toast.show({
//         type: "success",
//         text1: "Signed out successfully",
//       });
//       router.replace("/(root)/(tabs)/(more)/(Settings)");
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Failed to sign out",
//         text2: "Please try again",
//       });
//     }
//   };

//   const confirmDeleteAccount = () => {
//     Alert.alert(
//       "Confirm Delete",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: deleteAccount,
//         },
//       ]
//     );
//   };

//   const deleteAccount = async () => {
//     try {
//       await user?.delete();
//       Toast.show({
//         type: "success",
//         text1: "Account deleted successfully",
//       });
//       await signOut();
//       setContinueAsGuest(false); // Reset guest mode
//       router.replace("/(root)/(tabs)");
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Failed to delete account",
//         text2: "Please try again later",
//       });
//     }
//   };

//   // Guest user view
//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.centerContent}>
//           <Text h4 style={styles.title}>
//             Welcome to Animal Feed
//           </Text>
//           <Text style={styles.description}>
//             Sign in to access your profile and account settings.
//           </Text>
//           <Button
//             title="Sign In"
//             onPress={handleSignIn}
//             buttonStyle={{
//               backgroundColor: theme.colors.primary,
//               borderRadius: 12,
//               padding: 15,
//             }}
//             containerStyle={styles.buttonContainer}
//           />
//         </View>
//       </View>
//     );
//   }

//   // Authenticated user view
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileSection}>
//         {user?.profileImageUrl && (
//           <Image
//             source={{ uri: user.profileImageUrl }}
//             style={styles.profileImage}
//           />
//         )}
//         <Text h4 style={styles.userName}>
//           {user?.firstName} {user?.lastName}
//         </Text>
//         <Text style={styles.userEmail}>
//           {user?.primaryEmailAddress?.emailAddress}
//         </Text>
//       </View>

//       <Divider style={styles.divider} />

//       <Text h4 style={styles.sectionTitle}>
//         Account Actions
//       </Text>
//       <View style={styles.section}>
//         <Button
//           title="Sign Out"
//           onPress={handleSignOut}
//           buttonStyle={{
//             backgroundColor: theme.colors.primary,
//             borderRadius: 12,
//             padding: 15,
//           }}
//           containerStyle={styles.buttonContainer}
//         />
//       </View>

//       <Divider style={styles.divider} />

//       <Text h4 style={styles.sectionTitle}>
//         Orders
//       </Text>
//       <View style={styles.section}>
//         <Text style={styles.placeholderText}>No orders yet</Text>
//       </View>

//       <Divider style={styles.divider} />

//       <Text h4 style={styles.sectionTitle}>
//         Danger Zone
//       </Text>
//       <View style={styles.section}>
//         <Button
//           title="Delete Account"
//           onPress={confirmDeleteAccount}
//           buttonStyle={{
//             backgroundColor: theme.colors.error,
//             borderRadius: 12,
//             padding: 15,
//           }}
//           containerStyle={styles.buttonContainer}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 20,
//     paddingVertical: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   userName: {
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   userEmail: {
//     color: "#666",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   description: {
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#666",
//   },
//   sectionTitle: {
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     marginVertical: 10,
//     width: "100%",
//   },
//   divider: {
//     marginVertical: 20,
//   },
//   placeholderText: {
//     textAlign: "center",
//     color: "#666",
//     fontStyle: "italic",
//   },
// });

/********************************************************************* */

// // app/(root)/(tabs)/(more)/settings.tsx
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import * as ImagePicker from "expo-image-picker";
// import {
//   updateUserInStrapi,
//   deleteUserFromStrapi,
// } from "../../../../Utils/api";

// export default function Settings() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [orders, setOrders] = useState([]); // Placeholder for orders

//   const handleUpdateProfile = async () => {
//     setIsLoading(true);
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.canceled && user) {
//         // Convert the asset to a Blob for Clerk
//         const response = await fetch(result.assets[0].uri);
//         const blob = await response.blob();

//         // Update profile image in Clerk
//         await user.setProfileImage({ file: blob });

//         // Update image URL in Strapi
//         await updateUserInStrapi(user.id, {
//           ImageURL: user.imageUrl || "",
//         });
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to update profile image");
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
//         // Navigate to verification code input screen
//         router.push("/(root)/(auth)/verify-email");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to send verification code");
//     }
//   };

//   const handleDeleteAccount = () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               if (user) {
//                 await deleteUserFromStrapi(user.id);
//                 await user.delete();
//                 await signOut();
//                 router.replace("/(root)/(tabs)");
//               }
//             } catch (error) {
//               Alert.alert("Error", "Failed to delete account");
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text>Please sign in to access settings</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {isLoading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#E53935" />
//         </View>
//       )}

//       <View style={styles.profileSection}>
//         <TouchableOpacity onPress={handleUpdateProfile}>
//           <Image
//             source={{ uri: user.imageUrl || "https://via.placeholder.com/150" }}
//             style={styles.profileImage}
//           />
//           <Text style={styles.changePhotoText}>Change Photo</Text>
//         </TouchableOpacity>

//         <Text style={styles.username}>
//           {user.username || user.firstName || "User"}
//         </Text>
//         <Text style={styles.email}>
//           {user.primaryEmailAddress?.emailAddress}
//         </Text>

//         {user.primaryEmailAddress?.verification.status === "verified" ? (
//           <View style={styles.verifiedBadge}>
//             <Text style={styles.verifiedText}>✓ Email Verified</Text>
//           </View>
//         ) : (
//           <TouchableOpacity
//             style={styles.verifyButton}
//             onPress={handleVerifyEmail}
//           >
//             <Text style={styles.verifyButtonText}>Verify Email</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account Settings</Text>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={handleDeleteAccount}
//         >
//           <Text style={styles.deleteButtonText}>Delete Account</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Order History</Text>
//         {orders.length === 0 ? (
//           <Text style={styles.noOrders}>No orders yet</Text>
//         ) : (
//           <Text>Order history will be displayed here</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   profileSection: {
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   changePhotoText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     marginTop: 8,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 10,
//     color: "#333",
//   },
//   email: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
//   verifiedBadge: {
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     marginTop: 10,
//   },
//   verifiedText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   verifyButton: {
//     backgroundColor: "#E53935",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   verifyButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   section: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 15,
//     color: "#333",
//   },
//   deleteButton: {
//     backgroundColor: "#ffebee",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   deleteButtonText: {
//     color: "#E53935",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   noOrders: {
//     color: "#666",
//     fontStyle: "italic",
//   },
// });

/***************************************************** */

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
// import { saveUserToStrapi, deleteUserFromStrapi } from "../../../../Utils/api";
// import { Link, router } from "expo-router";

// export default function Settings() {
//   const { user } = useUser();
//   const { signOut, deleteUser } = useAuth();
//   const [username, setUsername] = useState(user?.username || "");
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChangeProfilePicture = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUrl(result.uri);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     try {
//       await saveUserToStrapi({
//         Username: username,
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ImageURL: imageUrl,
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", "Failed to save changes. Please try again.");
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

//   const handleDeleteAccount = async () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await deleteUser();
//               await deleteUserFromStrapi(user?.id || "");
//               router.replace("/(root)/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error deleting account:", error);
//               Alert.alert(
//                 "Error",
//                 "Failed to delete account. Please try again."
//               );
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
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

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={handleDeleteAccount}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="trash-outline" size={20} color="#fff" />
//             <Text style={styles.deleteButtonText}>Delete Account</Text>
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
//   },
//   section: {
//     marginBottom: 20,
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
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   deleteButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B71C1C",
//     padding: 15,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
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

/******************************************** */

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
// import {
//   uploadImageToStrapi,
//   saveUserToStrapi,
//   deleteUserFromStrapi,
// } from "../../../../Utils/api";
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
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUrl(result.uri);
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
//       Alert.alert("Error", "Failed to save changes. Please try again.");
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

//   const handleDeleteAccount = async () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await deleteUserFromStrapi(user?.id || "");
//               router.replace("/(root)/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error deleting account:", error);
//               Alert.alert(
//                 "Error",
//                 "Failed to delete account. Please try again."
//               );
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
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

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={handleDeleteAccount}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="trash-outline" size={20} color="#fff" />
//             <Text style={styles.deleteButtonText}>Delete Account</Text>
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
//   },
//   section: {
//     marginBottom: 20,
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
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   deleteButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B71C1C",
//     padding: 15,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
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

/*************************************** */

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
// import {
//   uploadImageToStrapi,
//   saveUserToStrapi,
//   deleteUserFromStrapi,
// } from "../../../..//Utils/api";
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
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
//       Alert.alert("Error", "Failed to save changes. Please try again.");
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

//   const handleDeleteAccount = async () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await deleteUserFromStrapi(user?.id || "");
//               router.replace("/(root)/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error deleting account:", error);
//               Alert.alert(
//                 "Error",
//                 "Failed to delete account. Please try again."
//               );
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
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

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={handleDeleteAccount}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="trash-outline" size={20} color="#fff" />
//             <Text style={styles.deleteButtonText}>Delete Account</Text>
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
//   },
//   section: {
//     marginBottom: 20,
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
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   deleteButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B71C1C",
//     padding: 15,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
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

/******************************************** */

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
// import {
//   uploadImageToStrapi,
//   saveUserToStrapi,
//   deleteUserFromStrapi,
// } from "../../../../Utils/api";
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
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     console.log(result);

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

//   const handleDeleteAccount = async () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await deleteUserFromStrapi(user?.id || "");
//               router.replace("/(root)/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error deleting account:", error);
//               Alert.alert(
//                 "Error",
//                 "Failed to delete account. Please try again."
//               );
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
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

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={handleDeleteAccount}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="trash-outline" size={20} color="#fff" />
//             <Text style={styles.deleteButtonText}>Delete Account</Text>
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
//   },
//   section: {
//     marginBottom: 20,
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
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   deleteButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B71C1C",
//     padding: 15,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
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

/************************************************** */

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
// import {
//   uploadImageToStrapi,
//   saveUserToStrapi,
//   deleteUserFromStrapi,
// } from "../../../../Utils/api";
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

//     console.log(result);

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

//   const handleDeleteAccount = async () => {
//     Alert.alert(
//       "Delete Account",
//       "Are you sure you want to delete your account? This action cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               await deleteUserFromStrapi(user?.id || "");
//               router.replace("/(root)/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error deleting account:", error);
//               Alert.alert(
//                 "Error",
//                 "Failed to delete account. Please try again."
//               );
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
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

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={handleDeleteAccount}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="trash-outline" size={20} color="#fff" />
//             <Text style={styles.deleteButtonText}>Delete Account</Text>
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
//   },
//   section: {
//     marginBottom: 20,
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
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   deleteButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B71C1C",
//     padding: 15,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
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

/************************************************* */

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
// import { uploadImageToStrapi, saveUserToStrapi } from "../../../../Utils/api";
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

//     console.log(result);

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

/**************************************** */

// import React, { useState, useEffect } from "react";
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
//   Dimensions,
//   Platform,
//   KeyboardAvoidingView,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import {
//   uploadImageToStrapi,
//   saveUserToStrapi,
//   getUserFromStrapi,
// } from "../../../../Utils/api.auth";
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

// interface StrapiUser {
//   id: number;
//   attributes: {
//     Username: string;
//     Email: string;
//     ProfileIMG: string;
//   };
// }

// const { width } = Dimensions.get("window");

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [strapiUserId, setStrapiUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user?.primaryEmailAddress?.emailAddress) {
//         try {
//           const strapiUser = await getUserFromStrapi(
//             user.primaryEmailAddress.emailAddress
//           );
//           if (strapiUser) {
//             setStrapiUserId(strapiUser.id);
//             setUsername(strapiUser.attributes.Username);
//             setImageUrl(strapiUser.attributes.ProfileIMG || user.imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [user]);

//   const handleChangeProfilePicture = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openURL("app-settings:")
//                   : Linking.openSettings(),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//         base64: true,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         try {
//           const uploadResponse = await uploadImageToStrapi(
//             result.assets[0].uri
//           );
//           setImageUrl(uploadResponse.url);
//           await handleSaveChanges(uploadResponse.url);
//         } catch (error) {
//           Alert.alert(
//             "Error",
//             "Failed to update profile picture. Please try again."
//           );
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to launch image picker. Please try again.");
//     }
//   };

//   const handleSaveChanges = async (newImageUrl?: string) => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const userData = {
//         Username: username.trim(),
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ProfileIMG: newImageUrl || imageUrl,
//       };

//       await saveUserToStrapi(userData);
//       Alert.alert("Success", "Profile updated successfully");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", "Failed to save changes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.signInPromptContainer}>
//           <Ionicons name="person-circle-outline" size={64} color="#4CAF50" />
//           <Text style={styles.prompt}>Please sign in to access settings</Text>
//           <Link href="/(root)/(auth)/sign-in" asChild>
//             <TouchableOpacity style={styles.signInButton}>
//               <Ionicons name="log-in-outline" size={24} color="#fff" />
//               <Text style={styles.signInButtonText}>Sign In</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.profileImageContainer}
//             onPress={handleChangeProfilePicture}
//             disabled={isLoading}
//           >
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             <View style={styles.cameraIconOverlay}>
//               <Ionicons name="camera" size={20} color="#fff" />
//             </View>
//           </TouchableOpacity>

//           <Text style={styles.emailText}>
//             {user.primaryEmailAddress?.emailAddress}
//           </Text>
//         </View>

//         <View style={styles.form}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             value={username}
//             onChangeText={setUsername}
//             placeholder="Enter username"
//             placeholderTextColor="#999"
//             maxLength={30}
//           />
//           <TouchableOpacity
//             style={[styles.saveButton, isLoading && styles.disabledButton]}
//             onPress={() => handleSaveChanges()}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="save-outline" size={20} color="#fff" />
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Ionicons name="receipt-outline" size={24} color="#333" />
//             <Text style={styles.sectionTitle}>Order History</Text>
//           </View>
//           <Text style={styles.noOrdersText}>No orders yet</Text>
//         </View>

//         <View style={styles.divider} />

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   signInPromptContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImageContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: "#4CAF50",
//   },
//   cameraIconOverlay: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   emailText: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 8,
//   },
//   form: {
//     marginBottom: 30,
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
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 16,
//     fontSize: 16,
//     color: "#333",
//     backgroundColor: "#f9f9f9",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#eee",
//     marginVertical: 25,
//     width: "100%",
//   },
//   section: {
//     marginBottom: 25,
//     width: "100%",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     marginLeft: 8,
//   },
//   noOrdersText: {
//     fontSize: 16,
//     color: "#666",
//     fontStyle: "italic",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53935",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
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
//     marginVertical: 20,
//   },
//   signInButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: width * 0.8,
//     maxWidth: 300,
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
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });

/************************************** */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   Platform,
//   KeyboardAvoidingView,
// } from "react-native";
// import { router, Stack } from "expo-router";
// import { useUser } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useStrapiUser } from "@/app/contexts/UserContext";
// import Animated, { FadeInDown } from "react-native-reanimated";

// interface SettingItemProps {
//   label: string;
//   value: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   onPress?: () => void;
//   isEditable?: boolean;
//   onChangeText?: (text: string) => void;
//   isLoading?: boolean;
// }

// const SettingItem: React.FC<SettingItemProps> = ({
//   label,
//   value,
//   icon,
//   onPress,
//   isEditable,
//   onChangeText,
//   isLoading,
// }) => (
//   <Animated.View entering={FadeInDown} style={styles.settingItem}>
//     <View style={styles.settingHeader}>
//       <Ionicons name={icon} size={24} color="#4A5568" />
//       <Text style={styles.settingLabel}>{label}</Text>
//     </View>
//     {isEditable ? (
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           style={styles.input}
//           placeholder={`Enter ${label.toLowerCase()}`}
//           placeholderTextColor="#A0AEC0"
//         />
//         {isLoading && (
//           <ActivityIndicator style={styles.loader} color="#E53E3E" />
//         )}
//       </View>
//     ) : (
//       <TouchableOpacity
//         onPress={onPress}
//         style={styles.valueContainer}
//         disabled={!onPress}
//       >
//         <Text style={styles.settingValue}>{value}</Text>
//         {onPress && (
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         )}
//       </TouchableOpacity>
//     )}
//   </Animated.View>
// );

// export default function Settings() {
//   const insets = useSafeAreaInsets();
//   const { user } = useUser();
//   const { strapiUser, updateStrapiUser, isLoading } = useStrapiUser();
//   const [username, setUsername] = useState(
//     strapiUser?.attributes?.Username || user?.username || ""
//   );
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     try {
//       setIsUpdating(true);
//       await updateStrapiUser({
//         Username: username.trim(),
//       });
//       Alert.alert("Success", "Username updated successfully");
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <Stack.Screen
//         options={{
//           title: "Account Settings",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: "#fff" },
//           headerLeft: () => (
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => router.back()}
//             >
//               <Ionicons name="arrow-back" size={24} color="#1A202C" />
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={[
//           styles.contentContainer,
//           { paddingBottom: insets.bottom + 20 },
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Profile Information</Text>
//           <SettingItem
//             label="Username"
//             value={username}
//             icon="person-outline"
//             isEditable
//             onChangeText={setUsername}
//             isLoading={isUpdating}
//           />
//           <SettingItem
//             label="Email"
//             value={user?.primaryEmailAddress?.emailAddress || ""}
//             icon="mail-outline"
//           />
//           {username !== strapiUser?.attributes?.Username && (
//             <TouchableOpacity
//               style={styles.saveButton}
//               onPress={handleUpdateUsername}
//               disabled={isLoading || isUpdating}
//             >
//               {isLoading || isUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Security</Text>
//           <SettingItem
//             label="Password"
//             value="Change password"
//             icon="lock-closed-outline"
//             onPress={() => {
//               // Implement password change logic
//               Alert.alert(
//                 "Change Password",
//                 "This feature will be available soon."
//               );
//             }}
//           />
//           <SettingItem
//             label="Two-Factor Authentication"
//             value="Disabled"
//             icon="shield-outline"
//             onPress={() => {
//               // Implement 2FA settings
//               Alert.alert("2FA", "This feature will be available soon.");
//             }}
//           />
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Notifications</Text>
//           <SettingItem
//             label="Push Notifications"
//             value="Enabled"
//             icon="notifications-outline"
//             onPress={() => {
//               // Implement notification settings
//               Alert.alert(
//                 "Notifications",
//                 "This feature will be available soon."
//               );
//             }}
//           />
//         </View>

//         <Text style={styles.version}>Version 1.0.0</Text>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 20,
//     gap: 24,
//   },
//   section: {
//     gap: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 8,
//   },
//   settingItem: {
//     backgroundColor: "#F7FAFC",
//     borderRadius: 12,
//     padding: 16,
//     gap: 12,
//   },
//   settingHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   settingLabel: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   valueContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   settingValue: {
//     fontSize: 16,
//     color: "#718096",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1A202C",
//     padding: 0,
//   },
//   loader: {
//     marginLeft: 8,
//   },
//   saveButton: {
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
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
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   version: {
//     textAlign: "center",
//     color: "#A0AEC0",
//     fontSize: 14,
//   },
// });

/***********************************************/
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   Image,
//   Alert,
//   ActivityIndicator,
//   Linking,
// } from "react-native";
// import { Stack, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as ImagePicker from "expo-image-picker";
// import { format } from "date-fns";
// import { useAuth } from "@clerk/clerk-expo";
// import { useStrapiUser } from "../../../../contexts/UserContext";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// const SettingItem = ({
//   label,
//   value,
//   icon,
//   onPress,
// }: {
//   label: string;
//   value: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   onPress?: () => void;
// }) => (
//   <Animated.View entering={FadeInDown} style={styles.settingItem}>
//     <View style={styles.settingHeader}>
//       <Ionicons name={icon} size={24} color="#4A5568" />
//       <Text style={styles.settingLabel}>{label}</Text>
//     </View>
//     <TouchableOpacity
//       style={styles.valueContainer}
//       onPress={onPress}
//       disabled={!onPress}
//     >
//       <Text style={styles.settingValue}>{value}</Text>
//       {onPress && <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />}
//     </TouchableOpacity>
//   </Animated.View>
// );

// export default function Settings() {
//   const insets = useSafeAreaInsets();
//   const { signOut } = useAuth();
//   const { strapiUser, updateProfileImage, getLastLoginFormatted } =
//     useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleImagePicker = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openSettings()
//                   : Linking.openURL("app-settings:"),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         await updateProfileImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <Stack.Screen
//         options={{
//           title: "Settings",
//           headerStyle: { backgroundColor: "#fff" },
//           headerShadowVisible: false,
//         }}
//       />

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={[
//           styles.content,
//           { paddingBottom: insets.bottom + 20 },
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         <Animated.View entering={FadeIn} style={styles.profileSection}>
//           <TouchableOpacity
//             onPress={handleImagePicker}
//             disabled={isLoading}
//             style={styles.imageContainer}
//           >
//             <Image
//               source={{
//                 uri:
//                   strapiUser?.attributes?.ProfileIMG ||
//                   "https://via.placeholder.com/100",
//               }}
//               style={styles.profileImage}
//             />
//             {isLoading ? (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             ) : (
//               <View style={styles.editIconContainer}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//               </View>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.username}>
//             {strapiUser?.attributes?.Username || "User"}
//           </Text>
//           <Text style={styles.email}>{strapiUser?.attributes?.Email}</Text>
//           <Text style={styles.lastLogin}>
//             Last login: {getLastLoginFormatted()}
//           </Text>
//         </Animated.View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Account</Text>
//           <SettingItem
//             label="Orders"
//             value="View order history"
//             icon="receipt-outline"
//             onPress={() =>
//               router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//             }
//           />
//           <SettingItem
//             label="Email"
//             value={strapiUser?.attributes?.Email || ""}
//             icon="mail-outline"
//           />
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>App</Text>
//           <SettingItem
//             label="Version"
//             value="1.0.0"
//             icon="information-circle-outline"
//           />
//         </View>

//         <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
//           <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
//           <Text style={styles.signOutText}>Sign Out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//     gap: 24,
//   },
//   profileSection: {
//     alignItems: "center",
//     gap: 12,
//   },
//   imageContainer: {
//     position: "relative",
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   editIconContainer: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#E53E3E",
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1A202C",
//   },
//   email: {
//     fontSize: 16,
//     color: "#4A5568",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//   },
//   section: {
//     gap: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1A202C",
//     marginBottom: 4,
//   },
//   settingItem: {
//     backgroundColor: "#F7FAFC",
//     borderRadius: 12,
//     padding: 16,
//     gap: 8,
//   },
//   settingHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   settingLabel: {
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   valueContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingLeft: 36,
//   },
//   settingValue: {
//     fontSize: 16,
//     color: "#718096",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     paddingVertical: 16,
//     marginTop: 12,
//   },
//   signOutText: {
//     fontSize: 16,
//     color: "#E53E3E",
//     fontWeight: "600",
//   },
// });

/************************************ */

// import React, { useState, useEffect } from "react";
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
//   Platform,
//   Linking,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { router } from "expo-router";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   uploadProfileImage,
//   saveUserToStrapi,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "MohamedAbbas004"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());

//   useEffect(() => {
//     // Update last login time when component mounts
//     setLastLogin(formatUTCDateTime());
//   }, []);

//   const handleChangeProfilePicture = async () => {
//     try {
//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openSettings()
//                   : Linking.openURL("app-settings:"),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         const uploadResponse = await uploadProfileImage(result.assets[0].uri);
//         setImageUrl(uploadResponse.url);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//       setIsLoading(false);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     try {
//       await saveUserToStrapi({
//         Username: username,
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ProfileIMG: imageUrl,
//         LastLogin: lastLogin,
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", "Failed to save changes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             await saveUserToStrapi({
//               Username: username,
//               Email: user?.primaryEmailAddress?.emailAddress || "",
//               LastLogin: formatUTCDateTime(),
//             });
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//     >
//       <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//             style={styles.profileImage}
//           />
//           {isLoading && (
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator color="#fff" />
//             </View>
//           )}
//           <TouchableOpacity
//             style={styles.changePictureButton}
//             onPress={handleChangeProfilePicture}
//             disabled={isLoading}
//           >
//             <Ionicons name="camera" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             value={username}
//             onChangeText={setUsername}
//             placeholder="Enter username"
//             placeholderTextColor="#A0AEC0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, styles.disabledInput]}
//             value={user?.primaryEmailAddress?.emailAddress}
//             editable={false}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.saveButton, isLoading && styles.disabledButton]}
//           onPress={handleSaveChanges}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           )}
//         </TouchableOpacity>
//       </Animated.View>

//       <View style={styles.divider} />

//       <View style={styles.menuSection}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)/Orders")}
//         >
//           <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Order History</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() =>
//             Alert.alert("Coming Soon", "This feature is under development.")
//           }
//         >
//           <Ionicons name="card-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Payment Methods</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/*************************************** */

// import React, { useState, useEffect } from "react";
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
//   Platform,
//   Linking,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { router } from "expo-router";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   uploadProfileImage,
//   saveUserToStrapi,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());

//   useEffect(() => {
//     // Update last login time when component mounts
//     setLastLogin(formatUTCDateTime());
//   }, []);

//   const handleChangeProfilePicture = async () => {
//     try {
//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openSettings()
//                   : Linking.openURL("app-settings:"),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         const uploadResponse = await uploadProfileImage(result.assets[0].uri);
//         setImageUrl(uploadResponse.url);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//       setIsLoading(false);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     try {
//       await saveUserToStrapi({
//         Username: username,
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ProfileIMG: imageUrl,
//         LastLogin: lastLogin,
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", "Failed to save changes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             await saveUserToStrapi({
//               Username: username,
//               Email: user?.primaryEmailAddress?.emailAddress || "",
//               LastLogin: formatUTCDateTime(),
//             });
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//     >
//       <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//             style={styles.profileImage}
//           />
//           {isLoading && (
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator color="#fff" />
//             </View>
//           )}
//           <TouchableOpacity
//             style={styles.changePictureButton}
//             onPress={handleChangeProfilePicture}
//             disabled={isLoading}
//           >
//             <Ionicons name="camera" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             value={username}
//             onChangeText={setUsername}
//             placeholder="Enter username"
//             placeholderTextColor="#A0AEC0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, styles.disabledInput]}
//             value={user?.primaryEmailAddress?.emailAddress}
//             editable={false}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.saveButton, isLoading && styles.disabledButton]}
//           onPress={handleSaveChanges}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           )}
//         </TouchableOpacity>
//       </Animated.View>

//       <View style={styles.divider} />

//       <View style={styles.menuSection}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)/Orders")}
//         >
//           <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Order History</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() =>
//             Alert.alert("Coming Soon", "This feature is under development.")
//           }
//         >
//           <Ionicons name="card-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Payment Methods</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/*********************************************** */

// import React, { useState, useEffect } from "react";
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
//   Platform,
//   Linking,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { router } from "expo-router";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   uploadProfileImage,
//   saveUserToStrapi,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());

//   useEffect(() => {
//     // Update last login time when component mounts
//     setLastLogin(formatUTCDateTime());
//   }, []);

//   const handleChangeProfilePicture = async () => {
//     try {
//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openSettings()
//                   : Linking.openURL("app-settings:"),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         const uploadResponse = await uploadProfileImage(result.assets[0].uri);
//         setImageUrl(uploadResponse.url);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//       setIsLoading(false);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     try {
//       await saveUserToStrapi({
//         Username: username,
//         Email: user?.primaryEmailAddress?.emailAddress || "",
//         ProfileIMG: imageUrl,
//         LastLogin: lastLogin,
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       Alert.alert("Error", "Failed to save changes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             await saveUserToStrapi({
//               Username: username,
//               Email: user?.primaryEmailAddress?.emailAddress || "",
//               LastLogin: formatUTCDateTime(),
//             });
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//     >
//       <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//             style={styles.profileImage}
//           />
//           {isLoading && (
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator color="#fff" />
//             </View>
//           )}
//           <TouchableOpacity
//             style={styles.changePictureButton}
//             onPress={handleChangeProfilePicture}
//             disabled={isLoading}
//           >
//             <Ionicons name="camera" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             value={username}
//             onChangeText={setUsername}
//             placeholder="Enter username"
//             placeholderTextColor="#A0AEC0"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, styles.disabledInput]}
//             value={user?.primaryEmailAddress?.emailAddress}
//             editable={false}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.saveButton, isLoading && styles.disabledButton]}
//           onPress={handleSaveChanges}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           )}
//         </TouchableOpacity>
//       </Animated.View>

//       <View style={styles.divider} />

//       <View style={styles.menuSection}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => router.push("/(root)/(tabs)/(more)/(Settings)/Orders")}
//         >
//           <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Order History</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() =>
//             Alert.alert("Coming Soon", "This feature is under development.")
//           }
//         >
//           <Ionicons name="card-outline" size={24} color="#4A5568" />
//           <Text style={styles.menuItemText}>Payment Methods</Text>
//           <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/************************************************ */

// import React, { useState, useEffect } from "react";
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
//   Platform,
//   Linking,
// } from "react-native";
// import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { router } from "expo-router";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   uploadProfileImage,
//   updateUsername,
//   updateProfileImage,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//     verification: {
//       status: string;
//     };
//   };
// }

// const formatUTCDateTime = (date: Date = new Date()) => {
//   return date.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());
//   const [hasChanges, setHasChanges] = useState(false);

//   useEffect(() => {
//     setLastLogin(formatUTCDateTime());
//   }, []);

//   useEffect(() => {
//     setHasChanges(
//       username !== (user?.username || user?.firstName || "User") ||
//         imageUrl !== (user?.imageUrl || "")
//     );
//   }, [username, imageUrl, user]);

//   const handleImagePicker = async () => {
//     try {
//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture.",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Settings",
//               onPress: () =>
//                 Platform.OS === "ios"
//                   ? Linking.openSettings()
//                   : Linking.openURL("app-settings:"),
//             },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         setIsLoading(true);
//         try {
//           const uploadResponse = await uploadProfileImage(result.assets[0].uri);
//           if (user?.id) {
//             await updateProfileImage(user.id, uploadResponse.url);
//             setImageUrl(uploadResponse.url);
//             Alert.alert("Success", "Profile picture updated successfully.");
//           }
//         } catch (error) {
//           Alert.alert(
//             "Error",
//             "Failed to update profile picture. Please try again."
//           );
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "Failed to access photo library. Please try again.");
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       if (user?.id) {
//         await updateUsername(user.id, username.trim());
//         Alert.alert("Success", "Username updated successfully.");
//         setHasChanges(false);
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (user?.id) {
//               await updateLastLogin(user.id, formatUTCDateTime());
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   const SignedOutContent = () => (
//     <View style={styles.signedOutContainer}>
//       <Text style={styles.signedOutText}>
//         Please sign in to access your settings
//       </Text>
//       <TouchableOpacity
//         style={styles.signInButton}
//         onPress={() => router.push("/(root)/(auth)/sign-in")}
//       >
//         <Text style={styles.signInButtonText}>Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <SignedIn>
//         <ScrollView
//           contentContainerStyle={{
//             paddingBottom: insets.bottom + 20,
//           }}
//         >
//           <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//                 style={styles.profileImage}
//               />
//               {isLoading && (
//                 <View style={styles.loadingOverlay}>
//                   <ActivityIndicator color="#fff" />
//                 </View>
//               )}
//               <TouchableOpacity
//                 style={styles.changePictureButton}
//                 onPress={handleImagePicker}
//                 disabled={isLoading}
//               >
//                 <Ionicons name="camera" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//           </Animated.View>

//           <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Username</Text>
//               <TextInput
//                 style={styles.input}
//                 value={username}
//                 onChangeText={setUsername}
//                 placeholder="Enter username"
//                 placeholderTextColor="#A0AEC0"
//                 editable={!isLoading}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={[styles.input, styles.disabledInput]}
//                 value={user?.primaryEmailAddress?.emailAddress}
//                 editable={false}
//               />
//             </View>

//             {hasChanges && (
//               <TouchableOpacity
//                 style={[styles.saveButton, isLoading && styles.disabledButton]}
//                 onPress={handleUpdateUsername}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             )}
//           </Animated.View>

//           <View style={styles.divider} />

//           <View style={styles.menuSection}>
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={() =>
//                 router.push("/(root)/(tabs)/(more)/(Settings)/Orders")
//               }
//             >
//               <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//               <Text style={styles.menuItemText}>Order History</Text>
//               <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//         </ScrollView>
//       </SignedIn>
//       <SignedOut>
//         <SignedOutContent />
//       </SignedOut>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   signedOutContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   signedOutText: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   signInButton: {
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   signInButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

/**************************************** */

// import React, { useState, useEffect } from "react";
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
//   Platform,
// } from "react-native";
// import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   getUserByEmail,
//   uploadImage,
//   updateProfileImage,
//   updateUsername,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameUpdating, setIsUsernameUpdating] = useState(false);
//   const [isImageUpdating, setIsImageUpdating] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());
//   const [documentId, setDocumentId] = useState<string | null>(null);
//   const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

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
//     setHasUsernameChanged(
//       username.trim() !== (user?.username || user?.firstName || "User")
//     );
//   }, [username, user]);

//   const handleImagePicker = async () => {
//     try {
//       setIsImageUpdating(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0] && documentId) {
//         const uploadedImageUrl = await uploadImage(result.assets[0].uri);

//         if (uploadedImageUrl) {
//           const success = await updateProfileImage(
//             documentId,
//             uploadedImageUrl
//           );

//           if (success) {
//             setImageUrl(uploadedImageUrl);
//             Alert.alert("Success", "Profile picture updated successfully");
//           } else {
//             Alert.alert("Error", "Failed to update profile picture");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsImageUpdating(false);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     if (!documentId) {
//       Alert.alert("Error", "User profile not found");
//       return;
//     }

//     setIsUsernameUpdating(true);
//     try {
//       const success = await updateUsername(documentId, username.trim());

//       if (success) {
//         Alert.alert("Success", "Username updated successfully");
//         setHasUsernameChanged(false);
//       } else {
//         Alert.alert("Error", "Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUsernameUpdating(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (documentId) {
//               await updateLastLogin(documentId);
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             {isImageUpdating && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={isImageUpdating}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!isUsernameUpdating}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={user?.primaryEmailAddress?.emailAddress}
//               editable={false}
//             />
//           </View>

//           {hasUsernameChanged && (
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 isUsernameUpdating && styles.disabledButton,
//               ]}
//               onPress={handleUpdateUsername}
//               disabled={isUsernameUpdating}
//             >
//               {isUsernameUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Update Username</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/*************************** */

// import React, { useState, useEffect } from "react";
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
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   getUserByEmail,
//   uploadImage,
//   updateProfileImage,
//   updateUsername,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameUpdating, setIsUsernameUpdating] = useState(false);
//   const [isImageUpdating, setIsImageUpdating] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());
//   const [documentId, setDocumentId] = useState<string | null>(null);
//   const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

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
//     setHasUsernameChanged(
//       username.trim() !== (user?.username || user?.firstName || "User")
//     );
//   }, [username, user]);

//   const handleImagePicker = async () => {
//     try {
//       setIsImageUpdating(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0] && documentId) {
//         const uploadedImageUrl = await uploadImage(result.assets[0].uri);

//         if (uploadedImageUrl) {
//           const success = await updateProfileImage(
//             documentId,
//             uploadedImageUrl
//           );

//           if (success) {
//             setImageUrl(uploadedImageUrl);
//             Alert.alert("Success", "Profile picture updated successfully");
//           } else {
//             Alert.alert("Error", "Failed to update profile picture");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsImageUpdating(false);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     if (!documentId) {
//       Alert.alert("Error", "User profile not found");
//       return;
//     }

//     setIsUsernameUpdating(true);
//     try {
//       const success = await updateUsername(documentId, username.trim());

//       if (success) {
//         Alert.alert("Success", "Username updated successfully");
//         setHasUsernameChanged(false);
//       } else {
//         Alert.alert("Error", "Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUsernameUpdating(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (documentId) {
//               await updateLastLogin(documentId);
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             {isImageUpdating && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={isImageUpdating}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!isUsernameUpdating}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={user?.primaryEmailAddress?.emailAddress}
//               editable={false}
//             />
//           </View>

//           {hasUsernameChanged && (
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 isUsernameUpdating && styles.disabledButton,
//               ]}
//               onPress={handleUpdateUsername}
//               disabled={isUsernameUpdating}
//             >
//               {isUsernameUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Update Username</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/***************************************** */

// import React, { useState, useEffect } from "react";
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
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   getUserByEmail,
//   uploadImage,
//   updateProfileImage,
//   updateUsername,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     user?.username?.trim() || user?.firstName?.trim() || "User"
//   );
//   const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameUpdating, setIsUsernameUpdating] = useState(false);
//   const [isImageUpdating, setIsImageUpdating] = useState(false);
//   const [lastLogin, setLastLogin] = useState(formatUTCDateTime());
//   const [documentId, setDocumentId] = useState<string | null>(null);
//   const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

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
//     setHasUsernameChanged(
//       username.trim() !== (user?.username || user?.firstName || "User")
//     );
//   }, [username, user]);

//   const handleImagePicker = async () => {
//     try {
//       setIsImageUpdating(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0] && documentId) {
//         const uploadedImageUrl = await uploadImage(result.assets[0].uri);

//         if (uploadedImageUrl) {
//           const success = await updateProfileImage(
//             documentId,
//             uploadedImageUrl
//           );

//           if (success) {
//             setImageUrl(uploadedImageUrl);
//             Alert.alert("Success", "Profile picture updated successfully");
//           } else {
//             Alert.alert("Error", "Failed to update profile picture");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsImageUpdating(false);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     if (!documentId) {
//       Alert.alert("Error", "User profile not found");
//       return;
//     }

//     setIsUsernameUpdating(true);
//     try {
//       const success = await updateUsername(documentId, username.trim());

//       if (success) {
//         Alert.alert("Success", "Username updated successfully");
//         setHasUsernameChanged(false);
//       } else {
//         Alert.alert("Error", "Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUsernameUpdating(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (documentId) {
//               await updateLastLogin(documentId);
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             {isImageUpdating && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={isImageUpdating}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!isUsernameUpdating}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={user?.primaryEmailAddress?.emailAddress}
//               editable={false}
//             />
//           </View>

//           {hasUsernameChanged && (
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 isUsernameUpdating && styles.disabledButton,
//               ]}
//               onPress={handleUpdateUsername}
//               disabled={isUsernameUpdating}
//             >
//               {isUsernameUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Update Username</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/***************************************** */

// import React, { useState, useEffect } from "react";
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
// import { useUser } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useStrapiUser } from "../../../../contexts/UserContext";
// import {
//   getUserByEmail,
//   uploadImage,
//   updateProfileImage,
//   updateUsername,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { strapiUser, setStrapiUser } = useStrapiUser();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     strapiUser?.attributes?.Username?.trim() ||
//       user?.username?.trim() ||
//       user?.firstName?.trim() ||
//       "User"
//   );
//   const [imageUrl, setImageUrl] = useState(
//     strapiUser?.attributes?.ProfileIMG || user?.imageUrl || ""
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameUpdating, setIsUsernameUpdating] = useState(false);
//   const [isImageUpdating, setIsImageUpdating] = useState(false);
//   const [lastLogin, setLastLogin] = useState(
//     strapiUser?.attributes?.LastLogin || formatUTCDateTime()
//   );
//   const [documentId, setDocumentId] = useState<string | null>(
//     strapiUser?.id || null
//   );
//   const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

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
//     setHasUsernameChanged(
//       username.trim() !==
//         (strapiUser?.attributes?.Username ||
//           user?.username ||
//           user?.firstName ||
//           "User")
//     );
//   }, [username, strapiUser, user]);

//   const handleImagePicker = async () => {
//     try {
//       setIsImageUpdating(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0] && documentId) {
//         const uploadedImageUrl = await uploadImage(result.assets[0].uri);

//         if (uploadedImageUrl) {
//           const success = await updateProfileImage(
//             documentId,
//             uploadedImageUrl
//           );

//           if (success) {
//             setImageUrl(uploadedImageUrl);
//             setStrapiUser((prev: any) => ({
//               ...prev,
//               attributes: {
//                 ...prev.attributes,
//                 ProfileIMG: uploadedImageUrl,
//               },
//             }));
//             Alert.alert("Success", "Profile picture updated successfully");
//           } else {
//             Alert.alert("Error", "Failed to update profile picture");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsImageUpdating(false);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     if (!documentId) {
//       Alert.alert("Error", "User profile not found");
//       return;
//     }

//     setIsUsernameUpdating(true);
//     try {
//       const success = await updateUsername(documentId, username.trim());

//       if (success) {
//         setStrapiUser((prev: any) => ({
//           ...prev,
//           attributes: {
//             ...prev.attributes,
//             Username: username.trim(),
//           },
//         }));
//         Alert.alert("Success", "Username updated successfully");
//         setHasUsernameChanged(false);
//       } else {
//         Alert.alert("Error", "Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUsernameUpdating(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (documentId) {
//               await updateLastLogin(documentId);
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             {isImageUpdating && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={isImageUpdating}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!isUsernameUpdating}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={user?.primaryEmailAddress?.emailAddress}
//               editable={false}
//             />
//           </View>

//           {hasUsernameChanged && (
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 isUsernameUpdating && styles.disabledButton,
//               ]}
//               onPress={handleUpdateUsername}
//               disabled={isUsernameUpdating}
//             >
//               {isUsernameUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Update Username</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/************************************ */

// import React, { useState, useEffect } from "react";
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
// import { useUser, useClerk } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useStrapiUser } from "../../../../contexts/UserContext";
// import {
//   getUserByEmail,
//   uploadImage,
//   updateProfileImage,
//   updateUsername,
//   updateLastLogin,
// } from "../../../../Utils/api.auth";

// interface User {
//   id?: string;
//   username?: string;
//   firstName?: string;
//   imageUrl?: string;
//   primaryEmailAddress?: {
//     emailAddress: string;
//   };
// }

// const formatUTCDateTime = () => {
//   const now = new Date();
//   return now.toISOString().slice(0, 19).replace("T", " ");
// };

// export default function Settings() {
//   const { user } = useUser() as { user: User };
//   const { signOut } = useClerk();
//   const { strapiUser, setStrapiUser } = useStrapiUser();
//   const insets = useSafeAreaInsets();

//   const [username, setUsername] = useState(
//     strapiUser?.attributes?.Username?.trim() ||
//       user?.username?.trim() ||
//       user?.firstName?.trim() ||
//       "User"
//   );
//   const [imageUrl, setImageUrl] = useState(
//     strapiUser?.attributes?.ProfileIMG || user?.imageUrl || ""
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameUpdating, setIsUsernameUpdating] = useState(false);
//   const [isImageUpdating, setIsImageUpdating] = useState(false);
//   const [lastLogin, setLastLogin] = useState(
//     strapiUser?.attributes?.LastLogin || formatUTCDateTime()
//   );
//   const [documentId, setDocumentId] = useState<string | null>(
//     strapiUser?.id || null
//   );
//   const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

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
//     setHasUsernameChanged(
//       username.trim() !==
//         (strapiUser?.attributes?.Username ||
//           user?.username ||
//           user?.firstName ||
//           "User")
//     );
//   }, [username, strapiUser, user]);

//   const handleImagePicker = async () => {
//     try {
//       setIsImageUpdating(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0] && documentId) {
//         const uploadedImageUrl = await uploadImage(result.assets[0].uri);

//         if (uploadedImageUrl) {
//           const success = await updateProfileImage(
//             documentId,
//             uploadedImageUrl
//           );

//           if (success) {
//             setImageUrl(uploadedImageUrl);
//             setStrapiUser((prev: any) => ({
//               ...prev,
//               attributes: {
//                 ...prev.attributes,
//                 ProfileIMG: uploadedImageUrl,
//               },
//             }));
//             Alert.alert("Success", "Profile picture updated successfully");
//           } else {
//             Alert.alert("Error", "Failed to update profile picture");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     } finally {
//       setIsImageUpdating(false);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       Alert.alert("Error", "Username cannot be empty");
//       return;
//     }

//     if (!documentId) {
//       Alert.alert("Error", "User profile not found");
//       return;
//     }

//     setIsUsernameUpdating(true);
//     try {
//       const success = await updateUsername(documentId, username.trim());

//       if (success) {
//         setStrapiUser((prev: any) => ({
//           ...prev,
//           attributes: {
//             ...prev.attributes,
//             Username: username.trim(),
//           },
//         }));
//         Alert.alert("Success", "Username updated successfully");
//         setHasUsernameChanged(false);
//       } else {
//         Alert.alert("Error", "Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       Alert.alert("Error", "Failed to update username. Please try again.");
//     } finally {
//       setIsUsernameUpdating(false);
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setIsLoading(true);
//           try {
//             if (documentId) {
//               await updateLastLogin(documentId);
//             }
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           } finally {
//             setIsLoading(false);
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
//               style={styles.profileImage}
//             />
//             {isImageUpdating && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={isImageUpdating}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!isUsernameUpdating}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={user?.primaryEmailAddress?.emailAddress}
//               editable={false}
//             />
//           </View>

//           {hasUsernameChanged && (
//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 isUsernameUpdating && styles.disabledButton,
//               ]}
//               onPress={handleUpdateUsername}
//               disabled={isUsernameUpdating}
//             >
//               {isUsernameUpdating ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Update Username</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[styles.signOutButton, isLoading && styles.disabledButton]}
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/*************************************** */

// import React, { useState, useEffect, useCallback } from "react";
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
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useStrapiUser } from "../../../../contexts/UserContext";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";

// interface UpdateState {
//   isLoading: boolean;
//   error: string | null;
//   success: boolean;
// }

// export default function Settings() {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();
//   const { strapiUser, updateStrapiUser, refreshStrapiUser, contextState } =
//     useStrapiUser();

//   const [username, setUsername] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [lastLogin, setLastLogin] = useState("");
//   const [refreshing, setRefreshing] = useState(false);
//   const [updateState, setUpdateState] = useState<UpdateState>({
//     isLoading: false,
//     error: null,
//     success: false,
//   });

//   // Initialize user data
//   useEffect(() => {
//     if (strapiUser) {
//       setUsername(strapiUser.attributes.Username);
//       setImageUrl(strapiUser.attributes.ProfileIMG);
//       setLastLogin(formatDateTime(strapiUser.attributes.LastLogin));
//     }
//   }, [strapiUser]);

//   const formatDateTime = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       return date.toISOString().replace("T", " ").slice(0, 19);
//     } catch (error) {
//       console.error("Date formatting error:", error);
//       return "N/A";
//     }
//   };

//   const showToast = (type: "success" | "error", message: string) => {
//     Toast.show({
//       type,
//       text1: message,
//       position: "top",
//       visibilityTime: 3000,
//       topOffset: insets.top + 10,
//     });
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await refreshStrapiUser();
//     } catch (error) {
//       console.error("Refresh error:", error);
//       showToast("error", "Failed to refresh data");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const handleImagePicker = async () => {
//     try {
//       setUpdateState((prev) => ({ ...prev, isLoading: true }));

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change profile picture."
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         // Here you would typically upload the image to your storage service
//         // and get back a URL. This is a placeholder for that process.
//         const uploadedImageUrl = result.assets[0].uri; // Replace with actual upload

//         const success = await updateStrapiUser({
//           ProfileIMG: uploadedImageUrl,
//         });

//         if (success) {
//           setImageUrl(uploadedImageUrl);
//           showToast("success", "Profile picture updated successfully");
//         } else {
//           throw new Error("Failed to update profile picture");
//         }
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       showToast("error", "Failed to update profile picture");
//     } finally {
//       setUpdateState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!username.trim()) {
//       showToast("error", "Username cannot be empty");
//       return;
//     }

//     setUpdateState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const success = await updateStrapiUser({
//         Username: username.trim(),
//       });

//       if (success) {
//         showToast("success", "Username updated successfully");
//       } else {
//         throw new Error("Failed to update username");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       showToast("error", "Failed to update username");
//     } finally {
//       setUpdateState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           setUpdateState((prev) => ({ ...prev, isLoading: true }));
//           try {
//             await SecureStore.deleteItemAsync("clerk_session");
//             await SecureStore.deleteItemAsync("user_preferences");
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Sign out error:", error);
//             showToast("error", "Failed to sign out");
//           } finally {
//             setUpdateState((prev) => ({ ...prev, isLoading: false }));
//           }
//         },
//       },
//     ]);
//   };

//   // Redirect to sign in if not authenticated
//   if (!user || !strapiUser) {
//     router.replace("/(root)/(auth)/sign-in");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={{
//           paddingBottom: insets.bottom + 20,
//         }}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: imageUrl || "https://via.placeholder.com/100",
//               }}
//               style={styles.profileImage}
//             />
//             {updateState.isLoading && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changePictureButton}
//               onPress={handleImagePicker}
//               disabled={updateState.isLoading}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.loginTimestamp}>Last Login: {lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={username}
//               onChangeText={setUsername}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!updateState.isLoading}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={strapiUser.attributes.Email}
//               editable={false}
//             />
//           </View>

//           {username !== strapiUser.attributes.Username && (
//             <Animated.View entering={SlideInRight} layout={Layout.springify()}>
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   updateState.isLoading && styles.disabledButton,
//                 ]}
//                 onPress={handleUpdateUsername}
//                 disabled={updateState.isLoading}
//               >
//                 {updateState.isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Update Username</Text>
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <View style={styles.menuSection}>
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
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.signOutButton,
//             updateState.isLoading && styles.disabledButton,
//           ]}
//           onPress={handleSignOut}
//           disabled={updateState.isLoading}
//         >
//           {updateState.isLoading ? (
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
//   header: {
//     alignItems: "center",
//     padding: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changePictureButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   loginTimestamp: {
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 8,
//     fontFamily: "Cairo",
//   },
//   form: {
//     padding: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     marginBottom: 8,
//     fontFamily: "Cairo-SemiBold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//     fontFamily: "Cairo",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   divider: {
//     height: 8,
//     backgroundColor: "#F7FAFC",
//     marginVertical: 20,
//   },
//   menuSection: {
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
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
//     margin: 20,
//     padding: 16,
//     borderRadius: 12,
//   },
//   signOutButtonText: {
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
// });

/************************************************* */

// import React, { useState, useCallback, useEffect } from "react";
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
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";

// const THEME_COLOR = "#E53E3E";

// interface SettingsState {
//   isLoading: boolean;
//   error: string | null;
//   success: boolean;
//   isDirty: boolean;
// }

// interface UserSettings {
//   username: string;
//   imageUrl: string;
//   lastLogin: string;
//   email: string;
// }

// export default function Settings() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const insets = useSafeAreaInsets();

//   const [settings, setSettings] = useState<UserSettings>({
//     username: "",
//     imageUrl: "",
//     lastLogin: "",
//     email: "",
//   });

//   const [state, setState] = useState<SettingsState>({
//     isLoading: true,
//     error: null,
//     success: false,
//     isDirty: false,
//   });

//   const [refreshing, setRefreshing] = useState(false);

//   // Format date to UTC YYYY-MM-DD HH:MM:SS
//   const formatDateTime = (date: Date = new Date()): string => {
//     return date.toISOString().replace("T", " ").slice(0, 19);
//   };

//   // Load user settings from secure storage
//   const loadUserSettings = async () => {
//     try {
//       const [storedSettings, lastLogin] = await Promise.all([
//         SecureStore.getItemAsync("userSettings"),
//         SecureStore.getItemAsync("lastLogin"),
//       ]);

//       if (storedSettings) {
//         const parsed = JSON.parse(storedSettings);
//         setSettings({
//           username: parsed.username || user?.username || "",
//           imageUrl: parsed.imageUrl || user?.imageUrl || "",
//           email: user?.primaryEmailAddress?.emailAddress || "",
//           lastLogin: lastLogin || formatDateTime(),
//         });
//       } else if (user) {
//         setSettings({
//           username: user.username || "",
//           imageUrl: user.imageUrl || "",
//           email: user.primaryEmailAddress?.emailAddress || "",
//           lastLogin: lastLogin || formatDateTime(),
//         });
//       }
//     } catch (error) {
//       console.error("Error loading settings:", error);
//       showToast("error", "Failed to load settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   // Initialize settings
//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace("/(root)/(auth)/sign-in");
//       return;
//     }
//     loadUserSettings();
//   }, [isSignedIn]);

//   const showToast = (type: "success" | "error" | "info", message: string) => {
//     Toast.show({
//       type,
//       text1: message,
//       position: "top",
//       visibilityTime: 3000,
//       topOffset: insets.top + 10,
//     });
//   };

//   const handleImagePick = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change profile picture."
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         const newImageUrl = result.assets[0].uri;
//         setSettings((prev) => ({ ...prev, imageUrl: newImageUrl }));
//         setState((prev) => ({ ...prev, isDirty: true }));
//         await saveSettings({ ...settings, imageUrl: newImageUrl });
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       showToast("error", "Failed to update profile picture");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const saveSettings = async (newSettings: UserSettings) => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await SecureStore.setItemAsync(
//         "userSettings",
//         JSON.stringify(newSettings)
//       );
//       showToast("success", "Settings saved successfully");
//       setState((prev) => ({ ...prev, isDirty: false, success: true }));
//     } catch (error) {
//       console.error("Error saving settings:", error);
//       showToast("error", "Failed to save settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleUsernameChange = (username: string) => {
//     setSettings((prev) => ({ ...prev, username }));
//     setState((prev) => ({ ...prev, isDirty: true }));
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setState((prev) => ({ ...prev, isLoading: true }));
//             // Clear all auth-related storage
//             await Promise.all([
//               SecureStore.deleteItemAsync("userSettings"),
//               SecureStore.deleteItemAsync("isAuthenticated"),
//               SecureStore.deleteItemAsync("sessionId"),
//               SecureStore.deleteItemAsync("lastLogin"),
//               SecureStore.deleteItemAsync("isGuestMode"),
//             ]);
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Sign out error:", error);
//             showToast("error", "Failed to sign out");
//           }
//         },
//       },
//     ]);
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSettings();
//       showToast("success", "Settings refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh settings");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   if (state.isLoading && !settings.username) {
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
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: settings.imageUrl || "https://via.placeholder.com/100",
//               }}
//               style={styles.profileImage}
//             />
//             {state.isLoading && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changeImageButton}
//               onPress={handleImagePick}
//               disabled={state.isLoading}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.lastLogin}>Last Login: {settings.lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={settings.username}
//               onChangeText={handleUsernameChange}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!state.isLoading}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={settings.email}
//               editable={false}
//             />
//           </View>

//           {state.isDirty && (
//             <Animated.View entering={SlideInRight} layout={Layout.springify()}>
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   state.isLoading && styles.buttonDisabled,
//                 ]}
//                 onPress={() => saveSettings(settings)}
//                 disabled={state.isLoading}
//               >
//                 {state.isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <TouchableOpacity
//           style={[
//             styles.signOutButton,
//             state.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignOut}
//           disabled={state.isLoading}
//         >
//           {state.isLoading ? (
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
//   imageContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changeImageButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     fontFamily: "Cairo",
//   },
//   form: {
//     gap: 16,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     fontFamily: "Cairo-SemiBold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//     fontFamily: "Cairo",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#E2E8F0",
//     marginVertical: 32,
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

// import React, { useState, useCallback, useEffect } from "react";
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
//   Platform,
//   RefreshControl,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../../../../contexts/UserContext";

// const THEME_COLOR = "#4CAF50";

// interface SettingsState {
//   isLoading: boolean;
//   error: string | null;
//   success: boolean;
//   isDirty: boolean;
// }

// interface UserSettings {
//   username: string;
//   imageUrl: string;
//   lastLogin: string;
//   email: string;
// }

// export default function Settings() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const { userData, updateUserData, formatDateTime } = useUserContext();
//   const insets = useSafeAreaInsets();

//   const [settings, setSettings] = useState<UserSettings>({
//     username: "",
//     imageUrl: "",
//     lastLogin: "",
//     email: "",
//   });

//   const [state, setState] = useState<SettingsState>({
//     isLoading: true,
//     error: null,
//     success: false,
//     isDirty: false,
//   });

//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace("/(root)/(auth)/sign-in");
//       return;
//     }
//     loadUserSettings();
//   }, [isSignedIn]);

//   const loadUserSettings = async () => {
//     try {
//       if (userData) {
//         setSettings({
//           username: userData.username,
//           imageUrl: userData.imageUrl,
//           email: userData.email,
//           lastLogin: userData.lastLogin,
//         });
//       }
//     } catch (error) {
//       console.error("Error loading settings:", error);
//       showToast("error", "Failed to load settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
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

//   const handleImagePick = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library."
//         );
//         return;
//       }
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });
//       if (!result.canceled && result.assets[0]) {
//         const newImageUrl = result.assets[0].uri;
//         setSettings((prev) => ({ ...prev, imageUrl: newImageUrl }));
//         setState((prev) => ({ ...prev, isDirty: true }));
//         await updateUserData({ imageUrl: newImageUrl });
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       showToast("error", "Failed to update profile picture");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleUsernameChange = (username: string) => {
//     setSettings((prev) => ({ ...prev, username }));
//     setState((prev) => ({ ...prev, isDirty: true }));
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setState((prev) => ({ ...prev, isLoading: true }));
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Sign out error:", error);
//             showToast("error", "Failed to sign out");
//           }
//         },
//       },
//     ]);
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSettings();
//       showToast("success", "Settings refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh settings");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   if (state.isLoading && !settings.username) {
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
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: settings.imageUrl || "https://via.placeholder.com/100",
//               }}
//               style={styles.profileImage}
//             />
//             {state.isLoading && (
//               <View style={styles.loadingOverlay}>
//                 <ActivityIndicator color="#fff" />
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.changeImageButton}
//               onPress={handleImagePick}
//               disabled={state.isLoading}
//             >
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.lastLogin}>Last Login: {settings.lastLogin}</Text>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={settings.username}
//               onChangeText={handleUsernameChange}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!state.isLoading}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={settings.email}
//               editable={false}
//             />
//           </View>

//           {state.isDirty && (
//             <Animated.View entering={SlideInRight} layout={Layout.springify()}>
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   state.isLoading && styles.buttonDisabled,
//                 ]}
//                 onPress={() => updateUserData({ username: settings.username })}
//                 disabled={state.isLoading}
//               >
//                 {state.isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <TouchableOpacity
//           style={[
//             styles.signOutButton,
//             state.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignOut}
//           disabled={state.isLoading}
//         >
//           {state.isLoading ? (
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
//   imageContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#F7FAFC",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changeImageButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4CAF50",
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     fontFamily: "Cairo",
//   },
//   form: {
//     gap: 16,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     fontFamily: "Cairo-SemiBold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//     fontFamily: "Cairo",
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#E2E8F0",
//     marginVertical: 32,
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

/********************************** */

// // /app/(root)/(tabs)/(more)/(settings)/index.tsx

// import React, { useState, useCallback, useEffect } from "react";
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
//   Platform,
//   RefreshControl,
//   Dimensions,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../../../../contexts/UserContext";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const THEME_COLOR = "#4CAF50";
// const CURRENT_UTC = "2025-03-01 12:31:35";

// interface SettingsState {
//   isLoading: boolean;
//   error: string | null;
//   success: boolean;
//   isDirty: boolean;
// }

// interface UserSettings {
//   username: string;
//   imageUrl: string;
//   lastLogin: string;
//   email: string;
// }
// function Settings() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const { userData, updateUserData } = useUserContext();
//   const insets = useSafeAreaInsets();

//   const [settings, setSettings] = useState<UserSettings>({
//     username: userData?.username || "MohamedAbbas004",
//     imageUrl: userData?.imageUrl || "",
//     lastLogin: CURRENT_UTC,
//     email: userData?.email || "",
//   });

//   const [state, setState] = useState<SettingsState>({
//     isLoading: false,
//     error: null,
//     success: false,
//     isDirty: false,
//   });

//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace("/(root)/(auth)/sign-in");
//       return;
//     }
//     loadUserSettings();
//   }, [isSignedIn, userData]);

//   const loadUserSettings = async () => {
//     try {
//       if (userData) {
//         setSettings({
//           username: userData.username || "MohamedAbbas004",
//           imageUrl: userData.imageUrl || "",
//           email: userData.email || "",
//           lastLogin: userData.lastLogin || CURRENT_UTC,
//         });
//       }
//     } catch (error) {
//       showToast("error", "Failed to load settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const showToast = (type: "success" | "error" | "info", message: string) => {
//     Toast.show({
//       type,
//       text1: message,
//       position: "top",
//       visibilityTime: 2000,
//       topOffset: insets.top + 10,
//     });
//   };

//   const handleImagePick = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library."
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         const newImageUrl = result.assets[0].uri;
//         setSettings((prev) => ({ ...prev, imageUrl: newImageUrl }));
//         setState((prev) => ({ ...prev, isDirty: true }));
//         await updateUserData({
//           imageUrl: newImageUrl,
//           lastUpdated: CURRENT_UTC,
//         });
//         showToast("success", "Profile picture updated");
//       }
//     } catch (error) {
//       showToast("error", "Failed to update profile picture");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleUsernameChange = (username: string) => {
//     setSettings((prev) => ({ ...prev, username }));
//     setState((prev) => ({ ...prev, isDirty: true }));
//   };

//   const handleSignOut = () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setState((prev) => ({ ...prev, isLoading: true }));
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             showToast("error", "Failed to sign out");
//           }
//         },
//       },
//     ]);
//   };

//   const handleSave = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await updateUserData({
//         username: settings.username,
//         lastUpdated: CURRENT_UTC,
//       });
//       setState((prev) => ({ ...prev, isDirty: false }));
//       showToast("success", "Settings saved successfully");
//     } catch (error) {
//       showToast("error", "Failed to save settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSettings();
//       showToast("success", "Settings refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh settings");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   if (state.isLoading && !settings.username) {
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
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <LinearGradient
//             colors={["rgba(76, 175, 80, 0.1)", "transparent"]}
//             style={styles.headerGradient}
//           >
//             <View style={styles.imageContainer}>
//               <Image
//                 source={{
//                   uri:
//                     settings.imageUrl ||
//                     `https://ui-avatars.com/api/?name=${settings.username}&background=4CAF50&color=fff`,
//                 }}
//                 style={styles.profileImage}
//               />
//               {state.isLoading && (
//                 <View style={styles.loadingOverlay}>
//                   <ActivityIndicator color="#fff" />
//                 </View>
//               )}
//               <TouchableOpacity
//                 style={styles.changeImageButton}
//                 onPress={handleImagePick}
//                 disabled={state.isLoading}
//               >
//                 <Ionicons name="camera" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.lastLogin}>
//               Last Login: {settings.lastLogin}
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={settings.username}
//               onChangeText={handleUsernameChange}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!state.isLoading}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={settings.email}
//               editable={false}
//             />
//           </View>

//           {state.isDirty && (
//             <Animated.View entering={SlideInRight} layout={Layout.springify()}>
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   state.isLoading && styles.buttonDisabled,
//                 ]}
//                 onPress={handleSave}
//                 disabled={state.isLoading}
//               >
//                 {state.isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <TouchableOpacity
//           style={[
//             styles.signOutButton,
//             state.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignOut}
//           disabled={state.isLoading}
//         >
//           {state.isLoading ? (
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
//     width: SCREEN_WIDTH - 40,
//     borderRadius: 16,
//     overflow: "hidden",
//     marginBottom: 32,
//   },
//   headerGradient: {
//     padding: 24,
//     alignItems: "center",
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F7FAFC",
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
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   changeImageButton: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: THEME_COLOR,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 3,
//     borderColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//     fontFamily: "Cairo",
//     marginTop: 8,
//   },
//   form: {
//     gap: 20,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//     fontFamily: "Cairo-SemiBold",
//     marginLeft: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: "#2D3748",
//     backgroundColor: "#fff",
//     fontFamily: "Cairo",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 1,
//       },
//     }),
//   },
//   disabledInput: {
//     backgroundColor: "#F7FAFC",
//     color: "#718096",
//   },
//   saveButton: {
//     backgroundColor: THEME_COLOR,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: THEME_COLOR,
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#E2E8F0",
//     marginVertical: 32,
//   },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53E3E",
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#E53E3E",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
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

// export default React.memo(Settings);

/************************************ */

// import React, { useState, useCallback, useEffect } from "react";
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
//   Platform,
//   RefreshControl,
//   Dimensions,
// } from "react-native";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   Layout,
//   SlideInRight,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { useUserContext } from "../../../../contexts/UserContext";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const THEME_COLOR = "#4CAF50";

// interface SettingsState {
//   isLoading: boolean;
//   error: string | null;
//   success: boolean;
//   isDirty: boolean;
// }

// interface UserSettings {
//   username: string;
//   imageUrl: string;
//   lastLogin: string;
//   email: string;
// }

// export default function Settings() {
//   const { user, isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const { userData, updateUserData, formatDateTime } = useUserContext();
//   const insets = useSafeAreaInsets();

//   const [settings, setSettings] = useState<UserSettings>({
//     username: userData?.username || "",
//     imageUrl: userData?.imageUrl || "",
//     lastLogin: userData?.lastLogin || "",
//     email: userData?.email || "",
//   });

//   const [state, setState] = useState<SettingsState>({
//     isLoading: false,
//     error: null,
//     success: false,
//     isDirty: false,
//   });

//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace("/(root)/(auth)/sign-in");
//       return;
//     }
//     loadUserSettings();
//   }, [isSignedIn, userData]);

//   const loadUserSettings = async () => {
//     try {
//       if (userData) {
//         setSettings({
//           username: userData.username,
//           imageUrl: userData.imageUrl,
//           email: userData.email,
//           lastLogin: userData.lastLogin,
//         });
//       }
//     } catch (error) {
//       showToast("error", "Failed to load settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
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

//   const handleImagePick = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library."
//         );
//         return;
//       }
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });
//       if (!result.canceled && result.assets[0]) {
//         const newImageUrl = result.assets[0].uri;
//         setSettings((prev) => ({ ...prev, imageUrl: newImageUrl }));
//         setState((prev) => ({ ...prev, isDirty: true }));
//         await updateUserData({ imageUrl: newImageUrl });
//         showToast("success", "Profile picture updated");
//       }
//     } catch (error) {
//       showToast("error", "Failed to update profile picture");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleUsernameChange = (username: string) => {
//     setSettings((prev) => ({ ...prev, username }));
//     setState((prev) => ({ ...prev, isDirty: true }));
//   };

//   const handleSave = async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true }));
//       await updateUserData({ username: settings.username });
//       setState((prev) => ({ ...prev, isDirty: false }));
//       showToast("success", "Settings saved successfully");
//     } catch (error) {
//       showToast("error", "Failed to save settings");
//     } finally {
//       setState((prev) => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleSignOut = () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setState((prev) => ({ ...prev, isLoading: true }));
//             await signOut();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             showToast("error", "Failed to sign out");
//           }
//         },
//       },
//     ]);
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await loadUserSettings();
//       showToast("success", "Settings refreshed");
//     } catch (error) {
//       showToast("error", "Failed to refresh settings");
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   if (state.isLoading && !settings.username) {
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
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
//           <LinearGradient
//             colors={["rgba(76, 175, 80, 0.1)", "transparent"]}
//             style={styles.headerGradient}
//           >
//             <View style={styles.imageContainer}>
//               <Image
//                 source={{
//                   uri:
//                     settings.imageUrl ||
//                     `https://ui-avatars.com/api/?name=${settings.username}&background=4CAF50&color=fff`,
//                 }}
//                 style={styles.profileImage}
//               />
//               {state.isLoading && (
//                 <View style={styles.loadingOverlay}>
//                   <ActivityIndicator color="#fff" />
//                 </View>
//               )}
//               <TouchableOpacity
//                 style={styles.changeImageButton}
//                 onPress={handleImagePick}
//                 disabled={state.isLoading}
//               >
//                 <Ionicons name="camera" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.lastLogin}>
//               Last Login: {formatDateTime(new Date(settings.lastLogin))}
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               value={settings.username}
//               onChangeText={handleUsernameChange}
//               placeholder="Enter username"
//               placeholderTextColor="#A0AEC0"
//               editable={!state.isLoading}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={settings.email}
//               editable={false}
//             />
//           </View>

//           {state.isDirty && (
//             <Animated.View entering={SlideInRight} layout={Layout.springify()}>
//               <TouchableOpacity
//                 style={[
//                   styles.saveButton,
//                   state.isLoading && styles.buttonDisabled,
//                 ]}
//                 onPress={handleSave}
//                 disabled={state.isLoading}
//               >
//                 {state.isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </Animated.View>

//         <View style={styles.divider} />

//         <TouchableOpacity
//           style={[
//             styles.signOutButton,
//             state.isLoading && styles.buttonDisabled,
//           ]}
//           onPress={handleSignOut}
//           disabled={state.isLoading}
//         >
//           {state.isLoading ? (
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
//   container: { flex: 1, backgroundColor: "#fff" },
//   scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },
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
//   imageContainer: { position: "relative", marginBottom: 16 },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
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
//   loadingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.3)",
//     borderRadius: 60,
//   },
//   changeImageButton: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     backgroundColor: THEME_COLOR,
//     borderRadius: 20,
//     padding: 8,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   lastLogin: { fontSize: 14, color: "#6B7280", fontFamily: "Cairo" },
//   form: { gap: 16 },
//   inputGroup: { gap: 8 },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#374151",
//     fontFamily: "Cairo-SemiBold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: "#111827",
//     backgroundColor: "#F9FAFB",
//     fontFamily: "Cairo",
//   },
//   disabledInput: { backgroundColor: "#E5E7EB", color: "#6B7280" },
//   saveButton: {
//     backgroundColor: THEME_COLOR,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: "Cairo-SemiBold",
//   },
//   divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 24 },
//   signOutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#EF4444",
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
//   buttonDisabled: { opacity: 0.7 },
// });

/************************************ */

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  FadeIn,
  FadeInDown,
  Layout,
  SlideInRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useUserContext } from "../../../../contexts/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;
const THEME_COLOR = "#4CAF50";

interface SettingsState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isDirty: boolean;
}

interface UserSettings {
  username: string;
  imageUrl: string;
  lastLogin: string;
  email: string;
}

export default function Settings() {
  const { user, isSignedIn } = useUser();
  const { userData, updateUserData, formatDateTime, signOutUser } =
    useUserContext();
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState<UserSettings>({
    username: userData?.username || "",
    imageUrl: userData?.imageUrl || "",
    lastLogin: userData?.lastLogin || "",
    email: userData?.email || "",
  });

  const [state, setState] = useState<SettingsState>({
    isLoading: false,
    error: null,
    success: false,
    isDirty: false,
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/(root)/(auth)/sign-in");
      return;
    }
    loadUserSettings();
  }, [isSignedIn, userData]);

  const loadUserSettings = async () => {
    try {
      if (userData) {
        setSettings({
          username: userData.username,
          imageUrl: userData.imageUrl,
          email: userData.email,
          lastLogin: userData.lastLogin,
        });
      }
    } catch (error) {
      showToast("error", "Failed to load settings");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const showToast = (type: "success" | "error" | "info", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      visibilityTime: 3000,
      topOffset: insets.top + 10,
    });
  };

  const handleImagePick = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library."
        );
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        const newImageUrl = result.assets[0].uri;
        setSettings((prev) => ({ ...prev, imageUrl: newImageUrl }));
        setState((prev) => ({ ...prev, isDirty: true }));
        await updateUserData({ imageUrl: newImageUrl });
        showToast("success", "Profile picture updated");
      }
    } catch (error) {
      showToast("error", "Failed to update profile picture");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleUsernameChange = (username: string) => {
    setSettings((prev) => ({ ...prev, username }));
    setState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleSave = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      await updateUserData({ username: settings.username });
      setState((prev) => ({ ...prev, isDirty: false }));
      showToast("success", "Settings saved successfully");
    } catch (error) {
      showToast("error", "Failed to save settings");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            setState((prev) => ({ ...prev, isLoading: true }));
            await signOutUser();
          } catch (error) {
            showToast("error", "Failed to sign out");
          }
        },
      },
    ]);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadUserSettings();
      showToast("success", "Settings refreshed");
    } catch (error) {
      showToast("error", "Failed to refresh settings");
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (state.isLoading && !settings.username) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLOR} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#F9FAFB",
          },
          headerTitle: "Settings",
          headerTitleStyle: {
            color: "#1F2937",
          },
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <LinearGradient
            colors={["rgba(76, 175, 80, 0.1)", "transparent"]}
            style={styles.headerGradient}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    settings.imageUrl ||
                    `https://ui-avatars.com/api/?name=${settings.username}&background=4CAF50&color=fff`,
                }}
                style={styles.profileImage}
              />
              {state.isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator color="#fff" />
                </View>
              )}
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={handleImagePick}
                disabled={state.isLoading}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.lastLogin}>
              Last Login: {formatDateTime(new Date(settings.lastLogin))}
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={settings.username}
              onChangeText={handleUsernameChange}
              placeholder="Enter username"
              placeholderTextColor="#A0AEC0"
              editable={!state.isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={settings.email}
              editable={false}
            />
          </View>

          {state.isDirty && (
            <Animated.View entering={SlideInRight} layout={Layout.springify()}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  state.isLoading && styles.buttonDisabled,
                ]}
                onPress={handleSave}
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[
            styles.signOutButton,
            state.isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSignOut}
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },
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
  imageContainer: { position: "relative", marginBottom: 16 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 60,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: THEME_COLOR,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  lastLogin: { fontSize: 14, color: "#6B7280", fontFamily: "Cairo" },
  form: { gap: 16 },
  inputGroup: { gap: 8 },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    fontFamily: "Cairo-SemiBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F9FAFB",
    fontFamily: "Cairo",
  },
  disabledInput: { backgroundColor: "#E5E7EB", color: "#6B7280" },
  saveButton: {
    backgroundColor: THEME_COLOR,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Cairo-SemiBold",
  },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 24 },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Cairo-SemiBold",
  },
  buttonDisabled: { opacity: 0.7 },
});
