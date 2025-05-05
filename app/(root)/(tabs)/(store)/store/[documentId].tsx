// import { View, Text } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";

// const Product = () => {
//   const { documentId } = useLocalSearchParams();
//   console.log("documentId", documentId);
//   return (
//     <View>
//       <Text>This is the store page and your documentId is :{documentId}</Text>
//     </View>
//   );
// };

// export default Product;

/**************************************************************** */

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "@motify/components";
// import axios from "axios";
// import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { BlurView } from "expo-blur";

// const { width } = Dimensions.get("window");

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     fetchProduct();
//   }, [documentId]);

//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       setProduct(response.data.data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching product:", err);
//       setError("Failed to load product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     // Implement your cart logic here
//     console.log("Adding to cart:", { product, quantity });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   if (!product) return null;

//   const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <Pressable style={styles.backButton} onPress={() => router.back()}>
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               style={styles.productImage}
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View style={styles.detailsContainer}>
//             <Text style={styles.category}>
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text style={styles.title}>{product.name}</Text>
//             <Text style={styles.price}>
//               $
//               {typeof product.price === "number"
//                 ? product.price.toFixed(2)
//                 : product.price}
//             </Text>

//             {/* Description */}
//             <View style={styles.descriptionContainer}>
//               <RenderHtml
//                 contentWidth={width - 32}
//                 source={{ html: product.description }}
//                 baseStyle={styles.description}
//               />
//             </View>

//             {/* Quantity Selector */}
//             <View style={styles.quantityContainer}>
//               <Pressable
//                 style={styles.quantityButton}
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#666" />
//               </Pressable>
//               <Text style={styles.quantityText}>{quantity}</Text>
//               <Pressable
//                 style={styles.quantityButton}
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#666" />
//               </Pressable>
//             </View>
//           </View>
//         </MotiView>
//       </ScrollView>

//       {/* Add to Cart Button */}
//       <BlurView intensity={80} style={styles.bottomBar}>
//         <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
//           <ShoppingCart size={24} color="#fff" />
//           <Text style={styles.addToCartText}>Add to Cart</Text>
//         </Pressable>
//       </BlurView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//   },
//   header: {
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: "#f5f5f5",
//   },
//   productImage: {
//     width: width,
//     height: width,
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#2196F3",
//     marginBottom: 16,
//   },
//   descriptionContainer: {
//     marginBottom: 24,
//   },
//   description: {
//     fontSize: 16,
//     color: "#444",
//     lineHeight: 24,
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   quantityButton: {
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: "#f5f5f5",
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginHorizontal: 24,
//   },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//     paddingBottom: Math.max(16, insets.bottom),
//   },
//   addToCartButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#E53935",
//     padding: 16,
//     borderRadius: 16,
//     gap: 8,
//   },
//   addToCartText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default ProductDetails;

/**************************************************************************** */

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import axios from "axios";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { BlurView } from "expo-blur";

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);
//   const insets = useSafeAreaInsets();
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     fetchProduct();
//   }, [documentId]);

//   const handleToggle = () => {
//     setActive(!active);
//   };

//   const { width } = useWindowDimensions();
//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       setProduct(response.data.data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching product:", err);
//       setError("Failed to load product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     // Implement your cart logic here
//     console.log("Adding to cart:", { product, quantity });
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-base text-red-500">{error}</Text>
//       </View>
//     );
//   }

//   if (!product) return null;

//   const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {typeof product.price === "number"
//                 ? product.price.toFixed(3)
//                 : product.price}{" "}
//               kwd
//             </Text>

//             {/* Description */}
//             <View>
//               <Pressable onPress={handleToggle}>
//                 <View className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-4 ">
//                   <Text> Description</Text>
//                   {active ? (
//                     <ChevronDown size={24} color="#000" />
//                   ) : (
//                     <ChevronUp size={24} color="#000" />
//                   )}
//                 </View>
//               </Pressable>

//               <View className={`shadow-md ${active ? "" : "hidden"}`}>
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{ fontSize: 16, color: "#444", lineHeight: 24 }}
//                 />
//               </View>
//             </View>

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-gray-100"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#666" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-gray-100"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#666" />
//               </Pressable>
//             </View>
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}

//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mb-[100]"
//           onPress={handleAddToCart}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/********************************************* */

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import axios from "axios";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { BlurView } from "expo-blur";
// import useCartStore from "../../../../../store/cartStore"; // Import the cart store

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);
//   const insets = useSafeAreaInsets();
//   const [active, setActive] = useState(false);
//   const addToCart = useCartStore((state) => state.addToCart); // Access the addToCart function

//   useEffect(() => {
//     fetchProduct();
//   }, [documentId]);

//   const handleToggle = () => {
//     setActive(!active);
//   };

//   const { width } = useWindowDimensions();
//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       setProduct(response.data.data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching product:", err);
//       setError("Failed to load product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart({ ...product, quantity });
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-base text-red-500">{error}</Text>
//       </View>
//     );
//   }

//   if (!product) return null;

//   const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {typeof product.price === "number"
//                 ? product.price.toFixed(3)
//                 : product.price}{" "}
//               kwd
//             </Text>

//             {/* Description */}
//             <View>
//               <Pressable onPress={handleToggle}>
//                 <View className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-4 ">
//                   <Text> Description</Text>
//                   {active ? (
//                     <ChevronDown size={24} color="#000" />
//                   ) : (
//                     <ChevronUp size={24} color="#000" />
//                   )}
//                 </View>
//               </Pressable>

//               <View className={`shadow-md ${active ? "" : "hidden"}`}>
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{ fontSize: 16, color: "#444", lineHeight: 24 }}
//                 />
//               </View>
//             </View>

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}
//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mb-[100]"
//           onPress={handleAddToCart}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/******************************************* */

// import { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import { useQuery } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore"; // Import the cart store
// import axios from "axios";

// const fetchProductDetails = async (documentId) => {
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//       },
//     }
//   );
//   return response.data.data;
// };

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [quantity, setQuantity] = useState(1);
//   const [active, setActive] = useState(false);

//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useQuery(["product", documentId], () => fetchProductDetails(documentId), {
//     enabled: !!documentId, // Only fetch if documentId exists
//   });

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart({ ...product, quantity });
//     }
//   };

//   const imageUrl = product?.primaryImage?.[0]?.formats?.large?.url;

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {typeof product.price === "number"
//                 ? product.price.toFixed(3)
//                 : product.price}{" "}
//               kwd
//             </Text>

//             {/* Description */}
//             <View>
//               <Pressable onPress={() => setActive((prev) => !prev)}>
//                 <View className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
//                   <Text>Description</Text>
//                   {active ? (
//                     <ChevronDown size={24} color="#000" />
//                   ) : (
//                     <ChevronUp size={24} color="#000" />
//                   )}
//                 </View>
//               </Pressable>

//               {active && (
//                 <View className="shadow-md">
//                   <RenderHtml
//                     contentWidth={width - 32}
//                     source={{ html: product.description }}
//                     baseStyle={{ fontSize: 16, color: "#444", lineHeight: 24 }}
//                   />
//                 </View>
//               )}
//             </View>

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}
//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mb-[100]"
//           onPress={handleAddToCart}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/*********************************************** */

// import React, { useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";

