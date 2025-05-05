// import React from "react";
// import {
//   Modal,
//   View,
//   StyleSheet,
//   Pressable,
//   Dimensions,
//   Platform,
// } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   withTiming,
//   runOnJS,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import UserProfileContent from "./UserProfileContent";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

// interface UserProfileModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const UserProfileModal: React.FC<UserProfileModalProps> = ({
//   visible,
//   onClose,
// }) => {
//   const translateY = useSharedValue(0);
//   const context = useSharedValue({ y: 0 });

//   const scrollTo = React.useCallback((destination: number) => {
//     "worklet";
//     translateY.value = withSpring(destination, { damping: 50 });
//   }, []);

//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       context.value = { y: translateY.value };
//     })
//     .onUpdate((event) => {
//       translateY.value = event.translationY + context.value.y;
//       translateY.value = Math.max(MAX_TRANSLATE_Y, translateY.value);
//     })
//     .onEnd(() => {
//       if (translateY.value > -SCREEN_HEIGHT / 3) {
//         runOnJS(onClose)();
//       } else {
//         scrollTo(MAX_TRANSLATE_Y);
//       }
//     });

//   const rBottomSheetStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//     };
//   });

//   React.useEffect(() => {
//     if (visible) {
//       translateY.value = withSpring(-SCREEN_HEIGHT * 0.7, {
//         damping: 50,
//       });
//     } else {
//       translateY.value = withTiming(0);
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       statusBarTranslucent
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <Pressable style={styles.background} onPress={onClose} />
//         <GestureDetector gesture={gesture}>
//           <Animated.View style={[styles.container, rBottomSheetStyle]}>
//             <View style={styles.handle} />
//             <UserProfileContent onClose={onClose} />
//           </Animated.View>
//         </GestureDetector>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "transparent",
//   },
//   background: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   container: {
//     height: SCREEN_HEIGHT,
//     width: "100%",
//     backgroundColor: "white",
//     position: "absolute",
//     top: SCREEN_HEIGHT,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: -2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   handle: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#DDD",
//     alignSelf: "center",
//     marginTop: 10,
//     borderRadius: 2,
//   },
// });

// export default UserProfileModal;

/**************************************************** */

// import React, { useCallback, useEffect } from "react";
// import {
//   Modal,
//   View,
//   StyleSheet,
//   Pressable,
//   Dimensions,
//   Platform,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Linking,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   withTiming,
//   runOnJS,
//   FadeIn,
//   interpolate,
//   Extrapolate,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { format } from "date-fns";
// import * as ImagePicker from "expo-image-picker";
// import { uploadImageToStrapi } from "../../Utils/api.auth";
// import { useStrapiUser } from "../../contexts/UserContext";
// import AccountItem from "./AccountItem";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
// const SPRING_CONFIG = {
//   damping: 50,
//   stiffness: 300,
// };

// interface UserProfileModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const UserProfileModal: React.FC<UserProfileModalProps> = ({
//   visible,
//   onClose,
// }) => {
//   const insets = useSafeAreaInsets();
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const { strapiUser, updateStrapiUser, isLoading } = useStrapiUser();

//   const translateY = useSharedValue(0);
//   const context = useSharedValue({ y: 0 });
//   const active = useSharedValue(false);

//   useEffect(() => {
//     if (visible) {
//       translateY.value = withSpring(-SCREEN_HEIGHT * 0.7, SPRING_CONFIG);
//     } else {
//       translateY.value = withTiming(0, { duration: 250 });
//     }
//   }, [visible]);

//   const scrollTo = useCallback((destination: number) => {
//     "worklet";
//     active.value = destination !== 0;
//     translateY.value = withSpring(destination, SPRING_CONFIG);
//   }, []);

//   const onClose2 = useCallback(() => {
//     "worklet";
//     runOnJS(onClose)();
//   }, [onClose]);

//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       context.value = { y: translateY.value };
//     })
//     .onUpdate((event) => {
//       translateY.value = Math.max(
//         MAX_TRANSLATE_Y,
//         event.translationY + context.value.y
//       );
//     })
//     .onEnd((event) => {
//       if (event.velocityY > 500) {
//         onClose2();
//       } else if (translateY.value > -SCREEN_HEIGHT * 0.4) {
//         onClose2();
//       } else {
//         scrollTo(MAX_TRANSLATE_Y * 0.7);
//       }
//     });

//   const handleUpdateProfileImage = async () => {
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
//         const uploadResult = await uploadImageToStrapi(result.assets[0].uri);
//         await updateStrapiUser({
//           ProfileIMG: uploadResult.url,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile image:", error);
//       Alert.alert(
//         "Error",
//         "Failed to update profile picture. Please try again."
//       );
//     }
//   };

