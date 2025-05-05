// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { Link } from "expo-router";

// const { width } = Dimensions.get("window");
// const PRODUCT_ITEM_WIDTH = width / 2 - 20; // Adjust the width to fit two columns

// const handleProductPress = () => {};

// const GridOfPopularProducts: React.FC = ({ products }) => {
//   const renderProduct = ({ item }) => (
//     <TouchableOpacity
//       style={styles.productContainer}
//       onPress={() => handleProductPress(item)}
//       activeOpacity={0.7}
//     >
//       <Image
//         style={styles.productImage}
//         source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//         resizeMode="cover"
//       />
//       <View style={styles.productInfo}>
//         <Text style={styles.productTitle} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text style={styles.price}>{item.price.toFixed(3)} kwd</Text>
//         <View style={styles.categoryContainer}>
//           <Text style={styles.category}>{item.Category}</Text>
//           <Text style={styles.subcategory}>{item.Subcategory}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderFooter = () => (
//     <View style={styles.footerContainer}>
//       <Link href="/store" style={styles.seeMoreButton}>
//         <Text style={styles.seeMoreText}>See More</Text>
//       </Link>
//     </View>
//   );

//   return (
//     <View style={styles.section}>
//       <Text style={styles.sectionHeader}>Popular Products</Text>
//       <FlatList
//         data={products}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.productList}
//         ListFooterComponent={renderFooter}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   section: {
//     padding: 16,
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   productList: {
//     alignItems: "center",
//   },
//   productContainer: {
//     width: PRODUCT_ITEM_WIDTH,
//     margin: 8,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     overflow: "hidden",
//     elevation: 3, // for Android shadow
//     shadowColor: "#000", // for iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   productImage: {
//     width: "100%",
//     height: PRODUCT_ITEM_WIDTH,
//   },
//   productInfo: {
//     padding: 8,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   price: {
//     color: "green",
//     marginBottom: 4,
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   category: {
//     fontSize: 12,
//     color: "gray",
//   },
//   subcategory: {
//     fontSize: 12,
//     color: "gray",
//   },
//   footerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 16,
//   },
//   seeMoreButton: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 12,
//     backgroundColor: "#ff6347",
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   seeMoreText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default GridOfPopularProducts;

/***************************************** */

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

// // Types
// interface ImageFormat {
//   url: string;
//   width: number;
//   height: number;
// }

// interface ProductImage {
//   formats: {
//     large: ImageFormat;
//     medium: ImageFormat;
//     thumbnail: ImageFormat;
//   };
// }

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: ProductImage[];
//   description?: string;
// }

// interface PopularProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const ProductSkeleton = () => {
//   return (
//     <View className="w-[48%] mb-4 rounded-2xl bg-white">
//       <View className="h-48 bg-gray-200 rounded-t-2xl animate-pulse" />
//       <View className="p-3">
//         <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//         <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//       </View>
//     </View>
//   );
// };

// const LoadingSkeleton = () => (
//   <View className="flex-row flex-wrap justify-between px-4">
//     {[1, 2, 3, 4].map((key) => (
//       <ProductSkeleton key={key} />
//     ))}
//   </View>
// );

// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[48%] mb-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-48 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-black/70">
//             <Text className="text-white font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-3">
//           <Text
//             className="text-base font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row items-center">
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
//     <TouchableOpacity className="mt-2 mx-1">
//       <View className="py-4 px-6 bg-red-500 rounded-xl items-center justify-center">
//         <Text className="text-white font-semibold text-base">
//           View All Products
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const GridOfPopularProducts: React.FC<PopularProductsProps> = ({
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
//         Popular Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 8)}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         ListFooterComponent={ViewAllButton}
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//       />
//     </View>
//   );
// };

// export default GridOfPopularProducts;

/*********************************************** */

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

// // Types
// interface ImageFormat {
//   url: string;
//   width: number;
//   height: number;
// }

// interface ProductImage {
//   formats: {
//     large: ImageFormat;
//     medium: ImageFormat;
//     thumbnail: ImageFormat;
//   };
// }

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: ProductImage[];
//   description?: string;
// }

// interface PopularProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const ProductSkeleton = () => {
//   return (
//     <View className="w-[48%] mb-4 rounded-2xl bg-white">
//       <View className="h-48 bg-gray-200 rounded-t-2xl animate-pulse" />
//       <View className="p-3">
//         <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//         <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//       </View>
//     </View>
//   );
// };

// const LoadingSkeleton = () => (
//   <View className="flex-row flex-wrap justify-between px-4">
//     {[1, 2, 3, 4].map((key) => (
//       <ProductSkeleton key={key} />
//     ))}
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
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[48%] mb-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-48 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-black/70">
//             <Text className="text-white font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-3 flex-1 justify-between">
//           <Text
//             className="text-base font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row justify-between items-center">
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
//     <TouchableOpacity className="mt-2 mx-1">
//       <View className="py-4 px-6 bg-red-500 rounded-xl items-center justify-center">
//         <Text className="text-white font-semibold text-base">
//           View All Products
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const GridOfPopularProducts: React.FC<PopularProductsProps> = ({
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
//         Popular Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 8)}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         ListFooterComponent={ViewAllButton}
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//       />
//     </View>
//   );
// };

// export default GridOfPopularProducts;

/********************************************************** */

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

// // Types
// interface ImageFormat {
//   url: string;
//   width: number;
//   height: number;
// }

// interface ProductImage {
//   formats: {
//     large: ImageFormat;
//     medium: ImageFormat;
//     thumbnail: ImageFormat;
//   };
// }

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: ProductImage[];
//   description?: string;
// }

// interface PopularProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const ProductSkeleton = () => {
//   return (
//     <View className="w-[48%] mb-4 rounded-2xl bg-white">
//       <View className="h-48 bg-gray-200 rounded-t-2xl animate-pulse" />
//       <View className="p-3">
//         <View className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//         <View className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
//       </View>
//     </View>
//   );
// };

// const LoadingSkeleton = () => (
//   <View className="flex-row flex-wrap justify-between px-4">
//     {[1, 2, 3, 4].map((key) => (
//       <ProductSkeleton key={key} />
//     ))}
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
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       className="w-[48%] mb-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm"
//       >
//         <View className="relative">
//           <Image
//             source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//             className="w-full h-48 rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//           />
//           <View className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-black/70">
//             <Text className="text-white font-semibold text-sm">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-3 flex-1 justify-between">
//           <Text
//             className="text-base font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row justify-between items-center">
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
//     <TouchableOpacity className="mt-2 mx-1">
//       <View className="py-4 px-6 bg-red-500 rounded-xl items-center justify-center">
//         <Text className="text-white font-semibold text-base">
//           View All Products
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// const GridOfPopularProducts: React.FC<PopularProductsProps> = ({
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
//         Popular Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 8)}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         ListFooterComponent={ViewAllButton}
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//       />
//     </View>
//   );
// };

// export default GridOfPopularProducts;

/************************************ */

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
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import useCartStore from "../../../store/cartStore";

// // Types remain the same until CartInteraction
// interface ImageFormat {
//   url: string;
//   width: number;
//   height: number;
// }

// interface ProductImage {
//   formats: {
//     large: ImageFormat;
//     medium: ImageFormat;
//     thumbnail: ImageFormat;
//   };
// }

// export interface Product {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: ProductImage[];
//   description?: string;
// }

// interface PopularProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48) / 3; // 48 = padding (16 * 2) + gaps (8 * 2)

// // Add this utility function at the top level
// const getBestImageUrl = (item: Product): string | null => {
//   if (!item?.primaryImage?.[0]) return null;

//   const formats = item.primaryImage[0].formats;
//   return (
//     formats?.large?.url ||
//     formats?.medium?.url ||
//     formats?.thumbnail?.url ||
//     item.primaryImage[0].url ||
//     null
//   );
// };

// // Cart Interaction Component
// const CartInteraction: React.FC<{
//   product: Product;
//   onAddToCart: () => void;
// }> = ({ product, onAddToCart }) => {
//   const { items, updateQuantity, removeFromCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={onAddToCart}
//         className="bg-green-500 p-2 rounded-full"
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => {
//           if (cartItem.quantity === 1) {
//             removeFromCart(product.documentId);
//           } else {
//             updateQuantity(product.documentId, cartItem.quantity - 1);
//           }
//         }}
//         className="p-1"
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() =>
//           updateQuantity(product.documentId, cartItem.quantity + 1)
//         }
//         className="p-1"
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// };

// // Update ProductCard component with better image handling
// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   const addToCart = useCartStore((state) => state.addToCart);

//   // const handleAddToCart = (e) => {
//   //   e.stopPropagation();
//   //   const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;
//   //   addToCart({ ...item, quantity: 1, imageUrl });
//   // };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     const imageUrl = getBestImageUrl(item);
//     addToCart({ ...item, quantity: 1, imageUrl });
//   };

//   const [imageError, setImageError] = React.useState(false);
//   const imageUrl = getBestImageUrl(item);

//   const imageSource = item.primaryImage?.[0]?.formats?.large?.url
//     ? { uri: item.primaryImage[0].formats.large.url }
//     : require("../../../assets/product-placeholder.png");

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 100, type: "timing", duration: 500 }}
//         style={{ width: CARD_WIDTH }}
//         className="mb-4 mx-1"
//       >
//         <TouchableOpacity
//           onPress={() => onPress(item)}
//           activeOpacity={0.9}
//           className="rounded-2xl bg-white shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-2xl bg-gray-100"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//               defaultSource={require("../../../assets/product-placeholder.png")}
//             />
//             <View className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/70">
//               <Text className="text-white font-semibold text-xs">
//                 {item.price.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>

//           <View className="p-2 flex-1 justify-between">
//             <Text
//               className="text-sm font-semibold text-gray-900 mb-1"
//               numberOfLines={1}
//             >
//               {item.name}
//             </Text>

//             <View className="flex-row justify-between items-center">
//               <Text className="text-xs text-gray-600 flex-1 mr-2" numberOfLines={1}>
//                 {item.Category}
//               </Text>
//               <CartInteraction product={item} onAddToCart={handleAddToCart} />
//             </View>
//           </View>
//         </TouchableOpacity>
//       </MotiView>
//     );
//   };

// const GridOfPopularProducts: React.FC<PopularProductsProps> = ({
//   products,
//   isLoading = false,
//   onProductPress = () => {},
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <View className="py-4">
//       <Text className="text-2xl font-bold text-gray-900 mb-5 px-4">
//         Popular Products
//       </Text>
//       <FlatList
//         data={(products ?? []).slice(0, 9)} // Show 9 products (3x3 grid)
//         renderItem={({ item, index }) => (
//           <ProductCard item={item} index={index} onPress={onProductPress} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         ListFooterComponent={ViewAllButton}
//         columnWrapperStyle={{ justifyContent: "flex-start" }}
//       />
//     </View>
//   );
// };

// // LoadingSkeleton and ViewAllButton components remain the same
// const LoadingSkeleton = () => (
//   <View className="flex-row flex-wrap justify-between px-4">
//     {[1, 2, 3, 4, 5, 6].map((key) => (
//       <ProductSkeleton key={key} />
//     ))}
//   </View>
// );

// const ProductSkeleton = () => (
//   <View
//     style={{ width: CARD_WIDTH }}
//     className="mb-4 mx-1 rounded-2xl bg-white"
//   >
//     <View className="h-[100%] aspect-square bg-gray-200 rounded-t-2xl animate-pulse" />
//     <View className="p-2">
//       <View className="h-3 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//       <View className="h-2 w-1/2 bg-gray-200 rounded animate-pulse" />
//     </View>
//   </View>
// );

// const ViewAllButton = () => (
//   <Link href="/(root)/(tabs)/(store)" asChild>
//     <TouchableOpacity className="mt-2 mx-1">
//       <View className="py-4 px-6 bg-red-500 rounded-xl items-center justify-center">
//         <Text className="text-white font-semibold text-base">
//           View All Products
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </Link>
// );

// export default GridOfPopularProducts;

/***************************************** */

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
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import useCartStore from "../../../store/cartStore";
// import Toast from "react-native-toast-message";

// interface ImageFormat {
//   url: string;
//   width: number;
//   height: number;
// }

// interface ProductImage {
//   formats: {
//     large: ImageFormat;
//     medium: ImageFormat;
//     thumbnail: ImageFormat;
//   };
// }

// export interface Product {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: ProductImage[];
//   description?: string;
// }

// interface PopularProductsProps {
//   products: Product[];
//   isLoading?: boolean;
//   onProductPress?: (product: Product) => void;
// }

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48) / 3;

// const getBestImageUrl = (item: Product): string | null => {
//   if (!item?.primaryImage?.[0]) return null;

//   const formats = item.primaryImage[0].formats;
//   return (
//     formats?.large?.url ||
//     formats?.medium?.url ||
//     formats?.thumbnail?.url ||
//     item.primaryImage[0].url ||
//     null
//   );
// };

// const showCartToast = (type: "success" | "error" | "info", message: string) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 2000,
//     topOffset: 60,
//   });
// };

// const CartInteraction: React.FC<{
//   product: Product;
// }> = ({ product }) => {
//   const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleAdd = () => {
//     const imageUrl = getBestImageUrl(product);
//     addToCart({ ...product, quantity: 1, imageUrl });
//     showCartToast("success", `${product.name} added to cart`);
//   };

//   const handleRemove = () => {
//     removeFromCart(product.documentId);
//     showCartToast("info", `${product.name} removed from cart`);
//   };

//   const handleUpdate = (newQuantity: number) => {
//     if (newQuantity < 1) {
//       handleRemove();
//       return;
//     }
//     updateQuantity(product.documentId, newQuantity);
//     showCartToast("success", "Cart updated");
//   };

//   if (!cartItem) {
//     return (
//       <Pressable onPress={handleAdd} className="bg-green-500 p-2 rounded-full">
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => {
//           if (cartItem.quantity === 1) {
//             handleRemove();
//           } else {
//             handleUpdate(cartItem.quantity - 1);
//           }
//         }}
//         className="p-1"
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity + 1)}
//         className="p-1"
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// };

// const ProductCard: React.FC<{
//   item: Product;
//   index: number;
//   onPress: (product: Product) => void;
// }> = ({ item, index, onPress }) => {
//   const [imageError, setImageError] = React.useState(false);
//   const imageUrl = getBestImageUrl(item);

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100, type: "timing", duration: 500 }}
//       style={{ width: CARD_WIDTH }}
//       className="mb-4 mx-1"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.9}
//         className="rounded-2xl bg-white shadow-sm overflow-hidden"
//       >
//         <View className="relative">
//           <Image
//             source={
//               imageUrl && !imageError
//                 ? { uri: imageUrl }
//                 : require("../../../assets/product-placeholder.png")
//             }
//             className="w-full aspect-square rounded-t-2xl bg-gray-100"
//             resizeMode="cover"
//             onError={() => setImageError(true)}
//             defaultSource={require("../../../assets/product-placeholder.png")}
//           />
//           <View className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/70">
//             <Text className="text-white font-semibold text-xs">
//               {item.price.toFixed(3)} KWD
//             </Text>
//           </View>
//         </View>

//         <View className="p-2 flex-1 justify-between">
//           <Text
//             className="text-sm font-semibold text-gray-900 mb-1"
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <View className="flex-row justify-between items-center">
//             <Text
//               className="text-xs text-gray-600 flex-1 mr-2"
//               numberOfLines={1}
//             >
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} />
//           </View>
//         </View>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const GridOfPopularProducts: React.FC<PopularProductsProps> = React.memo(
//   ({ products, isLoading = false, onProductPress = () => {} }) => {
//     const safeProducts = React.useMemo(
//       () =>
//         products?.filter((product) => product?.id && product?.documentId) ?? [],
//       [products]
//     );