// // Configure QueryClient with advanced caching and retry strategies
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       cacheTime: 1000 * 60 * 30, // 30 minutes
//       refetchOnWindowFocus: false,
//       retry: 2,
//       retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//     },
//   },
// });

// // Fetch product details with expanded population
// const fetchProductDetails = async (documentId) => {
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//       },
//     }
//   );
//   return response.data.data;
// };

// // Fetch similar products in the same category
// const fetchSimilarProducts = async ({ queryKey, pageParam = 1 }) => {
//   const [_, category, currentProductId] = queryKey;
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?filters[Category][$eq]=${category}&filters[id][$ne]=${currentProductId}&populate=*&pagination[page]=${pageParam}&pagination[pageSize]=4`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//       },
//     }
//   );

//   return {
//     data: response.data.data,
//     nextPage:
//       response.data.meta.pagination.page <
//       response.data.meta.pagination.pageCount
//         ? response.data.meta.pagination.page + 1
//         : undefined,
//   };
// };

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);

//   // Enhanced product details query with prefetching and caching
//   const {
//     data: product,
//     isLoading,
//     error,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["product", documentId],
//     queryFn: () => fetchProductDetails(documentId),
//     enabled: !!documentId,
//     placeholderData: () => queryClient.getQueryData(["product", documentId]),
//     onSuccess: (data) => {
//       // Prefetch similar products
//       if (data?.Category) {
//         queryClient.prefetchInfiniteQuery({
//           queryKey: ["similarProducts", data.Category, documentId],
//           queryFn: ({ pageParam }) =>
//             fetchSimilarProducts({
//               queryKey: ["similarProducts", data.Category, documentId],
//               pageParam,
//             }),
//         });
//       }
//     },
//   });

//   // Similar products query
//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["similarProducts", product?.Category, documentId],
//     queryFn: fetchSimilarProducts,
//     enabled: !!product?.Category,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart({ ...product, quantity });
//     }
//   };

//   const imageUrl = product?.primaryImage?.[0]?.formats?.large?.url;

//   const renderSimilarProductItem = ({ item }) => {
//     const productImageUrl = item?.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Pressable
//         onPress={() => router.push(`/store/${item.id}`)}
//         className="mr-2 w-40"
//       >
//         {productImageUrl && (
//           <Image
//             source={{ uri: productImageUrl }}
//             className="w-full aspect-square rounded-xl"
//             resizeMode="cover"
//           />
//         )}
//         <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//           {item.name}
//         </Text>
//         <Text className="text-red-500 font-bold">
//           {item.price.toFixed(3)} KWD
//         </Text>
//       </Pressable>
//     );
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#8B0000" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//           <MotiView
//             from={{ opacity: 0, translateY: 50 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//           >
//             {/* Header with Back Button */}
//             <View className="p-4 flex-row items-center">
//               <Pressable
//                 className="p-2 rounded-xl bg-gray-100"
//                 onPress={() => router.back()}
//               >
//                 <ArrowLeft size={24} color="#000" />
//               </Pressable>
//             </View>

//             {/* Product Image */}
//             {imageUrl && (
//               <Image
//                 source={{ uri: imageUrl }}
//                 className="w-full aspect-square"
//                 resizeMode="cover"
//               />
//             )}

//             {/* Product Details */}
//             <View className="p-4">
//               <Text className="text-sm text-gray-600 mb-2">
//                 {product.Category} • {product.Subcategory}
//               </Text>
//               <Text className="text-2xl font-bold text-gray-900 mb-2">
//                 {product.name}
//               </Text>
//               <Text className="text-3xl font-bold text-red-500 mb-4">
//                 {product.price.toFixed(3)} KWD
//               </Text>

//               {/* Description Section */}
//               <View>
//                 <Pressable
//                   onPress={() => setDescriptionExpanded((prev) => !prev)}
//                 >
//                   <View className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
//                     <Text>Description</Text>
//                     {descriptionExpanded ? (
//                       <ChevronUp size={24} color="#000" />
//                     ) : (
//                       <ChevronDown size={24} color="#000" />
//                     )}
//                   </View>
//                 </Pressable>

//                 {descriptionExpanded && (
//                   <View className="shadow-md">
//                     <RenderHtml
//                       contentWidth={width - 32}
//                       source={{ html: product.description }}
//                       baseStyle={{
//                         fontSize: 16,
//                         color: "#444",
//                         lineHeight: 24,
//                       }}
//                     />
//                   </View>
//                 )}
//               </View>

//               {/* Quantity Selector */}
//               <View className="flex-row items-center justify-center mb-6">
//                 <Pressable
//                   className="p-3 rounded-xl bg-red-200"
//                   onPress={() => handleQuantityChange(-1)}
//                 >
//                   <Minus size={20} color="#b71c1c" />
//                 </Pressable>
//                 <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//                 <Pressable
//                   className="p-3 rounded-xl bg-red-200"
//                   onPress={() => handleQuantityChange(1)}
//                 >
//                   <Plus size={20} color="#b71c1c" />
//                 </Pressable>
//               </View>

//               {/* Similar Products Section */}
//               {similarProductsData?.pages?.[0]?.data?.length > 0 && (
//                 <View className="mt-4">
//                   <Text className="text-xl font-bold mb-3">
//                     Similar Products
//                   </Text>
//                   <FlashList
//                     data={similarProductsData.pages.flatMap(
//                       (page) => page.data
//                     )}
//                     renderItem={renderSimilarProductItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     horizontal
//                     estimatedItemSize={160}
//                     showsHorizontalScrollIndicator={false}
//                     onEndReached={() => hasNextPage && fetchNextPage()}
//                     ListFooterComponent={
//                       isFetchingNextPage ? (
//                         <ActivityIndicator size="small" color="#8B0000" />
//                       ) : null
//                     }
//                   />
//                 </View>
//               )}
//             </View>
//           </MotiView>

//           {/* Add to Cart Button */}
//           <Pressable
//             className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mb-[100]"
//             onPress={handleAddToCart}
//           >
//             <ShoppingCart size={24} color="#fff" />
//             <Text className="text-lg font-semibold text-white ml-2">
//               Add to Cart
//             </Text>
//           </Pressable>
//         </ScrollView>
//       </View>
//     </QueryClientProvider>
//   );
// };

// export default ProductDetails;

/**************************************************************** */

// import React, { useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";

// // Configure QueryClient with advanced caching and retry strategies
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       cacheTime: 1000 * 60 * 30, // 30 minutes
//       refetchOnWindowFocus: false,
//       retry: 2,
//       retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//     },
//   },
// });

// // Fetch product details with expanded population
// const fetchProductDetails = async (documentId) => {
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}?populate=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//       },
//     }
//   );
//   return response.data.data;
// };

// // Fetch similar products in the same category
// const fetchSimilarProducts = async ({ queryKey, pageParam = 1 }) => {
//   const [_, category, currentProductId] = queryKey;
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?filters[Category][$eq]=${category}&filters[id][$ne]=${currentProductId}&populate=*&pagination[page]=${pageParam}&pagination[pageSize]=4`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//       },
//     }
//   );

//   return {
//     data: response.data.data,
//     nextPage:
//       response.data.meta.pagination.page <
//       response.data.meta.pagination.pageCount
//         ? response.data.meta.pagination.page + 1
//         : undefined,
//   };
// };

// const ProductDetails = () => {
//   const { documentId } = useLocalSearchParams();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);

