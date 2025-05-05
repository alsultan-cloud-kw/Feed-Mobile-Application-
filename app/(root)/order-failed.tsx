// // app/(root)/order-failed.tsx
// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";
// import { router } from "expo-router";
// import { XCircle } from "lucide-react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default function OrderFailedScreen() {
//   const scaleValue = new Animated.Value(0);

//   useEffect(() => {
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 50,
//       friction: 7,
//     }).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}
//       >
//         <XCircle size={80} color="#F44336" />
//       </Animated.View>
//       <Text style={styles.title}>Payment Failed</Text>
//       <Text style={styles.message}>
//         Sorry, there was a problem processing your payment.
//       </Text>
//       <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//         <Text style={styles.buttonText}>Try Again</Text>
//       </TouchableOpacity>
//     </View>
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
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#C62828",
//   },
//   message: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: "#F44336",
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

/***************************************** */

// // components/OrderSummary/index.tsx
// import React from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// interface OrderSummaryRowProps {
//   label: string;
//   value: string;
//   isTotal?: boolean;
//   isDiscount?: boolean;
//   isLoading?: boolean;
// }

// export const OrderSummaryRow: React.FC<OrderSummaryRowProps> = ({
//   label,
//   value,
//   isTotal,
//   isDiscount,
//   isLoading,
// }) => (
//   <View style={[styles.summaryRow, isTotal && styles.totalRow]}>
//     <Text
//       style={[
//         styles.summaryLabel,
//         isTotal && styles.totalLabel,
//         isDiscount && styles.discountLabel,
//       ]}
//     >
//       {label}
//     </Text>
//     <View style={styles.valueContainer}>
//       {isLoading ? (
//         <ActivityIndicator
//           size="small"
//           color="#10B981"
//           style={styles.valueLoader}
//         />
//       ) : (
//         <Text
//           style={[
//             styles.summaryValue,
//             isTotal && styles.totalValue,
//             isDiscount && styles.discountLabel,
//           ]}
//         >
//           {value}
//         </Text>
//       )}
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   totalRow: {
//     marginTop: 8,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#e5e7eb",
//   },
//   summaryLabel: {
//     fontSize: 14,
//     fontFamily: "Cairo",
//     color: "#4b5563",
//   },
//   summaryValue: {
//     fontSize: 14,
//     fontFamily: "Cairo-SemiBold",
//     color: "#374151",
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontFamily: "Cairo-Bold",
//     color: "#1f2937",
//   },
//   totalValue: {
//     fontSize: 16,
//     fontFamily: "Cairo-Bold",
//     color: "#1f2937",
//   },
//   discountLabel: {
//     color: "#059669",
//   },
//   valueContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     minWidth: 80,
//     justifyContent: "flex-end",
//   },
//   valueLoader: {
//     marginLeft: 8,
//   },
// });

// export default OrderSummaryRow;

/***************************************** */

import { View, Text } from "react-native";
import React from "react";

const OrderFailed = () => {
  return (
    <View>
      <Text>OrderFailed</Text>
    </View>
  );
};

export default OrderFailed;
