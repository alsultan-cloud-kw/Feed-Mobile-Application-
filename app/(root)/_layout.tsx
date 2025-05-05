// // app/_layout.tsx
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./globals.css";
// import { usePushNotification } from "./hooks/usePushNotification";
// import { useEffect } from "react";
// import Toast from "react-native-toast-message";
// import { AuthProvider } from "./contexts/useAuth";
// const queryClient = new QueryClient();
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { tokenCache } from "@/cache";
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// if (!publishableKey) {
//   throw new Error(
//     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
//   );
// }
// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B", // redish
//     secondary: "#4ECB71", // greenish
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B", // redish hover color
//       },
//     },
//   },
// });

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//       // Store this token in your backend when you implement auth

//       // Store this token in your backend when you implement auth
//     }
//   }, [expoPushToken]);

//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <Toast />
//           <ThemeProvider theme={theme}>
//             <SafeAreaProvider>
//               <Stack
//                 screenOptions={{
//                   headerShown: false, // Disables the header for all screens
//                 }}
//               />
//             </SafeAreaProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

// /****************************************************** */

// // app/_layout.tsx (Updated)
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./globals.css";
// import { usePushNotification } from "./hooks/usePushNotification";
// import { useEffect } from "react";
// import Toast from "react-native-toast-message";
// // import { AuthProvider } from "./contexts/useAuth";
// // import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// // import { tokenCache } from "@/cache";

// const queryClient = new QueryClient();
// // const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// // if (!publishableKey) {
// //   throw new Error(
// //     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
// //   );
// // }

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     // <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//     //   <ClerkLoaded>
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <SafeAreaProvider>
//           {/* <AuthProvider> */}
//           <Toast />
//           <Stack
//             screenOptions={{
//               headerShown: false,
//             }}
//           />
//           {/* </AuthProvider> */}
//         </SafeAreaProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//     //   </ClerkLoaded>
//     // </ClerkProvider>
//   );
// }

/**************************************** */

// // app/(root)/_layout.tsx
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "../globals.css";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { useEffect } from "react";
// import Toast from "react-native-toast-message";
// // import { AuthProvider } from "./contexts/useAuth";
// // import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// // import { tokenCache } from "@/cache";

// const queryClient = new QueryClient();
// // const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     // <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//     //   <ClerkLoaded>
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <SafeAreaProvider>
//           <GestureHandlerRootView style={{ flex: 1 }}>
//             {/* <AuthProvider> */}
//             <Toast />
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen
//                 name="(tabs)"
//                 options={{
//                   headerShown: false,
//                 }}
//               />
//               {/* Add other stack screens here */}
//               <Stack.Screen
//                 name="cart"
//                 options={{
//                   presentation: "modal",
//                   headerShown: false,
//                 }}
//               />
//             </Stack>
//             {/* </AuthProvider> */}
//           </GestureHandlerRootView>
//         </SafeAreaProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//     //   </ClerkLoaded>
//     // </ClerkProvider>
//   );
// }

/************************************************** */

// //  app/(root)/_layout.tsx
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "../globals.css";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { useEffect } from "react";
// import Toast from "react-native-toast-message";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// const queryClient = new QueryClient();

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <SafeAreaProvider>
//               <GestureHandlerRootView style={{ flex: 1 }}>
//                 <Toast />
//                 <Stack screenOptions={{ headerShown: false }}>
//                   <Stack.Screen
//                     name="(tabs)"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                   <Stack.Screen
//                     name="UserProfile"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                   <Stack.Screen
//                     name="Cart"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                   <Stack.Screen
//                     name="StoreLocator"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                   <Stack.Screen
//                     name="(auth)"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                   <Stack.Screen
//                     name="Checkout"
//                     options={{
//                       headerShown: false,
//                     }}
//                   />
//                 </Stack>
//               </GestureHandlerRootView>
//             </SafeAreaProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