//     if (isLoading) {
//       return <LoadingSkeleton />;
//     }

//     if (!safeProducts.length) {
//       return (
//         <View className="py-4 px-4">
//           <Text className="text-center text-gray-500">
//             No products available
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View className="py-4">
//         <Text className="text-2xl font-bold text-gray-900 mb-5 px-4">
//           Popular Products
//         </Text>
//         <FlatList
//           data={safeProducts.slice(0, 9)}
//           renderItem={({ item, index }) => (
//             <ProductCard item={item} index={index} onPress={onProductPress} />
//           )}
//           keyExtractor={(item) => `product-${item.id}`}
//           numColumns={3}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 16 }}
//           ListFooterComponent={ViewAllButton}
//           columnWrapperStyle={{ justifyContent: "flex-start" }}
//           removeClippedSubviews={true}
//           initialNumToRender={6}
//           maxToRenderPerBatch={3}
//           windowSize={5}
//         />
//       </View>
//     );
//   }
// );

// const LoadingSkeleton = React.memo(() => (
//   <View className="flex-row flex-wrap px-4">
//     {Array.from({ length: 6 }).map((_, index) => (
//       <ProductSkeleton key={index} />
//     ))}
//   </View>
// ));

// const ProductSkeleton = React.memo(() => (
//   <View
//     style={{ width: CARD_WIDTH }}
//     className="mb-4 mx-1 rounded-2xl bg-white overflow-hidden"
//   >
//     <View className="aspect-square bg-gray-200 rounded-t-2xl animate-pulse" />
//     <View className="p-2">
//       <View className="h-3 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
//       <View className="h-2 w-1/2 bg-gray-200 rounded animate-pulse" />
//     </View>
//   </View>
// ));