//   // Enhanced product details query with prefetching and caching
//   const {
//     data: product,
//     isLoading,
//     error,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["product", documentId],
//     queryFn: () => fetchProductDetails(documentId),
//     enabled: !!documentId,
//     placeholderData: () => queryClient.getQueryData(["product", documentId]),
//     onSuccess: (data) => {
//       // Prefetch similar products
//       if (data?.Category) {
//         queryClient.prefetchInfiniteQuery({
//           queryKey: ["similarProducts", data.Category, documentId],
//           queryFn: ({ pageParam }) =>
//             fetchSimilarProducts({
//               queryKey: ["similarProducts", data.Category, documentId],
//               pageParam,
//             }),
//         });
//       }
//     },
//   });

//   // Similar products query
//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["similarProducts", product?.Category, documentId],
//     queryFn: fetchSimilarProducts,
//     enabled: !!product?.Category,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//       addToCart({ ...product, quantity, imageUrl });
//     }
//   };

//   const imageUrl = product?.primaryImage?.[0]?.formats?.large?.url;

//   const renderSimilarProductItem = ({ item }) => {
//     const productImageUrl = item?.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Pressable
//         onPress={() => router.push(`/store/${item.id}`)}
//         className="mr-2 w-40"
//       >
//         {productImageUrl && (
//           <Image
//             source={{ uri: productImageUrl }}
//             className="w-full aspect-square rounded-xl"
//             resizeMode="cover"
//           />
//         )}
//         <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//           {item.name}
//         </Text>
//         <Text className="text-red-500 font-bold">
//           {item.price.toFixed(3)} KWD
//         </Text>
//       </Pressable>
//     );
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#8B0000" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//           <MotiView
//             from={{ opacity: 0, translateY: 50 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//           >
//             {/* Header with Back Button */}
//             <View className="p-4 flex-row items-center">
//               <Pressable
//                 className="p-2 rounded-xl bg-gray-100"
//                 onPress={() => router.back()}
//               >
//                 <ArrowLeft size={24} color="#000" />
//               </Pressable>
//             </View>

//             {/* Product Image */}
//             {imageUrl && (
//               <Image
//                 source={{ uri: imageUrl }}
//                 className="w-full aspect-square"
//                 resizeMode="cover"
//               />
//             )}

//             {/* Product Details */}
//             <View className="p-4">
//               <Text className="text-sm text-gray-600 mb-2">
//                 {product.Category} • {product.Subcategory}
//               </Text>
//               <Text className="text-2xl font-bold text-gray-900 mb-2">
//                 {product.name}
//               </Text>
//               <Text className="text-3xl font-bold text-red-500 mb-4">
//                 {product.price.toFixed(3)} KWD
//               </Text>

//               {/* Description Section */}
//               <View>
//                 <Pressable
//                   onPress={() => setDescriptionExpanded((prev) => !prev)}
//                 >
//                   <View className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
//                     <Text>Description</Text>
//                     {descriptionExpanded ? (
//                       <ChevronUp size={24} color="#000" />
//                     ) : (
//                       <ChevronDown size={24} color="#000" />
//                     )}
//                   </View>
//                 </Pressable>

//                 {descriptionExpanded && (
//                   <View className="shadow-md">
//                     <RenderHtml
//                       contentWidth={width - 32}
//                       source={{ html: product.description }}
//                       baseStyle={{
//                         fontSize: 16,
//                         color: "#444",
//                         lineHeight: 24,
//                       }}
//                     />
//                   </View>
//                 )}
//               </View>

//               {/* Quantity Selector */}
//               <View className="flex-row items-center justify-center mb-6">
//                 <Pressable
//                   className="p-3 rounded-xl bg-red-200"
//                   onPress={() => handleQuantityChange(-1)}
//                 >
//                   <Minus size={20} color="#b71c1c" />
//                 </Pressable>
//                 <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//                 <Pressable
//                   className="p-3 rounded-xl bg-red-200"
//                   onPress={() => handleQuantityChange(1)}
//                 >
//                   <Plus size={20} color="#b71c1c" />
//                 </Pressable>
//               </View>

//               {/* Similar Products Section */}
//               {similarProductsData?.pages?.[0]?.data?.length > 0 && (
//                 <View className="mt-4">
//                   <Text className="text-xl font-bold mb-3">
//                     Similar Products
//                   </Text>
//                   <FlashList
//                     data={similarProductsData.pages.flatMap(
//                       (page) => page.data
//                     )}
//                     renderItem={renderSimilarProductItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     horizontal
//                     estimatedItemSize={160}
//                     showsHorizontalScrollIndicator={false}
//                     onEndReached={() => hasNextPage && fetchNextPage()}
//                     ListFooterComponent={
//                       isFetchingNextPage ? (
//                         <ActivityIndicator size="small" color="#8B0000" />
//                       ) : null
//                     }
//                   />
//                 </View>
//               )}
//             </View>
//           </MotiView>

//           {/* Add to Cart Button */}
//           <Pressable
//             className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mb-[100]"
//             onPress={handleAddToCart}
//           >
//             <ShoppingCart size={24} color="#fff" />
//             <Text className="text-lg font-semibold text-white ml-2">
//               Add to Cart
//             </Text>
//           </Pressable>
//         </ScrollView>
//       </View>
//     </QueryClientProvider>
//   );
// };

// export default ProductDetails;

/************************** */

// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
//   Alert,
//   StatusBar,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";

// interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   description: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//       large?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// interface SimilarProductsResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageCount: number;
//     };
//   };
// }

// const fetchProductDetails = async (documentId: string): Promise<Product> => {
//   try {
//     const response = await axios.get<{ data: Product }>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}`,
//       {
//         params: { populate: "*" },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );

//     const productData = response.data.data;
//     return {
//       ...productData,
//       price: productData.price ? Number(productData.price) : null,
//       documentId: productData.documentId || productData.id,
//     };
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     throw new Error("Failed to fetch product details");
//   }
// };

// const fetchSimilarProducts = async ({
//   queryKey,
//   pageParam = 1,
// }: {
//   queryKey: readonly [string, string, string];
//   pageParam?: number;
// }) => {
//   const [_, category, currentProductId] = queryKey;

//   try {
//     const response = await axios.get<SimilarProductsResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "filters[Category][$eq]": category,
//           "filters[id][$ne]": currentProductId,
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": 4,
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );

//     const normalizedData = response.data.data.map((item) => ({
//       ...item,
//       price: item.price ? Number(item.price) : null,
//       documentId: item.documentId || item.id,
//     }));

//     return {
//       data: normalizedData,
//       nextPage:
//         response.data.meta.pagination.page <
//         response.data.meta.pagination.pageCount
//           ? pageParam + 1
//           : undefined,
//     };
//   } catch (error) {
//     console.error("Error fetching similar products:", error);
//     throw new Error("Failed to fetch similar products");
//   }
// };

// const ProductDetails: React.FC = () => {
//   const { documentId } = useLocalSearchParams();
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["product", documentId as string],
//     queryFn: () => fetchProductDetails(documentId as string),
//     enabled: !!documentId,
//     retry: 2,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     onSuccess: (data) => {
//       if (data?.Category) {
//         queryClient.prefetchInfiniteQuery({
//           queryKey: ["similarProducts", data.Category, documentId as string],
//           queryFn: ({ pageParam = 1 }) =>
//             fetchSimilarProducts({
//               queryKey: [
//                 "similarProducts",
//                 data.Category,
//                 documentId as string,
//               ],
//               pageParam,
//             }),
//         });
//       }
//     },
//   });

