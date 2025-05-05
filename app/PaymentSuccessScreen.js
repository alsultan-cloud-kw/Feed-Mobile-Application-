import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
    // Fallback: redirect after 5 seconds if animation fails
    const timer = setTimeout(() => {
      router.replace("/(root)/Cart");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleAnimationFinish = () => {
    router.replace("/(root)/Cart");
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("../assets/lotties/payment-success.json")}
        style={styles.lottieAnimation}
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.subtitle}>
        Thank you for your purchase. Redirecting to cart...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 10,
  },
});
