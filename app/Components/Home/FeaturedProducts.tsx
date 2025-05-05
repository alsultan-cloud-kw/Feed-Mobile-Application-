// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Link } from "expo-router";
// import { MotiView } from "moti";

// // Using the same Product type from previous component
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: Array<{
//     formats: {
//       large: {
//         url: string;
//       };
//     };
//   }>;
// }

// interface FeaturedProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.7;

// const ProductSkeleton = () => (
//   <View className="w-[280px] mr-4 rounded-2xl bg-white">
//     <View className="h-56 bg-gray-200 rounded-t-2xl animate-pulse" />
//     <View className="p-3">
//       <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//       <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//     </View>
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <ProductSkeleton />}
//       keyExtractor={(item) => item.toString()}
//     />
//   </View>
// );

// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0, translateX: 20 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[280px] mr-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-56 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           {/* Featured badge */}
//           <View className="absolute top-2 left-2 px-3 py-1 rounded-full bg-red-500/70">
//             <Text className="text-white font-medium text-xs">Featured</Text>
//           </View>
//           {/* Price tag */}
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-white/90">
//             <Text className="text-black font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-4">
//           <Text
//             className="text-lg font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row items-center mt-1">
//             <Text className="text-sm text-gray-600">{item.Category}</Text>
//             <Text className="text-sm text-gray-600 mx-1">•</Text>
//             <Text className="text-sm text-gray-600">{item.Subcategory}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const ViewAllButton = () => (
//   <Link href="/(root)/(tabs)/(store)" asChild>
//     <TouchableOpacity className="w-24 mr-4">
//       <View className="h-56 rounded-2xl bg-black/5 items-center justify-center">
//         <View className="items-center">
//           <Text className="text-base font-semibold text-gray-900 mb-2">
//             View All
//           </Text>
//           <View className="w-8 h-8 rounded-full bg-black items-center justify-center">
//             <Text className="text-white text-lg">→</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
//   products,
//   isLoading = false,
//   onProductPress = () => {},
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => (
//     <ProductCard item={item} index={index} onPress={onProductPress} />
//   );

//   return (
//     <View className="py-4">
//       <Text className="text-2xl font-bold text-gray-900 mb-5 px-4">
//         Featured Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 5)}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingLeft: 16 }}
//         ListFooterComponent={ViewAllButton}
//         snapToInterval={280 + 16} // Card width + margin
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// export default FeaturedProducts;

/************************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { Link } from "expo-router";
// import { MotiView } from "moti";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../store/cartStore";

// // Using the same Product type from previous component
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: Array<{
//     formats: {
//       large: {
//         url: string;
//       };
//     };
//   }>;
// }

// interface FeaturedProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.7;

// const ProductSkeleton = () => (
//   <View className="w-[280px] mr-4 rounded-2xl bg-white">
//     <View className="h-56 bg-gray-200 rounded-t-2xl animate-pulse" />
//     <View className="p-3">
//       <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//       <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//     </View>
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <ProductSkeleton />}
//       keyExtractor={(item) => item.toString()}
//     />
//   </View>
// );

// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart({ ...item, quantity: 1 });
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateX: 20 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[280px] mr-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-56 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           {/* Featured badge */}
//           <View className="absolute top-2 left-2 px-3 py-1 rounded-full bg-red-500/70">
//             <Text className="text-white font-medium text-xs">Featured</Text>
//           </View>
//           {/* Price tag */}
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-white/90">
//             <Text className="text-black font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-4 flex-1 justify-between">
//           <Text
//             className="text-lg font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row justify-between items-center mt-1">
//             <View className="flex-row items-center">
//               <Text className="text-sm text-gray-600">{item.Category}</Text>
//               <Text className="text-sm text-gray-600 mx-1">•</Text>
//               <Text className="text-sm text-gray-600">{item.Subcategory}</Text>
//             </View>
//             <Pressable
//               onPress={handleAddToCart}
//               className="bg-green-500 p-2 rounded-full"
//             >
//               <Plus size={16} color="white" />
//             </Pressable>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const ViewAllButton = () => (
//   <Link href="/(root)/(tabs)/(store)" asChild>
//     <TouchableOpacity className="w-24 mr-4">
//       <View className="h-56 rounded-2xl bg-black/5 items-center justify-center">
//         <View className="items-center">
//           <Text className="text-base font-semibold text-gray-900 mb-2">
//             View All
//           </Text>
//           <View className="w-8 h-8 rounded-full bg-black items-center justify-center">
//             <Text className="text-white text-lg">→</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
//   products,
//   isLoading = false,
//   onProductPress = () => {},
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => (
//     <ProductCard item={item} index={index} onPress={onProductPress} />
//   );

//   return (
//     <View className="py-4">
//       <Text className="text-2xl font-bold text-gray-900 mb-5 px-4">
//         Featured Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 5)}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingLeft: 16 }}
//         ListFooterComponent={ViewAllButton}
//         snapToInterval={CARD_WIDTH + 16} // Card width + margin
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// export default FeaturedProducts;

/******************************************************* */

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { Link } from "expo-router";
// import { MotiView } from "moti";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../store/cartStore";

// // Using the same Product type from previous component
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: Array<{
//     formats: {
//       large: {
//         url: string;
//       };
//     };
//   }>;
// }

// interface FeaturedProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.7;

// const ProductSkeleton = () => (
//   <View className="w-[280px] mr-4 rounded-2xl bg-white">
//     <View className="h-56 bg-gray-200 rounded-t-2xl animate-pulse" />
//     <View className="p-3">
//       <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//       <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//     </View>
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <ProductSkeleton />}
//       keyExtractor={(item) => item.toString()}
//     />
//   </View>
// );

// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;
//     addToCart({ ...item, quantity: 1, imageUrl });
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateX: 20 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[280px] mr-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-56 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           {/* Featured badge */}
//           <View className="absolute top-2 left-2 px-3 py-1 rounded-full bg-red-500/70">
//             <Text className="text-white font-medium text-xs">Featured</Text>
//           </View>
//           {/* Price tag */}
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-white/90">
//             <Text className="text-black font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-4 flex-1 justify-between">
//           <Text
//             className="text-lg font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row justify-between items-center mt-1">
//             <View className="flex-row items-center">
//               <Text className="text-sm text-gray-600">{item.Category}</Text>
//               <Text className="text-sm text-gray-600 mx-1">•</Text>
//               <Text className="text-sm text-gray-600">{item.Subcategory}</Text>
//             </View>
//             <Pressable
//               onPress={handleAddToCart}
//               className="bg-green-500 p-2 rounded-full"
//             >
//               <Plus size={16} color="white" />
//             </Pressable>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const ViewAllButton = () => (
//   <Link href="/(root)/(tabs)/(store)" asChild>
//     <TouchableOpacity className="w-24 mr-4">
//       <View className="h-56 rounded-2xl bg-black/5 items-center justify-center">
//         <View className="items-center">
//           <Text className="text-base font-semibold text-gray-900 mb-2">
//             View All
//           </Text>
//           <View className="w-8 h-8 rounded-full bg-black items-center justify-center">
//             <Text className="text-white text-lg">→</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
//   products,
//   isLoading = false,
//   onProductPress = () => {},
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => (
//     <ProductCard item={item} index={index} onPress={onProductPress} />
//   );

//   return (
//     <View className="py-4">
//       <Text className="text-2xl font-bold text-gray-900 mb-5 px-4">
//         Featured Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 5)}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingLeft: 16 }}
//         ListFooterComponent={ViewAllButton}
//         snapToInterval={CARD_WIDTH + 16} // Card width + margin
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// export default FeaturedProducts;

/*********************************************** */

import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { MotiView } from "moti";
import { Plus, Minus, Trash2 } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import useCartStore from "../../../store/cartStore";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ProductImage {
  formats: {
    large: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  Category: string;
  Subcategory: string;
  primaryImage: ProductImage[];
  description?: string;
}

interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const getBestImageUrl = (item: Product): string | null => {
  if (!item?.primaryImage?.[0]) return null;
  const formats = item.primaryImage[0].formats;
  return (
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.thumbnail?.url ||
    null
  );
};

const CartInteraction = React.memo(({ product }: { product: Product }) => {
  const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
  const cartItem = items.find((item) => item.documentId === product.documentId);

  const handleAdd = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const imageUrl = getBestImageUrl(product);
      addToCart({ ...product, quantity: 1, imageUrl });
      Toast.show({
        type: "success",
        text1: `${product.name} added to cart`,
        position: "top",
        visibilityTime: 2000,
        topOffset: 60,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [product]);

  const handleUpdate = useCallback(
    async (newQuantity: number) => {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (newQuantity < 1) {
          removeFromCart(product.documentId);
          Toast.show({
            type: "info",
            text1: `${product.name} removed from cart`,
            position: "top",
            visibilityTime: 2000,
            topOffset: 60,
          });
          return;
        }
        updateQuantity(product.documentId, newQuantity);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },
    [product.documentId]
  );

  if (!cartItem) {
    return (
      <Pressable
        onPress={handleAdd}
        className="bg-green-500 p-1.5 rounded-full active:bg-green-600"
        hitSlop={8}
      >
        <Plus size={14} color="white" />
      </Pressable>
    );
  }

  return (
    <View className="flex-row items-center bg-green-50 rounded-full">
      <Pressable
        onPress={() => handleUpdate(cartItem.quantity - 1)}
        className="p-1"
        hitSlop={8}
      >
        {cartItem.quantity === 1 ? (
          <Trash2 size={14} color="#DC2626" />
        ) : (
          <Minus size={14} color="#DC2626" />
        )}
      </Pressable>
      <Text className="px-2 font-medium min-w-[20px] text-center text-xs text-red-700">
        {cartItem.quantity}
      </Text>
      <Pressable
        onPress={() => handleUpdate(cartItem.quantity + 1)}
        className="p-1"
        hitSlop={8}
      >
        <Plus size={14} color="#DC2626" />
      </Pressable>
    </View>
  );
});

const ProductCard = React.memo(
  ({ item, index }: { item: Product; index: number }) => {
    const [isNavigating, setIsNavigating] = React.useState(false);
    const imageUrl = getBestImageUrl(item);

    const handleProductPress = useCallback(async () => {
      if (isNavigating) return;
      try {
        setIsNavigating(true);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await router.push({
          pathname: "/(root)/(tabs)/(store)/store/[documentId]",
          params: { documentId: item.documentId },
        });
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
      }
    }, [item.documentId, isNavigating]);

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9, translateX: 20 }}
        animate={{ opacity: 1, scale: 1, translateX: 0 }}
        transition={{
          type: "spring",
          damping: 15,
          delay: index * 100,
        }}
        style={{ width: CARD_WIDTH }}
        className="mr-4"
      >
        <Pressable
          onPress={handleProductPress}
          className="rounded-2xl bg-white shadow-sm overflow-hidden active:scale-98"
          disabled={isNavigating}
        >
          <View className="relative">
            <Image
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../../../assets/product-placeholder.png")
              }
              className="w-full h-48 bg-gray-50"
              resizeMode="cover"
              defaultSource={require("../../../assets/product-placeholder.png")}
            />
            <View className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-500/80 backdrop-blur-sm">
              <Text className="text-white text-xs font-medium">Featured</Text>
            </View>
            <View className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
              <Text className="text-white text-sm font-medium">
                {item.price.toFixed(3)} KWD
              </Text>
            </View>
            {isNavigating && (
              <View className="absolute inset-0 bg-black/20 items-center justify-center">
                <ActivityIndicator color="#4ECB71" />
              </View>
            )}
          </View>

          <View className="p-3">
            <Text
              className="text-sm font-semibold text-gray-900 mb-1"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-gray-500" numberOfLines={1}>
                {item.Category} • {item.Subcategory}
              </Text>
              <CartInteraction product={item} />
            </View>
          </View>
        </Pressable>
      </MotiView>
    );
  }
);