// const ViewAllButton = React.memo(() => (
//   <Link href="/(root)/(tabs)/(store)" asChild>
//     <TouchableOpacity className="mt-4 mx-1">
//       <View className="py-4 px-6 bg-red-500 rounded-xl items-center justify-center">
//         <Text className="text-white font-semibold text-base">
//           View All Products
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </Link>
// ));

// GridOfPopularProducts.displayName = "GridOfPopularProducts";

// export default GridOfPopularProducts;

/*************************************** */

import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { Plus, Minus, Trash2 } from "lucide-react-native";
import useCartStore from "../../../store/cartStore";
import Toast from "react-native-toast-message";

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

interface PopularProductsProps {
  products: Product[];
  isLoading?: boolean;
  onProductPress?: (product: Product) => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 3;

const getBestImageUrl = (item: Product): string | null => {
  if (!item?.primaryImage?.[0]) return null;
  const formats = item.primaryImage[0].formats;
  return (
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.thumbnail?.url ||
    item.primaryImage[0].url ||
    null
  );
};

const showCartToast = (type: "success" | "error" | "info", message: string) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 2000,
    topOffset: 60,
  });
};

const CartInteraction: React.FC<{ product: Product }> = ({ product }) => {
  const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
  const cartItem = items.find((item) => item.documentId === product.documentId);

  const handleAdd = () => {
    const imageUrl = getBestImageUrl(product);
    addToCart({ ...product, quantity: 1, imageUrl });
    showCartToast("success", `${product.name} added to cart`);
  };

  const handleRemove = () => {
    removeFromCart(product.documentId);
    showCartToast("info", `${product.name} removed from cart`);
  };

  const handleUpdate = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    updateQuantity(product.documentId, newQuantity);
    showCartToast("success", "Cart updated");
  };

  if (!cartItem) {
    return (
      <Pressable onPress={handleAdd} className="bg-green-500 p-2 rounded-full">
        <Plus size={14} color="white" />
      </Pressable>
    );
  }

  return (
    <View className="flex-row items-center bg-gray-100 rounded-full">
      <Pressable
        onPress={() =>
          cartItem.quantity === 1
            ? handleRemove()
            : handleUpdate(cartItem.quantity - 1)
        }
        className="p-1"
      >
        {cartItem.quantity === 1 ? (
          <Trash2 size={14} color="#EF4444" />
        ) : (
          <Minus size={14} color="#EF4444" />
        )}
      </Pressable>
      <Text className="px-2 font-semibold min-w-[20px] text-center">
        {cartItem.quantity}
      </Text>
      <Pressable
        onPress={() => handleUpdate(cartItem.quantity + 1)}
        className="p-1"
      >
        <Plus size={14} color="#EF4444" />
      </Pressable>
    </View>
  );
};