/****************************************************************** */
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "../globals.css";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { useCallback, useEffect, useState } from "react";
// import Toast from "react-native-toast-message";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";

// //Localization
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";

// const queryClient = new QueryClient();

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();
//   const [isReady, setIsReady] = useState(false);

//   const handleSplashComplete = useCallback(() => {
//     setIsReady(true);
//   }, []);

//   if (!isReady) {
//     return <AnimatedSplash onComplete={handleSplashComplete} />;
//   }

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <LanguageProvider i18n={i18n}>
//               <SafeAreaProvider>
//                 <GestureHandlerRootView style={{ flex: 1 }}>
//                   <Toast />
//                   <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen
//                       name="(tabs)"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="UserProfile"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="Cart"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="StoreLocator"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="(auth)"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="Checkout"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="order-success"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                     <Stack.Screen
//                       name="order-failed"
//                       options={{
//                         headerShown: false,
//                       }}
//                     />
//                   </Stack>
//                 </GestureHandlerRootView>
//               </SafeAreaProvider>
//             </LanguageProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

/************************** */

// // app/(root)/_layout.tsx
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "../globals.css";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { useCallback, useEffect, useState } from "react";
// import Toast from "react-native-toast-message";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { View } from "react-native";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";

// const queryClient = new QueryClient();

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent({ expoPushToken }: { expoPushToken: string | undefined }) {
//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <LanguageProvider i18n={i18n}>
//               <SafeAreaProvider>
//                 <GestureHandlerRootView style={{ flex: 1 }}>
//                   <Toast />
//                   <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen
//                       name="(tabs)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="UserProfile"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Cart"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="StoreLocator"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="(auth)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Checkout"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-success"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-failed"
//                       options={{ headerShown: false }}
//                     />
//                   </Stack>
//                 </GestureHandlerRootView>
//               </SafeAreaProvider>
//             </LanguageProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const { expoPushToken } = usePushNotification();
//   const [isReady, setIsReady] = useState(false);

//   const handleSplashComplete = useCallback(() => {
//     setIsReady(true);
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {!isReady ? (
//         <AnimatedSplash onComplete={handleSplashComplete} />
//       ) : (
//         <AppContent expoPushToken={expoPushToken} />
//       )}
//     </View>
//   );
// }

/**************************************************************** */

// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "react-native-reanimated";
// import { useCallback, useEffect, useState } from "react";
// import * as SplashScreen from "expo-splash-screen";
// // import { View } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import Toast from "react-native-toast-message";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";

// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// const queryClient = new QueryClient();

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <LanguageProvider i18n={i18n}>
//               <SafeAreaProvider>
//                 <GestureHandlerRootView style={{ flex: 1 }}>
//                   <Toast />
//                   <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen
//                       name="(tabs)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="UserProfile"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Cart"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="StoreLocator"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="(auth)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Checkout"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-success"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-failed"
//                       options={{ headerShown: false }}
//                     />
//                   </Stack>
//                 </GestureHandlerRootView>
//               </SafeAreaProvider>
//             </LanguageProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isSplashReady, setIsSplashReady] = useState(false);
//   const [isAppReady, setIsAppReady] = useState(false);

//   // Prepare app resources and data
//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Add any initialization logic here (e.g., loading fonts, making API calls)
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
//         setIsSplashReady(true);
//       } catch (e) {
//         console.warn(e);
//       }
//     }

//     prepare();
//   }, []);

//   const onAnimationComplete = useCallback(async () => {
//     setIsAppReady(true);
//   }, []);

//   if (!isSplashReady) {
//     return null;
//   }

//   if (!isAppReady) {
//     return <AnimatedSplash onComplete={onAnimationComplete} />;
//   }

//   return <AppContent />;
// }

/********************************* */

// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import { View } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import Toast from "react-native-toast-message";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import * as Font from "expo-font";

// // Immediately prevent splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

// const queryClient = new QueryClient();

// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <ClerkLoaded>
//         <QueryClientProvider client={queryClient}>
//           <ThemeProvider theme={theme}>
//             <LanguageProvider i18n={i18n}>
//               <SafeAreaProvider>
//                 <GestureHandlerRootView style={{ flex: 1 }}>
//                   <Toast />
//                   <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen
//                       name="(tabs)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="UserProfile"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Cart"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="StoreLocator"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="(auth)"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="Checkout"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-success"
//                       options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                       name="order-failed"
//                       options={{ headerShown: false }}
//                     />
//                   </Stack>
//                 </GestureHandlerRootView>
//               </SafeAreaProvider>
//             </LanguageProvider>
//           </ThemeProvider>
//         </QueryClientProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepareApp() {
//       try {
//         // Load fonts
//         await Font.loadAsync({
//           Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
//           "Cairo-Bold": require("../assets/fonts/Cairo-Bold.ttf"),
//           "Cairo-SemiBold": require("../assets/fonts/Cairo-SemiBold.ttf"),
//         });

//         // Add any other async initialization here
//         await new Promise((resolve) => setTimeout(resolve, 2000)); // Ensure minimum splash duration
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepareApp();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {!appIsReady ? <AnimatedSplash onComplete={() => {}} /> : <AppContent />}
//     </View>
//   );
// }

/**************************************** */

// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// // import Toast from "react-native-toast-message";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import { toastConfig } from "../config/toastConfig";

// // Configure the query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       // cacheTime: 1000 * 60 * 30, // 30 minutes
//     },
//   },
// });

// // Theme configuration
// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     <>
//       <ClerkProvider
//         publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//       >
//         <UserProvider>
//           <ClerkLoaded>
//             <QueryClientProvider client={queryClient}>
//               <ThemeProvider theme={theme}>
//                 <LanguageProvider i18n={i18n}>
//                   <SafeAreaProvider>
//                     <GestureHandlerRootView style={{ flex: 1 }}>
//                       <Toast />
//                       <Stack screenOptions={{ headerShown: false }}>
//                         <Stack.Screen
//                           name="(tabs)"
//                           options={{ headerShown: false }}
//                         />
//                         <Stack.Screen
//                           name="UserProfile"
//                           options={{ headerShown: false }}
//                         />
//                         <Stack.Screen
//                           name="Cart"
//                           options={{
//                             headerShown: false,
//                             presentation: "modal",
//                           }}
//                         />
//                         <Stack.Screen
//                           name="StoreLocator"
//                           options={{ headerShown: false }}
//                         />
//                         <Stack.Screen
//                           name="(auth)"
//                           options={{
//                             headerShown: false,
//                             animation: "fade",
//                           }}
//                         />
//                         <Stack.Screen
//                           name="Checkout"
//                           options={{
//                             headerShown: false,
//                             presentation: "modal",
//                           }}
//                         />
//                         <Stack.Screen
//                           name="order-success"
//                           options={{
//                             headerShown: false,
//                             animation: "fade",
//                           }}
//                         />
//                         <Stack.Screen
//                           name="order-failed"
//                           options={{
//                             headerShown: false,
//                             animation: "fade",
//                           }}
//                         />
//                       </Stack>
//                     </GestureHandlerRootView>
//                   </SafeAreaProvider>
//                 </LanguageProvider>
//               </ThemeProvider>
//             </QueryClientProvider>
//           </ClerkLoaded>
//         </UserProvider>
//       </ClerkProvider>
//       <Toast  position="top" />
//     </>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   // Only show the app content when both loading is complete and Lottie animation has finished
//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

// // Add Error Boundary for development
// if (__DEV__) {
//   const errorHandler = (error: Error) => {
//     console.error("Global error:", error);
//   };

//   ErrorUtils.setGlobalHandler(errorHandler);
// }

/******************************* */

// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// // import { toastConfig } from "../config/toastConfig";

// // Configure the query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60 * 5, // 5 minutes
//     },
//   },
// });

// // Theme configuration
// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <UserProvider>
//         <ClerkLoaded>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider theme={theme}>
//               <LanguageProvider i18n={i18n}>
//                 <SafeAreaProvider>
//                   <GestureHandlerRootView style={{ flex: 1 }}>
//                     <Stack screenOptions={{ headerShown: false }}>
//                       <Stack.Screen
//                         name="(tabs)"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="UserProfile"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="Cart"
//                         options={{
//                           headerShown: false,
//                           presentation: "modal",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="StoreLocator"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="(auth)"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="Checkout"
//                         options={{
//                           headerShown: false,
//                           presentation: "modal",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="order-success"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="order-failed"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                     </Stack>
//                     <Toast position="top" topOffset={50} />
//                   </GestureHandlerRootView>
//                 </SafeAreaProvider>
//               </LanguageProvider>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </ClerkLoaded>
//       </UserProvider>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

// // Add Error Boundary for development
// if (__DEV__) {
//   const errorHandler = (error: Error) => {
//     console.error("Global error:", error);
//   };

//   ErrorUtils.setGlobalHandler(errorHandler);
// }

/********************************************* */

// import { Stack, useRouter } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import * as Linking from "expo-linking";

// // Configure the query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60 * 5, // 5 minutes
//     },
//   },
// });

// // Theme configuration
// const theme = createTheme({
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//   },
//   components: {
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FF6B6B",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();
//   const router = useRouter();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   // Deep linking logic
//   useEffect(() => {
//     // Handle initial deep link (when app is opened from a URL)
//     const handleDeepLink = async () => {
//       const url = await Linking.getInitialURL();
//       if (url) {
//         const { path } = Linking.parse(url);
//         if (path?.includes("store")) {
//           router.push(path);
//         }
//       }
//     };
//     handleDeepLink();

//     // Handle subsequent deep links (when app is already running)
//     const subscription = Linking.addEventListener("url", ({ url }) => {
//       const { path } = Linking.parse(url);
//       if (path?.includes("store")) {
//         router.push(path);
//       }
//     });

//     // Cleanup listener on unmount
//     return () => subscription.remove();
//   }, [router]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <UserProvider>
//         <ClerkLoaded>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider theme={theme}>
//               <LanguageProvider i18n={i18n}>
//                 <SafeAreaProvider>
//                   <GestureHandlerRootView style={{ flex: 1 }}>
//                     <Stack screenOptions={{ headerShown: false }}>
//                       <Stack.Screen
//                         name="(tabs)"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="UserProfile"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="Cart"
//                         options={{
//                           headerShown: false,
//                           presentation: "modal",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="StoreLocator"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="(auth)"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="Checkout"
//                         options={{
//                           headerShown: false,
//                           presentation: "modal",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="order-success"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                       <Stack.Screen
//                         name="order-failed"
//                         options={{
//                           headerShown: false,
//                           animation: "fade",
//                         }}
//                       />
//                     </Stack>
//                     <Toast position="top" topOffset={50} />
//                   </GestureHandlerRootView>
//                 </SafeAreaProvider>
//               </LanguageProvider>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </ClerkLoaded>
//       </UserProvider>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

// // Add Error Boundary for development
// if (__DEV__) {
//   const errorHandler = (error: Error) => {
//     console.error("Global error:", error);
//   };

//   ErrorUtils.setGlobalHandler(errorHandler);
// }

/************************************ */

// import { Stack, useRouter } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View, StatusBar } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import * as Linking from "expo-linking";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

// const theme = createTheme({
//   mode: "dark",
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   components: {
//     Header: {
//       backgroundColor: "#000000",
//       containerStyle: {
//         backgroundColor: "#000000",
//       },
//     },
//     StatusBar: {
//       barStyle: "light-content",
//       backgroundColor: "#000000",
//     },
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FFFFFF",
//       },
//     },
//     TabBar: {
//       style: {
//         backgroundColor: "#000000",
//       },
//       labelStyle: {
//         color: "#FFFFFF",
//       },
//       indicatorStyle: {
//         backgroundColor: "#FFFFFF",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();
//   const router = useRouter();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   useEffect(() => {
//     const handleDeepLink = async () => {
//       const url = await Linking.getInitialURL();
//       if (url) {
//         const { path } = Linking.parse(url);
//         if (path?.includes("store")) {
//           router.push(path);
//         }
//       }
//     };
//     handleDeepLink();

//     const subscription = Linking.addEventListener("url", ({ url }) => {
//       const { path } = Linking.parse(url);
//       if (path?.includes("store")) {
//         router.push(path);
//       }
//     });

//     return () => subscription.remove();
//   }, [router]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <UserProvider>
//         <ClerkLoaded>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider theme={theme}>
//               <StatusBar barStyle="light-content" backgroundColor="#000000" />
//               <LanguageProvider i18n={i18n}>
//                 <SafeAreaProvider>
//                   <GestureHandlerRootView
//                     style={{ flex: 1, backgroundColor: "#000000" }}
//                   >
//                     <Stack
//                       screenOptions={{
//                         headerShown: false,
//                         headerStyle: {
//                           backgroundColor: "#000000",
//                         },
//                         headerTintColor: "#FFFFFF",
//                         contentStyle: {
//                           backgroundColor: "#000000",
//                         },
//                       }}
//                     >
//                       <Stack.Screen
//                         name="(tabs)"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="UserProfile"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="Cart"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="StoreLocator"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="SearchBar"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="(auth)"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="Checkout"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="order-success"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="order-failed"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                     </Stack>
//                     <Toast position="top" topOffset={50} />
//                   </GestureHandlerRootView>
//                 </SafeAreaProvider>
//               </LanguageProvider>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </ClerkLoaded>
//       </UserProvider>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#000000" }}>
//         <StatusBar barStyle="light-content" backgroundColor="#000000" />
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

// if (__DEV__) {
//   const errorHandler = (error: Error) => {
//     console.error("Global error:", error);
//   };
//   ErrorUtils.setGlobalHandler(errorHandler);
// }

/*************************************** */

// import { Stack, useRouter } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View, StatusBar } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import * as Linking from "expo-linking";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

// // Create URL parser for payment callbacks
// const createPaymentURLParser = () => {
//   return {
//     parse: (url: string) => {
//       const parsed = Linking.parse(url);

//       // Handle payment callbacks
//       if (parsed.path === "payment") {
//         return {
//           pathname: "/order-success",
//           params: parsed.queryParams,
//         };
//       }

//       // Handle store deep links (existing logic)
//       if (parsed.path?.includes("store")) {
//         return {
//           pathname: `/${parsed.path}`,
//         };
//       }

//       return { pathname: parsed.path || "/" };
//     },
//   };
// };

// const theme = createTheme({
//   mode: "dark",
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   components: {
//     Header: {
//       backgroundColor: "#000000",
//       containerStyle: {
//         backgroundColor: "#000000",
//       },
//     },
//     StatusBar: {
//       barStyle: "light-content",
//       backgroundColor: "#000000",
//     },
//     Tab: {
//       indicatorStyle: {
//         backgroundColor: "#FFFFFF",
//       },
//     },
//     TabBar: {
//       style: {
//         backgroundColor: "#000000",
//       },
//       labelStyle: {
//         color: "#FFFFFF",
//       },
//       indicatorStyle: {
//         backgroundColor: "#FFFFFF",
//       },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();
//   const router = useRouter();

//   useEffect(() => {
//     if (expoPushToken) {
//       console.log("Push Token:", expoPushToken);
//     }
//   }, [expoPushToken]);

//   // Handle deep linking
//   useEffect(() => {
//     // Handle initial URL that launched the app
//     const handleInitialURL = async () => {
//       try {
//         const url = await Linking.getInitialURL();
//         if (url) {
//           handleDeepLink(url);
//         }
//       } catch (error) {
//         console.error("Error handling initial URL:", error);
//       }
//     };

//     // Handle deep link processing
//     const handleDeepLink = (url: string) => {
//       console.log("Received deep link URL:", url);

//       const parsed = Linking.parse(url);
//       console.log("Parsed URL:", parsed);

//       // Handle payment callbacks
//       if (parsed.path === "payment") {
//         const { status, merchantTxnId, txnId, errorCode } = parsed.queryParams;

//         if (status === "success") {
//           router.push({
//             pathname: "/order-success",
//             params: { merchantTxnId, txnId, errorCode },
//           });
//         } else if (status === "failed" || status === "failure") {
//           router.push({
//             pathname: "/order-failed",
//             params: { merchantTxnId, txnId, errorCode },
//           });
//         }
//       }
//       // Handle store deep links (existing logic)
//       else if (parsed.path?.includes("store")) {
//         router.push(parsed.path);
//       }
//     };

//     // Run the initial URL handler
//     handleInitialURL();

//     // Set up event listener for future deep links
//     const subscription = Linking.addEventListener("url", ({ url }) => {
//       handleDeepLink(url);
//     });

//     // Clean up the event listener on unmount
//     return () => subscription.remove();
//   }, [router]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <UserProvider>
//         <ClerkLoaded>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider theme={theme}>
//               <StatusBar barStyle="light-content" backgroundColor="#000000" />
//               <LanguageProvider i18n={i18n}>
//                 <SafeAreaProvider>
//                   <GestureHandlerRootView
//                     style={{ flex: 1, backgroundColor: "#000000" }}
//                   >
//                     <Stack
//                       screenOptions={{
//                         headerShown: false,
//                         headerStyle: {
//                           backgroundColor: "#000000",
//                         },
//                         headerTintColor: "#FFFFFF",
//                         contentStyle: {
//                           backgroundColor: "#000000",
//                         },
//                       }}
//                     >
//                       <Stack.Screen
//                         name="(tabs)"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="UserProfile"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="Cart"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="StoreLocator"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="SearchBar"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="(auth)"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="Checkout"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="order-success"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="order-failed"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                     </Stack>
//                     <Toast position="top" topOffset={50} />
//                   </GestureHandlerRootView>
//                 </SafeAreaProvider>
//               </LanguageProvider>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </ClerkLoaded>
//       </UserProvider>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#000000" }}>
//         <StatusBar barStyle="light-content" backgroundColor="#000000" />
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

// if (__DEV__) {
//   const errorHandler = (error: Error) => {
//     console.error("Global error:", error);
//   };
//   ErrorUtils.setGlobalHandler(errorHandler);
// }

/***************************************** */
//Works

// import { Stack, useRouter } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useCallback, useEffect, useState } from "react";
// import { View, StatusBar } from "react-native";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// import { ThemeProvider, createTheme } from "@rneui/themed";
// import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import i18n from "../../i18n/i18nConfig";
// import { useLoadingResources } from "../hooks/useLoadingResources";
// import "../globals.css";
// import { UserProvider } from "../contexts/UserContext";
// import Toast from "react-native-toast-message";
// import * as Linking from "expo-linking";

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { retry: 2, staleTime: 1000 * 60 * 5 } },
// });

// const theme = createTheme({
//   mode: "dark",
//   lightColors: {
//     primary: "#FF6B6B",
//     secondary: "#4ECB71",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   darkColors: {
//     primary: "#FF8787",
//     secondary: "#63D587",
//     background: "#000000",
//     white: "#FFFFFF",
//   },
//   components: {
//     Header: {
//       backgroundColor: "#000000",
//       containerStyle: { backgroundColor: "#000000" },
//     },
//     StatusBar: { barStyle: "light-content", backgroundColor: "#000000" },
//     Tab: { indicatorStyle: { backgroundColor: "#FFFFFF" } },
//     TabBar: {
//       style: { backgroundColor: "#000000" },
//       labelStyle: { color: "#FFFFFF" },
//       indicatorStyle: { backgroundColor: "#FFFFFF" },
//     },
//   },
// });

// function AppContent() {
//   const { expoPushToken } = usePushNotification();
//   const router = useRouter();

//   useEffect(() => {
//     if (expoPushToken) console.log("Push Token:", expoPushToken);
//   }, [expoPushToken]);

//   useEffect(() => {
//     const handleInitialURL = async () => {
//       const url = await Linking.getInitialURL();
//       if (url) handleDeepLink(url);
//     };

//     const handleDeepLink = (url) => {
//       const parsed = Linking.parse(url);
//       if (parsed.path === "payment/success") {
//         router.push("/(root)/Cart");
//       } else if (parsed.path === "payment/failure") {
//         router.push("/(root)/Cart");
//       } else if (parsed.path?.includes("store")) {
//         router.push(parsed.path);
//       }
//     };

//     handleInitialURL();
//     const subscription = Linking.addEventListener("url", ({ url }) =>
//       handleDeepLink(url)
//     );
//     return () => subscription.remove();
//   }, [router]);

//   return (
//     <ClerkProvider
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
//     >
//       <UserProvider>
//         <ClerkLoaded>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider theme={theme}>
//               <StatusBar barStyle="light-content" backgroundColor="#000000" />
//               <LanguageProvider i18n={i18n}>
//                 <SafeAreaProvider>
//                   <GestureHandlerRootView
//                     style={{ flex: 1, backgroundColor: "#000000" }}
//                   >
//                     <Stack
//                       screenOptions={{
//                         headerShown: false,
//                         headerStyle: { backgroundColor: "#000000" },
//                         headerTintColor: "#FFFFFF",
//                         contentStyle: { backgroundColor: "#000000" },
//                       }}
//                     >
//                       <Stack.Screen
//                         name="(tabs)"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="UserProfile"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="Cart"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="StoreLocator"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="SearchBar"
//                         options={{ headerShown: false }}
//                       />
//                       <Stack.Screen
//                         name="(auth)"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="Checkout"
//                         options={{ headerShown: false, presentation: "modal" }}
//                       />
//                       <Stack.Screen
//                         name="order-success"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                       <Stack.Screen
//                         name="order-failed"
//                         options={{ headerShown: false, animation: "fade" }}
//                       />
//                     </Stack>
//                     <Toast position="top" topOffset={50} />
//                   </GestureHandlerRootView>
//                 </SafeAreaProvider>
//               </LanguageProvider>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </ClerkLoaded>
//       </UserProvider>
//     </ClerkProvider>
//   );
// }

// export default function RootLayout() {
//   const [isLottieComplete, setLottieComplete] = useState(true);
//   const isLoadingComplete = useLoadingResources();

//   const handleLottieComplete = useCallback(() => {
//     setLottieComplete(true);
//   }, []);

//   const showAppContent = isLoadingComplete && isLottieComplete;

//   if (!showAppContent) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#000000" }}>
//         <StatusBar barStyle="light-content" backgroundColor="#000000" />
//         <AnimatedSplash onComplete={handleLottieComplete} />
//       </View>
//     );
//   }

//   return <AppContent />;
// }

/****************************** */

import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { ThemeProvider, createTheme } from "@rneui/themed";
import AnimatedSplash from "../Components/splash/AnimatedSplash";
// import { usePushNotification } from "../hooks/usePushNotification";
import { LanguageProvider } from "../contexts/LanguageContext";
import i18n from "../../i18n/i18nConfig";
import { useLoadingResources } from "../hooks/useLoadingResources";
import "../globals.css";
import { UserProvider } from "../contexts/UserContext";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, staleTime: 1000 * 60 * 5 } },
});

