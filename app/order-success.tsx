// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useNavigation } from "expo-router";

// const OrderSuccess = () => {
//   const navigation = useNavigation();

//   const handleContinueShopping = () => {
//     navigation.navigate("/(root)/(tabs)");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>Order was successful!</Text>
//       <Button title="Continue Shopping" onPress={handleContinueShopping} />
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
//     color: "#4ECB71",
//   },
// });

// export default OrderSuccess;

/************************** */

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
