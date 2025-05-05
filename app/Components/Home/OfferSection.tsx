// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Animated,
// } from "react-native";
// import { GiftIcon } from "lucide-react-native";

// const { width, height } = Dimensions.get("window");

// const OfferSection = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [graffiti] = useState([
//     { id: 1, text: "SALE", x: 50, y: 100, rotation: "10deg" },
//     { id: 2, text: "DISCOUNT", x: width - 150, y: 200, rotation: "-15deg" },
//     { id: 3, text: "PROMO", x: 100, y: 300, rotation: "5deg" },
//   ]);

//   // Animated wave background
//   const wavePath = scrollY.interpolate({
//     inputRange: [0, 300],
//     outputRange: [0, -100],
//     extrapolate: "clamp",
//   });

//   return (
//     <ScrollView
//       style={styles.container}
//       scrollEventThrottle={16}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         { useNativeDriver: false }
//       )}
//     >
//       <Animated.View
//         style={[
//           styles.wavyBackground,
//           { transform: [{ translateY: wavePath }] },
//         ]}
//       >
//         {/* Wavy Background Lines */}
//         {[...Array(5)].map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.waveLine,
//               {
//                 top: index * 50,
//                 opacity: 1 - index * 0.2,
//                 transform: [{ scaleX: 1.2 - index * 0.1 }],
//               },
//             ]}
//           />
//         ))}

//         {/* Animated Graffiti Elements */}
//         {graffiti.map((item) => (
//           <Animated.Text
//             key={item.id}
//             style={[
//               styles.graffitiText,
//               {
//                 left: item.x,
//                 top: item.y,
//                 transform: [{ rotate: item.rotation }],
//               },
//             ]}
//           >
//             {item.text}
//           </Animated.Text>
//         ))}

//         {/* Gift Icon */}
//         <Animated.View
//           style={[
//             styles.giftIconContainer,
//             {
//               transform: [
//                 {
//                   scale: scrollY.interpolate({
//                     inputRange: [0, 200],
//                     outputRange: [1, 1.5],
//                     extrapolate: "clamp",
//                   }),
//                 },
//               ],
//             },
//           ]}
//         >
//           <GiftIcon size={50} color="#FF6B6B" />
//         </Animated.View>
//       </Animated.View>

//       {/* Offer Details Section */}
//       <View style={styles.offerDetailsContainer}>
//         <Text style={styles.offerTitle}>Special Store Order Offer</Text>
//         <View style={styles.offerDescription}>
//           <Text style={styles.offerText}>
//             • Exclusive to Physical Store Orders
//           </Text>
//           <Text style={styles.offerText}>
//             • Automatic Discount: 0.250 KWD per kg
//           </Text>
//           <Text style={styles.offerTextHighlight}>
//             Applies to Orders Exceeding 10kg
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F4F4",
//   },
//   wavyBackground: {
//     height: height * 0.6,
//     backgroundColor: "#E9E9E9",
//     position: "relative",
//     overflow: "hidden",
//   },
//   waveLine: {
//     position: "absolute",
//     width: width * 1.5,
//     height: 2,
//     backgroundColor: "rgba(0,0,0,0.1)",
//     left: -width * 0.25,
//     transform: [{ rotate: "15deg" }],
//   },
//   graffitiText: {
//     position: "absolute",
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "rgba(0,0,0,0.3)",
//     fontStyle: "italic",
//   },
//   giftIconContainer: {
//     position: "absolute",
//     bottom: 50,
//     right: 50,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 50,
//     padding: 10,
//   },
//   offerDetailsContainer: {
//     padding: 20,
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   offerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//     color: "#333",
//   },
//   offerDescription: {
//     backgroundColor: "#F9F9F9",
//     padding: 15,
//     borderRadius: 10,
//   },
//   offerText: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#666",
//   },
//   offerTextHighlight: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#FF6B6B",
//     textAlign: "center",
//   },
// });

// export default OfferSection;

/******************************************* */

// import React, { useRef, useEffect } from "react";
// import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
// import { GiftIcon } from "lucide-react-native";

// const { width } = Dimensions.get("window");

// const OfferSection = () => {
//   const giftScale = useRef(new Animated.Value(0)).current;
//   const confettiPositions = [...Array(10)].map(() => ({
//     x: Math.random() * width,
//     y: -50,
//     color: `rgba(${Math.random() * 255},${Math.random() * 255},${
//       Math.random() * 255
//     },0.7)`,
//   }));

//   useEffect(() => {
//     Animated.spring(giftScale, {
//       toValue: 1,
//       friction: 3,
//       tension: 40,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.wavyBackground}>
//         {confettiPositions.map((confetti, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.confetti,
//               {
//                 left: confetti.x,
//                 backgroundColor: confetti.color,
//                 transform: [
//                   {
//                     translateY: giftScale.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [-50, confetti.y],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           />
//         ))}
//         <Animated.View
//           style={[
//             styles.giftContainer,
//             {
//               transform: [{ scale: giftScale }],
//             },
//           ]}
//         >
//           <GiftIcon size={40} color="#FF6B6B" />
//         </Animated.View>
//         <Text style={styles.stylizedText}>PROMO</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.offerText}>Physical Store Orders</Text>
//         <Text style={styles.discountText}>0.250 KWD Discount per kg</Text>
//         <Text style={styles.conditionText}>For Orders Over 10kg</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F5F5F5",
//   },
//   wavyBackground: {
//     height: 200,
//     backgroundColor: "#E0E0E0",
//     position: "relative",
//     overflow: "hidden",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   confetti: {
//     position: "absolute",
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     opacity: 0.7,
//   },
//   giftContainer: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 30,
//     padding: 10,
//   },
//   stylizedText: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//     fontSize: 40,
//     fontWeight: "bold",
//     color: "rgba(0,0,0,0.1)",
//     transform: [{ rotate: "-15deg" }],
//   },
//   detailsContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   offerText: {
//     fontSize: 18,
//     color: "#333",
//   },
//   discountText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#FF6B6B",
//     marginTop: 10,
//   },
//   conditionText: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
// });

// export default OfferSection;

/*********************************************************** */

import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { GiftIcon, MapPinIcon } from "lucide-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const OfferSection = () => {
  const confettiRef = useRef(null);

  const triggerConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.start();
    }
  };
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: width - 50, y: 0 }}
        fadeOut={true}
      />

      <View style={styles.wavyBackground}>
        <View style={styles.overlay}>
          <Text style={styles.stylizedText}>PROMO</Text>
          <TouchableOpacity
            style={styles.giftContainer}
            onPress={triggerConfetti}
          >
            <View className="animate-pulse">
              <GiftIcon size={40} color="#FF6B6B" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.offerText}>Physical Store Orders</Text>
        <Text style={styles.discountText}>0.250 KWD Discount</Text>
        <Text style={styles.conditionText}>For Orders Over 10kg</Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/StoreLocator");
          }}
          style={styles.storeLink}
        >
          <MapPinIcon size={20} color="#FF6B6B" />
          <Text style={styles.storeLinkText}>See Store Locations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  wavyBackground: {
    height: 200,
    backgroundColor: "#E0E0E0",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  stylizedText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(300,0,0,0.1)",
    transform: [{ rotate: "-15deg" }],
  },
  giftContainer: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 30,
    padding: 10,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
  },
  offerText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  discountText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3cb472",
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  storeLink: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  storeLinkText: {
    color: "#FF6B6B",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default OfferSection;