//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: [
//       "similarProducts",
//       product?.Category ?? "",
//       documentId as string,
//     ],
//     queryFn: fetchSimilarProducts,
//     enabled: !!product?.Category,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   const handleBack = useCallback(() => {
//     router.push("/(root)/(tabs)/(store)");
//   }, []);

//   const handleQuantityChange = useCallback((increment: number) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   }, []);

//   const handleAddToCart = useCallback(() => {
//     if (product) {
//       const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//       addToCart({ ...product, quantity, imageUrl });
//       Alert.alert("Success", "Product added to cart");
//     }
//   }, [product, quantity, addToCart]);

//   const handleSimilarProductPress = useCallback(async (productId: string) => {
//     try {
//       setIsNavigating(true);

//       await queryClient.prefetchQuery({
//         queryKey: ["product", productId],
//         queryFn: () => fetchProductDetails(productId),
//       });

//       router.replace({
//         pathname: "/(tabs)/(store)/[documentId]",
//         params: { documentId: productId },
//       });
//     } catch (error) {
//       console.error("Navigation error:", error);
//       Alert.alert("Error", "Failed to load product");
//     } finally {
//       setIsNavigating(false);
//     }
//   }, []);

//   const renderSimilarProductItem = useCallback(
//     ({ item }: { item: Product }) => {
//       const productImageUrl = item?.primaryImage?.[0]?.formats?.large?.url;
//       const price = item?.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Pressable
//           onPress={() => handleSimilarProductPress(item.documentId)}
//           className="mr-2 w-40"
//           disabled={isNavigating}
//         >
//           {productImageUrl && (
//             <Image
//               source={{ uri: productImageUrl }}
//               className="w-full aspect-square rounded-xl"
//               resizeMode="cover"
//             />
//           )}
//           <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//             {item.name}
//           </Text>
//           <Text className="text-red-500 font-bold">{price}</Text>
//         </Pressable>
//       );
//     },
//     [handleSimilarProductPress, isNavigating]
//   );

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#EE4B2B" />
//       </View>
//     );
//   }

//   if (error || !product) {
//     return (
//       <View className="flex-1 justify-center items-center p-4 bg-white">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//         <Pressable
//           className="mt-4 p-3 bg-red-500 rounded-lg"
//           onPress={handleBack}
//         >
//           <Text className="text-white">Return to Store</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <StatusBar barStyle="dark-content" />
//       {isNavigating && (
//         <View className="absolute inset-0 bg-black/20 z-50 items-center justify-center">
//           <ActivityIndicator size="large" color="#EE4B2B" />
//         </View>
//       )}

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header with Back Button */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={handleBack}
//               disabled={isNavigating}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {product.primaryImage?.[0]?.formats?.large?.url && (
//             <Image
//               source={{ uri: product.primaryImage[0].formats.large.url }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {product.price
//                 ? `${Number(product.price).toFixed(3)} KWD`
//                 : "Price not available"}
//             </Text>

//             {/* Description Section */}
//             <Pressable
//               onPress={() => setDescriptionExpanded((prev) => !prev)}
//               className="mb-4"
//             >
//               <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <Text>Description</Text>
//                 {descriptionExpanded ? (
//                   <ChevronUp size={24} color="#000" />
//                 ) : (
//                   <ChevronDown size={24} color="#000" />
//                 )}
//               </View>
//             </Pressable>

//             {descriptionExpanded && (
//               <View className="shadow-md mb-4">
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{
//                     fontSize: 16,
//                     color: "#444",
//                     lineHeight: 24,
//                   }}
//                 />
//               </View>
//             )}

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>

//             {/* Similar Products Section */}
//             {similarProductsData?.pages?.[0]?.data?.length > 0 && (
//               <View className="mt-4">
//                 <Text className="text-xl font-bold mb-3">Similar Products</Text>
//                 <FlashList
//                   data={similarProductsData.pages.flatMap((page) => page.data)}
//                   renderItem={renderSimilarProductItem}
//                   keyExtractor={(item) => item.id.toString()}
//                   horizontal
//                   estimatedItemSize={160}
//                   showsHorizontalScrollIndicator={false}
//                   onEndReached={() => hasNextPage && fetchNextPage()}
//                   ListFooterComponent={
//                     isFetchingNextPage ? (
//                       <ActivityIndicator size="small" color="#EE4B2B" />
//                     ) : null
//                   }
//                 />
//               </View>
//             )}
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}
//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mx-4 mb-8"
//           onPress={handleAddToCart}
//           disabled={!product.price}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/*********************************** */

// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
//   Alert,
//   StatusBar,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import { FlashList } from "@shopify/flash-list";
// import {
//   Product,
//   fetchProductDetails,
//   fetchSimilarProducts,
// } from "../../../../servicies/NewProductsApi";

// const ProductDetails: React.FC = () => {
//   const { documentId } = useLocalSearchParams();
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);

//   // Local state
//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

//   // Fetch product details
//   const {
//     data: product,
//     isLoading,
//     error,
//     isError,
//   } = useQuery({
//     queryKey: ["product", documentId as string],
//     queryFn: () => fetchProductDetails(documentId as string),
//     enabled: !!documentId,
//     retry: 2,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     onError: (error) => {
//       console.error("Error fetching product:", error);
//       Alert.alert(
//         "Error",
//         "Failed to load product details. Please try again later."
//       );
//     },
//   });

//   // Fetch similar products
//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError: isSimilarProductsError,
//   } = useInfiniteQuery({
//     queryKey: [
//       "similarProducts",
//       product?.Category ?? "",
//       documentId as string,
//     ],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchSimilarProducts(
//         product?.Category ?? "",
//         documentId as string,
//         pageParam
//       ),
//     enabled: !!product?.Category,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     onError: (error) => {
//       console.error("Error fetching similar products:", error);
//       // Don't show alert for similar products errors
//     },
//   });

//   // Callbacks
//   const handleBack = useCallback(() => {
//     router.push("/(root)/(tabs)/(store)");
//   }, []);

//   const handleQuantityChange = useCallback((increment: number) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   }, []);

//   const handleAddToCart = useCallback(() => {
//     if (!product) return;

//     try {
//       const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//       addToCart({ ...product, quantity, imageUrl });
//       Alert.alert("Success", "Product added to cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Alert.alert("Error", "Failed to add product to cart");
//     }
//   }, [product, quantity, addToCart]);

//   const handleSimilarProductPress = useCallback(
//     async (productId: string) => {
//       try {
//         setIsNavigating(true);

//         // Prefetch the product details
//         await queryClient.prefetchQuery({
//           queryKey: ["product", productId],
//           queryFn: () => fetchProductDetails(productId),
//         });

//         // Navigate to the product
//         router.replace({
//           pathname: "/(tabs)/(store)/[documentId]",
//           params: { documentId: productId },
//         });
//       } catch (error) {
//         console.error("Navigation error:", error);
//         Alert.alert("Error", "Failed to load product");
//       } finally {
//         setIsNavigating(false);
//       }
//     },
//     [queryClient]
//   );

