import { Linking } from "react-native";

const linking = {
  prefixes: ["myapp://", "https://your-app-domain.com"],
  config: {
    screens: {
      "(tabs)": {
        screens: {
          // your tab screens
        },
      },
      "order-success": "order-success",
      "order-failed": "order-failed",
      Checkout: "checkout",
      payment: "payment",
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },
  subscribe(listener: (url: string) => void) {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      listener(url);
    });
    return () => {
      subscription.remove();
    };
  },
};

export default linking;
