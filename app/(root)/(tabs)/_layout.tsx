// import { View, Text } from "react-native";
// import { Tabs } from "expo-router";
// import React from "react";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// const TabsLayout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           position: "absolute",
//           borderTopColor: "#0061FF1A",
//           borderTopWidth: 1,
//           minHeight: 70,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Entypo name="home" size={24} color="black" />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="blog"
//         options={{
//           title: "Blog",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons name="post" size={24} color="black" />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="store"
//         options={{
//           title: "Store",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <FontAwesome5 name="store" size={24} color="black" />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="more"
//         options={{
//           title: "More",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Feather name="more-horizontal" size={24} color="black" />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;

/***************************** */
// import React from "react";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// const TabsLayout: React.FC = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           position: "absolute",
//           borderTopColor: "#E5E7EB", // Light grey for a minimalist look
//           borderTopWidth: 1,
//           height: 70,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Entypo name="home" size={24} color={focused ? "blue" : "black"} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="blog"
//         options={{
//           title: "Blog",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons
//               name="post"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="store"
//         options={{
//           title: "Store",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <FontAwesome5
//               name="store"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="more"
//         options={{
//           title: "More",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialIcons
//               name="more-horiz"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;

/************************************* */
// import React from "react";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// const TabsLayout: React.FC = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           position: "absolute",
//           borderTopColor: "#E5E7EB", // Light grey for a minimalist look
//           borderTopWidth: 1,
//           height: 70,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Entypo name="home" size={24} color={focused ? "blue" : "black"} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="blog"
//         options={{
//           title: "Blog",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons
//               name="post"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="store"
//         options={{
//           title: "Store",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <FontAwesome5
//               name="store"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="more"
//         options={{
//           title: "More",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Feather
//               name="settings"
//               size={24}
//               color={focused ? "blue" : "black"}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;
/***************************** */

// // app/_layout.tsx
// import React from "react";
// import { View, Text, StatusBar, StyleSheet } from "react-native";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import { Header } from "../../Components/header/Header";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// // import SearchBar from "../../Components/Search/Searchbar";
// import SearchBar from "../../Components/SearchBar";
// import CartButton from "../../Components/Cart/CartButton";
// import Logo from "@/app/Components/LOGO/Logo";
// import { Stack, useNavigation } from "expo-router";
// import Locator from "@/app/Components/StoreLocator/Locator";

// const COLORS = {
//   primary: "#E53E3E", // red
//   secondary: "#38A169", // green
//   inactive: "#718096", // gray
//   background: "#FFFFFF",
//   text: "#000",
// };

// // In your layout component
// const suggestions = [
//   "Electronics",
//   "Clothing",
//   "Accessories",
//   "Home & Garden",
//   // Add more based on your products
// ];

// const TabsLayout: React.FC = () => {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
//         <View style={{ backgroundColor: COLORS.background }}>
//           <View>
//             <Locator />
//           </View>
//           <View className="flex flex-row justify-between items-center place-items-center py-1 px-2 mx-4">
//             <View className=" w-20 h-20">
//               <Logo />
//             </View>
//             <View className="">
//               <CartButton />
//             </View>
//           </View>
//           <View className="w-full ">
//             <SearchBar
//               onSearch={(text) => {
//                 // Implement your search logic here
//                 console.log("Searching for:", text);
//               }}
//               suggestions={suggestions}
//             />
//           </View>
//         </View>

//         {/* <Header showInScreen="index" /> */}
//         <Tabs
//           screenOptions={{
//             headerShown: false,
//             tabBarStyle: {
//               backgroundColor: COLORS.background,
//               borderTopColor: "#F3F4F6",
//               borderTopWidth: 1,
//               height: 60,
//               paddingBottom: 4,
//               paddingTop: 4,
//             },
//             tabBarActiveTintColor: COLORS.primary,
//             tabBarInactiveTintColor: COLORS.inactive,
//           }}
//         >
//           <Tabs.Screen
//             name="index"
//             options={{
//               title: "Home",
//               headerStyle: { backgroundColor: COLORS.primary },
//               headerTintColor: "#fff",
//               tabBarIcon: ({ focused, color }) => (
//                 <Entypo name="home" size={24} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="(blog)"
//             options={{
//               title: "Blog",
//               headerStyle: { backgroundColor: COLORS.secondary },
//               headerTintColor: "#fff",
//               tabBarIcon: ({ focused, color }) => (
//                 <MaterialCommunityIcons name="post" size={24} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="(store)"
//             options={{
//               title: "Store",
//               headerStyle: { backgroundColor: COLORS.primary },
//               headerTintColor: "#fff",
//               tabBarIcon: ({ focused, color }) => (
//                 <FontAwesome5 name="store" size={24} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="(more)"
//             options={{
//               title: "More",
//               headerStyle: { backgroundColor: COLORS.secondary },
//               headerTintColor: "#fff",
//               tabBarIcon: ({ focused, color }) => (
//                 <Feather name="settings" size={24} color={color} />
//               ),
//             }}
//           />
//         </Tabs>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
// });
// export default TabsLayout;

