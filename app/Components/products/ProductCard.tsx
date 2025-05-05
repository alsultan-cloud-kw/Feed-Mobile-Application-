// app/(tabs)/store/components/ProductCard.tsx
import { View, Text, Image, Pressable } from "react-native";
import { MotiPressable } from "moti/interactions";

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    salesPrice: number | null;
    Category: string;
    primaryImage: Array<any>; // Update based on your image structure
  };
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const imageUrl = product.primaryImage[0]?.url; // Update based on your image structure
  const displayPrice = product.salesPrice ?? product.price;
  const hasDiscount = product.salesPrice !== null;

  return (
    <MotiPressable
      onPress={onPress}
      animate={({ pressed }) => ({
        scale: pressed ? 0.95 : 1,
      })}
      transition={{ type: "timing", duration: 100 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden h-64"
    >
      <View className="aspect-square bg-gray-100">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-gray-400">No Image</Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <Text
          numberOfLines={1}
          className="text-base font-medium text-gray-900 mb-1"
        >
          {product.name}
        </Text>

        <View className="flex-row items-center gap-2">
          <Text
            className={`text-sm font-semibold ${
              hasDiscount ? "text-red-600" : "text-gray-700"
            }`}
          >
            ${displayPrice.toFixed(2)}
          </Text>
          {hasDiscount && (
            <Text className="text-xs text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </Text>
          )}
        </View>

        <Text className="text-xs text-gray-500 mt-1">{product.Category}</Text>
      </View>
    </MotiPressable>
  );
}