//   // Memoized Renders
//   const renderSimilarProductItem = useCallback(
//     ({ item }: { item: Product }) => {
//       const productImageUrl = item?.primaryImage?.[0]?.formats?.large?.url;
//       const price = item?.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Pressable
//           onPress={() => handleSimilarProductPress(item.documentId)}
//           className="mr-2 w-40"
//           disabled={isNavigating}
//         >
//           {productImageUrl && (
//             <Image
//               source={{ uri: productImageUrl }}
//               className="w-full aspect-square rounded-xl"
//               resizeMode="cover"
//             />
//           )}
//           <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//             {item.name}
//           </Text>
//           <Text className="text-red-500 font-bold">{price}</Text>
//         </Pressable>
//       );
//     },
//     [handleSimilarProductPress, isNavigating]
//   );

//   // Loading state
//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#EE4B2B" />
//       </View>
//     );
//   }

//   // Error state
//   if (isError || !product) {
//     return (
//       <View className="flex-1 justify-center items-center p-4 bg-white">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//         <Pressable
//           className="mt-4 p-3 bg-red-500 rounded-lg"
//           onPress={handleBack}
//         >
//           <Text className="text-white">Return to Store</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // Calculate values
//   const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//   const price = product.price
//     ? `${Number(product.price).toFixed(3)} KWD`
//     : "Price not available";

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <StatusBar barStyle="dark-content" />
//       {isNavigating && (
//         <View className="absolute inset-0 bg-black/20 z-50 items-center justify-center">
//           <ActivityIndicator size="large" color="#EE4B2B" />
//         </View>
//       )}

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header with Back Button */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={handleBack}
//               disabled={isNavigating}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {price}
//             </Text>

//             {/* Description Section */}
//             <Pressable
//               onPress={() => setDescriptionExpanded((prev) => !prev)}
//               className="mb-4"
//             >
//               <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <Text>Description</Text>
//                 {descriptionExpanded ? (
//                   <ChevronUp size={24} color="#000" />
//                 ) : (
//                   <ChevronDown size={24} color="#000" />
//                 )}
//               </View>
//             </Pressable>

//             {descriptionExpanded && (
//               <View className="shadow-md mb-4">
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{
//                     fontSize: 16,
//                     color: "#444",
//                     lineHeight: 24,
//                   }}
//                 />
//               </View>
//             )}

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>

//             {/* Similar Products Section */}
//             {!isSimilarProductsError &&
//               similarProductsData?.pages?.[0]?.data?.length > 0 && (
//                 <View className="mt-4">
//                   <Text className="text-xl font-bold mb-3">
//                     Similar Products
//                   </Text>
//                   <FlashList
//                     data={similarProductsData.pages.flatMap(
//                       (page) => page.data
//                     )}
//                     renderItem={renderSimilarProductItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     horizontal
//                     estimatedItemSize={160}
//                     showsHorizontalScrollIndicator={false}
//                     onEndReached={() => hasNextPage && fetchNextPage()}
//                     ListFooterComponent={
//                       isFetchingNextPage ? (
//                         <ActivityIndicator size="small" color="#EE4B2B" />
//                       ) : null
//                     }
//                   />
//                 </View>
//               )}
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}
//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mx-4 mb-8"
//           onPress={handleAddToCart}
//           disabled={!product.price || isNavigating}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/**************************************** */

// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
//   Alert,
//   StatusBar,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import { FlashList } from "@shopify/flash-list";
// import {
//   Product,
//   fetchProductDetails,
//   fetchSimilarProducts,
// } from "../../../../servicies/NewProductsApi";

// const ProductDetails: React.FC = () => {
//   const { documentId } = useLocalSearchParams();
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);

//   // Local state
//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

//   // Fetch product details
//   const {
//     data: product,
//     isLoading,
//     error,
//     isError,
//   } = useQuery({
//     queryKey: ["product", documentId as string],
//     queryFn: () => fetchProductDetails(documentId as string),
//     enabled: !!documentId,
//     retry: 2,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     onError: (error) => {
//       console.error("Error fetching product:", error);
//       Alert.alert(
//         "Error",
//         "Failed to load product details. Please try again later."
//       );
//     },
//   });

//   // Fetch similar products
//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError: isSimilarProductsError,
//   } = useInfiniteQuery({
//     queryKey: [
//       "similarProducts",
//       product?.Category ?? "",
//       documentId as string,
//     ],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchSimilarProducts(
//         product?.Category ?? "",
//         documentId as string,
//         pageParam
//       ),
//     enabled: !!product?.Category,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     onError: (error) => {
//       console.error("Error fetching similar products:", error);
//       // Don't show alert for similar products errors
//     },
//   });

//   // Callbacks
//   const handleBack = useCallback(() => {
//     router.push("/(root)/(tabs)/(store)");
//   }, []);

//   const handleQuantityChange = useCallback((increment: number) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   }, []);

//   const handleAddToCart = useCallback(() => {
//     if (!product) return;

//     try {
//       const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//       addToCart({ ...product, quantity, imageUrl });
//       Alert.alert("Success", "Product added to cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Alert.alert("Error", "Failed to add product to cart");
//     }
//   }, [product, quantity, addToCart]);

//   const handleSimilarProductPress = useCallback(
//     async (productId: string) => {
//       try {
//         setIsNavigating(true);

//         // Prefetch the product details
//         await queryClient.prefetchQuery({
//           queryKey: ["product", productId],
//           queryFn: () => fetchProductDetails(productId),
//         });

//         // Navigate to the product
//         router.replace({
//           pathname: "/(tabs)/(store)/[documentId]",
//           params: { documentId: productId },
//         });
//       } catch (error) {
//         console.error("Navigation error:", error);
//         Alert.alert("Error", "Failed to load product");
//       } finally {
//         setIsNavigating(false);
//       }
//     },
//     [queryClient]
//   );

//   // Memoized Renders
//   const renderSimilarProductItem = useCallback(
//     ({ item }: { item: Product }) => {
//       const productImageUrl = item?.primaryImage?.[0]?.formats?.large?.url;
//       const price = item?.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Pressable
//           onPress={() => handleSimilarProductPress(item.documentId)}
//           className="mr-2 w-40"
//           disabled={isNavigating}
//         >
//           {productImageUrl && (
//             <Image
//               source={{ uri: productImageUrl }}
//               className="w-full aspect-square rounded-xl"
//               resizeMode="cover"
//             />
//           )}
//           <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//             {item.name}
//           </Text>
//           <Text className="text-red-500 font-bold">{price}</Text>
//         </Pressable>
//       );
//     },
//     [handleSimilarProductPress, isNavigating]
//   );

//   // Loading state
//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#EE4B2B" />
//       </View>
//     );
//   }

//   // Error state
//   if (isError || !product) {
//     return (
//       <View className="flex-1 justify-center items-center p-4 bg-white">
//         <Text className="text-base text-red-500">
//           Failed to load product details
//         </Text>
//         <Pressable
//           className="mt-4 p-3 bg-red-500 rounded-lg"
//           onPress={handleBack}
//         >
//           <Text className="text-white">Return to Store</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // Calculate values
//   const imageUrl = product.primaryImage?.[0]?.formats?.large?.url;
//   const price = product.price
//     ? `${Number(product.price).toFixed(3)} KWD`
//     : "Price not available";

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <StatusBar barStyle="dark-content" />
//       {isNavigating && (
//         <View className="absolute inset-0 bg-black/20 z-50 items-center justify-center">
//           <ActivityIndicator size="large" color="#EE4B2B" />
//         </View>
//       )}

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header with Back Button */}
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={handleBack}
//               disabled={isNavigating}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           {/* Product Image */}
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-square"
//               resizeMode="cover"
//             />
//           )}

