// import { View, Text } from "react-native";
// import React from "react";

// const store = () => {
//   return (
//     <View>
//       <Text>store</Text>
//     </View>
//   );
// };

// export default store;

/*********************************** */

// // app/(tabs)/store/index.tsx
// import { View, Text, Pressable } from "react-native";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";
// import { MotiView } from "@motify/components";
// import { Filter } from "lucide-react-native";
// import ProductCard from "../../../Components/products/ProductCard";
// import FilterModal from "../../../Components/products/FilterModal";
// import { useInfiniteQuery } from "@tanstack/react-query";

// // Types
// interface Product {
//   id: number;
//   documentId: string;
//   name: string;
//   price: number;
//   salesPrice: number | null;
//   Category: string;
//   Subcategory: string;
//   description: string;
//   IsFeatured: boolean;
//   primaryImage: Array<any>; // Update this based on your image structure
// }

// interface StrapiResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// interface FilterState {
//   category: string;
//   subcategory: string;
//   priceRange: { min: number; max: number };
//   sortBy: string;
// }

// const buildFilterParams = (filters: FilterState) => {
//   const params: Record<string, any> = {};

//   if (filters.category) {
//     params["filters[Category][$eq]"] = filters.category;
//   }

//   if (filters.subcategory) {
//     params["filters[Subcategory][$eq]"] = filters.subcategory;
//   }

//   if (filters.priceRange.min > 0) {
//     params["filters[price][$gte]"] = filters.priceRange.min;
//   }

//   if (filters.priceRange.max < Infinity) {
//     params["filters[price][$lte]"] = filters.priceRange.max;
//   }

//   switch (filters.sortBy) {
//     case "priceAsc":
//       params["sort"] = "price:asc";
//       break;
//     case "priceDesc":
//       params["sort"] = "price:desc";
//       break;
//     case "newest":
//       params["sort"] = "createdAt:desc";
//       break;
//   }

//   return params;
// };

// export default function StoreScreen() {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [activeFilters, setActiveFilters] = useState<FilterState>({
//     category: "",
//     subcategory: "",
//     priceRange: { min: 0, max: Infinity },
//     sortBy: "newest",
//   });

//   const router = useRouter();

//   const fetchProducts = async ({ pageParam = 1 }) => {
//     const response = await axios.get<StrapiResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": 10,
//           ...buildFilterParams(activeFilters),
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );
//     return response.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetchingNextPage,
//     error,
//   } = useInfiniteQuery({
//     queryKey: ["products", activeFilters],
//     queryFn: fetchProducts,
//     getNextPageParam: (lastPage) => {
//       const { page, pageCount } = lastPage.meta.pagination;
//       return page < pageCount ? page + 1 : undefined;
//     },
//   });

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100 }}
//       className="w-1/2 p-2"
//     >
//       <ProductCard
//         product={item}
//         onPress={() => router.push(`/store/${item.documentId}`)}
//       />
//     </MotiView>
//   );

//   const allProducts = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header with Filter Button */}
//       <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
//         <Text className="text-xl font-semibold">Store</Text>
//         <Pressable
//           onPress={() => setIsFilterVisible(true)}
//           className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
//         >
//           <Filter size={24} color="#374151" />
//         </Pressable>
//       </View>

//       {/* Products List */}
//       <FlashList
//         data={allProducts}
//         renderItem={renderProduct}
//         estimatedItemSize={250}
//         numColumns={2}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         className="flex-1"
//         ListHeaderComponent={
//           <View className="px-4 py-2">
//             <Text className="text-sm text-gray-500">
//               {data?.pages[0]?.meta.pagination.total ?? 0} Products
//             </Text>
//           </View>
//         }
//         ListEmptyComponent={
//           isLoading ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">Loading products...</Text>
//             </View>
//           ) : error ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-red-500">Error loading products</Text>
//             </View>
//           ) : (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <Text className="text-center text-gray-500">Loading more...</Text>
//             </View>
//           ) : null
//         }
//       />

//       {/* Filter Modal */}
//       <FilterModal
//         visible={isFilterVisible}
//         onClose={() => setIsFilterVisible(false)}
//         activeFilters={activeFilters}
//         onApplyFilters={setActiveFilters}
//       />
//     </View>
//   );
// }

/******************************** */

// import React from "react";
// import { View, Text, Pressable } from "react-native";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";
// import { MotiView } from "@motify/components";
// import { Filter } from "lucide-react-native";
// import ProductCard from "../../../Components/products/ProductCard";
// import FilterModal from "../../../Components/products/FilterModal";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useInfiniteQuery,
// } from "@tanstack/react-query";

// // Create a QueryClient instance
// const queryClient = new QueryClient();

// // Your other types and helper functions (e.g., `buildFilterParams`) remain unchanged

// export default function AppWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <StoreScreen />
//     </QueryClientProvider>
//   );
// }

// function StoreScreen() {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [activeFilters, setActiveFilters] = useState<FilterState>({
//     category: "",
//     subcategory: "",
//     priceRange: { min: 0, max: Infinity },
//     sortBy: "newest",
//   });

//   const router = useRouter();

//   const fetchProducts = async ({ pageParam = 1 }) => {
//     const response = await axios.get<StrapiResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//       {
//         params: {
//           populate: "*",
//           "pagination[page]": pageParam,
//           "pagination[pageSize]": 10,
//           ...buildFilterParams(activeFilters),
//         },
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//         },
//       }
//     );
//     return response.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetchingNextPage,
//     error,
//   } = useInfiniteQuery({
//     queryKey: ["products", activeFilters],
//     queryFn: fetchProducts,
//     getNextPageParam: (lastPage) => {
//       const { page, pageCount } = lastPage.meta.pagination;
//       return page < pageCount ? page + 1 : undefined;
//     },
//   });

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100 }}
//       className="w-1/2 p-2"
//     >
//       <ProductCard
//         product={item}
//         onPress={() => router.push(`/store/${item.documentId}`)}
//       />
//     </MotiView>
//   );

//   const allProducts = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header with Filter Button */}
//       <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
//         <Text className="text-xl font-semibold">Store</Text>
//         <Pressable
//           onPress={() => setIsFilterVisible(true)}
//           className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
//         >
//           <Filter size={24} color="#374151" />
//         </Pressable>
//       </View>

//       {/* Products List */}
//       <FlashList
//         data={allProducts}
//         renderItem={renderProduct}
//         estimatedItemSize={250}
//         numColumns={2}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         className="flex-1"
//         ListHeaderComponent={
//           <View className="px-4 py-2">
//             <Text className="text-sm text-gray-500">
//               {data?.pages[0]?.meta.pagination.total ?? 0} Products
//             </Text>
//           </View>
//         }
//         ListEmptyComponent={
//           isLoading ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">Loading products...</Text>
//             </View>
//           ) : error ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-red-500">Error loading products</Text>
//             </View>
//           ) : (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <Text className="text-center text-gray-500">Loading more...</Text>
//             </View>
//           ) : null
//         }
//       />

//       {/* Filter Modal */}
//       <FilterModal
//         visible={isFilterVisible}
//         onClose={() => setIsFilterVisible(false)}
//         activeFilters={activeFilters}
//         onApplyFilters={setActiveFilters}
//       />
//     </View>
//   );
// }

/****************************** */

// import React from "react";
// import { View, Text, Pressable } from "react-native";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import axios from "axios";
// import { FlashList } from "@shopify/flash-list";
// import { MotiView } from "@motify/components";
// import { Filter } from "lucide-react-native";
// import ProductCard from "../../../Components/products/ProductCard";
// import FilterModal from "../../../Components/products/FilterModal";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useInfiniteQuery,
// } from "@tanstack/react-query";

// // Create a QueryClient instance
// const queryClient = new QueryClient();

// // Define the default filter state
// const defaultFilters = {
//   category: "",
//   subcategory: "",
//   priceRange: { min: 0, max: Infinity },
//   sortBy: "newest",
// };

// export default function AppWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <StoreScreen />
//     </QueryClientProvider>
//   );
// }

// function StoreScreen() {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [activeFilters, setActiveFilters] = useState(defaultFilters);
//   const router = useRouter();

//   // Helper function to build query parameters
//   const buildFilterParams = (filters) => {
//     const params = {};
//     if (filters.category) params["filters[category]"] = filters.category;
//     if (filters.subcategory)
//       params["filters[subcategory]"] = filters.subcategory;
//     if (filters.priceRange.min)
//       params["filters[price][$gte]"] = filters.priceRange.min;
//     if (filters.priceRange.max !== Infinity)
//       params["filters[price][$lte]"] = filters.priceRange.max;
//     if (filters.sortBy) params["sort"] = filters.sortBy;
//     return params;
//   };

//   // Fetch products function
//   const fetchProducts = async ({ pageParam = 1 }) => {
//     const baseUrl = process.env.EXPO_PUBLIC_STRAPI_API_URL;
//     const token = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS;

//     if (!baseUrl || !token) {
//       throw new Error("API URL or token is not set.");
//     }

//     const response = await axios.get(`${baseUrl}/api/products`, {
//       params: {
//         populate: "*",
//         "pagination[page]": pageParam,
//         "pagination[pageSize]": 10,
//         ...buildFilterParams(activeFilters),
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetchingNextPage,
//     error,
//   } = useInfiniteQuery({
//     queryKey: ["products", activeFilters],
//     queryFn: fetchProducts,
//     getNextPageParam: (lastPage) => {
//       const { page, pageCount } = lastPage.meta.pagination;
//       return page < pageCount ? page + 1 : undefined;
//     },
//   });

