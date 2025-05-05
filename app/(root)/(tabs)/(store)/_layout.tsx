// import { Stack } from "expo-router";
// import { I18nManager } from "react-native";
// import { useEffect } from "react";

// export default function BlogLayout() {
//   useEffect(() => {
//     // Force RTL layout
//     if (!I18nManager.isRTL) {
//       I18nManager.forceRTL(true);
//       I18nManager.allowRTL(true);
//     }
//   }, []);

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: "#ffffff",
//         },
//         headerTitleStyle: {
//           fontWeight: "600",
//         },
//         contentStyle: {
//           backgroundColor: "#f8f8f8",
//         },
//       }}
//     />
//   );
// }

/*************************************** */

// // /app/(root)/(tabs)/(store)/_layout.tsx

// import { Stack } from "expo-router";
// import { I18nManager } from "react-native";
// import { useEffect } from "react";

// export default function StoreLayout() {
//   useEffect(() => {
//     // Force RTL layout
//     if (!I18nManager.isRTL) {
//       I18nManager.forceRTL(true);
//       I18nManager.allowRTL(true);
//     }
//   }, []);

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false, // Keep this false since we're using custom headers
//         presentation: "card",
//         animation: "slide_from_right",
//         // Enable gestures for better UX
//         gestureEnabled: true,
//         gestureDirection: I18nManager.isRTL
//           ? "horizontal-inverted"
//           : "horizontal",
//         contentStyle: {
//           backgroundColor: "#ffffff",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         options={{
//           headerShown: false,
//           // Custom animation for the main store page
//           animation: "fade",
//         }}
//       />
//       <Stack.Screen
//         name="store/[documentId].tsx"
//         options={{
//           headerShown: false,
//           // Ensure proper animation direction for RTL
//           animation: I18nManager.isRTL ? "slide_from_left" : "slide_from_right",
//           // Enable gestures for a native feel
//           gestureEnabled: true,
//           gestureDirection: I18nManager.isRTL
//             ? "horizontal-inverted"
//             : "horizontal",
//           presentation: "card",
//           // Add custom transition spec for smoother animations
//           animationDuration: 200,
//         }}
//       />
//     </Stack>
//   );
// }

/********************************************* */
// Should work and better not handeled dynamically

// import { Stack } from "expo-router";
// import { I18nManager } from "react-native";
// import { useEffect } from "react";

// export default function StoreLayout() {
//   useEffect(() => {
//     if (!I18nManager.isRTL) {
//       I18nManager.forceRTL(true);
//       I18nManager.allowRTL(true);
//     }
//   }, []);

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         presentation: "card",
//         animation: "slide_from_right",
//         gestureEnabled: true,
//         gestureDirection: I18nManager.isRTL ? "horizontal-inverted" : "horizontal",
//         contentStyle: {
//           backgroundColor: "#ffffff",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         options={{
//           headerShown: false,
//           animation: "fade",
//         }}
//       />
//       <Stack.Screen
//         // Change this line to match the actual route structure
//         name="store/[documentId]"
//         options={{
//           headerShown: false,
//           animation: I18nManager.isRTL ? "slide_from_left" : "slide_from_right",
//           gestureEnabled: true,
//           gestureDirection: I18nManager.isRTL ? "horizontal-inverted" : "horizontal",
//           presentation: "card",
//           animationDuration: 200,
//         }}
//       />
//     </Stack>
//   );
// }

/****************************************** */
// Works and handeled dynamically
// /app/(root)/(tabs)/(store)/_layout.tsx

import { Stack } from "expo-router";
import { I18nManager } from "react-native";
import { useEffect } from "react";

export default function StoreLayout() {
  useEffect(() => {
    // Force RTL layout
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Keep this false since we're using custom headers
        presentation: "card",
        animation: "slide_from_right",
        // Enable gestures for better UX
        gestureEnabled: true,
        gestureDirection: I18nManager.isRTL
          ? "horizontal-inverted"
          : "horizontal",
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    />
  );
}
