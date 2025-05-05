// // app/(root)/order-success.tsx
// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Animated, SafeAreaView } from "react-native";
// import { router } from "expo-router";
// import { CheckCircle } from "lucide-react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Toast from "react-native-toast-message";

// export default function OrderSuccessScreen() {
//   const scaleValue = new Animated.Value(0);

//   useEffect(() => {
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 50,
//       friction: 7,
//     }).start();

//     Toast.show({
//       type: "success",
//       text1: "Payment Successful",
//       text2: "Your order has been processed successfully.",
//     });
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View
//         style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}
//       >
//         <CheckCircle size={80} color="#4CAF50" />
//       </Animated.View>
//       <Text style={styles.title}>Payment Successful!</Text>
//       <Text style={styles.message}>Your order has been confirmed.</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.replace("/(root)/(tabs)")}
//       >
//         <Text style={styles.buttonText}>Continue Shopping</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   iconContainer: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: "Cairo-Bold",
//     color: "#2E7D32",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   message: {
//     fontSize: 16,
//     fontFamily: "Cairo",
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontFamily: "Cairo-Bold",
//   },
// });

/****************************** */

import { View, Text } from "react-native";
import React from "react";

const OrderSuccess = () => {
  return (
    <View>
      <Text>OrderSuccess</Text>
    </View>
  );
};

export default OrderSuccess;