const theme = createTheme({
  mode: "dark",
  lightColors: {
    primary: "#FF6B6B",
    secondary: "#4ECB71",
    background: "#000000",
    white: "#FFFFFF",
  },
  darkColors: {
    primary: "#FF8787",
    secondary: "#63D587",
    background: "#000000",
    white: "#FFFFFF",
  },
  components: {
    Header: {
      backgroundColor: "#000000",
      containerStyle: { backgroundColor: "#000000" },
    },
    StatusBar: { barStyle: "light-content", backgroundColor: "#000000" },
    Tab: { indicatorStyle: { backgroundColor: "#FFFFFF" } },
    TabBar: {
      style: { backgroundColor: "#000000" },
      labelStyle: { color: "#FFFFFF" },
      indicatorStyle: { backgroundColor: "#FFFFFF" },
    },
  },
});

const IS_TEST_ENV = true; // Toggle based on environment
const SURL = IS_TEST_ENV
  ? "https://664b-37-39-176-72.ngrok-free.app/api/payments/success"
  : "https://your-production-domain.com/api/payments/success";
const FURL = IS_TEST_ENV
  ? "https://664b-37-39-176-72.ngrok-free.app/api/payments/failure"
  : "https://your-production-domain.com/api/payments/failure";

function AppContent() {
  // const { expoPushToken } = usePushNotification();
  const router = useRouter();

  // useEffect(() => {
  //   if (expoPushToken) console.log("Push Token:", expoPushToken);
  // }, [expoPushToken]);

  useEffect(() => {
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) handleDeepLink(url);
    };

    const handleDeepLink = (url) => {
      if (url.startsWith(SURL)) {
        router.push("/PaymentSuccessScreen");
      } else if (url.startsWith(FURL)) {
        const parsedUrl = Linking.parse(url);
        const errorMessage = parsedUrl.queryParams?.error || "Payment failed";
        router.push({
          pathname: "/PaymentFailureScreen",
          params: { error: errorMessage },
        });
      } else {
        const parsed = Linking.parse(url);
        if (parsed.path?.includes("store")) {
          router.push(parsed.path);
        }
      }
    };

    handleInitialURL();
    const subscription = Linking.addEventListener("url", ({ url }) =>
      handleDeepLink(url)
    );
    return () => subscription.remove();
  }, [router]);

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <UserProvider>
        <ClerkLoaded>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <StatusBar barStyle="light-content" backgroundColor="#000000" />
              <LanguageProvider i18n={i18n}>
                <SafeAreaProvider>
                  <GestureHandlerRootView
                    style={{ flex: 1, backgroundColor: "#000000" }}
                  >
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        headerStyle: { backgroundColor: "#000000" },
                        headerTintColor: "#FFFFFF",
                        contentStyle: { backgroundColor: "#000000" },
                      }}
                    >
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="UserProfile"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="Cart"
                        options={{ headerShown: false, presentation: "modal" }}
                      />
                      {/* <Stack.Screen
                        name="StoreLocator"
                        options={{ headerShown: false }}
                      /> */}
                      <Stack.Screen
                        name="SearchBar"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false, animation: "fade" }}
                      />
                      <Stack.Screen
                        name="Checkout"
                        options={{ headerShown: false, presentation: "modal" }}
                      />
                      <Stack.Screen
                        name="PaymentSuccessScreen"
                        options={{ headerShown: false, animation: "fade" }}
                      />
                      <Stack.Screen
                        name="PaymentFailureScreen"
                        options={{ headerShown: false, animation: "fade" }}
                      />
                    </Stack>
                    <Toast position="top" topOffset={50} />
                  </GestureHandlerRootView>
                </SafeAreaProvider>
              </LanguageProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </ClerkLoaded>
      </UserProvider>
    </ClerkProvider>
  );
}

export default function RootLayout() {
  const [isLottieComplete, setLottieComplete] = useState(true);
  const isLoadingComplete = useLoadingResources();

  const handleLottieComplete = useCallback(() => {
    setLottieComplete(true);
  }, []);

  const showAppContent = isLoadingComplete && isLottieComplete;

  if (!showAppContent) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <AnimatedSplash onComplete={handleLottieComplete} />
      </View>
    );
  }

  return <AppContent />;
}
