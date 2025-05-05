import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { Trash2 } from "lucide-react-native";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gold Necklace",
      price: 150.75,
      quantity: 1,
      image: "https://via.placeholder.com/100", // Replace with your Cloudinary URL
    },
    {
      id: 2,
      name: "Diamond Ring",
      price: 300.5,
      quantity: 2,
      image: "https://via.placeholder.com/100", // Replace with your Cloudinary URL
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    Alert.alert("Checkout", "This is a placeholder for the payment process.");
    // Implement navigation or logic for checkout
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">Your Cart</Text>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-lg"
            />
            <View className="flex-1 mx-4">
              <Text className="text-base font-semibold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-600">
                {item.price.toFixed(2)} KWD
              </Text>
              <Text className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </Text>
            </View>
            <Pressable onPress={() => handleRemoveItem(item.id)}>
              <Trash2 size={20} color="#ef4444" />
            </Pressable>
          </View>
        ))
      ) : (
        <Text className="text-gray-600 text-center">Your cart is empty!</Text>
      )}

      {cartItems.length > 0 && (
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Subtotal
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}{" "}
              KWD
            </Text>
          </View>
          <TextInput
            placeholder="Apply Coupon Code"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />
          <Pressable
            onPress={handleCheckout}
            className="bg-red-500 rounded-lg py-3 flex items-center"
          >
            <Text className="text-white text-lg font-semibold">Checkout</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default CartPage;
