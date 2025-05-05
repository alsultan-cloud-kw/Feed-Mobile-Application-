import React from "react";
import { Modal, View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  successScale: Animated.Value;
  successOpacity: Animated.Value;
  checkmarkStroke: Animated.Value;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  successScale,
  successOpacity,
  checkmarkStroke,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: successScale }],
              opacity: successOpacity,
            },
          ]}
        >
          <LottieView
            source={require("../../assets/lotties/payment-success.json")}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
          <Text style={styles.modalTitle}>Payment Successful!</Text>
          <Text style={styles.modalText}>
            Your payment has been processed successfully.
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "80%",
    maxWidth: 300,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Cairo-Bold",
    color: "#374151",
    marginTop: 16,
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Cairo",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
});