//   const renderProduct = ({ item, index }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: index * 100 }}
//       className="w-1/2 p-2"
//     >
//       <ProductCard
//         product={item}
//         onPress={() => router.push(`/store/${item.id}`)}
//       />
//     </MotiView>
//   );

//   const allProducts = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header with Filter Button */}
//       <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
//         <Text className="text-xl font-semibold">Store</Text>
//         <Pressable
//           onPress={() => setIsFilterVisible(true)}
//           className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
//         >
//           <Filter size={24} color="#374151" />
//         </Pressable>
//       </View>

//       {/* Products List */}
//       <FlashList
//         data={allProducts}
//         renderItem={renderProduct}
//         estimatedItemSize={250}
//         numColumns={2}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         className="flex-1"
//         ListHeaderComponent={
//           <View className="px-4 py-2">
//             <Text className="text-sm text-gray-500">
//               {data?.pages[0]?.meta.pagination.total ?? 0} Products
//             </Text>
//           </View>
//         }
//         ListEmptyComponent={
//           isLoading ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">Loading products...</Text>
//             </View>
//           ) : error ? (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-red-500">Error loading products</Text>
//             </View>
//           ) : (
//             <View className="flex-1 justify-center items-center py-20">
//               <Text className="text-gray-500">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <Text className="text-center text-gray-500">Loading more...</Text>
//             </View>
//           ) : null
//         }
//       />

//       {/* Filter Modal */}
//       <FilterModal
//         visible={isFilterVisible}
//         onClose={() => setIsFilterVisible(false)}
//         activeFilters={activeFilters}
//         onApplyFilters={setActiveFilters}
//       />
//     </View>
//   );
// }

/************************************** */

// import { View, Text, Image, Animated, Pressable } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import { Link, useRouter } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "@motify/components";
// import { StyleSheet } from "react-native";

// // Types
// interface Product {
//   id: number;
//   Name: string;
//   Price: string;
//   Category: string;
//   Slug: string;
//   publishedAt: string;
//   FeaturedImage: {
//     formats: {
//       medium: {
//         url: string;
//       };
//     };
//   };
// }

// interface ProductResponse {
//   data: Product[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// export default function ProductPreviewScreen() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchProducts = async () => {
//     console.log("Fetching products...");
//     try {
//       const response = await axios.get<ProductResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       console.log("Fetched products successfully:", response.data);
//       setProducts(response.data.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const renderItem = ({ item, index }: { item: Product; index: number }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 50 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         type: "timing",
//         duration: 600,
//         delay: index * 200,
//       }}
//       style={styles.card}
//     >
//       <Pressable
//         onPress={() => router.push(`/store/${item.documentId}`)}
//         style={({ pressed }) => [
//           styles.pressable,
//           { opacity: pressed ? 0.9 : 1 },
//         ]}
//       >
//         <Image
//           source={{ uri: item.primaryImage[0]?.formats?.large?.url }}
//           style={styles.image}
//         />
//         <View style={styles.contentContainer}>
//           {item.Category && (
//             <Text style={styles.category}>{item.Category}</Text>
//           )}
//           <Text style={styles.title} numberOfLines={2}>
//             {item.Name}
//           </Text>
//           <Text style={styles.price}>${item.Price}</Text>
//         </View>
//       </Pressable>
//     </MotiView>
//   );

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlashList
//         data={products}
//         renderItem={renderItem}
//         estimatedItemSize={300}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={loading}
//         onRefresh={fetchProducts}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//     width: "100%",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   listContainer: {
//     padding: 16,
//     gap: 16,
//   },
//   card: {
//     marginBottom: 16,
//     width: 300,
//     height: 300,
//     backgroundColor: "white",
//     borderRadius: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   pressable: {
//     flex: 1,
//   },
//   image: {
//     width: "100%",
//     height: "50%",
//     resizeMode: "cover",
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   category: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 8,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#1a1a1a",
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#007aff",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//   },
// });

/*************************************** */

// // app/products.tsx
// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   RefreshControl,
//   Animated,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { BlurView } from "expo-blur";
// import { Product } from "../../../types/product";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2; // 24 is total horizontal padding

// export default function ProductsScreen() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const insets = useSafeAreaInsets();
//   const fadeAnim = new Animated.Value(0);

//   const fetchProducts = async (refresh = false) => {
//     if (refresh) setRefreshing(true);
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       console.log(response.data.data);
//       const extractedData = response.data.data.map((product: any) => ({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         imageUrl:
//           product.primaryImage[0]?.formats?.large?.url || "No Image Available",
//         category: product.Category,
//         subcategory: product.Subcategory,
//         locale: product.locale,
//         date: product.Date,
//       }));

//       setProducts(refresh ? extractedData : [...products, ...extractedData]);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;

//     return (
//       <Animated.View
//         style={[
//           styles.productCard,
//           {
//             marginLeft: isEven ? 8 : 4,
//             marginRight: isEven ? 4 : 8,
//             opacity: fadeAnim,
//             transform: [
//               {
//                 translateY: fadeAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [50, 0],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <BlurView intensity={10} style={styles.cardContent}>
//           <Image
//             source={{ uri: item.imageUrl }}
//             style={styles.productImage}
//             resizeMode="cover"
//           />
//           <View style={styles.productInfo}>
//             <Text style={styles.productName} numberOfLines={2}>
//               {item.name}
//             </Text>
//             <Text style={styles.productCategory}>
//               {item.category} • {item.subcategory}
//             </Text>
//             <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//           </View>
//         </BlurView>
//       </Animated.View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <FlashList
//         data={products}
//         renderItem={renderProduct}
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchProducts(true)}
//           />
//         }
//         onEndReached={() => fetchProducts()}
//         onEndReachedThreshold={0.5}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: {
//     padding: 8,
//   },
//   productCard: {
//     flex: 1,
//     marginBottom: 12,
//     borderRadius: 16,
//     overflow: "hidden",
//     backgroundColor: "white",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   cardContent: {
//     overflow: "hidden",
//   },
//   productImage: {
//     width: COLUMN_WIDTH - 8,
//     height: COLUMN_WIDTH - 8,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 4,
//     color: "#1a1a1a",
//   },
//   productCategory: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#2196F3",
//   },
// });

/******************************************* */

// // app/products.tsx
// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti"; // Using Moti for better animations
// import { Link } from "expo-router";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;

// export default function ProductsScreen() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const insets = useSafeAreaInsets();

//   const fetchProducts = async (refresh = false) => {
//     if (refresh) setRefreshing(true);
//     try {
//       // console.log("Fetching from:", process.env.EXPO_PUBLIC_STRAPI_API_URL);

//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       // console.log("Raw API response:", JSON.stringify(response.data, null, 2));

//       if (!response.data.data) {
//         throw new Error("No data received from API");
//       }

//       const newProducts = response.data.data;
//       setProducts(refresh ? newProducts : [...products, ...newProducts]);
//       setError(null);
//     } catch (err) {
//       console.error("Error details:", err);
//       setError(err instanceof Error ? err.message : "Failed to fetch products");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} key={item.id}>
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{
//             type: "timing",
//             duration: 600,
//             delay: index * 100,
//           }}
//           style={[
//             styles.productCard,
//             {
//               marginLeft: isEven ? 8 : 4,
//               marginRight: isEven ? 4 : 8,
//             },
//           ]}
//         >
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               style={styles.productImage}
//               resizeMode="cover"
//             />
//           )}
//           <View style={styles.productInfo}>
//             <Text style={styles.productName} numberOfLines={2}>
//               {item.name}
//             </Text>
//             <Text style={styles.productCategory}>
//               {item.Category} • {item.Subcategory}
//             </Text>
//             <Text style={styles.productPrice}>
//               $
//               {typeof item.price === "number"
//                 ? item.price.toFixed(2)
//                 : item.price}
//             </Text>
//           </View>
//         </MotiView>
//       </Link>
//     );
//   };

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <Text style={styles.errorSubtext}>Pull to refresh and try again</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <FlashList
//         data={products}
//         renderItem={renderProduct}
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchProducts(true)}
//           />
//         }
//         onEndReached={() => fetchProducts()}
//         onEndReachedThreshold={0.5}
//         ListEmptyComponent={() =>
//           !loading ? (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>No products found</Text>
//             </View>
//           ) : null
//         }
//       />
//       {loading && !refreshing && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#2196F3" />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   listContainer: {
//     padding: 8,
//   },
//   productCard: {
//     flex: 1,
//     marginBottom: 12,
//     borderRadius: 16,
//     overflow: "hidden",
//     backgroundColor: "white",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   productImage: {
//     width: COLUMN_WIDTH - 8,
//     height: COLUMN_WIDTH - 8,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 4,
//     color: "#1a1a1a",
//   },
//   productCategory: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#2196F3",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "red",
//     marginBottom: 8,
//   },
//   errorSubtext: {
//     fontSize: 14,
//     color: "#666",
//   },
//   emptyContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

/************************************* */

// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useQuery } from "@tanstack/react-query";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import axios from "axios";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: Array<{
//     formats: {
//       large: { url: string };
//     };
//   }>;
// }

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       return response.data.data as Product[];
//     },
//   });

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//           >
//             <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3">
//                 <Text
//                   numberOfLines={2}
//                   className="text-base font-semibold text-gray-900 mb-1"
//                 >
//                   {item.name}
//                 </Text>
//                 <Text className="text-xs text-gray-500 mb-2">
//                   {item.Category} • {item.Subcategory}
//                 </Text>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {typeof item.price === "number"
//                       ? item.price.toFixed(3)
//                       : item.price}{" "}
//                     KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       // Add to cart logic here
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   const ProductSkeleton = ({ index }: { index: number }) => (
//     <MotiView
//       from={{ opacity: 0.3 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     >
//       <View className="bg-white rounded-2xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-200" />
//         <View className="p-3">
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//           <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//         </View>
//       </View>
//     </MotiView>
//   );

//   if (isError) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-red-500 text-base mb-2">
//           {error instanceof Error ? error.message : "Failed to fetch products"}
//         </Text>
//         <Pressable
//           onPress={() => refetch()}
//           className="bg-red-500 px-6 py-3 rounded-xl"
//         >
//           <Text className="text-white font-medium">Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <FlashList
//         data={isLoading ? Array(6).fill({}) : data}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onRefresh={refetch}
//         refreshing={false}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//     </View>
//   );
// }

/************************************ */

// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useQuery } from "@tanstack/react-query";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import axios from "axios";
// import useCartStore from "../../../../store/cartStore"; // Import the cart store

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300; // Set a fixed height for the product boxes

// interface Product {
//   id: string;
//   documentId: string;
//   name: string;
//   price: number;
//   Category: string;
//   Subcategory: string;
//   primaryImage: Array<{
//     formats: {
//       large: { url: string };
//     };
//   }>;
// }

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart); // Access the addToCart function

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       return response.data.data as Product[];
//     },
//   });

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }} // Apply the fixed height
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {typeof item.price === "number"
//                       ? item.price.toFixed(3)
//                       : item.price}{" "}
//                     KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 }); // Call addToCart with the item
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   const ProductSkeleton = ({ index }: { index: number }) => (
//     <MotiView
//       from={{ opacity: 0.3 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//       style={{ height: BOX_HEIGHT }} // Apply the fixed height
//     >
//       <View
//         className="bg-white rounded-2xl overflow-hidden shadow-sm"
//         style={{ height: "100%" }}
//       >
//         <View className="w-full aspect-square bg-gray-200" />
//         <View className="p-3 flex-1 justify-between">
//           <View>
//             <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//             <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//           </View>
//           <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//         </View>
//       </View>
//     </MotiView>
//   );

//   if (isError) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-red-500 text-base mb-2">
//           {error instanceof Error ? error.message : "Failed to fetch products"}
//         </Text>
//         <Pressable
//           onPress={() => refetch()}
//           className="bg-red-500 px-6 py-3 rounded-xl"
//         >
//           <Text className="text-white font-medium">Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <FlashList
//         data={isLoading ? Array(6).fill({}) : data}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onRefresh={refetch}
//         refreshing={false}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//     </View>
//   );
// }

/*******************************************/

/***************************************** */

// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus, Filter, X, Check } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";

// // Color Palette
// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFF9F7",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// // Categories and Subcategories
// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const handleCategorySelect = useCallback((category) => {
//     setActiveCategory((prev) => (prev === category ? null : category));
//     setSelectedFilters((prev) => ({
//       ...prev,
//       category: category,
//       subcategories: [], // Reset subcategories when changing category
//     }));
//   }, []);

//   const handleSubcategoryToggle = useCallback((subcategory) => {
//     setSelectedFilters((prev) => {
//       const currentSubcategories = prev.subcategories;
//       const isSelected = currentSubcategories.includes(subcategory);

//       return {
//         ...prev,
//         subcategories: isSelected
//           ? currentSubcategories.filter((sc) => sc !== subcategory)
//           : [...currentSubcategories, subcategory],
//       };
//     });
//   }, []);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   const openFilterModal = () => setIsFilterModalVisible(true);
//   const closeFilterModal = () => setIsFilterModalVisible(false);

//   const renderFilterModal = () => (
//     <Modal
//       transparent={true}
//       visible={isFilterModalVisible}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Refine Filters</Text>
//             <Pressable onPress={closeFilterModal}>
//               <X size={24} color={COLORS.primary} />
//             </Pressable>
//           </View>

//           {activeCategory && (
//             <ScrollView>
//               <Text style={styles.subcategoryTitle}>
//                 {activeCategory} Subcategories
//               </Text>
//               {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                 <Pressable
//                   key={subcategory}
//                   onPress={() => handleSubcategoryToggle(subcategory)}
//                   style={styles.subcategoryItem}
//                 >
//                   <Text style={styles.subcategoryText}>{subcategory}</Text>
//                   {selectedFilters.subcategories.includes(subcategory) && (
//                     <Check size={20} color={COLORS.primary} />
//                   )}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           )}

//           <View style={styles.modalActions}>
//             <Pressable
//               style={styles.resetButton}
//               onPress={() =>
//                 setSelectedFilters({ category: null, subcategories: [] })
//               }
//             >
//               <Text style={styles.resetButtonText}>Reset All</Text>
//             </Pressable>
//             <Pressable style={styles.applyButton} onPress={closeFilterModal}>
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </Pressable>
//           </View>
//         </SafeAreaView>
//       </View>
//     </Modal>
//   );

//   const filteredProducts = useMemo(() => {
//     if (!data) return [];
//     let products = data.pages.flatMap((page) => page.data);
//     if (selectedFilters.category) {
//       products = products.filter(
//         (product) => product.Category === selectedFilters.category
//       );
//     }
//     if (selectedFilters.subcategories.length > 0) {
//       products = products.filter((product) =>
//         selectedFilters.subcategories.includes(product.Subcategory)
//       );
//     }
//     return products;
//   }, [data, selectedFilters]);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable onPress={openFilterModal} style={styles.filterIconContainer}>
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}
//       {renderFilterModal()}

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

// const styles = StyleSheet.create({
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   filterHeaderTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   categoryTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

/************************************************** */

// import React, { useState, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus, Filter, X, Check } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";

// // Color Palette
// const COLORS = {
//   primary: "#8B0000",
//   background: "#FFF9F7",
//   white: "#FFFFFF",
//   lightGray: "#F5F5F5",
//   darkText: "#333333",
//   accent: "#4A4A4A",
// };

// // Categories and Subcategories
// const CATEGORIES = [
//   "Poultry",
//   "Livestock",
//   "Pets",
//   "Aquatic",
//   "Birds",
//   "Utilities",
// ];

// const SUBCATEGORIES = {
//   Poultry: ["Turkeys", "Ostriches", "Chicken", "Pigeon", "Ducks"],
//   Livestock: ["Sheep", "Cows", "Horses"],
//   Pets: ["Dogs", "Cats", "Rabbit"],
//   Aquatic: ["Fish"],
//   Birds: ["Birds"],
//   Utilities: ["Tools", "Accessories"],
// };

// const { width, height } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = height * 0.4; // Increased product box height

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const handleCategorySelect = useCallback((category) => {
//     setActiveCategory((prev) => (prev === category ? null : category));
//     setSelectedFilters((prev) => ({
//       ...prev,
//       category: category,
//       subcategories: [], // Reset subcategories when changing category
//     }));
//   }, []);

//   const handleSubcategoryToggle = useCallback((subcategory) => {
//     setSelectedFilters((prev) => {
//       const currentSubcategories = prev.subcategories;
//       const isSelected = currentSubcategories.includes(subcategory);

//       return {
//         ...prev,
//         subcategories: isSelected
//           ? currentSubcategories.filter((sc) => sc !== subcategory)
//           : [...currentSubcategories, subcategory],
//       };
//     });
//   }, []);

//   const renderCategoryTabs = () => (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.categoryTabContainer}
//     >
//       {CATEGORIES.map((category) => (
//         <Pressable
//           key={category}
//           onPress={() => handleCategorySelect(category)}
//           style={[
//             styles.categoryTab,
//             activeCategory === category && styles.activeCategoryTab,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryTabText,
//               activeCategory === category && styles.activeCategoryTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </Pressable>
//       ))}
//     </ScrollView>
//   );

//   const openFilterModal = () => setIsFilterModalVisible(true);
//   const closeFilterModal = () => setIsFilterModalVisible(false);

//   const renderFilterModal = () => (
//     <Modal
//       transparent={true}
//       visible={isFilterModalVisible}
//       animationType="slide"
//     >
//       <View style={styles.modalOverlay}>
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Refine Filters</Text>
//             <Pressable onPress={closeFilterModal}>
//               <X size={24} color={COLORS.primary} />
//             </Pressable>
//           </View>

//           {activeCategory && (
//             <ScrollView>
//               <Text style={styles.subcategoryTitle}>
//                 {activeCategory} Subcategories
//               </Text>
//               {SUBCATEGORIES[activeCategory].map((subcategory) => (
//                 <Pressable
//                   key={subcategory}
//                   onPress={() => handleSubcategoryToggle(subcategory)}
//                   style={styles.subcategoryItem}
//                 >
//                   <Text style={styles.subcategoryText}>{subcategory}</Text>
//                   {selectedFilters.subcategories.includes(subcategory) && (
//                     <Check size={20} color={COLORS.primary} />
//                   )}
//                 </Pressable>
//               ))}
//             </ScrollView>
//           )}

//           <View style={styles.modalActions}>
//             <Pressable
//               style={styles.resetButton}
//               onPress={() =>
//                 setSelectedFilters({ category: null, subcategories: [] })
//               }
//             >
//               <Text style={styles.resetButtonText}>Reset All</Text>
//             </Pressable>
//             <Pressable style={styles.applyButton} onPress={closeFilterModal}>
//               <Text style={styles.applyButtonText}>Apply Filters</Text>
//             </Pressable>
//           </View>
//         </SafeAreaView>
//       </View>
//     </Modal>
//   );

//   const filteredProducts = useMemo(() => {
//     if (!data) return [];
//     let products = data.pages.flatMap((page) => page.data);
//     if (selectedFilters.category) {
//       products = products.filter(
//         (product) => product.Category === selectedFilters.category
//       );
//     }
//     if (selectedFilters.subcategories.length > 0) {
//       products = products.filter((product) =>
//         selectedFilters.subcategories.includes(product.Subcategory)
//       );
//     }
//     return products;
//   }, [data, selectedFilters]);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <View style={styles.filterHeader}>
//         <Text style={styles.filterHeaderTitle}>Browse Products</Text>
//         <Pressable onPress={openFilterModal} style={styles.filterIconContainer}>
//           <Filter size={24} color={COLORS.primary} />
//           {(selectedFilters.category ||
//             selectedFilters.subcategories.length > 0) && (
//             <View style={styles.filterBadge}>
//               <Text style={styles.filterBadgeText}>
//                 {selectedFilters.subcategories.length}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>

//       {renderCategoryTabs()}
//       {renderFilterModal()}

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{
//           padding: 8,
//           paddingTop: 0, // Remove extra padding above categories
//         }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: height * 0.4 }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

// const styles = StyleSheet.create({
//   filterHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8, // Reduced vertical padding
//   },
//   filterHeaderTitle: {
//     fontSize: 20, // Slightly reduced font size
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   filterIconContainer: {
//     position: "relative",
//   },
//   filterBadge: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     width: 18,
//     height: 18, // Smaller badge
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterBadgeText: {
//     color: COLORS.white,
//     fontSize: 8, // Smaller badge text
//     fontWeight: "bold",
//   },
//   categoryTabContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 4, // Reduced vertical padding
//     height: height * 0.07, // Cap category tabs to about 7% of screen height
//     maxHeight: 50, // Ensure it doesn't grow too large
//   },
//   categoryTab: {
//     paddingHorizontal: 12, // Reduced horizontal padding
//     paddingVertical: 6, // Reduced vertical padding
//     marginRight: 8,
//     borderRadius: 15,
//     backgroundColor: COLORS.lightGray,
//   },
//   activeCategoryTab: {
//     backgroundColor: COLORS.primary,
//   },
//   categoryTabText: {
//     color: COLORS.darkText,
//     fontWeight: "500",
//     fontSize: 12, // Reduced font size
//   },
//   activeCategoryTabText: {
//     color: COLORS.white,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContainer: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: "90%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.primary,
//   },
//   subcategoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.accent,
//     padding: 16,
//   },
//   subcategoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//   },
//   subcategoryText: {
//     fontSize: 16,
//     color: COLORS.darkText,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGray,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   resetButtonText: {
//     color: COLORS.primary,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   applyButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

/**********************************************/

// import React from "react";
// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   const flattenProducts = data?.pages.flatMap((page) => page.data) || [];

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <FlashList
//         data={isLoading ? Array(6).fill({}) : flattenProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

/********************************************** */

// import React, { useState, useMemo } from "react";
// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent"; // Adjust the import path as necessary

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });

//   const flattenProducts = data?.pages.flatMap((page) => page.data) || [];

//   const filteredProducts = useMemo(() => {
//     return flattenProducts.filter((product) => {
//       if (
//         selectedFilters.category &&
//         product.Category !== selectedFilters.category
//       ) {
//         return false;
//       }
//       if (
//         selectedFilters.subcategories.length > 0 &&
//         !selectedFilters.subcategories.includes(product.Subcategory)
//       ) {
//         return false;
//       }
//       return true;
//     });
//   }, [flattenProducts, selectedFilters]);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//       />

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

/********************************************************* */

// import React, { useState, useMemo } from "react";
// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent"; // Adjust the import path as necessary

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });

//   const flattenProducts = data?.pages.flatMap((page) => page.data) || [];

//   const filteredProducts = useMemo(() => {
//     return flattenProducts.filter((product) => {
//       if (
//         selectedFilters.category &&
//         product.Category !== selectedFilters.category
//       ) {
//         return false;
//       }
//       if (
//         selectedFilters.subcategories.length > 0 &&
//         !selectedFilters.subcategories.includes(product.Subcategory)
//       ) {
//         return false;
//       }
//       return true;
//     });
//   }, [flattenProducts, selectedFilters]);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1 });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//       />

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

/***************************************************/

// import React, { useState, useMemo } from "react";
// import { View, Text, Image, Dimensions, Pressable } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import { useInfiniteProducts, Product } from "../../../servicies/productsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent"; // Adjust the import path as necessary

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteProducts();

//   const [selectedFilters, setSelectedFilters] = useState({
//     category: null,
//     subcategories: [],
//   });

//   const flattenProducts = data?.pages.flatMap((page) => page.data) || [];

//   const filteredProducts = useMemo(() => {
//     return flattenProducts.filter((product) => {
//       if (
//         selectedFilters.category &&
//         product.Category !== selectedFilters.category
//       ) {
//         return false;
//       }
//       if (
//         selectedFilters.subcategories.length > 0 &&
//         !selectedFilters.subcategories.includes(product.Subcategory)
//       ) {
//         return false;
//       }
//       return true;
//     });
//   }, [flattenProducts, selectedFilters]);

//   const renderProduct = ({ item, index }: { item: Product; index: number }) => {
//     const isEven = index % 2 === 0;
//     const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

//     return (
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable>
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{
//               type: "spring",
//               delay: index * 50,
//             }}
//             className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//             style={{ height: BOX_HEIGHT }}
//           >
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//               style={{ height: "100%" }}
//             >
//               {imageUrl && (
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="w-full aspect-square rounded-t-2xl"
//                   resizeMode="cover"
//                 />
//               )}
//               <View className="p-3 flex-1 justify-between">
//                 <View>
//                   <Text
//                     numberOfLines={2}
//                     className="text-base font-semibold text-gray-900 mb-1"
//                   >
//                     {item.name}
//                   </Text>
//                   <Text className="text-xs text-gray-500 mb-2">
//                     {item.Category} • {item.Subcategory}
//                   </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-lg font-bold text-red-600">
//                     {item.price.toFixed(3)} KWD
//                   </Text>
//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       addToCart({ ...item, quantity: 1, imageUrl });
//                     }}
//                     className="bg-green-500 p-2 rounded-full"
//                   >
//                     <Plus size={16} color="white" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </MotiView>
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//       />

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => hasNextPage && fetchNextPage()}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//       />
//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = ({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// );

/**************************** */

// import React, { useState, useMemo, memo, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import {
//   useInfiniteProducts,
//   Product,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const addToCart = useCartStore((state) => state.addToCart);

//   // State for filters
//   const [selectedFilters, setSelectedFilters] = useState<{
//     category: string | null;
//     subcategories: string[];
//   }>({
//     category: null,
//     subcategories: [],
//   });

//   // Query for products with infinite loading
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteProducts();

//   // Memoized flattened and filtered products
//   const filteredProducts = useMemo(() => {
//     const flattenProducts = data?.pages.flatMap((page) => page.data) || [];

//     return flattenProducts.filter((product) => {
//       if (
//         selectedFilters.category &&
//         product.Category !== selectedFilters.category
//       ) {
//         return false;
//       }
//       if (
//         selectedFilters.subcategories.length > 0 &&
//         !selectedFilters.subcategories.includes(product.Subcategory)
//       ) {
//         return false;
//       }
//       return true;
//     });
//   }, [data?.pages, selectedFilters]);

//   // Handle add to cart with error handling
//   const handleAddToCart = useCallback(
//     (product: Product, imageUrl?: string) => {
//       try {
//         addToCart({ ...product, quantity: 1, imageUrl });
//         Alert.alert("Success", "Product added to cart");
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//         Alert.alert("Error", "Failed to add product to cart");
//       }
//     },
//     [addToCart]
//   );

//   // Render individual product item
//   const renderProduct = useCallback(
//     ({ item, index }: { item: Product; index: number }) => {
//       const isEven = index % 2 === 0;
//       const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;
//       const price = item.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Link
//           href={{
//             pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//             params: { documentId: item.documentId },
//           }}
//           asChild
//         >
//           <Pressable>
//             <MotiView
//               from={{ opacity: 0, translateY: 20 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{
//                 type: "spring",
//                 delay: index * 50,
//               }}
//               className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//               style={{ height: BOX_HEIGHT }}
//             >
//               <View
//                 className="bg-white rounded-2xl overflow-hidden shadow-sm"
//                 style={{ height: "100%" }}
//               >
//                 {imageUrl && (
//                   <Image
//                     source={{ uri: imageUrl }}
//                     className="w-full aspect-square rounded-t-2xl"
//                     resizeMode="cover"
//                   />
//                 )}
//                 <View className="p-3 flex-1 justify-between">
//                   <View>
//                     <Text
//                       numberOfLines={2}
//                       className="text-base font-semibold text-gray-900 mb-1"
//                     >
//                       {item.name}
//                     </Text>
//                     <Text className="text-xs text-gray-500 mb-2">
//                       {item.Category} • {item.Subcategory}
//                     </Text>
//                   </View>
//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-lg font-bold text-red-600">
//                       {price}
//                     </Text>
//                     <Pressable
//                       onPress={(e) => {
//                         e.stopPropagation();
//                         handleAddToCart(item, imageUrl);
//                       }}
//                       className="bg-green-500 p-2 rounded-full"
//                     >
//                       <Plus size={16} color="white" />
//                     </Pressable>
//                   </View>
//                 </View>
//               </View>
//             </MotiView>
//           </Pressable>
//         </Link>
//       );
//     },
//     [handleAddToCart]
//   );

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//       />

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : filteredProducts}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={2}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#EE4B2B" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = memo(({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// ));

// ProductSkeleton.displayName = "ProductSkeleton";

/******************************* */

// import React, { useState, useMemo, memo, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link, useRouter } from "expo-router";
// import { Plus } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import {
//   useInfiniteProducts,
//   Product,
//   FilterState,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import { useQueryClient } from "@tanstack/react-query";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 24) / 2;
// const BOX_HEIGHT = 300;

// export default function ProductsScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);

//   // State for filters
//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: null,
//     subcategories: [],
//   });

//   // Query for products with infinite loading and filters
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteProducts({
//     filters: selectedFilters,
//   });

//   // Handler for applying filters
//   const handleFiltersApply = useCallback(
//     async (newFilters: FilterState) => {
//       try {
//         // Reset pagination and invalidate existing queries
//         await queryClient.cancelQueries(["products"]);
//         await queryClient.resetQueries(["products"]);

//         // Update filters
//         setSelectedFilters(newFilters);

//         // Refetch with new filters
//         await refetch();
//       } catch (error) {
//         console.error("Error applying filters:", error);
//         Alert.alert("Error", "Failed to apply filters. Please try again.");
//       }
//     },
//     [queryClient, refetch]
//   );

//   // Memoized flattened products
//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data?.pages]);

//   // Handle add to cart with error handling
//   const handleAddToCart = useCallback(
//     (product: Product, imageUrl?: string) => {
//       try {
//         addToCart({ ...product, quantity: 1, imageUrl });
//         Alert.alert("Success", "Product added to cart");
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//         Alert.alert("Error", "Failed to add product to cart");
//       }
//     },
//     [addToCart]
//   );

//   // Render individual product item
//   const renderProduct = useCallback(
//     ({ item, index }: { item: Product; index: number }) => {
//       const isEven = index % 2 === 0;
//       const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;
//       const price = item.price
//         ? `${Number(item.price).toFixed(3)} KWD`
//         : "Price not available";

//       return (
//         <Link
//           href={{
//             pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//             params: { documentId: item.documentId },
//           }}
//           asChild
//         >
//           <Pressable>
//             <MotiView
//               from={{ opacity: 0, translateY: 20 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{
//                 type: "spring",
//                 delay: index * 50,
//               }}
//               className={`flex-1 mb-3 ${isEven ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//               style={{ height: BOX_HEIGHT }}
//             >
//               <View
//                 className="bg-white rounded-2xl overflow-hidden shadow-sm"
//                 style={{ height: "100%" }}
//               >
//                 {imageUrl && (
//                   <Image
//                     source={{ uri: imageUrl }}
//                     className="w-full aspect-square rounded-t-2xl"
//                     resizeMode="cover"
//                   />
//                 )}
//                 <View className="p-3 flex-1 justify-between">
//                   <View>
//                     <Text
//                       numberOfLines={2}
//                       className="text-base font-semibold text-gray-900 mb-1"
//                     >
//                       {item.name}
//                     </Text>
//                     <Text className="text-xs text-gray-500 mb-2">
//                       {item.Category} • {item.Subcategory}
//                     </Text>
//                   </View>
//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-lg font-bold text-red-600">
//                       {price}
//                     </Text>
//                     <Pressable
//                       onPress={(e) => {
//                         e.stopPropagation();
//                         handleAddToCart(item, imageUrl);
//                       }}
//                       className="bg-green-500 p-2 rounded-full"
//                     >
//                       <Plus size={16} color="white" />
//                     </Pressable>
//                   </View>
//                 </View>
//               </View>
//             </MotiView>
//           </Pressable>
//         </Link>
//       );
//     },
//     [handleAddToCart]
//   );

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(6).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             renderProduct({ item, index })
//           )
//         }
//         estimatedItemSize={300}
//         numColumns={3}
//         contentContainerStyle={{ padding: 8 }}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-base">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#EE4B2B" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const ProductSkeleton = memo(({ index }: { index: number }) => (
//   <MotiView
//     from={{ opacity: 0.3 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//     }}
//     className={`flex-1 mb-3 ${index % 2 === 0 ? "ml-2 mr-1" : "ml-1 mr-2"}`}
//     style={{ height: BOX_HEIGHT }}
//   >
//     <View
//       className="bg-white rounded-2xl overflow-hidden shadow-sm"
//       style={{ height: "100%" }}
//     >
//       <View className="w-full aspect-square bg-gray-200" />
//       <View className="p-3 flex-1 justify-between">
//         <View>
//           <View className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
//           <View className="h-3 bg-gray-200 rounded-full w-1/2 mb-2" />
//         </View>
//         <View className="h-5 bg-gray-200 rounded-full w-1/3" />
//       </View>
//     </View>
//   </MotiView>
// ));

// ProductSkeleton.displayName = "ProductSkeleton";

/******************************** */

// import React, { useState, useMemo, memo, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   Alert,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link, useRouter } from "expo-router";
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import {
//   useInfiniteProducts,
//   Product,
//   FilterState,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import { useQueryClient } from "@tanstack/react-query";
// import Toast from "react-native-toast-message";

// const CartInteraction = memo(({ product, onAddToCart }) => {
//   const { items, updateQuantity, removeFromCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleQuantityChange = useCallback(
//     (newQuantity: number) => {
//       if (newQuantity === 0) {
//         removeFromCart(product.documentId);
//         Toast.show({
//           type: "info",
//           text1: "Item removed from cart",
//           position: "top",
//         });
//       } else {
//         updateQuantity(product.documentId, newQuantity);
//         Toast.show({
//           type: "success",
//           text1: "Cart updated",
//           position: "top",
//         });
//       }
//     },
//     [product.documentId, removeFromCart, updateQuantity]
//   );

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={onAddToCart}
//         className="bg-green-500 p-1.5 rounded-full"
//         hitSlop={8}
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => handleQuantityChange(cartItem.quantity - 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleQuantityChange(cartItem.quantity + 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// });

// const ProductCard = memo(
//   ({ item, index }: { item: Product; index: number }) => {
//     const { width } = useWindowDimensions();
//     const ITEM_WIDTH = (width - 48) / 3; // 48 = padding (16 * 2) + gaps (8 * 2)
//     const router = useRouter();
//     const addToCart = useCartStore((state) => state.addToCart);
//     const [imageError, setImageError] = useState(false);

//     const handleAddToCart = useCallback(
//       (e) => {
//         e.stopPropagation();
//         const imageUrl =
//           item.primaryImage?.[0]?.formats?.large?.url ||
//           item.primaryImage?.[0]?.formats?.medium?.url ||
//           item.primaryImage?.[0]?.formats?.small?.url;
//         addToCart({ ...item, quantity: 1, imageUrl });
//         Toast.show({
//           type: "success",
//           text1: "Added to cart",
//           position: "top",
//         });
//       },
//       [item, addToCart]
//     );

//     const handleProductPress = useCallback(() => {
//       router.push({
//         pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//         params: { documentId: item.documentId },
//       });
//     }, [item.documentId, router]);

//     const imageUrl =
//       item.primaryImage?.[0]?.formats?.large?.url ||
//       item.primaryImage?.[0]?.formats?.medium?.url ||
//       item.primaryImage?.[0]?.formats?.small?.url;

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 50, type: "timing", duration: 300 }}
//         style={{ width: ITEM_WIDTH }}
//         className="mb-3 mx-1"
//       >
//         <Pressable
//           onPress={handleProductPress}
//           className="bg-white rounded-xl shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-xl bg-gray-50"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//             />
//             <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
//               <Text className="text-white font-medium text-[10px]">
//                 {item.price.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>

//           <View className="p-2">
//             <Text
//               numberOfLines={1}
//               className="text-xs font-semibold text-gray-900 mb-0.5"
//             >
//               {item.name}
//             </Text>
//             <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} onAddToCart={handleAddToCart} />
//           </View>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const ProductSkeleton = memo(({ index }: { index: number }) => {
//   const { width } = useWindowDimensions();
//   const ITEM_WIDTH = (width - 48) / 3;

//   return (
//     <MotiView
//       from={{ opacity: 0.5 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       style={{ width: ITEM_WIDTH }}
//       className="mb-3 mx-1"
//     >
//       <View className="bg-white rounded-xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-100" />
//         <View className="p-2">
//           <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
//           <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
//           <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
//         </View>
//       </View>
//     </MotiView>
//   );
// });

// const ProductsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const queryClient = useQueryClient();
//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: null,
//     subcategories: [],
//   });

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteProducts({
//     filters: selectedFilters,
//   });

//   const handleFiltersApply = useCallback(
//     async (newFilters: FilterState) => {
//       try {
//         await queryClient.cancelQueries(["products"]);
//         await queryClient.resetQueries(["products"]);
//         setSelectedFilters(newFilters);
//         await refetch();
//       } catch (error) {
//         console.error("Error applying filters:", error);
//         Toast.show({
//           type: "error",
//           text1: "Failed to apply filters",
//           position: "top",
//         });
//       }
//     },
//     [queryClient, refetch]
//   );

//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data?.pages]);

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(9).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             <ProductCard item={item} index={index} />
//           )
//         }
//         estimatedItemSize={200}
//         numColumns={3}
//         contentContainerStyle={{ padding: 16 }}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-sm">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#8B0000" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center text-sm">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// CartInteraction.displayName = "CartInteraction";
// ProductCard.displayName = "ProductCard";
// ProductSkeleton.displayName = "ProductSkeleton";

// export default ProductsScreen;

/********************************* */

// import React, { useState, useMemo, memo, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { Link, useRouter } from "expo-router";
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import {
//   useInfiniteProducts,
//   Product,
//   FilterState,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import { useQueryClient } from "@tanstack/react-query";
// import Toast from "react-native-toast-message";

// const showCartToast = (type: "success" | "error" | "info", message: string) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 2000,
//     topOffset: 60,
//   });
// };

// const CartInteraction = memo(({ product }: { product: Product }) => {
//   const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleAdd = useCallback(() => {
//     const imageUrl =
//       product.primaryImage?.[0]?.formats?.large?.url ||
//       product.primaryImage?.[0]?.formats?.medium?.url ||
//       product.primaryImage?.[0]?.formats?.small?.url;
//     addToCart({ ...product, quantity: 1, imageUrl });
//     showCartToast("success", `${product.name} added to cart`);
//   }, [product, addToCart]);

//   const handleRemove = useCallback(() => {
//     removeFromCart(product.documentId);
//     showCartToast("info", `${product.name} removed from cart`);
//   }, [product, removeFromCart]);

//   const handleUpdate = useCallback(
//     (newQuantity: number) => {
//       if (newQuantity < 1) {
//         handleRemove();
//         return;
//       }
//       updateQuantity(product.documentId, newQuantity);
//       showCartToast("success", "Cart updated");
//     },
//     [product.documentId, updateQuantity, handleRemove]
//   );

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={handleAdd}
//         className="bg-green-500 p-1.5 rounded-full"
//         hitSlop={8}
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity - 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity + 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// });

// const ProductCard = memo(
//   ({ item, index }: { item: Product; index: number }) => {
//     const { width } = useWindowDimensions();
//     const ITEM_WIDTH = (width - 48) / 3;
//     const router = useRouter();
//     const [imageError, setImageError] = useState(false);

//     const handleProductPress = useCallback(() => {
//       router.push({
//         pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//         params: { documentId: item.documentId },
//       });
//     }, [item.documentId, router]);

//     const imageUrl =
//       item.primaryImage?.[0]?.formats?.large?.url ||
//       item.primaryImage?.[0]?.formats?.medium?.url ||
//       item.primaryImage?.[0]?.formats?.small?.url;

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 50, type: "timing", duration: 300 }}
//         style={{ width: ITEM_WIDTH }}
//         className="mb-3 mx-1"
//       >
//         <Pressable
//           onPress={handleProductPress}
//           className="bg-white rounded-xl shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-xl bg-gray-50"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//             />
//             <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
//               <Text className="text-white font-medium text-[10px]">
//                 {item.price.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>

//           <View className="p-2">
//             <Text
//               numberOfLines={1}
//               className="text-xs font-semibold text-gray-900 mb-0.5"
//             >
//               {item.name}
//             </Text>
//             <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} />
//           </View>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const ProductSkeleton = memo(({ index }: { index: number }) => {
//   const { width } = useWindowDimensions();
//   const ITEM_WIDTH = (width - 48) / 3;

//   return (
//     <MotiView
//       from={{ opacity: 0.5 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       style={{ width: ITEM_WIDTH }}
//       className="mb-3 mx-1"
//     >
//       <View className="bg-white rounded-xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-100" />
//         <View className="p-2">
//           <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
//           <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
//           <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
//         </View>
//       </View>
//     </MotiView>
//   );
// });

// const ProductsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const queryClient = useQueryClient();
//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: null,
//     subcategories: [],
//   });

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteProducts({
//     filters: selectedFilters,
//   });

//   const handleFiltersApply = useCallback(
//     async (newFilters: FilterState) => {
//       try {
//         await queryClient.cancelQueries(["products"]);
//         await queryClient.resetQueries(["products"]);
//         setSelectedFilters(newFilters);
//         await refetch();
//       } catch (error) {
//         showCartToast("error", "Failed to apply filters");
//       }
//     },
//     [queryClient, refetch]
//   );

//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data?.pages]);

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(9).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             <ProductCard item={item} index={index} />
//           )
//         }
//         estimatedItemSize={200}
//         numColumns={3}
//         contentContainerStyle={{ padding: 16 }}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-sm">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#8B0000" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center text-sm">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// CartInteraction.displayName = "CartInteraction";
// ProductCard.displayName = "ProductCard";
// ProductSkeleton.displayName = "ProductSkeleton";

// export default ProductsScreen;

/***************************** */

// import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import useCartStore from "../../../../store/cartStore";
// import {
//   useInfiniteProducts,
//   Product,
//   FilterState,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import { useQueryClient } from "@tanstack/react-query";
// import Toast from "react-native-toast-message";

// const showToast = (type: "success" | "error" | "info", message: string) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 2000,
//     topOffset: 60,
//   });
// };

// const CartInteraction = memo(({ product }: { product: Product }) => {
//   const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleAdd = useCallback(() => {
//     const imageUrl =
//       product.primaryImage?.[0]?.formats?.large?.url ||
//       product.primaryImage?.[0]?.formats?.medium?.url ||
//       product.primaryImage?.[0]?.formats?.small?.url;
//     addToCart({ ...product, quantity: 1, imageUrl });
//     showToast("success", `${product.name} added to cart`);
//   }, [product, addToCart]);

//   const handleRemove = useCallback(() => {
//     removeFromCart(product.documentId);
//     showToast("info", `${product.name} removed from cart`);
//   }, [product, removeFromCart]);

//   const handleUpdate = useCallback(
//     (newQuantity: number) => {
//       if (newQuantity < 1) {
//         handleRemove();
//         return;
//       }
//       updateQuantity(product.documentId, newQuantity);
//       showToast("success", "Cart updated");
//     },
//     [product.documentId, updateQuantity, handleRemove]
//   );

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={handleAdd}
//         className="bg-green-500 p-1.5 rounded-full"
//         hitSlop={8}
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity - 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity + 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// });

// const ProductCard = memo(
//   ({ item, index }: { item: Product; index: number }) => {
//     const { width } = useWindowDimensions();
//     const ITEM_WIDTH = (width - 48) / 3;
//     const router = useRouter();
//     const [imageError, setImageError] = useState(false);

//     const handleProductPress = useCallback(() => {
//       router.push({
//         pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//         params: { documentId: item.documentId },
//       });
//     }, [item.documentId, router]);

//     const imageUrl =
//       item.primaryImage?.[0]?.formats?.large?.url ||
//       item.primaryImage?.[0]?.formats?.medium?.url ||
//       item.primaryImage?.[0]?.formats?.small?.url;

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 50, type: "timing", duration: 300 }}
//         style={{ width: ITEM_WIDTH }}
//         className="mb-3 mx-1"
//       >
//         <Pressable
//           onPress={handleProductPress}
//           className="bg-white rounded-xl shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-xl bg-gray-50"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//             />
//             <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
//               <Text className="text-white font-medium text-[10px]">
//                 {item.price.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>

//           <View className="p-2">
//             <Text
//               numberOfLines={1}
//               className="text-xs font-semibold text-gray-900 mb-0.5"
//             >
//               {item.name}
//             </Text>
//             <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} />
//           </View>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const ProductSkeleton = memo(({ index }: { index: number }) => {
//   const { width } = useWindowDimensions();
//   const ITEM_WIDTH = (width - 48) / 3;

//   return (
//     <MotiView
//       from={{ opacity: 0.5 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: "timing",
//         duration: 1000,
//         loop: true,
//       }}
//       style={{ width: ITEM_WIDTH }}
//       className="mb-3 mx-1"
//     >
//       <View className="bg-white rounded-xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-100" />
//         <View className="p-2">
//           <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
//           <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
//           <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
//         </View>
//       </View>
//     </MotiView>
//   );
// });

// const ProductsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const queryClient = useQueryClient();
//   const params = useLocalSearchParams();
//   const router = useRouter();

//   const [selectedFilters, setSelectedFilters] = useState<FilterState>(() => {
//     if (params.filterState) {
//       try {
//         return JSON.parse(params.filterState as string);
//       } catch {
//         return {
//           category: (params.category as string) || null,
//           subcategories: [],
//         };
//       }
//     }
//     return {
//       category: (params.category as string) || null,
//       subcategories: [],
//     };
//   });

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteProducts({
//     filters: selectedFilters,
//   });

//   useEffect(() => {
//     if (params.category && params.category !== selectedFilters.category) {
//       handleFiltersApply({
//         category: params.category as string,
//         subcategories: [],
//       });
//     }
//   }, [params.category]);

//   const handleFiltersApply = useCallback(
//     async (newFilters: FilterState) => {
//       try {
//         await queryClient.cancelQueries(["products"]);
//         await queryClient.resetQueries(["products"]);
//         setSelectedFilters(newFilters);

//         router.setParams({
//           category: newFilters.category || "",
//           filterState: JSON.stringify(newFilters),
//         });

//         await refetch();
//       } catch (error) {
//         showToast("error", "Failed to apply filters");
//       }
//     },
//     [queryClient, refetch, router]
//   );

//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data?.pages]);

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(9).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             <ProductCard item={item} index={index} />
//           )
//         }
//         estimatedItemSize={200}
//         numColumns={3}
//         contentContainerStyle={{ padding: 16 }}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-sm">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#8B0000" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center text-sm">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// CartInteraction.displayName = "CartInteraction";
// ProductCard.displayName = "ProductCard";
// ProductSkeleton.displayName = "ProductSkeleton";

// export default ProductsScreen;

/******************************** */

// import React, { useState, useMemo, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import useCartStore from "../../../../store/cartStore";
// import {
//   Product,
//   FilterState,
//   fetchProducts,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import Toast from "react-native-toast-message";

// const showToast = (type: "success" | "error" | "info", message: string) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 2000,
//     topOffset: 60,
//   });
// };

// const CartInteraction = React.memo(({ product }: { product: Product }) => {
//   const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleAdd = useCallback(() => {
//     const imageUrl = product.primaryImage?.[0]?.formats?.large?.url || "";
//     addToCart({ ...product, quantity: 1, imageUrl });
//     showToast("success", `${product.name} added to cart`);
//   }, [product, addToCart]);

//   const handleRemove = useCallback(() => {
//     removeFromCart(product.documentId);
//     showToast("info", `${product.name} removed from cart`);
//   }, [product, removeFromCart]);

//   const handleUpdate = useCallback(
//     (newQuantity: number) => {
//       if (newQuantity < 1) {
//         handleRemove();
//         return;
//       }
//       updateQuantity(product.documentId, newQuantity);
//       showToast("success", "Cart updated");
//     },
//     [product.documentId, updateQuantity, handleRemove]
//   );

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={handleAdd}
//         className="bg-green-500 p-1.5 rounded-full"
//         hitSlop={8}
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity - 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity + 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// });

// const ProductCard = React.memo(
//   ({ item, index }: { item: Product; index: number }) => {
//     const { width } = useWindowDimensions();
//     const ITEM_WIDTH = (width - 48) / 3;
//     const router = useRouter();
//     const [imageError, setImageError] = useState(false);

//     const handleProductPress = useCallback(() => {
//       router.push({
//         pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//         params: { documentId: item.documentId, category: item.Category },
//       });
//     }, [item.documentId, item.Category, router]);

//     const imageUrl =
//       item.primaryImage?.[0]?.formats?.large?.url ||
//       item.primaryImage?.[0]?.formats?.medium?.url ||
//       item.primaryImage?.[0]?.formats?.small?.url;

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 50, type: "timing", duration: 300 }}
//         style={{ width: ITEM_WIDTH }}
//         className="mb-3 mx-1"
//       >
//         <Pressable
//           onPress={handleProductPress}
//           className="bg-white rounded-xl shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-xl bg-gray-50"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//             />
//             <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
//               <Text className="text-white font-medium text-[10px]">
//                 {item.price?.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>
//           <View className="p-2">
//             <Text
//               numberOfLines={1}
//               className="text-xs font-semibold text-gray-900 mb-0.5"
//             >
//               {item.name}
//             </Text>
//             <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} />
//           </View>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const ProductSkeleton = React.memo(({ index }: { index: number }) => {
//   const { width } = useWindowDimensions();
//   const ITEM_WIDTH = (width - 48) / 3;

//   return (
//     <MotiView
//       from={{ opacity: 0.5 }}
//       animate={{ opacity: 1 }}
//       transition={{ type: "timing", duration: 1000, loop: true }}
//       style={{ width: ITEM_WIDTH }}
//       className="mb-3 mx-1"
//     >
//       <View className="bg-white rounded-xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-100" />
//         <View className="p-2">
//           <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
//           <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
//           <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
//         </View>
//       </View>
//     </MotiView>
//   );
// });

// const ProductsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const params = useLocalSearchParams();
//   const router = useRouter();

//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: (params.category as string) || null,
//     subcategories: [],
//   });

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["products", selectedFilters],
//     queryFn: ({ pageParam = 1 }) => fetchProducts(selectedFilters, pageParam),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   useEffect(() => {
//     if (params.category && params.category !== selectedFilters.category) {
//       setSelectedFilters({
//         category: params.category as string,
//         subcategories: [],
//       });
//     }
//   }, [params.category]);

//   const handleFiltersApply = useCallback(
//     (newFilters: FilterState) => {
//       setSelectedFilters(newFilters);

//       // Clear the category parameter when filters are reset
//       if (newFilters.category === null) {
//         router.setParams({
//           category: undefined,
//         });
//       } else {
//         router.setParams({
//           category: newFilters.category,
//         });
//       }

//       // Force refetch to ensure products are updated
//       refetch();
//     },
//     [router, refetch]
//   );
//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data]);

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(9).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             <ProductCard item={item} index={index} />
//           )
//         }
//         estimatedItemSize={200}
//         numColumns={3}
//         contentContainerStyle={{ padding: 16 }}
//         onEndReached={() =>
//           hasNextPage && !isFetchingNextPage && fetchNextPage()
//         }
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-sm">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#8B0000" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center text-sm">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ProductsScreen;

/**************************** */

// import React, { useState, useMemo, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { MotiView } from "moti";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Plus, Minus, Trash2 } from "lucide-react-native";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import useCartStore from "../../../../store/cartStore";
// import {
//   Product,
//   FilterState,
//   fetchProducts,
// } from "../../../servicies/NewProductsApi";
// import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
// import Toast from "react-native-toast-message";

// const showToast = (type: "success" | "error" | "info", message: string) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 2000,
//     topOffset: 60,
//   });
// };

// const CartInteraction = React.memo(({ product }: { product: Product }) => {
//   const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
//   const cartItem = items.find((item) => item.documentId === product.documentId);

//   const handleAdd = useCallback(() => {
//     const imageUrl = product.primaryImage?.[0]?.formats?.large?.url || "";
//     addToCart({ ...product, quantity: 1, imageUrl });
//     showToast("success", `${product.name} added to cart`);
//   }, [product, addToCart]);

//   const handleRemove = useCallback(() => {
//     removeFromCart(product.documentId);
//     showToast("info", `${product.name} removed from cart`);
//   }, [product, removeFromCart]);

//   const handleUpdate = useCallback(
//     (newQuantity: number) => {
//       if (newQuantity < 1) {
//         handleRemove();
//         return;
//       }
//       updateQuantity(product.documentId, newQuantity);
//       showToast("success", "Cart updated");
//     },
//     [product.documentId, updateQuantity, handleRemove]
//   );

//   if (!cartItem) {
//     return (
//       <Pressable
//         onPress={handleAdd}
//         className="bg-green-500 p-1.5 rounded-full"
//         hitSlop={8}
//       >
//         <Plus size={14} color="white" />
//       </Pressable>
//     );
//   }

//   return (
//     <View className="flex-row items-center bg-gray-100 rounded-full">
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity - 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         {cartItem.quantity === 1 ? (
//           <Trash2 size={14} color="#EF4444" />
//         ) : (
//           <Minus size={14} color="#EF4444" />
//         )}
//       </Pressable>
//       <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
//         {cartItem.quantity}
//       </Text>
//       <Pressable
//         onPress={() => handleUpdate(cartItem.quantity + 1)}
//         className="p-1"
//         hitSlop={8}
//       >
//         <Plus size={14} color="#EF4444" />
//       </Pressable>
//     </View>
//   );
// });

// const ProductCard = React.memo(
//   ({ item, index }: { item: Product; index: number }) => {
//     const { width } = useWindowDimensions();
//     const ITEM_WIDTH = (width - 48) / 3;
//     const router = useRouter();
//     const [imageError, setImageError] = useState(false);

//     const handleProductPress = useCallback(() => {
//       router.push({
//         pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//         params: { documentId: item.documentId, category: item.Category },
//       });
//     }, [item.documentId, item.Category, router]);

//     const imageUrl =
//       item.primaryImage?.[0]?.formats?.large?.url ||
//       item.primaryImage?.[0]?.formats?.medium?.url ||
//       item.primaryImage?.[0]?.formats?.small?.url;

//     return (
//       <MotiView
//         from={{ opacity: 0, translateY: 20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ delay: index * 50, type: "timing", duration: 300 }}
//         style={{ width: ITEM_WIDTH }}
//         className="mb-3 mx-1"
//       >
//         <Pressable
//           onPress={handleProductPress}
//           className="bg-white rounded-xl shadow-sm overflow-hidden"
//         >
//           <View className="relative">
//             <Image
//               source={
//                 imageUrl && !imageError
//                   ? { uri: imageUrl }
//                   : require("../../../../assets/product-placeholder.png")
//               }
//               className="w-full aspect-square rounded-t-xl bg-gray-50"
//               resizeMode="cover"
//               onError={() => setImageError(true)}
//             />
//             <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
//               <Text className="text-white font-medium text-[10px]">
//                 {item.price?.toFixed(3)} KWD
//               </Text>
//             </View>
//           </View>
//           <View className="p-2">
//             <Text
//               numberOfLines={1}
//               className="text-xs font-semibold text-gray-900 mb-0.5"
//             >
//               {item.name}
//             </Text>
//             <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
//               {item.Category}
//             </Text>
//             <CartInteraction product={item} />
//           </View>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const ProductSkeleton = React.memo(({ index }: { index: number }) => {
//   const { width } = useWindowDimensions();
//   const ITEM_WIDTH = (width - 48) / 3;

//   return (
//     <MotiView
//       from={{ opacity: 0.5 }}
//       animate={{ opacity: 1 }}
//       transition={{ type: "timing", duration: 1000, loop: true }}
//       style={{ width: ITEM_WIDTH }}
//       className="mb-3 mx-1"
//     >
//       <View className="bg-white rounded-xl overflow-hidden">
//         <View className="w-full aspect-square bg-gray-100" />
//         <View className="p-2">
//           <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
//           <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
//           <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
//         </View>
//       </View>
//     </MotiView>
//   );
// });

// const ProductsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const params = useLocalSearchParams();
//   const router = useRouter();

//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: params.category ? String(params.category) : null,
//     subcategories: [],
//   });
//   const [isApplyingFilters, setIsApplyingFilters] = useState(false);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["products", selectedFilters],
//     queryFn: ({ pageParam = 1 }) => fetchProducts(selectedFilters, pageParam),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   // Sync filters with params only on mount or external param change
//   useEffect(() => {
//     const initialCategory = params.category ? String(params.category) : null;
//     if (
//       initialCategory &&
//       initialCategory !== selectedFilters.category &&
//       !isApplyingFilters
//     ) {
//       setSelectedFilters({
//         category: initialCategory,
//         subcategories: [],
//       });
//     }
//   }, [params.category]);

//   const handleFiltersApply = useCallback(
//     (newFilters: FilterState) => {
//       setIsApplyingFilters(true);
//       setSelectedFilters(newFilters);

//       // Update router params synchronously with filter application
//       if (newFilters.category === null) {
//         router.setParams({ category: undefined });
//       } else {
//         router.setParams({ category: newFilters.category });
//       }

//       refetch();
//       setIsApplyingFilters(false);
//     },
//     [router, refetch]
//   );

//   const products = useMemo(() => {
//     return data?.pages.flatMap((page) => page.data) || [];
//   }, [data]);

//   return (
//     <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
//       <EnhancedFilterComponent
//         selectedFilters={selectedFilters}
//         setSelectedFilters={setSelectedFilters}
//         onFiltersApply={handleFiltersApply}
//         isLoading={isLoading || isFetchingNextPage}
//       />

//       <FlashList
//         data={isLoading ? Array(9).fill({}) : products}
//         renderItem={({ item, index }) =>
//           isLoading ? (
//             <ProductSkeleton index={index} />
//           ) : (
//             <ProductCard item={item} index={index} />
//           )
//         }
//         estimatedItemSize={200}
//         numColumns={3}
//         contentContainerStyle={{ padding: 16 }}
//         onEndReached={() =>
//           hasNextPage && !isFetchingNextPage && fetchNextPage()
//         }
//         onEndReachedThreshold={0.5}
//         onRefresh={refetch}
//         refreshing={isLoading}
//         ListEmptyComponent={
//           !isLoading && (
//             <View className="p-5 items-center">
//               <Text className="text-gray-500 text-sm">No products found</Text>
//             </View>
//           )
//         }
//         ListFooterComponent={
//           isFetchingNextPage ? (
//             <View className="py-4">
//               <ActivityIndicator size="small" color="#8B0000" />
//             </View>
//           ) : null
//         }
//       />

//       {isError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
//           <Text className="text-white text-center text-sm">
//             {error instanceof Error ? error.message : "Failed to load products"}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ProductsScreen;

/******************************** */

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Plus, Minus, Trash2 } from "lucide-react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import useCartStore from "../../../../store/cartStore";
import {
  Product,
  FilterState,
  fetchProducts,
} from "../../../servicies/NewProductsApi";
import EnhancedFilterComponent from "../../../Utils/EnhancedFilterComponent";
import Toast from "react-native-toast-message";

const showToast = (type, message) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 2000,
    topOffset: 60,
  });
};

const CartInteraction = React.memo(({ product }) => {
  const { items, updateQuantity, removeFromCart, addToCart } = useCartStore();
  const cartItem = items.find((item) => item.documentId === product.documentId);

  const handleAdd = useCallback(() => {
    const imageUrl = product.primaryImage?.[0]?.formats?.large?.url || "";
    addToCart({ ...product, quantity: 1, imageUrl });
    showToast("success", `${product.name} added to cart`);
  }, [product, addToCart]);

  const handleRemove = useCallback(() => {
    removeFromCart(product.documentId);
    showToast("info", `${product.name} removed from cart`);
  }, [product, removeFromCart]);

  const handleUpdate = useCallback(
    (newQuantity) => {
      if (newQuantity < 1) {
        handleRemove();
        return;
      }
      updateQuantity(product.documentId, newQuantity);
      showToast("success", "Cart updated");
    },
    [product.documentId, updateQuantity, handleRemove]
  );

  if (!cartItem) {
    return (
      <Pressable
        onPress={handleAdd}
        className="bg-green-500 p-1.5 rounded-full"
        hitSlop={8}
      >
        <Plus size={14} color="white" />
      </Pressable>
    );
  }

  return (
    <View className="flex-row items-center bg-gray-100 rounded-full">
      <Pressable
        onPress={() => handleUpdate(cartItem.quantity - 1)}
        className="p-1"
        hitSlop={8}
      >
        {cartItem.quantity === 1 ? (
          <Trash2 size={14} color="#EF4444" />
        ) : (
          <Minus size={14} color="#EF4444" />
        )}
      </Pressable>
      <Text className="px-2 font-semibold min-w-[20px] text-center text-xs">
        {cartItem.quantity}
      </Text>
      <Pressable
        onPress={() => handleUpdate(cartItem.quantity + 1)}
        className="p-1"
        hitSlop={8}
      >
        <Plus size={14} color="#EF4444" />
      </Pressable>
    </View>
  );
});

const ProductCard = React.memo(({ item, index }) => {
  const { width } = useWindowDimensions();
  const ITEM_WIDTH = (width - 48) / 3;
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleProductPress = useCallback(() => {
    router.push({
      pathname: "/(root)/(tabs)/(store)/store/[documentId]",
      params: { documentId: item.documentId, category: item.Category },
    });
  }, [item.documentId, item.Category, router]);

  const imageUrl =
    item.primaryImage?.[0]?.formats?.large?.url ||
    item.primaryImage?.[0]?.formats?.medium?.url ||
    item.primaryImage?.[0]?.formats?.small?.url;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 50, type: "timing", duration: 300 }}
      style={{ width: ITEM_WIDTH }}
      className="mb-3 mx-1"
    >
      <Pressable
        onPress={handleProductPress}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        {/* <View className="w-full aspect-square rounded-t-xl overflow-hidden relative">
          <Image
            source={
              imageUrl && !imageError
                ? { uri: imageUrl }
                : require("../../../../assets/product-placeholder.png")
            }
            className="w-full h-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
          <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
            <Text className="text-white font-medium text-[10px]">
              {item.price?.toFixed(3)} KWD
            </Text>
          </View>
        </View> */}

        <View className="w-full aspect-square rounded-t-xl overflow-hidden relative">
          {/* Always show the placeholder */}
          <Image
            source={require("../../../../assets/product-placeholder.png")}
            className="w-full h-full absolute"
            resizeMode="cover"
          />
          {/* Render the remote image only if available and error-free */}
          {imageUrl && !imageError && (
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          )}
          <View className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/70">
            <Text className="text-white font-medium text-[10px]">
              {item.price?.toFixed(3)} KWD
            </Text>
          </View>
        </View>

        <View className="p-2">
          <Text
            numberOfLines={1}
            className="text-xs font-semibold text-gray-900 mb-0.5"
          >
            {item.name}
          </Text>
          <Text numberOfLines={1} className="text-[10px] text-gray-500 mb-1">
            {item.Category}
          </Text>
          <CartInteraction product={item} />
        </View>
      </Pressable>
    </MotiView>
  );
});