const ProductCard: React.FC<{ item: Product; index: number }> = React.memo(
  ({ item, index }) => {
    const [imageError, setImageError] = React.useState(false);
    const [isNavigating, setIsNavigating] = React.useState(false);

    const handleProductPress = async () => {
      try {
        setIsNavigating(true);
        await router.push({
          pathname: "/(root)/(tabs)/(store)/store/[documentId]",
          params: { documentId: item.documentId },
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to open product",
          position: "top",
        });
      } finally {
        setIsNavigating(false);
      }
    };

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100, type: "timing", duration: 500 }}
        style={{ width: CARD_WIDTH }}
        className="mb-4 mx-1"
      >
        <TouchableOpacity
          onPress={handleProductPress}
          activeOpacity={0.9}
          className="rounded-2xl bg-white shadow-sm overflow-hidden"
          disabled={isNavigating}
        >
          <View className="relative">
            <Image
              source={
                !imageError && getBestImageUrl(item)
                  ? { uri: getBestImageUrl(item)! }
                  : require("../../../assets/product-placeholder.png")
              }
              className="w-full aspect-square rounded-t-2xl bg-gray-100"
              resizeMode="cover"
              onError={() => setImageError(true)}
              defaultSource={require("../../../assets/product-placeholder.png")}
            />
            <View className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/70">
              <Text className="text-white font-semibold text-xs">
                {item.price.toFixed(3)} KWD
              </Text>
            </View>
            {isNavigating && (
              <View className="absolute inset-0 bg-black/20 items-center justify-center rounded-t-2xl">
                <ActivityIndicator color="white" />
              </View>
            )}
          </View>

          <View className="p-2 flex-1 justify-between">
            <Text
              className="text-sm font-semibold text-gray-900 mb-1"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text
                className="text-xs text-gray-600 flex-1 mr-2"
                numberOfLines={1}
              >
                {item.Category}
              </Text>
              <CartInteraction product={item} />
            </View>
          </View>
        </TouchableOpacity>
      </MotiView>
    );
  }
);