const ProductSkeleton = React.memo(() => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
      repeatReverse: true,
    }}
    style={{ width: CARD_WIDTH }}
    className="mr-4 rounded-2xl bg-white shadow-sm overflow-hidden"
  >
    <View className="h-48 bg-gray-100" />
    <View className="p-3">
      <View className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
      <View className="h-3 w-1/2 bg-gray-100 rounded" />
    </View>
  </MotiView>
));

const ViewAllButton = React.memo(() => (
  <Link href="/(root)/(tabs)/(store)" asChild>
    <Pressable className="w-24 mr-4">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="h-48 rounded-2xl bg-green-50 items-center justify-center"
      >
        <View className="items-center space-y-2">
          <Text className="text-sm font-medium text-green-700">View All</Text>
          <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center">
            <Text className="text-white text-lg">→</Text>
          </View>
        </View>
      </MotiView>
    </Pressable>
  </Link>
));

const FeaturedProducts: React.FC<FeaturedProductsProps> = React.memo(
  ({ products, isLoading = false }) => {
    if (isLoading) {
      return (
        <View className="py-4">
          <Text className="text-base font-medium text-gray-400 mb-4 px-4">
            Featured Products
          </Text>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={() => <ProductSkeleton />}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
      );
    }

    return (
      <View className="py-4">
        <Text className="text-base font-medium text-gray-400 mb-4 px-4">
          Featured Products
        </Text>
        <FlatList
          data={products?.slice(0, 5)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ProductCard item={item} index={index} />
          )}
          keyExtractor={(item) => `featured-${item.id}`}
          contentContainerStyle={{ paddingLeft: 16 }}
          ListFooterComponent={ViewAllButton}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          snapToAlignment="center"
        />
      </View>
    );
  }
);

CartInteraction.displayName = "CartInteraction";
ProductCard.displayName = "ProductCard";
ProductSkeleton.displayName = "ProductSkeleton";
ViewAllButton.displayName = "ViewAllButton";
FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;