const ProductSkeleton = React.memo(({ index }) => {
  const { width } = useWindowDimensions();
  const ITEM_WIDTH = (width - 48) / 3;

  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 1000, loop: true }}
      style={{ width: ITEM_WIDTH }}
      className="mb-3 mx-1"
    >
      <View className="bg-white rounded-xl overflow-hidden">
        <View className="w-full aspect-square bg-gray-100 rounded-t-xl" />
        <View className="p-2">
          <View className="h-2 bg-gray-100 rounded-full w-3/4 mb-1" />
          <View className="h-2 bg-gray-100 rounded-full w-1/2 mb-1" />
          <View className="h-4 bg-gray-100 rounded-full w-8 mt-1" />
        </View>
      </View>
    </MotiView>
  );
});

const ProductsScreen = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState({
    category: params.category ? String(params.category) : null,
    subcategories: [],
  });
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", selectedFilters],
    queryFn: ({ pageParam = 1 }) => fetchProducts(selectedFilters, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const initialCategory = params.category ? String(params.category) : null;
    if (
      initialCategory &&
      initialCategory !== selectedFilters.category &&
      !isApplyingFilters
    ) {
      setSelectedFilters({
        category: initialCategory,
        subcategories: [],
      });
    }
  }, [params.category]);

  const handleFiltersApply = useCallback(
    (newFilters) => {
      setIsApplyingFilters(true);
      setSelectedFilters(newFilters);

      if (newFilters.category === null) {
        router.setParams({ category: undefined });
      } else {
        router.setParams({ category: newFilters.category });
      }

      refetch();
      setIsApplyingFilters(false);
    },
    [router, refetch]
  );

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <EnhancedFilterComponent
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onFiltersApply={handleFiltersApply}
        isLoading={isLoading || isFetchingNextPage}
      />
      <FlashList
        data={isLoading ? Array(9).fill({}) : products}
        renderItem={({ item, index }) =>
          isLoading ? (
            <ProductSkeleton index={index} />
          ) : (
            <ProductCard item={item} index={index} />
          )
        }
        estimatedItemSize={200}
        numColumns={3}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onEndReachedThreshold={0.5}
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={
          !isLoading && (
            <View className="p-5 items-center">
              <Text className="text-gray-500 text-sm">No products found</Text>
            </View>
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#50C878" />
            </View>
          ) : null
        }
      />
      {isError && (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-500">
          <Text className="text-white text-center text-sm">
            {error instanceof Error ? error.message : "Failed to load products"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductsScreen;
