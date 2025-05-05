import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function PaymentFailureScreen({ route }) {
  const router = useRouter();
  const errorMessage = route.params?.error || "Unknown error occurred";

  const handleBackToCart = () => {
    router.replace("/(root)/Cart");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Failed</Text>
      <Text style={styles.subtitle}>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToCart}>
        <Text style={styles.buttonText}>Back to Cart</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8787",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
