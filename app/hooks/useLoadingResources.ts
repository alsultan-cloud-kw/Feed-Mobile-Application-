import { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

export function useLoadingResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          Cairo: require("../../assets/fonts/Cairo-Regular.ttf"),
          "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
          "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
        });

        // Pre-load images
        await Asset.loadAsync([
          require("../../assets/images/icon.png"),
          require("../../assets/images/adaptive-icon.png"),
          require("../../assets/images/splash-icon.png"),
          require("../../assets/notification-icon.png"),
        ]);

        // Add any API calls or data fetching here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Minimum splash duration
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
