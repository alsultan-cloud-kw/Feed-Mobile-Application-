// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Pressable,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Trash2, Plus, Minus } from "lucide-react-native";
// import useCartStore from "../store/cartStore"; // Adjust path as needed
// import { useRouter } from "expo-router";

// const CartPage: React.FC = () => {
//   const [couponCode, setCouponCode] = useState("");
//   const { items, total, removeFromCart, updateQuantity } = useCartStore();
//   const router = useRouter();

//   const handleRemoveItem = (documentId: string) => {
//     removeFromCart(documentId);
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       Alert.alert(
//         "Empty Cart",
//         "Please add items to your cart before checkout."
//       );
//       return;
//     }
//     router.push("/Checkout");
//   };

//   return (
//     <ScrollView
//       className="flex-1 bg-white px-4 py-6"
//       contentContainerStyle={{ paddingBottom: 100 }}
//     >
//       <Text className="text-2xl font-bold text-gray-800 mb-6">Your Cart</Text>

//       {items.length === 0 ? (
//         <View className="flex-1 justify-center items-center mt-20">
//           <Text className="text-gray-600 text-lg mb-4">Your cart is empty</Text>
//           <Pressable
//             onPress={() => router.push("/(store)")}
//             className="bg-red-500 rounded-lg px-6 py-3"
//           >
//             <Text className="text-white font-semibold">Start Shopping</Text>
//           </Pressable>
//         </View>
//       ) : (
//         <>
//           {items.map((item) => (
//             <View
//               key={item.documentId}
//               className="flex-row items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
//             >
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 className="w-20 h-20 rounded-lg mr-4"
//                 resizeMode="cover"
//               />
//               <View className="flex-1">
//                 <Text className="text-base font-semibold text-gray-800">
//                   {item.name}
//                 </Text>
//                 <Text className="text-sm text-gray-600 mb-2">
//                   {(item.salesPrice || item.price).toFixed(2)} KWD
//                 </Text>
//                 <View className="flex-row items-center">
//                   <Pressable
//                     onPress={() =>
//                       updateQuantity(item.documentId, item.quantity - 1)
//                     }
//                     className="bg-red-100 p-1 rounded"
//                   >
//                     <Minus size={16} color="#E53935" />
//                   </Pressable>
//                   <Text className="mx-3 text-base">{item.quantity}</Text>
//                   <Pressable
//                     onPress={() =>
//                       updateQuantity(item.documentId, item.quantity + 1)
//                     }
//                     className="bg-red-100 p-1 rounded"
//                   >
//                     <Plus size={16} color="#E53935" />
//                   </Pressable>
//                 </View>
//               </View>
//               <Pressable
//                 onPress={() => handleRemoveItem(item.documentId)}
//                 className="ml-2"
//               >
//                 <Trash2 size={20} color="#E53935" />
//               </Pressable>
//             </View>
//           ))}

//           <View className="mt-6 bg-gray-50 rounded-lg p-4">
//             <View className="flex-row justify-between mb-4">
//               <Text className="text-lg font-semibold text-gray-800">
//                 Subtotal
//               </Text>
//               <Text className="text-lg font-semibold text-gray-800">
//                 {total.toFixed(2)} KWD
//               </Text>
//             </View>
//             <TextInput
//               value={couponCode}
//               onChangeText={setCouponCode}
//               placeholder="Apply Coupon Code"
//               placeholderTextColor="#9ca3af"
//               className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
//             />
//             <Pressable
//               onPress={handleCheckout}
//               className="bg-red-500 rounded-lg py-3 flex items-center"
//             >
//               <Text className="text-white text-lg font-semibold">
//                 Proceed to Checkout
//               </Text>
//             </Pressable>
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default CartPage;

/******************************************************** */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Pressable,
//   TextInput,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react-native";
// import useCartStore from "../../store/cartStore"; // Adjust path as needed
// import { router } from "expo-router";

// const CartPage: React.FC = () => {
//   const [couponCode, setCouponCode] = useState("");
//   const { items, total, removeFromCart, updateQuantity } = useCartStore();

//   const handleRemoveItem = (documentId: string) => {
//     removeFromCart(documentId);
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       Alert.alert(
//         "Empty Cart",
//         "Please add items to your cart before checkout."
//       );
//       return;
//     }
//     router.push("/Checkout");
//   };

//   return (
//     <ScrollView
//       className="flex-1 bg-white px-4 py-6"
//       contentContainerStyle={{ paddingBottom: 100 }}
//     >
//       <View className="flex-row">
//         <TouchableOpacity onPress={() => router.back()}>
//           <ArrowLeft color={"red"} size={"30"} />
//         </TouchableOpacity>
//         <Text className="text-2xl font-bold text-gray-800 mb-6">Your Cart</Text>
//       </View>
//       {items.length === 0 ? (
//         <View className="flex-1 justify-center items-center mt-20">
//           <Text className="text-gray-600 text-lg mb-4">Your cart is empty</Text>
//           <Pressable
//             onPress={() => router.push("/(root)/(tabs)/(store)")}
//             className="bg-red-500 rounded-lg px-6 py-3"
//           >
//             <Text className="text-white font-semibold">Start Shopping</Text>
//           </Pressable>
//         </View>
//       ) : (
//         <>
//           {items.map((item) => (
//             <View
//               key={item.documentId}
//               className="flex-row items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
//             >
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 className="w-20 h-20 rounded-lg mr-4"
//                 resizeMode="cover"
//               />
//               <View className="flex-1">
//                 <Text className="text-base font-semibold text-gray-800">
//                   {item.name}
//                 </Text>
//                 <Text className="text-sm text-gray-600 mb-2">
//                   {(item.salesPrice || item.price).toFixed(2)} KWD
//                 </Text>
//                 <View className="flex-row items-center">
//                   <Pressable
//                     onPress={() =>
//                       updateQuantity(item.documentId, item.quantity - 1)
//                     }
//                     className="bg-red-100 p-1 rounded"
//                   >
//                     <Minus size={16} color="#E53935" />
//                   </Pressable>
//                   <Text className="mx-3 text-base">{item.quantity}</Text>
//                   <Pressable
//                     onPress={() =>
//                       updateQuantity(item.documentId, item.quantity + 1)
//                     }
//                     className="bg-red-100 p-1 rounded"
//                   >
//                     <Plus size={16} color="#E53935" />
//                   </Pressable>
//                 </View>
//               </View>
//               <Pressable
//                 onPress={() => handleRemoveItem(item.documentId)}
//                 className="ml-2"
//               >
//                 <Trash2 size={20} color="#E53935" />
//               </Pressable>
//             </View>
//           ))}

//           <View className="mt-6 bg-gray-50 rounded-lg p-4">
//             <View className="flex-row justify-between mb-4">
//               <Text className="text-lg font-semibold text-gray-800">
//                 Subtotal
//               </Text>
//               <Text className="text-lg font-semibold text-gray-800">
//                 {total.toFixed(2)} KWD
//               </Text>
//             </View>
//             <TextInput
//               value={couponCode}
//               onChangeText={setCouponCode}
//               placeholder="Apply Coupon Code"
//               placeholderTextColor="#9ca3af"
//               className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
//             />
//             <Pressable
//               onPress={handleCheckout}
//               className="bg-red-500 rounded-lg py-3 flex items-center"
//             >
//               <Text className="text-white text-lg font-semibold">
//                 Proceed to Checkout
//               </Text>
//             </Pressable>
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default CartPage;

/***************************************************************** */

// // CartPage.tsx
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Pressable,
//   TextInput,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react-native";
// import useCartStore from "../../store/cartStore";
// import { router } from "expo-router";
// import axios from "axios";

// interface PromoCode {
//   id: number;
//   documentId: string;
//   code: string;
//   CTA: string;
//   amount: number;
//   type: "fixed" | "percentage";
//   IsActive: boolean;
// }

// const CartPage: React.FC = () => {
//   const [couponCode, setCouponCode] = useState("");
//   const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
//   const [couponError, setCouponError] = useState("");

//   const {
//     items,
//     total,
//     itemCount,
//     discountedTotal,
//     appliedCoupon,
//     removeFromCart,
//     updateQuantity,
//     applyCoupon,
//     removeCoupon,
//   } = useCartStore();

//   const handleRemoveItem = (documentId: string) => {
//     Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Remove",
//         style: "destructive",
//         onPress: () => removeFromCart(documentId),
//       },
//     ]);
//   };

//   const handleQuantityChange = (documentId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       handleRemoveItem(documentId);
//       return;
//     }
//     updateQuantity(documentId, newQuantity);
//   };

//   const validateCouponCode = async () => {
//     if (!couponCode.trim()) {
//       setCouponError("Please enter a coupon code");
//       return;
//     }

//     setIsLoadingCoupon(true);
//     setCouponError("");

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/promo-codes`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_COUPON}`,
//           },
//         }
//       );

//       const promoCodes: PromoCode[] = response.data.data;
//       const validCoupon = promoCodes.find(
//         (promo) => promo.code.toLowerCase() === couponCode.trim().toLowerCase()
//       );

//       if (!validCoupon) {
//         setCouponError("Invalid coupon code");
//         return;
//       }

//       if (!validCoupon.IsActive) {
//         setCouponError("This coupon has expired");
//         return;
//       }

//       applyCoupon(validCoupon);
//       setCouponCode("");
//       Alert.alert("Success", validCoupon.CTA);
//     } catch (error) {
//       console.error("Error validating coupon:", error);
//       setCouponError("Error validating coupon. Please try again.");
//     } finally {
//       setIsLoadingCoupon(false);
//     }
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       Alert.alert(
//         "Empty Cart",
//         "Please add items to your cart before checkout."
//       );
//       return;
//     }
//     router.push("/(root)/Checkout");
//   };

//   if (items.length === 0) {
//     return (
//       <View className="flex-1 bg-white px-4 py-6">
//         <View className="flex-row mb-6">
//           <TouchableOpacity onPress={() => router.back()}>
//             <ArrowLeft color="red" size={30} />
//           </TouchableOpacity>
//           <Text className="text-2xl font-bold text-gray-800 ml-4">
//             Your Cart
//           </Text>
//         </View>
//         <View className="flex-1 justify-center items-center">
//           <Text className="text-gray-600 text-lg mb-4">Your cart is empty</Text>
//           <Pressable
//             onPress={() => router.push("/(root)/(tabs)/(store)")}
//             className="bg-red-500 rounded-lg px-6 py-3"
//           >
//             <Text className="text-white font-semibold">Start Shopping</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-white px-4 py-6"
//       contentContainerStyle={{ paddingBottom: 100 }}
//     >
//       <View className="flex-row mb-6">
//         <TouchableOpacity onPress={() => router.back()}>
//           <ArrowLeft color="red" size={30} />
//         </TouchableOpacity>
//         <Text className="text-2xl font-bold text-gray-800 ml-4">
//           Your Cart ({itemCount} items)
//         </Text>
//       </View>

//       {items.map((item) => (
//         <View
//           key={item.documentId}
//           className="flex-row items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
//         >
//           <Image
//             source={{ uri: item.imageUrl }}
//             className="w-20 h-20 rounded-lg mr-4"
//             resizeMode="cover"
//           />
//           <View className="flex-1">
//             <Text className="text-base font-semibold text-gray-800">
//               {item.name}
//             </Text>
//             <Text className="text-sm text-gray-600 mb-2">
//               {(item.salesPrice || item.price).toFixed(2)} KWD
//             </Text>
//             <View className="flex-row items-center">
//               <Pressable
//                 onPress={() =>
//                   handleQuantityChange(item.documentId, item.quantity - 1)
//                 }
//                 className="bg-red-100 p-1 rounded"
//               >
//                 <Minus size={16} color="#E53935" />
//               </Pressable>
//               <Text className="mx-3 text-base">{item.quantity}</Text>
//               <Pressable
//                 onPress={() =>
//                   handleQuantityChange(item.documentId, item.quantity + 1)
//                 }
//                 className="bg-red-100 p-1 rounded"
//               >
//                 <Plus size={16} color="#E53935" />
//               </Pressable>
//             </View>
//           </View>
//           <Pressable
//             onPress={() => handleRemoveItem(item.documentId)}
//             className="ml-2"
//           >
//             <Trash2 size={20} color="#E53935" />
//           </Pressable>
//         </View>
//       ))}

//       <View className="mt-6 bg-gray-50 rounded-lg p-4">
//         <View className="flex-row justify-between mb-4">
//           <Text className="text-lg font-semibold text-gray-800">Subtotal</Text>
//           <Text className="text-lg font-semibold text-gray-800">
//             {total.toFixed(2)} KWD
//           </Text>
//         </View>

//         {appliedCoupon ? (
//           <View className="mb-4 bg-green-50 p-3 rounded-lg">
//             <View className="flex-row justify-between items-center">
//               <View>
//                 <Text className="text-green-700 font-semibold">
//                   {appliedCoupon.code} applied
//                 </Text>
//                 <Text className="text-green-600 text-sm">
//                   {appliedCoupon.type === "percentage"
//                     ? `${appliedCoupon.amount}% off`
//                     : `${appliedCoupon.amount} KWD off`}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={removeCoupon}
//                 className="bg-green-100 px-3 py-1 rounded"
//               >
//                 <Text className="text-green-700">Remove</Text>
//               </Pressable>
//             </View>
//             <View className="mt-2 flex-row justify-between">
//               <Text className="text-green-700">Total after discount:</Text>
//               <Text className="text-green-700 font-semibold">
//                 {discountedTotal.toFixed(2)} KWD
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View>
//             <TextInput
//               value={couponCode}
//               onChangeText={(text) => {
//                 setCouponCode(text);
//                 setCouponError("");
//               }}
//               placeholder="Apply Coupon Code"
//               placeholderTextColor="#9ca3af"
//               className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
//               autoCapitalize="characters"
//             />
//             {couponError ? (
//               <Text className="text-red-500 text-sm mb-2">{couponError}</Text>
//             ) : null}
//             <Pressable
//               onPress={validateCouponCode}
//               disabled={isLoadingCoupon || !couponCode.trim()}
//               className={`bg-red-500 rounded-lg py-2 flex items-center mb-4 ${
//                 !couponCode.trim() || isLoadingCoupon ? "opacity-50" : ""
//               }`}
//             >
//               {isLoadingCoupon ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text className="text-white font-semibold">Apply Coupon</Text>
//               )}
//             </Pressable>
//           </View>
//         )}

//         <Pressable
//           onPress={handleCheckout}
//           className="bg-red-500 rounded-lg py-3 flex items-center"
//         >
//           <Text className="text-white text-lg font-semibold">
//             Proceed to Checkout ({(discountedTotal || total).toFixed(2)} KWD)
//           </Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// export default CartPage;

/*********************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Pressable,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react-native";
// import useCartStore from "../../store/cartStore";
// import { router } from "expo-router";
// import CouponSection from "../Components/CouponSection";

// const CartPage: React.FC = () => {
//   const {
//     items,
//     total,
//     itemCount,
//     discountedTotal,
//     appliedCoupon,
//     removeFromCart,
//     updateQuantity,
//   } = useCartStore();

//   const handleRemoveItem = (documentId: string) => {
//     Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Remove",
//         style: "destructive",
//         onPress: () => removeFromCart(documentId),
//       },
//     ]);
//   };

//   const handleQuantityChange = (documentId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       handleRemoveItem(documentId);
//       return;
//     }
//     updateQuantity(documentId, newQuantity);
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       Alert.alert(
//         "Empty Cart",
//         "Please add items to your cart before checkout."
//       );
//       return;
//     }
//     router.push("/(root)/Checkout");
//   };

//   if (items.length === 0) {
//     return (
//       <View className="flex-1 bg-white px-4 py-6">
//         <View className="flex-row mb-6">
//           <TouchableOpacity onPress={() => router.back()}>
//             <ArrowLeft color="red" size={30} />
//           </TouchableOpacity>
//           <Text className="text-2xl font-bold text-gray-800 ml-4">
//             Your Cart
//           </Text>
//         </View>
//         <View className="flex-1 justify-center items-center">
//           <Text className="text-gray-600 text-lg mb-4">Your cart is empty</Text>
//           <Pressable
//             onPress={() => router.push("/(root)/(tabs)/(store)")}
//             className="bg-red-500 rounded-lg px-6 py-3"
//           >
//             <Text className="text-white font-semibold">Start Shopping</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-white px-4 py-6"
//       contentContainerStyle={{ paddingBottom: 100 }}
//     >
//       <View className="flex-row mb-6">
//         <TouchableOpacity onPress={() => router.back()}>
//           <ArrowLeft color="red" size={30} />
//         </TouchableOpacity>
//         <Text className="text-2xl font-bold text-gray-800 ml-4">
//           Your Cart ({itemCount} items)
//         </Text>
//       </View>

//       {items.map((item) => (
//         <View
//           key={item.documentId}
//           className="flex-row items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
//         >
//           <Image
//             source={{ uri: item.imageUrl }}
//             className="w-20 h-20 rounded-lg mr-4"
//             resizeMode="cover"
//           />
//           <View className="flex-1">
//             <Text className="text-base font-semibold text-gray-800">
//               {item.name}
//             </Text>
//             <Text className="text-sm text-gray-600 mb-2">
//               {(item.salesPrice || item.price).toFixed(2)} KWD
//             </Text>
//             <View className="flex-row items-center">
//               <Pressable
//                 onPress={() =>
//                   handleQuantityChange(item.documentId, item.quantity - 1)
//                 }
//                 className="bg-red-100 p-1 rounded"
//               >
//                 <Minus size={16} color="#E53935" />
//               </Pressable>
//               <Text className="mx-3 text-base">{item.quantity}</Text>
//               <Pressable
//                 onPress={() =>
//                   handleQuantityChange(item.documentId, item.quantity + 1)
//                 }
//                 className="bg-red-100 p-1 rounded"
//               >
//                 <Plus size={16} color="#E53935" />
//               </Pressable>
//             </View>
//           </View>
//           <Pressable
//             onPress={() => handleRemoveItem(item.documentId)}
//             className="ml-2"
//           >
//             <Trash2 size={20} color="#E53935" />
//           </Pressable>
//         </View>
//       ))}

//       <View className="mt-6 bg-gray-50 rounded-lg p-4">
//         <View className="flex-row justify-between mb-4">
//           <Text className="text-lg font-semibold text-gray-800">Subtotal</Text>
//           <Text className="text-lg font-semibold text-gray-800">
//             {total.toFixed(2)} KWD
//           </Text>
//         </View>

//         <CouponSection />

//         {appliedCoupon && (
//           <View className="mb-4">
//             <Text className="text-green-700">Total after discount:</Text>
//             <Text className="text-green-700 font-semibold">
//               {discountedTotal.toFixed(2)} KWD
//             </Text>
//           </View>
//         )}

//         <Pressable
//           onPress={handleCheckout}
//           className="bg-red-500 rounded-lg py-3 flex items-center"
//         >
//           <Text className="text-white text-lg font-semibold">
//             Proceed to Checkout ({(discountedTotal || total).toFixed(2)} KWD)
//           </Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// export default CartPage;

/*********************************************** */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react-native";
import useCartStore from "../../store/cartStore";
import { router } from "expo-router";
import CouponSection from "../Components/CouponSection";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CartPage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    items,
    total,
    itemCount,
    discountedTotal,
    appliedCoupon,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  const handleRemoveItem = (documentId: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeFromCart(documentId),
      },
    ]);
  };

  const handleQuantityChange = (documentId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(documentId);
      return;
    }
    updateQuantity(documentId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before checkout."
      );
      return;
    }

    setIsLoading(true);
    // Simulate loading for better UX feedback
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(root)/Checkout");
    }, 600);
  };

  const renderEmptyCart = () => (
    <View className="flex-1 justify-center items-center py-16">
      <ShoppingBag color="#E53935" size={80} strokeWidth={1.5} />
      <Text className="text-gray-600 text-xl font-medium my-6">
        Your cart is empty
      </Text>
      <Text className="text-gray-500 text-center mb-8 px-8">
        Looks like you haven't added anything to your cart yet.
      </Text>
      <Pressable
        onPress={() => router.push("/(root)/(tabs)/(store)")}
        className="bg-red-500 rounded-full px-8 py-4"
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </Pressable>
    </View>
  );

  const renderHeader = () => (
    <View
      style={{ paddingTop: insets.top + 10 }}
      className="flex-row items-center mb-6 px-4"
    >
      <TouchableOpacity
        onPress={() => router.push("/(root)/(tabs)/(store)")}
        className="bg-gray-100 p-2 rounded-full"
      >
        <ArrowLeft color="#E53935" size={24} />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-gray-800 ml-4">
        {items.length > 0 ? `Your Cart (${itemCount})` : "Your Cart"}
      </Text>
    </View>
  );

  const renderCartItem = (item) => (
    <View
      key={item.documentId}
      className="flex-row items-center justify-between mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="w-24 h-24 rounded-xl mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800 mb-1">
          {item.name}
        </Text>
        <View className="flex-row items-center mb-3">
          <Text className="text-base font-bold text-red-500">
            {(item.salesPrice || item.price).toFixed(2)} KWD
          </Text>
          {item.salesPrice && (
            <Text className="text-sm text-gray-400 line-through ml-2">
              {item.price.toFixed(2)} KWD
            </Text>
          )}
        </View>
        <View className="flex-row items-center bg-gray-100 self-start rounded-full px-1 py-1">
          <Pressable
            onPress={() =>
              handleQuantityChange(item.documentId, item.quantity - 1)
            }
            className="bg-white p-1 rounded-full"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Minus size={18} color="#E53935" />
          </Pressable>
          <Text className="mx-4 text-base font-medium">{item.quantity}</Text>
          <Pressable
            onPress={() =>
              handleQuantityChange(item.documentId, item.quantity + 1)
            }
            className="bg-white p-1 rounded-full"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Plus size={18} color="#E53935" />
          </Pressable>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.documentId)}
        className="p-2 rounded-full bg-gray-100"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Trash2 size={18} color="#E53935" />
      </TouchableOpacity>
    </View>
  );

  const renderSummary = () => (
    <View className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Order Summary
      </Text>

      <View className="flex-row justify-between mb-3">
        <Text className="text-base text-gray-600">Subtotal</Text>
        <Text className="text-base font-medium text-gray-800">
          {total.toFixed(2)} KWD
        </Text>
      </View>

      {itemCount > 1 && (
        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-600">Items</Text>
          <Text className="text-base font-medium text-gray-800">
            {itemCount}
          </Text>
        </View>
      )}

      <CouponSection />

      {appliedCoupon && (
        <View className="flex-row justify-between mb-4 mt-3 pb-4 border-b border-dashed border-gray-200">
          <Text className="text-base text-green-700">Discount</Text>
          <Text className="text-base font-medium text-green-700">
            - {(total - discountedTotal).toFixed(2)} KWD
          </Text>
        </View>
      )}

      <View className="flex-row justify-between mt-2 mb-6">
        <Text className="text-lg font-bold text-gray-800">Total</Text>
        <Text className="text-lg font-bold text-red-500">
          {(discountedTotal || total).toFixed(2)} KWD
        </Text>
      </View>

      <Pressable
        onPress={handleCheckout}
        disabled={isLoading}
        className={`rounded-full py-4 flex-row justify-center items-center ${
          isLoading ? "bg-red-400" : "bg-red-500"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-base font-bold">
            Proceed to Checkout
          </Text>
        )}
      </Pressable>
    </View>
  );

  return (
    <View
      className="flex-1 bg-gray-50"
      style={{ paddingBottom: insets.bottom }}
    >
      <StatusBar style="dark" />
      {renderHeader()}

      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {items.map(renderCartItem)}
          {renderSummary()}
        </ScrollView>
      )}
    </View>
  );
};

export default CartPage;
