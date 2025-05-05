import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import useCartStore from "../../store/cartStore";

const CouponSection: React.FC = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setError("");

    // src/utils/couponUtils.ts
    const validateCoupon = async (code: string) => {
      // Simulate an API call to validate the coupon
      const response = await fetch(`/api/validate-coupon?code=${code}`);
      if (!response.ok) {
        throw new Error("Invalid coupon");
      }
      const data = await response.json();
      return data; // e.g., { code: "SAVE10", amount: 10, type: "percentage" }
    };

    try {
      const validCoupon = await validateCoupon(couponCode);
      applyCoupon(validCoupon);
      setCouponCode("");
    } catch (err) {
      setError("Invalid or expired coupon");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="mt-4">
      {appliedCoupon ? (
        <View className="bg-green-100 p-4 rounded-lg flex-row justify-between items-center">
          <View>
            <Text className="text-green-800 font-semibold">
              {appliedCoupon.code} applied
            </Text>
            <Text className="text-green-600 text-sm">
              {appliedCoupon.type === "percentage"
                ? `${appliedCoupon.amount}% off`
                : `${appliedCoupon.amount} KWD off`}
            </Text>
          </View>
          <Pressable
            onPress={removeCoupon}
            className="bg-green-200 px-3 py-1 rounded"
          >
            <Text className="text-green-800">Remove</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <TextInput
            value={couponCode}
            onChangeText={setCouponCode}
            placeholder="Enter coupon code"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
          />
          {error && <Text className="text-red-500 text-sm mb-2">{error}</Text>}
          <Pressable
            onPress={handleApplyCoupon}
            disabled={isLoading || !couponCode.trim()}
            className={`bg-blue-500 rounded-lg py-3 flex items-center ${
              isLoading || !couponCode.trim() ? "opacity-50" : ""
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Apply Coupon</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CouponSection;