/************************************************ */

// import React from "react";
// import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";
// import { Link, Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
//   Extrapolation,
// } from "react-native-reanimated";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { Header } from "../../Components/header/Header";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SearchBar from "../../Components/SearchBar";
// import CartButton from "../../Components/Cart/CartButton";
// import Logo from "@/app/Components/LOGO/Logo";
// import { Stack, useNavigation } from "expo-router";
// import Locator from "@/app/Components/StoreLocator/Locator";
// import { User } from "lucide-react-native";

// const COLORS = {
//   primary: "#E53E3E", // red
//   secondary: "#38A169", // green
//   inactive: "#718096", // gray
//   background: "#FFFFFF",
//   text: "#000",
// };

// const suggestions = ["Electronics", "Clothing", "Accessories", "Home & Garden"];

// // const AnimatedTabIcon = ({
// //   icon: Icon,
// //   name,
// //   color,
// //   focused,
// // }: {
// //   icon: any;
// //   name: string;
// //   color: string;
// //   focused: boolean;
// // }) => {
// //   const scale = useSharedValue(1);

// //   const tapGesture = Gesture.Tap()
// //     .onTouchDown(() => {
// //       scale.value = withSpring(0.8);
// //     })
// //     .onTouchUp(() => {
// //       scale.value = withSpring(1);
// //     });

// //   const animatedStyle = useAnimatedStyle(() => {
// //     return {
// //       transform: [
// //         { scale: scale.value },
// //         {
// //           scale: interpolate(
// //             scale.value,
// //             [0.8, 1],
// //             [1, 1.2],
// //             Extrapolation.CLAMP
// //           ),
// //         },
// //       ],
// //       opacity: interpolate(
// //         scale.value,
// //         [0.8, 1],
// //         [0.7, 1],
// //         Extrapolation.CLAMP
// //       ),
// //     };
// //   });

// //   return (
// //     <GestureDetector gesture={tapGesture}>
// //       <Animated.View style={[animatedStyle]}>
// //         <Icon name={name} size={24} color={color} />
// //       </Animated.View>
// //     </GestureDetector>
// //   );
// // };

// const AnimatedTabIcon = ({
//   icon: Icon,
//   name,
//   color,
//   focused,
// }: {
//   icon: any;
//   name: string;
//   color: string;
//   focused: boolean;
// }) => {
//   const scale = useSharedValue(1);

//   const tapGesture = Gesture.Tap()
//     .onBegin(() => {
//       scale.value = withSpring(0.8);
//     })
//     .onEnd(() => {
//       scale.value = withSpring(1);
//     });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },
//         {
//           scale: interpolate(
//             scale.value,
//             [0.8, 1],
//             [1, 1.2],
//             Extrapolation.CLAMP
//           ),
//         },
//       ],
//       opacity: interpolate(
//         scale.value,
//         [0.8, 1],
//         [0.7, 1],
//         Extrapolation.CLAMP
//       ),
//     };
//   });

//   return (
//     <GestureDetector gesture={tapGesture}>
//       <Animated.View style={[animatedStyle]}>
//         <Icon name={name} size={24} color={color} />
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const TabsLayout: React.FC = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.primary}
//           />
//           <View style={{ backgroundColor: COLORS.background }}>
//             <View>
//               <Locator />
//             </View>
//             <View className="flex flex-row justify-between items-center place-items-center py-1 px-2 mx-4">
//               <View className=" flex-row w-20 h-20">
//                 <Logo />
//                 <View className="gap-4">
//                   <Link href="/LoginScreen" asChild>
//                     <Pressable>
//                       <User color="red" size={48} />
//                     </Pressable>
//                   </Link>
//                 </View>
//               </View>
//               <View>
//                 <CartButton />
//               </View>
//             </View>
//             <View className="w-full ">
//               <SearchBar
//                 onSearch={(text) => {
//                   console.log("Searching for:", text);
//                 }}
//                 suggestions={suggestions}
//               />
//             </View>
//           </View>