//   const handleSignOut = async () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await signOut();
//             onClose();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             console.error("Error signing out:", error);
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           }
//         },
//       },
//     ]);
//   };

//   const rModalStyle = useAnimatedStyle(() => {
//     const borderRadius = interpolate(
//       translateY.value,
//       [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
//       [25, 5],
//       Extrapolate.CLAMP
//     );

//     return {
//       transform: [{ translateY: translateY.value }],
//       borderTopLeftRadius: borderRadius,
//       borderTopRightRadius: borderRadius,
//     };
//   });

//   const rBackdropStyle = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(
//         translateY.value,
//         [0, MAX_TRANSLATE_Y],
//         [0, 0.5],
//         Extrapolate.CLAMP
//       ),
//     };
//   });

//   if (!visible) return null;

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       statusBarTranslucent
//       animationType="none"
//       onRequestClose={onClose}
//     >
//       <Animated.View
//         entering={FadeIn}
//         style={[styles.backdrop, rBackdropStyle]}
//       />
//       <GestureDetector gesture={gesture}>
//         <Animated.View style={[styles.container, rModalStyle]}>
//           <View
//             style={[styles.content, { paddingBottom: insets.bottom || 20 }]}
//           >
//             <View style={styles.header}>
//               <View style={styles.handleContainer}>
//                 <View style={styles.handle} />
//               </View>

//               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.profileSection}>
//               <TouchableOpacity
//                 onPress={handleUpdateProfileImage}
//                 disabled={isLoading}
//                 style={styles.imageContainer}
//               >
//                 <Image
//                   source={{
//                     uri:
//                       strapiUser?.attributes?.ProfileIMG ||
//                       user?.imageUrl ||
//                       "https://via.placeholder.com/100",
//                   }}
//                   style={styles.profileImage}
//                 />
//                 <View style={styles.editIconContainer}>
//                   <Ionicons name="camera" size={18} color="#fff" />
//                 </View>
//               </TouchableOpacity>

//               <Text style={styles.username}>
//                 {user?.username || user?.firstName || "User"}
//               </Text>
//               <Text style={styles.email}>
//                 {user?.primaryEmailAddress?.emailAddress}
//               </Text>
//             </View>

//             <View style={styles.menuSection}>
//               <AccountItem
//                 icon="person-outline"
//                 label="Profile Settings"
//                 onPress={() => {
//                   onClose();
//                   router.push("/(root)/(tabs)/(more)/(Settings)");
//                 }}
//               />
//               <AccountItem
//                 icon="receipt-outline"
//                 label="Order History"
//                 onPress={() => {
//                   onClose();
//                   router.push("/(root)/(tabs)/(more)/(Settings)");
//                 }}
//               />
//               <AccountItem
//                 icon="heart-outline"
//                 label="Wishlist"
//                 onPress={() => {
//                   onClose();
//                   router.push("/(root)/(tabs)/(more)/(Settings)");
//                 }}
//               />
//               <AccountItem
//                 icon="log-out-outline"
//                 label="Sign Out"
//                 onPress={handleSignOut}
//                 isDestructive
//               />
//             </View>
//           </View>
//         </Animated.View>
//       </GestureDetector>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//     opacity: 0,
//   },
//   container: {
//     height: SCREEN_HEIGHT,
//     width: "100%",
//     backgroundColor: "#fff",
//     position: "absolute",
//     top: SCREEN_HEIGHT,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   content: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   handleContainer: {
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   handle: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#DDD",
//     borderRadius: 2,
//   },
//   closeButton: {
//     position: "absolute",
//     right: 20,
//     top: 10,
//     padding: 10,
//   },
//   profileSection: {
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: "#E53E3E",
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
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 16,
//     color: "#4A5568",
//   },
//   menuSection: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     gap: 12,
//   },
// });

// export default UserProfileModal;

/*************************************** */

// import React, { useCallback, useState } from "react";
// import {
//   Modal,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Image,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   withTiming,
//   runOnJS,
//   interpolate,
//   Extrapolate,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useAuth } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import { useStrapiUser } from "../../contexts/UserContext";
// import { getCurrentUTCTimestamp } from "../../Utils/dateUtils";

// interface UserProfileModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const SCREEN_HEIGHT = Platform.select({
//   ios: 812,
//   android: 800,
//   default: 800,
// });

// const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
// const SPRING_CONFIG = {
//   damping: 50,
//   stiffness: 300,
// };

// const UserProfileModal: React.FC<UserProfileModalProps> = ({
//   visible,
//   onClose,
// }) => {
//   const insets = useSafeAreaInsets();
//   const { signOut } = useAuth();
//   const { strapiUser, updateProfileImage } = useStrapiUser();
//   const [isLoading, setIsLoading] = useState(false);

//   const translateY = useSharedValue(0);
//   const context = useSharedValue({ y: 0 });