//           {/* Product Details */}
//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {price}
//             </Text>

//             {/* Description Section */}
//             <Pressable
//               onPress={() => setDescriptionExpanded((prev) => !prev)}
//               className="mb-4"
//             >
//               <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <Text>Description</Text>
//                 {descriptionExpanded ? (
//                   <ChevronUp size={24} color="#000" />
//                 ) : (
//                   <ChevronDown size={24} color="#000" />
//                 )}
//               </View>
//             </Pressable>

//             {descriptionExpanded && (
//               <View className="shadow-md mb-4">
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{
//                     fontSize: 16,
//                     color: "#444",
//                     lineHeight: 24,
//                   }}
//                 />
//               </View>
//             )}

//             {/* Quantity Selector */}
//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>

//             {/* Similar Products Section */}
//             {!isSimilarProductsError &&
//               similarProductsData?.pages?.[0]?.data?.length > 0 && (
//                 <View className="mt-4">
//                   <Text className="text-xl font-bold mb-3">
//                     Similar Products
//                   </Text>
//                   <FlashList
//                     data={similarProductsData.pages.flatMap(
//                       (page) => page.data
//                     )}
//                     renderItem={renderSimilarProductItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     horizontal
//                     estimatedItemSize={160}
//                     showsHorizontalScrollIndicator={false}
//                     onEndReached={() => hasNextPage && fetchNextPage()}
//                     ListFooterComponent={
//                       isFetchingNextPage ? (
//                         <ActivityIndicator size="small" color="#EE4B2B" />
//                       ) : null
//                     }
//                   />
//                 </View>
//               )}
//           </View>
//         </MotiView>

//         {/* Add to Cart Button */}
//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mx-4 mb-8"
//           onPress={handleAddToCart}
//           disabled={!product.price || isNavigating}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/****************************** */

// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
//   Alert,
//   StatusBar,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { MotiView } from "moti";
// import {
//   useQuery,
//   useInfiniteQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Minus,
//   Plus,
//   ShoppingCart,
// } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import useCartStore from "../../../../../store/cartStore";
// import { FlashList } from "@shopify/flash-list";
// import {
//   Product,
//   fetchProductDetails,
//   fetchSimilarProducts,
// } from "../../../../servicies/NewProductsApi";

// const getBestImageUrl = (item: Product): string | null => {
//   if (!item?.primaryImage?.[0]) return null;

//   const formats = item.primaryImage[0].formats;
//   return (
//     formats?.large?.url ||
//     formats?.medium?.url ||
//     formats?.small?.url ||
//     formats?.thumbnail?.url ||
//     item.primaryImage[0].url ||
//     null
//   );
// };

// const ProductDetails: React.FC = () => {
//   const { documentId } = useLocalSearchParams<{ documentId: string }>();
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

//   const {
//     data: product,
//     isLoading,
//     error,
//     isError,
//   } = useQuery({
//     queryKey: ["product", documentId],
//     queryFn: async () => {
//       if (!documentId) throw new Error("Product ID is required");
//       const data = await fetchProductDetails(documentId);
//       if (!data) throw new Error("Product not found");
//       return data;
//     },
//     enabled: Boolean(documentId),
//     retry: 2,
//     staleTime: 1000 * 60 * 5,
//   });

//   // const {
//   //   data: similarProductsData,
//   //   fetchNextPage,
//   //   hasNextPage,
//   //   isFetchingNextPage,
//   //   isError: isSimilarProductsError,
//   // } = useInfiniteQuery({
//   //   queryKey: ["similarProducts", product?.Category, documentId],
//   //   queryFn: async ({ pageParam = 1 }) => {
//   //     if (!product?.Category || !documentId) {
//   //       return { data: [], nextPage: undefined };
//   //     }
//   //     return fetchSimilarProducts(product.Category, documentId, pageParam);
//   //   },
//   //   enabled: Boolean(product?.Category),
//   //   getNextPageParam: (lastPage) => lastPage.nextPage,
//   // });

//   // const handleBack = useCallback(() => {
//   //   router.back();
//   // }, [router]);

//   const {
//     data: similarProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError: isSimilarProductsError,
//     error: similarProductsError,
//   } = useInfiniteQuery({
//     queryKey: ["similarProducts", product?.Category, documentId],
//     queryFn: async ({ pageParam = 1 }) => {
//       if (!product?.Category || !documentId) {
//         throw new Error("Missing required data for similar products query");
//       }
//       return fetchSimilarProducts(product.Category, documentId, pageParam);
//     },
//     enabled: Boolean(product?.Category && documentId),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     // Add retry configuration
//     retry: 1,
//     // Add error handler
//     onError: (error) => {
//       console.error("Similar products query error:", error);
//     },
//   });

//   const handleBack = useCallback(() => {
//     // Instead of router.back(), use router.navigate
//     router.navigate("/(root)/(tabs)/(store)");
//   }, [router]);

//   const handleQuantityChange = useCallback((increment: number) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   }, []);

//   const handleAddToCart = useCallback(() => {
//     if (!product) return;
//     try {
//       const imageUrl = getBestImageUrl(product);
//       addToCart({ ...product, quantity, imageUrl });
//       Alert.alert("Success", "Product added to cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Alert.alert("Error", "Failed to add product to cart");
//     }
//   }, [product, quantity, addToCart]);

//   const handleSimilarProductPress = useCallback(
//     async (productId: string) => {
//       if (isNavigating) return;

//       try {
//         setIsNavigating(true);
//         await queryClient.prefetchQuery({
//           queryKey: ["product", productId],
//           queryFn: () => fetchProductDetails(productId),
//         });

//         router.push({
//           pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//           params: { documentId: productId },
//         });
//       } catch (error) {
//         console.error("Navigation error:", error);
//         Alert.alert("Error", "Failed to load product");
//       } finally {
//         setIsNavigating(false);
//       }
//     },
//     [queryClient, router, isNavigating]
//   );

//   const renderSimilarProductItem = useCallback(
//     ({ item }: { item: Product }) => {
//       const productImageUrl = getBestImageUrl(item);
//       const price = item?.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Pressable
//           onPress={() => handleSimilarProductPress(item.documentId)}
//           className="mr-2 w-40"
//           disabled={isNavigating}
//         >
//           <Image
//             source={
//               productImageUrl
//                 ? { uri: productImageUrl }
//                 : require("../../../../../assets/product-placeholder.png")
//             }
//             className="w-full aspect-square rounded-xl"
//             resizeMode="cover"
//             defaultSource={require("../../../../../assets/product-placeholder.png")}
//           />
//           <Text numberOfLines={2} className="text-sm font-semibold mt-2">
//             {item.name}
//           </Text>
//           <Text className="text-red-500 font-bold">{price}</Text>
//         </Pressable>
//       );
//     },
//     [handleSimilarProductPress, isNavigating]
//   );

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#EE4B2B" />
//       </View>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <View className="flex-1 justify-center items-center p-4 bg-white">
//         <Text className="text-base text-red-500">
//           {error instanceof Error
//             ? error.message
//             : "Failed to load product details"}
//         </Text>
//         <Pressable
//           className="mt-4 p-3 bg-red-500 rounded-lg"
//           onPress={handleBack}
//         >
//           <Text className="text-white">Return to Store</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   const mainImageUrl = getBestImageUrl(product);
//   const price = product.price
//     ? `${Number(product.price).toFixed(3)} KWD`
//     : "Price not available";

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <StatusBar barStyle="dark-content" />
//       {isNavigating && (
//         <View className="absolute inset-0 bg-black/20 z-50 items-center justify-center">
//           <ActivityIndicator size="large" color="#EE4B2B" />
//         </View>
//       )}

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           <View className="p-4 flex-row items-center">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={handleBack}
//               disabled={isNavigating}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//           </View>

//           <Image
//             source={
//               mainImageUrl
//                 ? { uri: mainImageUrl }
//                 : require("../../../../../assets/product-placeholder.png")
//             }
//             className="w-full aspect-square"
//             resizeMode="cover"
//             defaultSource={require("../../../../../assets/product-placeholder.png")}
//           />

//           <View className="p-4">
//             <Text className="text-sm text-gray-600 mb-2">
//               {product.Category} • {product.Subcategory}
//             </Text>
//             <Text className="text-2xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </Text>
//             <Text className="text-3xl font-bold text-red-500 mb-4">
//               {price}
//             </Text>

//             <Pressable
//               onPress={() => setDescriptionExpanded((prev) => !prev)}
//               className="mb-4"
//             >
//               <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <Text>Description</Text>
//                 {descriptionExpanded ? (
//                   <ChevronUp size={24} color="#000" />
//                 ) : (
//                   <ChevronDown size={24} color="#000" />
//                 )}
//               </View>
//             </Pressable>

//             {descriptionExpanded && (
//               <View className="shadow-md mb-4">
//                 <RenderHtml
//                   contentWidth={width - 32}
//                   source={{ html: product.description }}
//                   baseStyle={{
//                     fontSize: 16,
//                     color: "#444",
//                     lineHeight: 24,
//                   }}
//                 />
//               </View>
//             )}

//             <View className="flex-row items-center justify-center mb-6">
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(-1)}
//               >
//                 <Minus size={20} color="#b71c1c" />
//               </Pressable>
//               <Text className="text-lg font-semibold mx-6">{quantity}</Text>
//               <Pressable
//                 className="p-3 rounded-xl bg-red-200"
//                 onPress={() => handleQuantityChange(1)}
//               >
//                 <Plus size={20} color="#b71c1c" />
//               </Pressable>
//             </View>