//           <Tabs
//             screenOptions={{
//               headerShown: false,
//               tabBarStyle: {
//                 backgroundColor: COLORS.background,
//                 borderTopColor: "#F3F4F6",
//                 borderTopWidth: 1,
//                 height: 60,
//                 paddingBottom: 4,
//                 paddingTop: 4,
//               },
//               tabBarActiveTintColor: COLORS.primary,
//               tabBarInactiveTintColor: COLORS.inactive,
//             }}
//           >
//             <Tabs.Screen
//               name="index"
//               options={{
//                 title: "Home",
//                 headerStyle: { backgroundColor: COLORS.primary },
//                 headerTintColor: "#fff",
//                 tabBarIcon: ({ focused, color }) => (
//                   <AnimatedTabIcon
//                     icon={Entypo}
//                     name="home"
//                     color={color}
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="(blog)"
//               options={{
//                 title: "Blog",
//                 headerStyle: { backgroundColor: COLORS.secondary },
//                 headerTintColor: "#fff",
//                 tabBarIcon: ({ focused, color }) => (
//                   <AnimatedTabIcon
//                     icon={MaterialCommunityIcons}
//                     name="post"
//                     color={color}
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="(store)"
//               options={{
//                 title: "Store",
//                 headerStyle: { backgroundColor: COLORS.primary },
//                 headerTintColor: "#fff",
//                 tabBarIcon: ({ focused, color }) => (
//                   <AnimatedTabIcon
//                     icon={FontAwesome5}
//                     name="store"
//                     color={color}
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="(more)"
//               options={{
//                 title: "More",
//                 headerStyle: { backgroundColor: COLORS.secondary },
//                 headerTintColor: "#fff",
//                 tabBarIcon: ({ focused, color }) => (
//                   <AnimatedTabIcon
//                     icon={Feather}
//                     name="settings"
//                     color={color}
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
// });

// export default TabsLayout;
/******************************************************* */

// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { StyleSheet } from "react-native";
// import { Header } from "../../Components/layout/Header";
// import { AnimatedTabIcon } from "../../Components/layout/AnimatedTabIcon";
// import { COLORS } from "../../constants/theme";
// import { TAB_CONFIG } from "../../constants/navigation";

