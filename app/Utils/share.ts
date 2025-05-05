// import { Share, Platform } from "react-native";

// const share = async ({ url }: { url: string }) => {
//   try {
//     const result = await Share.share({
//       message: "Check this out! 🚀", // Message to share
//       url: url, // The deep linking actual shared product Url
//     });

//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         console.log("Shared with activity type:", result.activityType);
//       } else {
//         console.log("Shared successfully");
//       }
//     } else if (result.action === Share.dismissedAction) {
//       console.log("Share dismissed");
//     }
//   } catch (error: any) {
//     console.error("Error sharing:", error.message);
//   }
// };

// export default share;

/********************************************* */

import * as Linking from "expo-linking";
import { Platform, Share } from "react-native";

export const shareProduct = async (
  productId: string,
  productName: string
): Promise<void> => {
  try {
    // Create deep link to the product
    const deepLink = Linking.createURL(
      `/(root)/(tabs)/(store)/store/${productId}`
    );

    // Fallback URL (replace with your actual app store links)
    const fallbackUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/your-app-id" // Replace with your App Store link
        : "https://play.google.com/store/apps/details?id=com.yourcompany.mobfeedsapp"; // Replace with your Play Store link

    // Message to share
    const message = `Check out this product: ${productName}\n${deepLink}\n\nDownload the app: ${fallbackUrl}`;

    // Share the message
    const result = await Share.share({
      message,
      url: deepLink, // For iOS
      title: `Share ${productName}`, // Optional, improves share sheet on some platforms
    });

    if (result.action === Share.sharedAction) {
      console.log("Product shared successfully");
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed");
    }
  } catch (error) {
    console.error("Error sharing product:", error);
    throw new Error("Failed to share product");
  }
};
