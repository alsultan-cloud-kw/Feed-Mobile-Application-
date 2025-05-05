import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const ErrorView = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Failed to load content</Text>
    <TouchableOpacity onPress={onRetry} style={styles.button}>
      <Text style={styles.buttonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4ECB71",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
