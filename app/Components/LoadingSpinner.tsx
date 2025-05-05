import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export const LoadingSpinner = () => {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ActivityIndicator size="large" color="#E53E3E" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
