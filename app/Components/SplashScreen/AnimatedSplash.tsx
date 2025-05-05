// // app/components/SplashScreen/AnimatedSplash.tsx
// import React, { useEffect, useRef } from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import LottieView from "lottie-react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   runOnJS,
//   Easing,
// } from "react-native-reanimated";
// import * as splash from "../../../assets/lotties/splash.json";

// interface AnimatedSplashProps {
//   onAnimationComplete: () => void;
// }

// const { width, height } = Dimensions.get("window");

// export const AnimatedSplash: React.FC<AnimatedSplashProps> = ({
//   onAnimationComplete,
// }) => {
//   const lottieRef = useRef<LottieView>(null);
//   const opacity = useSharedValue(1);
//   const scale = useSharedValue(1);

//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: opacity.value,
//     transform: [{ scale: scale.value }],
//   }));

//   useEffect(() => {
//     // Start Lottie animation
//     lottieRef.current?.play();

//     // After Lottie completes, fade out the splash screen
//     const timer = setTimeout(() => {
//       opacity.value = withTiming(0, {
//         duration: 800,
//         easing: Easing.out(Easing.ease),
//       });

//       scale.value = withTiming(
//         1.1,
//         {
//           duration: 800,
//           easing: Easing.out(Easing.ease),
//         },
//         () => {
//           runOnJS(onAnimationComplete)();
//         }
//       );
//     }, 2500); // Adjust timing based on your Lottie animation duration

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Animated.View style={[styles.container, animatedStyle]}>
//       <LottieView
//         ref={lottieRef}
//         source={splash}
//         style={styles.lottie}
//         autoPlay={false}
//         loop={false}
//         resizeMode="cover"
//         renderMode="HARDWARE"
//         // cacheStrategy="strong"
//       />
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 999,
//   },
//   lottie: {
//     width: width * 0.8,
//     height: height * 0.4,
//   },
// });

/********************************* */

// app/components/SplashScreen/AnimatedSplash.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Asset } from "expo-asset"; // Import Asset for dynamic asset loading

interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

const { width, height } = Dimensions.get("window");

export const AnimatedSplash: React.FC<AnimatedSplashProps> = ({
  onAnimationComplete,
}) => {
  const [lottieSource, setLottieSource] = useState<any>(null);
  const lottieRef = useRef<LottieView>(null);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    // Load Lottie file asynchronously
    const loadLottieFile = async () => {
      try {
        const splashAsset = Asset.fromModule(
          require("../../../assets/lotties/splash.json") // Path to your Lottie JSON
        );
        await splashAsset.downloadAsync();
        setLottieSource(splashAsset.localUri); // Set the loaded Lottie file URI
      } catch (error) {
        console.warn("Error loading Lottie JSON:", error);
      }
    };

    loadLottieFile();

    // Start Lottie animation after loading
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });

      scale.value = withTiming(
        1.1,
        {
          duration: 800,
          easing: Easing.out(Easing.ease),
        },
        () => {
          runOnJS(onAnimationComplete)(); // Trigger callback on animation complete
        }
      );
    }, 2500); // Adjust timing based on your Lottie animation duration

    return () => clearTimeout(timer);
  }, []);

  if (!lottieSource) {
    return null; // Don't render until the Lottie JSON is loaded
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LottieView
        ref={lottieRef}
        source={{ uri: lottieSource }} // Dynamically load the Lottie source
        style={styles.lottie}
        autoPlay={false}
        loop={false}
        resizeMode="cover"
        renderMode="HARDWARE"
        // cacheStrategy="strong"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.4,
  },
});