//   // Animation handlers
//   const scrollTo = useCallback((destination: number) => {
//     "worklet";
//     translateY.value = withSpring(destination, SPRING_CONFIG);
//   }, []);

//   const onCloseAnimated = useCallback(() => {
//     "worklet";
//     runOnJS(onClose)();
//   }, [onClose]);

//   // Gesture handler
//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       context.value = { y: translateY.value };
//     })
//     .onUpdate((event) => {
//       translateY.value = Math.max(
//         MAX_TRANSLATE_Y,
//         event.translationY + context.value.y
//       );
//     })
//     .onEnd((event) => {
//       if (event.velocityY > 500) {
//         onCloseAnimated();
//       } else if (translateY.value > -SCREEN_HEIGHT * 0.4) {
//         onCloseAnimated();
//       } else {
//         scrollTo(MAX_TRANSLATE_Y * 0.7);
//       }
//     });

//   // Animated styles
//   const rBottomSheetStyle = useAnimatedStyle(() => {
//     const borderRadius = interpolate(
//       translateY.value,
//       [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
//       [25, 5],
//       Extrapolate.CLAMP
//     );

//     return {
//       transform: [{ translateY: translateY.value }],
//       borderTopLeftRadius: borderRadius,
//       borderTopRightRadius: borderRadius,
//     };
//   });

//   const rBackdropStyle = useAnimatedStyle(() => ({
//     opacity: interpolate(
//       translateY.value,
//       [0, MAX_TRANSLATE_Y],
//       [0, 0.5],
//       Extrapolate.CLAMP
//     ),
//   }));

//   // Handle profile image update
//   const handleImagePicker = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to change your profile picture."
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

//   // Handle sign out
//   const handleSignOut = () => {
//     Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Sign Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await signOut();
//             onClose();
//             router.replace("/(root)/(auth)/sign-in");
//           } catch (error) {
//             Alert.alert("Error", "Failed to sign out. Please try again.");
//           }
//         },
//       },
//     ]);
//   };

//   // Effect to handle modal animation
//   React.useEffect(() => {
//     if (visible) {
//       translateY.value = withSpring(-SCREEN_HEIGHT * 0.7, SPRING_CONFIG);
//     } else {
//       translateY.value = withTiming(0, { duration: 250 });
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       statusBarTranslucent
//       animationType="none"
//       onRequestClose={onClose}
//     >
//       <Animated.View style={[styles.backdrop, rBackdropStyle]} />
//       <GestureDetector gesture={gesture}>
//         <Animated.View style={[styles.container, rBottomSheetStyle]}>
//           <View style={[styles.content, { paddingBottom: insets.bottom }]}>
//             {/* Header */}
//             <View style={styles.header}>
//               <View style={styles.handleContainer}>
//                 <View style={styles.handle} />
//               </View>
//               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>

//             {/* Profile Section */}
//             <View style={styles.profileSection}>
//               <TouchableOpacity
//                 onPress={handleImagePicker}
//                 disabled={isLoading}
//                 style={styles.imageContainer}
//               >
//                 <Image
//                   source={{
//                     uri:
//                       strapiUser?.attributes?.ProfileIMG ||
//                       "https://via.placeholder.com/100",
//                   }}
//                   style={styles.profileImage}
//                 />
//                 {isLoading ? (
//                   <View style={styles.loadingOverlay}>
//                     <ActivityIndicator color="#fff" />
//                   </View>
//                 ) : (
//                   <View style={styles.editIconContainer}>
//                     <Ionicons name="camera" size={18} color="#fff" />
//                   </View>
//                 )}
//               </TouchableOpacity>

//               <Text style={styles.username}>
//                 {strapiUser?.attributes?.Username || "User"}
//               </Text>
//               <Text style={styles.email}>{strapiUser?.attributes?.Email}</Text>
//               <Text style={styles.lastLogin}>
//                 Last login: {getCurrentUTCTimestamp()}
//               </Text>
//             </View>

