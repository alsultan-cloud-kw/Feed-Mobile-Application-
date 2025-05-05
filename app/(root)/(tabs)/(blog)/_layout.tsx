// import { Stack } from "expo-router";
// import React from "react";

// function _layout() {
//   return <Stack screenOptions={{ headerShown: false }}></Stack>;
// }

// export default _layout;

/************************************************* */

import { Stack } from "expo-router";
import { I18nManager } from "react-native";
import { useEffect } from "react";

export default function BlogLayout() {
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
        headerShown: false,
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
        contentStyle: {
          backgroundColor: "#f8f8f8",
        },
      }}
    />
  );
}
