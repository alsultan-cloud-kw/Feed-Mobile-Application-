// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { MotiView } from "@motify/components";

// interface Product {
//   id: number;
//   Title: string;
//   Author: string;
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

// export default function ProductsGrid() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchProducts = async (pageNumber = 1) => {
//     setLoading(true);
//     try {
//       const response = await axios.get<ProductResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=8`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );
//       const newProducts = response.data.data;
//       const totalPages = response.data.meta.pagination.pageCount;

//       setProducts((prev) =>
//         pageNumber === 1 ? newProducts : [...prev, ...newProducts]
//       );
//       setHasMore(pageNumber < totalPages);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(page);
//   }, [page]);

//   const loadMore = () => {
//     if (hasMore && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const renderItem = ({ item, index }: { item: Product; index: number }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ type: "timing", duration: 500, delay: index * 100 }}
//       style={styles.card}
//     >
//       <TouchableOpacity style={styles.cardContent}>
//         {item.FeaturedImage?.formats?.medium?.url && (
//           <Image
//             source={{ uri: item.FeaturedImage.formats.medium.url }}
//             style={styles.image}
//           />
//         )}
//         <Text style={styles.title} numberOfLines={2}>
//           {item.Title}
//         </Text>
//         <Text style={styles.category}>{item.Category}</Text>
//       </TouchableOpacity>
//     </MotiView>
//   );

//   if (loading && page === 1) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#333" />
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

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//         columnWrapperStyle={styles.row}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={
//           loading ? <ActivityIndicator size="small" color="#333" /> : null
//         }
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//     padding: 16,
//   },
//   listContainer: {
//     paddingBottom: 16,
//   },
//   row: {
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   card: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   cardContent: {
//     alignItems: "center",
//     padding: 12,
//   },
//   image: {
//     width: "100%",
//     height: 120,
//     resizeMode: "cover",
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },
//   category: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 4,
//   },
//   loaderContainer: {
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
//     color: "red",
//     textAlign: "center",
//   },
// });

/******************************** */

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

// app/products.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti"; // Using Moti for better animations
import { Link } from "expo-router";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 24) / 2;

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const fetchProducts = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    try {
      console.log("Fetching from:", process.env.EXPO_PUBLIC_STRAPI_API_URL);

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
          },
        }
      );

      console.log("Raw API response:", JSON.stringify(response.data, null, 2));

      if (!response.data.data) {
        throw new Error("No data received from API");
      }

      const newProducts = response.data.data;
      setProducts(refresh ? newProducts : [...products, ...newProducts]);
      setError(null);
    } catch (err) {
      console.error("Error details:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const isEven = index % 2 === 0;
    const imageUrl = item.primaryImage?.[0]?.formats?.large?.url;

    return (
      <Link href={`/store/${item.documentId}`} key={item.id}>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: index * 100,
          }}
          style={[
            styles.productCard,
            {
              marginLeft: isEven ? 8 : 4,
              marginRight: isEven ? 4 : 8,
            },
          ]}
        >
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productCategory}>
              {item.Category} • {item.Subcategory}
            </Text>
            <Text style={styles.productPrice}>
              $
              {typeof item.price === "number"
                ? item.price.toFixed(2)
                : item.price}
            </Text>
          </View>
        </MotiView>
      </Link>
    );
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorSubtext}>Pull to refresh and try again</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlashList
        data={products}
        renderItem={renderProduct}
        estimatedItemSize={300}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchProducts(true)}
          />
        }
        onEndReached={() => fetchProducts()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() =>
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          ) : null
        }
      />
      {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  listContainer: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: COLUMN_WIDTH - 8,
    height: COLUMN_WIDTH - 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1a1a1a",
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2196F3",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
