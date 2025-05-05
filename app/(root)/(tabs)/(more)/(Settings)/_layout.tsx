import React from "react";
import { Stack } from "expo-router";

const SettingsLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#F9FAFB" }, // Light gray background
      animation: "slide_from_right",
    }}
  />
);

export default SettingsLayout;