//             {/* Menu Items */}
//             <View style={styles.menuSection}>
//               <TouchableOpacity
//                 style={styles.menuItem}
//                 onPress={() => {
//                   onClose();
//                   router.push("/(root)/(tabs)/(more)/(Settings)/Orders");
//                 }}
//               >
//                 <Ionicons name="receipt-outline" size={24} color="#4A5568" />
//                 <Text style={styles.menuItemText}>Order History</Text>
//                 <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.menuItem}
//                 onPress={() => {
//                   onClose();
//                   router.push("/(root)/(tabs)/(more)/(Settings)");
//                 }}
//               >
//                 <Ionicons name="settings-outline" size={24} color="#4A5568" />
//                 <Text style={styles.menuItemText}>Settings</Text>
//                 <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.menuItem, styles.signOutItem]}
//                 onPress={handleSignOut}
//               >
//                 <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
//                 <Text style={[styles.menuItemText, styles.signOutText]}>
//                   Sign Out
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>
//       </GestureDetector>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#000",
//     opacity: 0,
//   },
//   container: {
//     height: SCREEN_HEIGHT,
//     width: "100%",
//     backgroundColor: "#fff",
//     position: "absolute",
//     top: SCREEN_HEIGHT,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   handleContainer: {
//     paddingVertical: 10,
//   },
//   handle: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#DDD",
//     borderRadius: 2,
//   },
//   closeButton: {
//     position: "absolute",
//     right: 0,
//     top: 10,
//     padding: 10,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 30,
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
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 16,
//     color: "#4A5568",
//     marginBottom: 4,
//   },
//   lastLogin: {
//     fontSize: 14,
//     color: "#718096",
//   },
//   menuSection: {
//     gap: 16,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     padding: 16,
//     borderRadius: 12,
//   },
//   menuItemText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   signOutItem: {
//     marginTop: 8,
//     backgroundColor: "#FFF5F5",
//   },
//   signOutText: {
//     color: "#E53E3E",
//   },
// });

// export default UserProfileModal;

/*********************************** */
import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useStrapiUser } from "../../contexts/UserContext";
import { getCurrentUTCTimestamp } from "../../Utils/dateUtils";

interface UserProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const SCREEN_HEIGHT = Platform.select({
  ios: 812,
  android: 800,
  default: 800,
});

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const SPRING_CONFIG = {
  damping: 50,
  stiffness: 300,
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { strapiUser, updateProfileImage } = useStrapiUser();
  const [isLoading, setIsLoading] = useState(false);

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  // Animation handlers
  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, SPRING_CONFIG);
  }, []);

  const onCloseAnimated = useCallback(() => {
    "worklet";
    runOnJS(onClose)();
  }, [onClose]);

  // Gesture handler
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        MAX_TRANSLATE_Y,
        event.translationY + context.value.y
      );
    })
    .onEnd((event) => {
      if (event.velocityY > 500) {
        onCloseAnimated();
      } else if (translateY.value > -SCREEN_HEIGHT * 0.4) {
        onCloseAnimated();
      } else {
        scrollTo(MAX_TRANSLATE_Y * 0.7);
      }
    });

  // Animated styles
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [0, 0.5],
      Extrapolate.CLAMP
    ),
  }));

  // Handle profile image update
  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to change your profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        await updateProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update profile picture. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            onClose();
            router.replace("/(root)/(auth)/sign-in");
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.");
          }
        },
      },
    ]);
  };

  // Effect to handle modal animation
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(-SCREEN_HEIGHT * 0.7, SPRING_CONFIG);
    } else {
      translateY.value = withTiming(0, { duration: 250 });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, rBackdropStyle]} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View style={[styles.content, { paddingBottom: insets.bottom }]}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <TouchableOpacity
                onPress={handleImagePicker}
                disabled={isLoading}
                style={styles.imageContainer}
              >
                <Image
                  source={{
                    uri:
                      strapiUser?.attributes?.ProfileIMG ||
                      "https://via.placeholder.com/100",
                  }}
                  style={styles.profileImage}
                />
                {isLoading ? (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator color="#fff" />
                  </View>
                ) : (
                  <View style={styles.editIconContainer}>
                    <Ionicons name="camera" size={18} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              <Text style={styles.username}>
                {strapiUser?.attributes?.Username || "User"}
              </Text>
              <Text style={styles.email}>{strapiUser?.attributes?.Email}</Text>
              <Text style={styles.lastLogin}>
                Last login: {getCurrentUTCTimestamp()}
              </Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuSection}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  router.push("/(root)/(tabs)/(more)/(Settings)/Orders");
                }}
              >
                <Ionicons name="receipt-outline" size={24} color="#4A5568" />
                <Text style={styles.menuItemText}>Order History</Text>
                <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  router.push("/(root)/(tabs)/(more)/(Settings)");
                }}
              >
                <Ionicons name="settings-outline" size={24} color="#4A5568" />
                <Text style={styles.menuItemText}>Settings</Text>
                <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, styles.signOutItem]}
                onPress={handleSignOut}
              >
                <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
                <Text style={[styles.menuItemText, styles.signOutText]}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0,
  },
  container: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  handleContainer: {
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 10,
    padding: 10,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F7FAFC",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#E53E3E",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A202C",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 4,
  },
  lastLogin: {
    fontSize: 14,
    color: "#718096",
  },
  menuSection: {
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    padding: 16,
    borderRadius: 12,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
  },
  signOutItem: {
    marginTop: 8,
    backgroundColor: "#FFF5F5",
  },
  signOutText: {
    color: "#E53E3E",
  },
});

export default UserProfileModal;