//             {!isSimilarProductsError &&
//               similarProductsData?.pages?.[0]?.data?.length > 0 && (
//                 <View className="mt-4">
//                   <Text className="text-xl font-bold mb-3">
//                     Similar Products
//                   </Text>
//                   <FlashList
//                     data={similarProductsData.pages.flatMap(
//                       (page) => page.data
//                     )}
//                     renderItem={renderSimilarProductItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     horizontal
//                     estimatedItemSize={160}
//                     showsHorizontalScrollIndicator={false}
//                     onEndReached={() => hasNextPage && fetchNextPage()}
//                     ListFooterComponent={
//                       isFetchingNextPage ? (
//                         <ActivityIndicator size="small" color="#EE4B2B" />
//                       ) : null
//                     }
//                   />
//                 </View>
//               )}
//           </View>
//         </MotiView>

//         <Pressable
//           className="flex-row items-center justify-center bg-red-600 p-4 rounded-2xl mx-4 mb-8"
//           onPress={handleAddToCart}
//           disabled={!product.price || isNavigating}
//         >
//           <ShoppingCart size={24} color="#fff" />
//           <Text className="text-lg font-semibold text-white ml-2">
//             Add to Cart
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetails;

/******************************************************* */

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
  StatusBar,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react-native";
import RenderHtml from "@builder.io/react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { FlashList } from "@shopify/flash-list";
import Toast from "react-native-toast-message";
import useCartStore from "../../../../../store/cartStore";
import {
  Product,
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../../../servicies/NewProductsApi";

import { shareProduct } from "../../../../Utils/share";

const showToast = (type: "success" | "error" | "info", message: string) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 2000,
    topOffset: 60,
  });
};

const getBestImageUrl = (item: Product): string | null => {
  if (!item?.primaryImage?.[0]) return null;

  const formats = item.primaryImage[0].formats;
  return (
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.thumbnail?.url ||
    item.primaryImage[0].url ||
    null
  );
};

const QuantityControl = React.memo(
  ({
    quantity,
    onQuantityChange,
    disabled,
  }: {
    quantity: number;
    onQuantityChange: (increment: number) => void;
    disabled?: boolean;
  }) => {
    return (
      <View className="flex-row items-center justify-center space-x-4 bg-green-50 p-2 rounded-xl">
        <Pressable
          className="p-2 rounded-lg bg-green-100 active:bg-green-200"
          onPress={() => onQuantityChange(-1)}
          disabled={disabled}
          hitSlop={8}
        >
          <Minus size={20} color="#16A34A" />
        </Pressable>
        <Text className="text-lg font-semibold text-green-700 min-w-[40px] text-center">
          {quantity}
        </Text>
        <Pressable
          className="p-2 rounded-lg bg-green-100 active:bg-green-200"
          onPress={() => onQuantityChange(1)}
          disabled={disabled}
          hitSlop={8}
        >
          <Plus size={20} color="#16A34A" />
        </Pressable>
      </View>
    );
  }
);

// const SimilarProductCard = React.memo(
//   ({
//     item,
//     onPress,
//     disabled,
//   }: {
//     item: Product;
//     onPress: () => void;
//     disabled: boolean;
//   }) => {
//     const productImageUrl = getBestImageUrl(item);
//     const price = item?.price
//       ? `${Number(item.price).toFixed(3)} KWD`
//       : "Price not available";

//     return (
//       <Pressable
//         onPress={onPress}
//         className="mr-3 w-40 bg-white rounded-xl shadow-sm overflow-hidden"
//         disabled={disabled}
//       >
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <Image
//             source={
//               productImageUrl
//                 ? { uri: productImageUrl }
//                 : require("../../../../../assets/product-placeholder.png")
//             }
//             className="w-full aspect-square rounded-t-xl"
//             resizeMode="cover"
//             defaultSource={require("../../../../../assets/product-placeholder.png")}
//           />
//           <View className="p-2">
//             <Text
//               numberOfLines={2}
//               className="text-sm font-semibold text-gray-800"
//             >
//               {item.name}
//             </Text>
//             <Text className="text-green-600 font-bold mt-1">{price}</Text>
//           </View>
//         </MotiView>
//       </Pressable>
//     );
//   }
// );

const SimilarProductCard = React.memo(
  ({
    item,
    onPress,
    disabled,
  }: {
    item: Product;
    onPress: () => void;
    disabled: boolean;
  }) => {
    const productImageUrl = getBestImageUrl(item);
    const price = item?.price
      ? `${Number(item.price).toFixed(3)} KWD`
      : "Price not available";

    return (
      <Pressable
        onPress={onPress}
        className="mr-3 w-40 bg-white rounded-xl shadow-sm overflow-hidden"
        disabled={disabled}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Image
            source={
              productImageUrl
                ? { uri: productImageUrl }
                : require("../../../../../assets/product-placeholder.png")
            }
            className="w-full h-40 rounded-t-xl" // Fixed height for consistency
            resizeMode="cover"
            defaultSource={require("../../../../../assets/product-placeholder.png")}
          />
          <View className="p-2">
            <Text
              numberOfLines={2}
              className="text-sm font-semibold text-gray-800"
            >
              {item.name}
            </Text>
            <Text className="text-green-600 font-bold mt-1">{price}</Text>
          </View>
        </MotiView>
      </Pressable>
    );
  }
);

