// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useNavigation } from "expo-router";

// const OrderFailed = () => {
//   const navigation = useNavigation();

//   const handleRetryPayment = () => {
//     navigation.navigate("./(root)/Checkout.tsx");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>Order failed. Please try again.</Text>
//       <Button title="Retry Payment" onPress={handleRetryPayment} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f9fafb",
//   },
//   message: {
//     fontSize: 20,
//     marginBottom: 20,
//     color: "#FF6B6B",
//   },
// });

// export default OrderFailed;

/**************************** */

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