const LoadingSkeleton = React.memo(() => (
  <View className="flex-row flex-wrap px-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </View>
));

const ProductSkeleton = React.memo(() => (
  <View
    style={{ width: CARD_WIDTH }}
    className="mb-4 mx-1 rounded-2xl bg-white overflow-hidden"
  >
    <View className="aspect-square bg-gray-200 rounded-t-2xl animate-pulse" />
    <View className="p-2">
      <View className="h-3 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
      <View className="h-2 w-1/2 bg-gray-200 rounded animate-pulse" />
    </View>
  </View>
));

const ViewAllButton = React.memo(() => (
  <MotiView
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "timing", duration: 500, delay: 300 }}
  >
    <Link href="/(root)/(tabs)/(store)" asChild>
      <TouchableOpacity className="mt-4 mx-1">
        <View className="py-4 px-6 bg-gray-900 rounded-xl items-center justify-center">
          <Text className="text-white font-medium text-base">
            View All Products
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  </MotiView>
));

const GridOfPopularProducts: React.FC<PopularProductsProps> = React.memo(
  ({ products, isLoading = false }) => {
    const safeProducts = React.useMemo(
      () =>
        products?.filter((product) => product?.id && product?.documentId) ?? [],
      [products]
    );

    return (
      <AnimatePresence>
        <View className="py-4">
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <Text className="text-base font-medium text-gray-600 mb-4 px-4">
              Popular Products
            </Text>
          </MotiView>

          {isLoading ? (
            <LoadingSkeleton />
          ) : !safeProducts.length ? (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 500 }}
              className="py-4 px-4"
            >
              <Text className="text-center text-gray-500">
                No products available
              </Text>
            </MotiView>
          ) : (
            <FlatList
              data={safeProducts.slice(0, 9)}
              renderItem={({ item, index }) => (
                <ProductCard item={item} index={index} />
              )}
              keyExtractor={(item) => `product-${item.id}`}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ListFooterComponent={ViewAllButton}
              columnWrapperStyle={{ justifyContent: "flex-start" }}
              removeClippedSubviews={true}
              initialNumToRender={6}
              maxToRenderPerBatch={3}
              windowSize={5}
            />
          )}
        </View>
      </AnimatePresence>
    );
  }
);

ProductCard.displayName = "ProductCard";
GridOfPopularProducts.displayName = "GridOfPopularProducts";

export default GridOfPopularProducts;