// const TabsLayout = () => {
//   const screenOptions = {
//     header: ({ route }: { route: { name: any } }) => (
//       <Header
//         showBack={route.name !== "index"}
//         title={TAB_CONFIG.find((tab) => tab.name === route.name)?.title}
//       />
//     ),
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.primary,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container} edges={["top"]}>
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   headerContainer: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 56,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     width: 80,
//   },
//   headerRight: {
//     width: 80,
//     alignItems: "flex-end",
//   },
//   backButton: {
//     padding: 8,
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   titleContainer: {
//     paddingVertical: 8,
//     alignItems: "center",
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   tabBar: {
//     backgroundColor: COLORS.background,
//     borderTopColor: COLORS.border,
//     borderTopWidth: 1,
//     height: 60,
//     paddingVertical: 8,
//     elevation: 8,
//     shadowColor: COLORS.text,
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: COLORS.overlay,
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     minHeight: "50%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   modalBackButton: {
//     padding: 8,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
// });

// export default TabsLayout;

/******************************************************* */

// import React, { useCallback, memo } from "react";
// import { View, StatusBar, StyleSheet, Pressable } from "react-native";
// import { Link, Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
//   Extrapolation,
// } from "react-native-reanimated";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SearchBar from "../../Components/SearchBar";
// import CartButton from "../../Components/Cart/CartButton";
// import Logo from "@/app/Components/LOGO/Logo";
// import Locator from "@/app/Components/StoreLocator/Locator";
// import { User } from "lucide-react-native";

// const COLORS = {
//   primary: "#E53E3E",
//   secondary: "#38A169",
//   inactive: "#718096",
//   background: "#FFFFFF",
//   text: "#000",
// } as const;

// const SUGGESTIONS = [
//   "Electronics",
//   "Clothing",
//   "Accessories",
//   "Home & Garden",
// ] as const;

// // Memoized AnimatedTabIcon component
// const AnimatedTabIcon = memo(
//   ({
//     icon: Icon,
//     name,
//     color,
//     focused,
//   }: {
//     icon: any;
//     name: string;
//     color: string;
//     focused: boolean;
//   }) => {
//     const scale = useSharedValue(1);

//     const tapGesture = Gesture.Tap()
//       .simultaneousWithExternalGesture(Gesture.Tap())
//       .onBegin(() => {
//         scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
//       })
//       .onEnd(() => {
//         scale.value = withSpring(1, { damping: 15, stiffness: 200 });
//       });

//     const animatedStyle = useAnimatedStyle(() => ({
//       transform: [
//         { scale: scale.value },
//         {
//           scale: interpolate(
//             scale.value,
//             [0.8, 1],
//             [1, 1.1],
//             Extrapolation.CLAMP
//           ),
//         },
//       ],
//       opacity: interpolate(
//         scale.value,
//         [0.8, 1],
//         [0.8, 1],
//         Extrapolation.CLAMP
//       ),
//     }));

//     return (
//       <GestureDetector gesture={tapGesture}>
//         <Animated.View style={animatedStyle}>
//           <Icon name={name} size={24} color={color} />
//         </Animated.View>
//       </GestureDetector>
//     );
//   }
// );

// // Memoized header component
// const Header = memo(() => (
//   <View style={styles.headerContainer}>
//     <View style={styles.locationContainer}>
//       <Locator />
//     </View>
//     <View style={styles.logoContainer}>
//       <View style={styles.logoWrapper}>
//         <Logo />
//         <Link href="/LoginScreen" asChild>
//           <Pressable style={styles.userButton}>
//             <User color={COLORS.primary} size={36} />
//           </Pressable>
//         </Link>
//       </View>
//       <CartButton />
//     </View>
//     {/*Search Bar component*/}
//     <View style={styles.searchContainer}>
//       <SearchBar
//         onSearch={useCallback((text: string) => {
//           console.log("Searching for:", text);
//         }, [])}
//         suggestions={SUGGESTIONS}
//       />
//     </View>
//   </View>
// ));

// const TabsLayout: React.FC = () => {
//   const screenOptions = {
//     headerShown: false,
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.primary,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.primary}
//           />
//           <Header />
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   headerStyle: { backgroundColor: tab.headerColor },
//                   headerTintColor: "#fff",
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const TAB_CONFIG = [
//   {
//     name: "index",
//     title: "Home",
//     headerColor: COLORS.primary,
//     icon: Entypo,
//     iconName: "home",
//   },
//   {
//     name: "(blog)",
//     title: "Blog",
//     headerColor: COLORS.secondary,
//     icon: MaterialCommunityIcons,
//     iconName: "post",
//   },
//   {
//     name: "(store)",
//     title: "Store",
//     headerColor: COLORS.primary,
//     icon: FontAwesome5,
//     iconName: "store",
//   },
//   {
//     name: "(more)",
//     title: "More",
//     headerColor: COLORS.secondary,
//     icon: Feather,
//     iconName: "settings",
//   },
// ] as const;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   headerContainer: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//   },
//   locationContainer: {
//     marginBottom: 8,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   logoWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   userButton: {
//     padding: 8,
//   },
//   searchContainer: {
//     marginBottom: 12,
//   },
//   tabBar: {
//     backgroundColor: COLORS.background,
//     borderTopColor: "#F3F4F6",
//     borderTopWidth: 1,
//     height: 60,
//     paddingVertical: 8,
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
// });

// export default memo(TabsLayout);

/******************************************* */

// import React, { memo, useCallback } from "react";
// import { View, StatusBar, StyleSheet, Pressable } from "react-native";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
//   Extrapolation,
// } from "react-native-reanimated";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SearchBar from "../../Components/SearchBar";
// import CartButton from "../../Components/Cart/CartButton";
// import Logo from "@/app/Components/LOGO/Logo";
// import Locator from "@/app/Components/StoreLocator/Locator";
// import { User } from "lucide-react-native";
// import { router } from "expo-router";
// const COLORS = {
//   primary: "#E53E3E",
//   secondary: "#38A169",
//   inactive: "#718096",
//   background: "#FFFFFF",
//   text: "#000",
// } as const;

// const SUGGESTIONS = [
//   "Electronics",
//   "Clothing",
//   "Accessories",
//   "Home & Garden",
// ] as const;

// // Memoized AnimatedTabIcon component
// const AnimatedTabIcon = memo(({ icon: Icon, name, color, focused }) => {
//   const scale = useSharedValue(1);

//   const tapGesture = Gesture.Tap()
//     .simultaneousWithExternalGesture(Gesture.Tap())
//     .onBegin(() => {
//       scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
//     })
//     .onEnd(() => {
//       scale.value = withSpring(1, { damping: 15, stiffness: 200 });
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       {
//         scale: interpolate(
//           scale.value,
//           [0.8, 1],
//           [1, 1.1],
//           Extrapolation.CLAMP
//         ),
//       },
//     ],
//     opacity: interpolate(scale.value, [0.8, 1], [0.8, 1], Extrapolation.CLAMP),
//   }));

//   return (
//     <GestureDetector gesture={tapGesture}>
//       <Animated.View style={animatedStyle}>
//         <Icon name={name} size={24} color={color} />
//       </Animated.View>
//     </GestureDetector>
//   );
// });

// // Memoized header component
// const Header = memo(() => (
//   <View style={styles.headerContainer}>
//     <View style={styles.locationContainer}>
//       <Locator />
//     </View>
//     <View style={styles.logoContainer}>
//       <View style={styles.logoWrapper}>
//         <Logo />
//         <Pressable
//           onPress={() => {
//             router.push("/");
//           }}
//           style={styles.userButton}
//         >
//           <User color={COLORS.primary} size={36} />
//         </Pressable>
//       </View>
//       <Pressable
//         onPress={() => {
//           /* Navigate to cart */
//         }}
//         style={styles.cartButton}
//       >
//         <CartButton />
//       </Pressable>
//     </View>
//     <View style={styles.searchContainer}>
//       <SearchBar
//         onSearch={useCallback((text) => {
//           console.log("Searching for:", text);
//         }, [])}
//         suggestions={SUGGESTIONS}
//       />
//     </View>
//   </View>
// ));

// const TabsLayout = () => {
//   const screenOptions = {
//     headerShown: false,
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.primary,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.primary}
//           />
//           <Header />
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   headerStyle: { backgroundColor: tab.headerColor },
//                   headerTintColor: "#fff",
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const TAB_CONFIG = [
//   {
//     name: "index",
//     title: "Home",
//     headerColor: COLORS.primary,
//     icon: Entypo,
//     iconName: "home",
//   },
//   {
//     name: "(blog)",
//     title: "Blog",
//     headerColor: COLORS.secondary,
//     icon: MaterialCommunityIcons,
//     iconName: "post",
//   },
//   {
//     name: "(store)",
//     title: "Store",
//     headerColor: COLORS.primary,
//     icon: FontAwesome5,
//     iconName: "store",
//   },
//   {
//     name: "(more)",
//     title: "More",
//     headerColor: COLORS.secondary,
//     icon: Feather,
//     iconName: "settings",
//   },
// ] as const;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   headerContainer: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//   },
//   locationContainer: {
//     marginBottom: 8,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   logoWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   userButton: {
//     padding: 8,
//   },
//   cartButton: {
//     padding: 8,
//   },
//   searchContainer: {
//     marginBottom: 12,
//   },
//   tabBar: {
//     backgroundColor: COLORS.background,
//     borderTopColor: "#F3F4F6",
//     borderTopWidth: 1,
//     height: 60,
//     paddingVertical: 8,
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
// });

// export default memo(TabsLayout);

/*************************************************** */

// import React, { memo, useCallback } from "react";
// import { View, StatusBar, StyleSheet, Pressable } from "react-native";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
//   Extrapolation,
// } from "react-native-reanimated";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SearchBar from "../../Components/SearchBar";
// import CartIcon from "../../Components/Cart/CartButton";
// import Logo from "@/app/Components/LOGO/Logo";
// import Locator from "@/app/Components/StoreLocator/Locator";
// import { User } from "lucide-react-native";
// import { router } from "expo-router";

// const COLORS = {
//   primary: "#E53E3E",
//   secondary: "#38A169",
//   inactive: "#718096",
//   background: "#FFFFFF",
//   text: "#000",
// } as const;

// const SUGGESTIONS = [
//   "Electronics",
//   "Clothing",
//   "Accessories",
//   "Home & Garden",
// ] as const;

// const AnimatedTabIcon = memo(({ icon: Icon, name, color, focused }) => {
//   const scale = useSharedValue(1);

//   const tapGesture = Gesture.Tap()
//     .simultaneousWithExternalGesture(Gesture.Tap())
//     .onBegin(() => {
//       scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
//     })
//     .onEnd(() => {
//       scale.value = withSpring(1, { damping: 15, stiffness: 200 });
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       {
//         scale: interpolate(
//           scale.value,
//           [0.8, 1],
//           [1, 1.1],
//           Extrapolation.CLAMP
//         ),
//       },
//     ],
//     opacity: interpolate(scale.value, [0.8, 1], [0.8, 1], Extrapolation.CLAMP),
//   }));

//   return (
//     <GestureDetector gesture={tapGesture}>
//       <Animated.View style={animatedStyle}>
//         <Icon name={name} size={24} color={color} />
//       </Animated.View>
//     </GestureDetector>
//   );
// });

// const Header = memo(() => (
//   <View style={styles.headerContainer}>
//     <View style={styles.topRow}>
//       <SearchBar
//         onSearch={useCallback((text) => {
//           console.log("Searching for:", text);
//         }, [])}
//         suggestions={SUGGESTIONS}
//         style={styles.searchBar}
//       />
//       {/* <View style={styles.logoLocatorContainer}>
//         <Locator />
//       </View> */}
//       <View style={styles.userCartContainer}>
//         <Pressable
//           onPress={() => router.push("/(root)/UserProfile")}
//           style={styles.iconButton}
//         >
//           <User color={COLORS.primary} size={24} />
//         </Pressable>
//         <Pressable
//           onPress={() => {
//             router.push("/(root)/Cart");
//           }}
//           style={styles.iconButton}
//         >
//           <CartIcon />
//         </Pressable>
//       </View>
//     </View>
//   </View>
// ));

// const TabsLayout = () => {
//   const screenOptions = {
//     headerShown: false,
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.primary,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container} edges={["top"]}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.primary}
//           />
//           <Header />
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   headerStyle: { backgroundColor: tab.headerColor },
//                   headerTintColor: "#fff",
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const TAB_CONFIG = [
//   {
//     name: "index",
//     title: "Home",
//     headerColor: COLORS.primary,
//     icon: Entypo,
//     iconName: "home",
//   },
//   {
//     name: "(blog)",
//     title: "Blog",
//     headerColor: COLORS.secondary,
//     icon: MaterialCommunityIcons,
//     iconName: "post",
//   },
//   {
//     name: "(store)",
//     title: "Store",
//     headerColor: COLORS.primary,
//     icon: FontAwesome5,
//     iconName: "store",
//   },
//   {
//     name: "(more)",
//     title: "More",
//     headerColor: COLORS.secondary,
//     icon: Feather,
//     iconName: "settings",
//   },
// ] as const;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   headerContainer: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   logoLocatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logo: {
//     marginRight: 8,
//   },
//   userCartContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconButton: {
//     padding: 8,
//   },
//   searchBar: {
//     marginTop: 8,
//   },
//   tabBar: {
//     backgroundColor: COLORS.background,
//     borderTopColor: "#F3F4F6",
//     borderTopWidth: 1,
//     height: 60,
//     paddingBottom: 8,
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
// });

// export default memo(TabsLayout);

/***************************************** */

// import React, { memo, useCallback } from "react";
// import { View, StatusBar, StyleSheet, Pressable } from "react-native";
// import { Tabs } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Feather from "@expo/vector-icons/Feather";
// import Animated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
//   Extrapolation,
// } from "react-native-reanimated";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SearchBar from "../../Components/SearchBar";
// import CartIcon from "../../Components/Cart/CartButton";
// import { User } from "lucide-react-native";
// import { router } from "expo-router";

// const COLORS = {
//   primary: "#000000",
//   secondary: "#000000",
//   inactive: "#666666",
//   background: "#000000",
//   text: "#FFFFFF",
//   accent: "#FFFFFF",
// } as const;

// const SUGGESTIONS = [
//   "Electronics",
//   "Clothing",
//   "Accessories",
//   "Home & Garden",
// ] as const;

// const AnimatedTabIcon = memo(({ icon: Icon, name, color, focused }) => {
//   const scale = useSharedValue(1);

//   const tapGesture = Gesture.Tap()
//     .simultaneousWithExternalGesture(Gesture.Tap())
//     .onBegin(() => {
//       scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
//     })
//     .onEnd(() => {
//       scale.value = withSpring(1, { damping: 15, stiffness: 200 });
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       {
//         scale: interpolate(
//           scale.value,
//           [0.8, 1],
//           [1, 1.1],
//           Extrapolation.CLAMP
//         ),
//       },
//     ],
//     opacity: interpolate(scale.value, [0.8, 1], [0.8, 1], Extrapolation.CLAMP),
//   }));

//   return (
//     <GestureDetector gesture={tapGesture}>
//       <Animated.View style={animatedStyle}>
//         <Icon name={name} size={24} color={focused ? COLORS.accent : color} />
//       </Animated.View>
//     </GestureDetector>
//   );
// });

// const Header = memo(() => (
//   <View style={styles.headerContainer}>
//     <View style={styles.topRow}>
//       <SearchBar
//         onSearch={useCallback((text) => {
//           console.log("Searching for:", text);
//         }, [])}
//         suggestions={SUGGESTIONS}
//         style={styles.searchBar}
//         placeholderTextColor={COLORS.text}
//         textColor={COLORS.text}
//       />
//       <View style={styles.userCartContainer}>
//         <Pressable
//           onPress={() => router.push("/(root)/UserProfile")}
//           style={styles.iconButton}
//         >
//           <User color={COLORS.text} size={24} />
//         </Pressable>
//         <Pressable
//           onPress={() => router.push("/(root)/Cart")}
//           style={styles.iconButton}
//         >
//           <CartIcon color={COLORS.text} />
//         </Pressable>
//       </View>
//     </View>
//   </View>
// ));

// const TabsLayout = () => {
//   const screenOptions = {
//     headerShown: false,
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.accent,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container} edges={["top"]}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.primary}
//           />
//           <Header />
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   headerStyle: { backgroundColor: COLORS.primary },
//                   headerTintColor: COLORS.text,
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const TAB_CONFIG = [
//   {
//     name: "index",
//     title: "Home",
//     icon: Entypo,
//     iconName: "home",
//   },
//   {
//     name: "(blog)",
//     title: "Blog",
//     icon: MaterialCommunityIcons,
//     iconName: "post",
//   },
//   {
//     name: "(store)",
//     title: "Store",
//     icon: FontAwesome5,
//     iconName: "store",
//   },
//   {
//     name: "(more)",
//     title: "More",
//     icon: Feather,
//     iconName: "settings",
//   },
// ] as const;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   headerContainer: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   userCartContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   iconButton: {
//     padding: 8,
//     backgroundColor: "rgba(255,255,255,0.1)",
//     borderRadius: 8,
//   },
//   searchBar: {
//     flex: 1,
//     marginRight: 12,
//     backgroundColor: "rgba(255,255,255,0.1)",
//     borderRadius: 8,
//   },
//   tabBar: {
//     backgroundColor: COLORS.background,
//     borderTopColor: "rgba(255,255,255,0.1)",
//     borderTopWidth: 1,
//     height: 60,
//     paddingBottom: 8,
//     elevation: 0,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
// });

// export default memo(TabsLayout);

/********************************************************* */

import React, { memo, useCallback } from "react";
import { View, StatusBar, StyleSheet, Pressable } from "react-native";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../Components/SearchBar";
import CartIcon from "../../Components/Cart/CartButton";
import { User } from "lucide-react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/contexts/LanguageContext";

const COLORS = {
  primary: "#E53E3E",
  secondary: "#38A169",
  inactive: "#718096",
  background: "#FFFFFF",
  headerBackground: "#000000",
  headerText: "#FFFFFF",
  text: "#000000",
} as const;

const SUGGESTIONS = ["horse", "dog", "sheep", "utilities"] as const;

const AnimatedTabIcon = memo(({ icon: Icon, name, color, focused }) => {
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .simultaneousWithExternalGesture(Gesture.Tap())
    .onBegin(() => {
      scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      {
        scale: interpolate(
          scale.value,
          [0.8, 1],
          [1, 1.1],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(scale.value, [0.8, 1], [0.8, 1], Extrapolation.CLAMP),
  }));

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={animatedStyle}>
        <Icon name={name} size={24} color={color} />
      </Animated.View>
    </GestureDetector>
  );
});

const Header = memo(() => (
  <View style={styles.headerContainer}>
    <View style={styles.topRow}>
      <SearchBar
        onSearch={useCallback((text) => {
          console.log("Searching for:", text);
        }, [])}
        suggestions={SUGGESTIONS}
        style={styles.searchBar}
        placeholderTextColor={COLORS.headerText}
        textColor={COLORS.headerText}
      />
      <View style={styles.userCartContainer}>
        <Pressable
          onPress={() => router.push("/(root)/UserProfile")}
          style={styles.iconButton}
        >
          <User color={COLORS.headerText} size={24} />
        </Pressable>
        <Pressable
          onPress={() => router.push("/(root)/Cart")}
          style={styles.iconButton}
        >
          <CartIcon color={COLORS.headerText} />
        </Pressable>
      </View>
    </View>
  </View>
));

// const TAB_CONFIG = [
//   {
//     name: "index",
//     title: "Home",
//     headerColor: COLORS.primary,
//     icon: Entypo,
//     iconName: "home",
//   },
//   {
//     name: "(blog)",
//     title: "Blog",
//     headerColor: COLORS.secondary,
//     icon: MaterialCommunityIcons,
//     iconName: "post",
//   },
//   {
//     name: "(store)",
//     title: "Store",
//     headerColor: COLORS.primary,
//     icon: FontAwesome5,
//     iconName: "store",
//   },
//   {
//     name: "(more)",
//     title: "More",
//     headerColor: COLORS.secondary,
//     icon: Feather,
//     iconName: "settings",
//   },
// ] as const;

const TAB_CONFIG = [
  {
    name: "index",
    translationKey: "tabs.home",
    headerColor: COLORS.primary,
    icon: Entypo,
    iconName: "home",
  },
  {
    name: "(blog)",
    translationKey: "tabs.blog",
    headerColor: COLORS.secondary,
    icon: MaterialCommunityIcons,
    iconName: "post",
  },
  {
    name: "(store)",
    translationKey: "tabs.store",
    headerColor: COLORS.primary,
    icon: FontAwesome5,
    iconName: "store",
  },
  {
    name: "(more)",
    translationKey: "tabs.more",
    headerColor: COLORS.secondary,
    icon: Feather,
    iconName: "settings",
  },
] as const;

// const TabsLayout = () => {
//   const screenOptions = {
//     headerShown: false,
//     tabBarStyle: styles.tabBar,
//     tabBarActiveTintColor: COLORS.primary,
//     tabBarInactiveTintColor: COLORS.inactive,
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.safeArea} edges={["top"]}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={COLORS.headerBackground}
//           />
//           <Header />
//           <Tabs screenOptions={screenOptions}>
//             {TAB_CONFIG.map((tab) => (
//               <Tabs.Screen
//                 key={tab.name}
//                 name={tab.name}
//                 options={{
//                   title: tab.title,
//                   headerStyle: { backgroundColor: tab.headerColor },
//                   headerTintColor: COLORS.text,
//                   tabBarIcon: ({ focused, color }) => (
//                     <AnimatedTabIcon
//                       icon={tab.icon}
//                       name={tab.iconName}
//                       color={color}
//                       focused={focused}
//                     />
//                   ),
//                 }}
//               />
//             ))}
//           </Tabs>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

const TabsLayout = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const screenOptions = {
    headerShown: false,
    tabBarStyle: [
      styles.tabBar,
      // Add RTL support for tab bar
      { direction: isRTL ? "rtl" : "ltr" },
    ],
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.inactive,
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.headerBackground}
          />
          <Header />
          <Tabs screenOptions={screenOptions}>
            {TAB_CONFIG.map((tab) => (
              <Tabs.Screen
                key={tab.name}
                name={tab.name}
                options={{
                  title: t(tab.translationKey),
                  headerStyle: { backgroundColor: tab.headerColor },
                  headerTintColor: COLORS.text,
                  tabBarIcon: ({ focused, color }) => (
                    <AnimatedTabIcon
                      icon={tab.icon}
                      name={tab.iconName}
                      color={color}
                      focused={focused}
                    />
                  ),
                }}
              />
            ))}
          </Tabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.headerBackground,
  },
  headerContainer: {
    backgroundColor: COLORS.headerBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userCartContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  tabBar: {
    backgroundColor: COLORS.background,
    borderTopColor: "#F3F4F6",
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default memo(TabsLayout);
