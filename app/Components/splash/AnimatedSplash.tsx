// // app/components/AnimatedSplash.tsx
// import React, { useCallback } from "react";
// import { View, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native";
// import * as SplashScreen from "expo-splash-screen";

// // Prevent the splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

// export default function AnimatedSplash({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   const handleAnimationFinish = useCallback(async () => {
//     await SplashScreen.hideAsync();
//     onComplete();
//   }, [onComplete]);

//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={require("../../../assets/lotties/splash.json")}
//         autoPlay
//         loop={false}
//         onAnimationFinish={handleAnimationFinish}
//         style={styles.animation}
//         renderMode="HARDWARE"
//         // cacheStrategy="strong"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF", // Match your app's theme
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });

/********************************* */

// // app/components/AnimatedSplash.tsx
// import React, { useCallback } from "react";
// import { View, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native";
// import * as SplashScreen from "expo-splash-screen";
// import * as Splash from "../../../assets/lotties/splash.json";
// // Prevent the splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

// export default function AnimatedSplash({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   const handleAnimationFinish = useCallback(async () => {
//     await SplashScreen.hideAsync();
//     onComplete();
//   }, [onComplete]);

//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={Splash}
//         autoPlay
//         loop={false}
//         onAnimationFinish={handleAnimationFinish}
//         style={styles.animation}
//         renderMode="HARDWARE"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });

/***************************************** */

// import React, { useCallback } from "react";
// import { View, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native";
// import * as SplashScreen from "expo-splash-screen";
// import * as Splash from "../../../assets/lotties/splash.json";

// export default function AnimatedSplash({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   const handleAnimationFinish = useCallback(async () => {
//     try {
//       // Hide the native splash screen
//       await SplashScreen.hideAsync();
//       // Small delay to ensure smooth transition
//       await new Promise((resolve) => setTimeout(resolve, 150));
//       // Complete the splash screen
//       onComplete();
//     } catch (e) {
//       console.warn(e);
//       onComplete();
//     }
//   }, [onComplete]);

//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={Splash}
//         autoPlay
//         loop={false}
//         speed={1.0} // Adjust this value to control animation speed
//         onAnimationFinish={handleAnimationFinish}
//         style={styles.animation}
//         renderMode="HARDWARE"
//         cacheStrategy="strong"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF", // Make sure this matches your splash screen background
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });

/**************************************** */

// import React, { useCallback, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native";
// import * as SplashScreen from "expo-splash-screen";
// import * as Splash from "../../../assets/lotties/splash.json";

// export default function AnimatedSplash({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   useEffect(() => {
//     // Hide the native splash screen as soon as AnimatedSplash mounts
//     SplashScreen.hideAsync();
//   }, []);

//   const handleAnimationFinish = useCallback(async () => {
//     onComplete();
//   }, [onComplete]);

//   return (
//     <View style={styles.container}>
//       <LottieView
//         source={Splash}
//         autoPlay
//         loop={true} // Keep it looping until parent decides to unmount
//         speed={1.0}
//         style={styles.animation}
//         renderMode="HARDWARE"
//         // cacheStrategy="strong"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });

/***************************************** */

import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

interface AnimatedSplashProps {
  onComplete: () => void;
}

export default function AnimatedSplash({ onComplete }: AnimatedSplashProps) {
  useEffect(() => {
    // Hide the native splash screen
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/lotties/splash.json")}
        autoPlay
        loop
        style={styles.animation}
        renderMode="HARDWARE"
        // cacheStrategy="strong"
        onAnimationFinish={onComplete}
        speed={1}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
});