const ProductDetails: React.FC = () => {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["product", documentId],
    queryFn: async () => {
      if (!documentId) throw new Error("Product ID is required");
      const data = await fetchProductDetails(documentId);
      if (!data) throw new Error("Product not found");
      return data;
    },
    enabled: Boolean(documentId),
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: similarProductsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["similarProducts", product?.Category, documentId],
    queryFn: async ({ pageParam = 1 }) => {
      if (!product?.Category || !documentId) {
        throw new Error("Missing required data for similar products query");
      }
      return fetchSimilarProducts(product.Category, documentId, pageParam);
    },
    enabled: Boolean(product?.Category && documentId),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 1,
  });

  // const handleBack = useCallback(() => {
  //   router.navigate("/(root)/(tabs)/(store)");
  // }, [router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleQuantityChange = useCallback(async (increment: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuantity((prev) => Math.max(1, prev + increment));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const imageUrl = getBestImageUrl(product);
      addToCart({ ...product, quantity, imageUrl: imageUrl || "" });
      showToast("success", `${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add product to cart");
    }
  }, [product, quantity, addToCart]);

  const handleSimilarProductPress = useCallback(
    async (productId: string) => {
      if (isNavigating) return;
      try {
        setIsNavigating(true);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await queryClient.prefetchQuery({
          queryKey: ["product", productId],
          queryFn: () => fetchProductDetails(productId),
        });

        router.push({
          pathname: "/(root)/(tabs)/(store)/store/[documentId]",
          params: { documentId: productId },
        });
      } catch (error) {
        console.error("Navigation error:", error);
        showToast("error", "Failed to load product");
      } finally {
        setIsNavigating(false);
      }
    },
    [queryClient, router, isNavigating]
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <ActivityIndicator size="large" color="#4ECB71" />
          <Text className="mt-4 text-gray-600 font-medium">
            Loading product...
          </Text>
        </MotiView>
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="items-center"
        >
          <Text className="text-lg text-red-500 font-semibold mb-2">
            {error instanceof Error
              ? error.message
              : "Failed to load product details"}
          </Text>
          <Pressable
            className="mt-4 px-6 py-3 bg-green-500 rounded-xl flex-row items-center"
            onPress={handleBack}
          >
            <ArrowLeft size={20} color="#FFF" />
            <Text className="text-white font-semibold ml-2">
              Return to Store
            </Text>
          </Pressable>
        </MotiView>
      </View>
    );
  }

  const mainImageUrl = getBestImageUrl(product);
  const price = product.price
    ? `${Number(product.price).toFixed(3)} KWD`
    : "Price not available";

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" />
      <AnimatePresence>
        {isNavigating && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-50 items-center justify-center"
          >
            <ActivityIndicator size="large" color="#4ECB71" />
          </MotiView>
        )}
      </AnimatePresence>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={Platform.OS === "ios"}
      >
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <View className="p-4 flex-row items-center justify-between">
            <Pressable
              className="p-2 rounded-xl bg-green-50 active:bg-green-100"
              onPress={handleBack}
              disabled={isNavigating}
            >
              <ArrowLeft size={24} color="#16A34A" />
            </Pressable>
            <View className="flex-row items-center">
              <Pressable
                className="p-2 rounded-xl bg-green-50 active:bg-green-100"
                onPress={() => shareProduct(product.documentId, product.name)}
                disabled={isNavigating}
              >
                <Text className="text-green-600 font-medium">Share</Text>
              </Pressable>
            </View>
          </View>

          <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative"
          >
            <Image
              source={
                mainImageUrl
                  ? { uri: mainImageUrl }
                  : require("../../../../../assets/product-placeholder.png")
              }
              className="w-full aspect-square bg-gray-50"
              resizeMode="cover"
              defaultSource={require("../../../../../assets/product-placeholder.png")}
            />
            {/* Price Badge */}
            <View className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-green-500/90 backdrop-blur-sm">
              <Text className="text-white font-bold text-xl">{price}</Text>
            </View>
          </MotiView>

          <View className="p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-medium text-green-600">
                {product.Category} • {product.Subcategory}
              </Text>
              <View className="px-3 py-1 bg-green-100 rounded-full">
                <Text className="text-green-700 text-sm">In Stock</Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </Text>

            <Pressable
              onPress={() => setDescriptionExpanded((prev) => !prev)}
              className="mb-4"
            >
              <View className="flex-row items-center justify-between p-4 bg-green-50 rounded-xl">
                <Text className="font-medium text-gray-800">Description</Text>
                {descriptionExpanded ? (
                  <ChevronUp size={24} color="#16A34A" />
                ) : (
                  <ChevronDown size={24} color="#16A34A" />
                )}
              </View>
            </Pressable>

            <AnimatePresence>
              {descriptionExpanded && (
                <MotiView
                  from={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "timing", duration: 300 }}
                  className="bg-white rounded-xl p-4 mb-4"
                >
                  <RenderHtml
                    contentWidth={width - 32}
                    source={{ html: product.description || "" }}
                    enableExperimentalMarginCollapsing
                    baseStyle={{
                      fontSize: 16,
                      lineHeight: 24,
                      color: "#374151",
                      fontFamily: Platform.select({
                        ios: "System",
                        android: "Roboto",
                      }),
                    }}
                  />
                </MotiView>
              )}
            </AnimatePresence>

            <View className="mb-6">
              <QuantityControl
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                disabled={isNavigating}
              />
            </View>

            {similarProductsData?.pages?.[0]?.data?.length > 0 && (
              <View className="mt-6">
                <Text className="text-xl font-bold text-gray-900 mb-3">
                  Similar Products
                </Text>
                <FlashList
                  data={
                    similarProductsData?.pages.flatMap((page) => page.data) ||
                    []
                  }
                  renderItem={({ item }) => (
                    <SimilarProductCard
                      item={item}
                      onPress={() => handleSimilarProductPress(item.documentId)}
                      disabled={isNavigating}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  estimatedItemSize={160} // Matches the approximate height of SimilarProductCard
                  showsHorizontalScrollIndicator={false}
                  onEndReached={() =>
                    hasNextPage && !isFetchingNextPage && fetchNextPage()
                  }
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    isFetchingNextPage ? (
                      <View className="justify-center px-4">
                        <ActivityIndicator size="small" color="#4ECB71" />
                      </View>
                    ) : null
                  }
                />
              </View>
            )}
          </View>
        </MotiView>
      </ScrollView>

      <View className="px-4 pb-4 pt-2 border-t border-gray-100">
        <Pressable
          className="flex-row items-center justify-center bg-green-500 p-4 rounded-xl active:bg-green-600"
          onPress={handleAddToCart}
          disabled={!product.price || isNavigating}
        >
          <ShoppingCart size={24} color="#fff" />
          <Text className="text-lg font-semibold text-white ml-2">
            Add to Cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetails;
