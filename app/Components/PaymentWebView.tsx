// components/PaymentWebView.tsx
import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "expo-router";

interface PaymentWebViewProps {
  paymentUrl: string;
  isVisible: boolean;
  onClose: () => void;
  onPaymentComplete: (result: {
    status: "success" | "failed" | "cancelled";
  }) => void;
}

export const PaymentWebView: React.FC<PaymentWebViewProps> = ({
  paymentUrl,
  isVisible,
  onClose,
  onPaymentComplete,
}) => {
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState: any) => {
    // Check for success/failure URLs
    if (navState.url.includes("KfastSuccess")) {
      onPaymentComplete({ status: "success" });
    } else if (navState.url.includes("KfastFail")) {
      onPaymentComplete({ status: "failed" });
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ArrowLeft color="#E53935" size={24} />
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          incognito={true}
          cacheEnabled={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
});
