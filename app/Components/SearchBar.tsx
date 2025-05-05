// import React, { useState, useEffect } from "react";
// import { View, TextInput, Pressable, Text } from "react-native";
// import { MotiView } from "@motify/components";
// import { Search, X } from "lucide-react-native";

// interface SearchBarProps {
//   onSearch: (text: string) => void;
//   suggestions?: string[];
//   placeholder?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   onSearch,
//   suggestions = [],
//   placeholder = "Search products...",
// }) => {
//   const [searchText, setSearchText] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

//   useEffect(() => {
//     if (searchText) {
//       const filtered = suggestions.filter((item) =>
//         item.toLowerCase().includes(searchText.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//     } else {
//       setFilteredSuggestions([]);
//     }
//   }, [searchText, suggestions]);

//   const handleClear = () => {
//     setSearchText("");
//     setFilteredSuggestions([]);
//   };

//   const handleSuggestionPress = (suggestion: string) => {
//     setSearchText(suggestion);
//     onSearch(suggestion);
//     setFilteredSuggestions([]);
//   };

//   return (
//     <View className="px-4 py-2">
//       <MotiView
//         from={{ opacity: 0, translateY: -20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: "timing", duration: 300 }}
//       >
//         <View
//           className={`flex-row items-center bg-white rounded-2xl shadow-sm border ${
//             isFocused ? "border-red-400" : "border-gray-200"
//           }`}
//         >
//           <View className="p-3">
//             <Search size={20} color={isFocused ? "#f87171" : "#9ca3af"} />
//           </View>

//           <TextInput
//             className="flex-1 py-3 px-2 text-base text-gray-700"
//             placeholder={placeholder}
//             placeholderTextColor="#9ca3af"
//             value={searchText}
//             onChangeText={(text) => {
//               setSearchText(text);
//               onSearch(text);
//             }}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />

//           {searchText.length > 0 && (
//             <Pressable className="p-3" onPress={handleClear}>
//               <X size={20} color="#9ca3af" />
//             </Pressable>
//           )}
//         </View>

//         {/* Suggestions Container */}
//         {filteredSuggestions.length > 0 && (
//           <MotiView
//             from={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "timing", duration: 200 }}
//             className="mt-2 bg-white rounded-xl shadow-lg"
//           >
//             {filteredSuggestions.map((suggestion, index) => (
//               <Pressable
//                 key={index}
//                 className={`p-4 border-b border-gray-100 ${
//                   index === filteredSuggestions.length - 1 ? "" : "border-b"
//                 }`}
//                 onPress={() => handleSuggestionPress(suggestion)}
//               >
//                 <Text className="text-gray-700">{suggestion}</Text>
//               </Pressable>
//             ))}
//           </MotiView>
//         )}

//         {/* No Results Message */}
//         {searchText.length > 0 && filteredSuggestions.length === 0 && (
//           <MotiView
//             from={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "timing", duration: 200 }}
//             className="mt-2 p-4 bg-white rounded-xl shadow-lg"
//           >
//             <Text className="text-center text-gray-500">
//               No results found. Try a different search term.
//             </Text>
//           </MotiView>
//         )}
//       </MotiView>
//     </View>
//   );
// };

// export default SearchBar;

/********************************** */

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   ActivityIndicator,
// } from "react-native";
// import { MotiView } from "@motify/components";
// import { Search, X } from "lucide-react-native";
// import axios from "axios";
// import { Link } from "expo-router";

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const SearchBar: React.FC = () => {
//   const [searchText, setSearchText] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<Product[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   // Debounce search to avoid too many API calls
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults();
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const fetchSearchResults = async () => {
//     if (!searchText.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchText}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       if (response.data.data) {
//         setResults(response.data.data);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to fetch search results");
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setSearchText("");
//     setResults([]);
//     setError(null);
//   };

//   return (
//     <View className="px-4 py-2 z-50">
//       <MotiView
//         from={{ opacity: 0, translateY: -20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: "timing", duration: 300 }}
//       >
//         <View
//           className={`flex-row items-center bg-white rounded-2xl shadow-sm border ${
//             isFocused ? "border-red-400" : "border-gray-200"
//           }`}
//         >
//           <View className="p-3">
//             {loading ? (
//               <ActivityIndicator size="small" color="#f87171" />
//             ) : (
//               <Search size={20} color={isFocused ? "#f87171" : "#9ca3af"} />
//             )}
//           </View>

//           <TextInput
//             className="flex-1 py-3 px-2 text-base text-gray-700"
//             placeholder="Search products..."
//             placeholderTextColor="#9ca3af"
//             value={searchText}
//             onChangeText={setSearchText}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />

//           {searchText.length > 0 && (
//             <Pressable className="p-3" onPress={handleClear}>
//               <X size={20} color="#9ca3af" />
//             </Pressable>
//           )}
//         </View>

//         {/* Search Results */}
//         {(results.length > 0 || error) && (
//           <MotiView
//             from={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "timing", duration: 200 }}
//             className="mt-2 bg-white rounded-xl shadow-lg max-h-80"
//           >
//             {error ? (
//               <Text className="p-4 text-center text-red-500">{error}</Text>
//             ) : (
//               results.map((product, index) => (
//                 <Link
//                   key={product.id}
//                   href={`/store/${product.documentId}`}
//                   asChild
//                 >
//                   <Pressable
//                     className={`p-4 border-gray-100 ${
//                       index === results.length - 1 ? "" : "border-b"
//                     }`}
//                   >
//                     <Text className="text-base font-medium text-gray-800">
//                       {product.name}
//                     </Text>
//                     <Text className="text-sm text-gray-500 mt-1">
//                       {product.Category} • {product.Subcategory}
//                     </Text>
//                     <Text className="text-sm font-semibold text-red-500 mt-1">
//                       {typeof product.price === "number"
//                         ? `${product.price.toFixed(3)} KWD`
//                         : product.price}
//                     </Text>
//                   </Pressable>
//                 </Link>
//               ))
//             )}
//           </MotiView>
//         )}

//         {/* No Results Message */}
//         {searchText.length >= 2 &&
//           results.length === 0 &&
//           !loading &&
//           !error && (
//             <MotiView
//               from={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ type: "timing", duration: 200 }}
//               className="mt-2 p-4 bg-white rounded-xl shadow-lg"
//             >
//               <Text className="text-center text-gray-500">
//                 No products found. Try a different search term.
//               </Text>
//             </MotiView>
//           )}
//       </MotiView>
//     </View>
//   );
// };

// export default SearchBar;

/****************************************** */

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   FlatList,
//   Modal,
//   ActivityIndicator,
// } from "react-native";
// import { MotiView } from "@motify/components";
// import { Search, X } from "lucide-react-native";
// import axios from "axios";

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const SearchBar: React.FC = () => {
//   const [searchText, setSearchText] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<Product[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMoreResults, setHasMoreResults] = useState(true);

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         setPage(1);
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const fetchSearchResults = async (isNewSearch = false) => {
//     if (!searchText.trim() || loading) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `${
//           process.env.EXPO_PUBLIC_STRAPI_API_URL
//         }/api/products?populate=*&filters[name][$containsi]=${searchText}&pagination[page]=${
//           isNewSearch ? 1 : page
//         }&pagination[pageSize]=10`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const fetchedResults = response.data.data || [];
//       if (isNewSearch) {
//         setResults(fetchedResults);
//       } else {
//         setResults((prevResults) => [...prevResults, ...fetchedResults]);
//       }

//       setHasMoreResults(fetchedResults.length > 0);
//       if (isNewSearch) setIsModalVisible(true);
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to fetch search results");
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (hasMoreResults && !loading) {
//       setPage((prevPage) => prevPage + 1);
//       fetchSearchResults();
//     }
//   };

//   const handleClear = () => {
//     setSearchText("");
//     setResults([]);
//     setError(null);
//     setIsModalVisible(false);
//   };

//   const renderResultItem = ({ item }: { item: Product }) => (
//     <Pressable className="p-4 border-b border-gray-100">
//       <Text className="text-base font-medium text-gray-800">{item.name}</Text>
//       <Text className="text-sm text-gray-500 mt-1">
//         {item.Category} • {item.Subcategory}
//       </Text>
//       <Text className="text-sm font-semibold text-red-500 mt-1">
//         {item.price ? `${item.price.toFixed(3)} KWD` : "N/A"}
//       </Text>
//     </Pressable>
//   );

//   return (
//     <View className="px-4 py-2">
//       <MotiView
//         from={{ opacity: 0, translateY: -20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: "timing", duration: 300 }}
//       >
//         <View
//           className={`flex-row items-center bg-white rounded-2xl shadow-sm border ${
//             isFocused ? "border-red-400" : "border-gray-200"
//           }`}
//         >
//           <View className="p-3">
//             {loading && !isModalVisible ? (
//               <ActivityIndicator size="small" color="#f87171" />
//             ) : (
//               <Search size={20} color={isFocused ? "#f87171" : "#9ca3af"} />
//             )}
//           </View>

//           <TextInput
//             className="flex-1 py-3 px-2 text-base text-gray-700"
//             placeholder="Search products..."
//             placeholderTextColor="#9ca3af"
//             value={searchText}
//             onChangeText={setSearchText}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />

//           {searchText.length > 0 && (
//             <Pressable className="p-3" onPress={handleClear}>
//               <X size={20} color="#9ca3af" />
//             </Pressable>
//           )}
//         </View>
//       </MotiView>

//       <Modal visible={isModalVisible} animationType="slide" transparent>
//         <View className="flex-1 bg-white p-4">
//           <Pressable onPress={handleClear} className="absolute top-2 right-4">
//             <X size={24} color="#f87171" />
//           </Pressable>

//           <Text className="text-lg font-semibold text-gray-700 mb-4">
//             Search Results
//           </Text>

//           {loading && results.length === 0 ? (
//             <ActivityIndicator size="large" color="#f87171" />
//           ) : error ? (
//             <Text className="text-center text-red-500">{error}</Text>
//           ) : results.length > 0 ? (
//             <FlatList
//               data={results}
//               renderItem={renderResultItem}
//               keyExtractor={(item) => item.id}
//               onEndReached={handleLoadMore}
//               onEndReachedThreshold={0.5}
//               ListFooterComponent={
//                 hasMoreResults && <ActivityIndicator color="#f87171" />
//               }
//             />
//           ) : (
//             <Text className="text-center text-gray-500">
//               No products found. Try a different search term.
//             </Text>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default SearchBar;

/******************************************** */

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   SlideInDown,
//   SlideOutDown,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   interpolate,
// } from "react-native-reanimated";
// import { FlashList } from "@shopify/flash-list";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, History, TrendingUp } from "lucide-react-native";
// import axios from "axios";
// import { Link } from "expo-router";
// import { BlurView } from "expo-blur";

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const translateY = useSharedValue(SCREEN_HEIGHT);

//   // Load recent searches on mount
//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const fetchSearchResults = async (reset = false) => {
//     if (!searchText.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchText}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchText);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: withSpring(isVisible ? 0 : SCREEN_HEIGHT) }],
//   }));

//   const SkeletonLoader = () => (
//     <Animated.View
//       entering={FadeIn}
//       exiting={FadeOut}
//       className="p-4 border-b border-gray-100"
//     >
//       <View className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
//       <View className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
//       <View className="h-4 bg-gray-200 rounded w-1/4" />
//     </Animated.View>
//   );

//   const renderSearchResult = ({ item }: { item: Product }) => (
//     <Animated.View
//       entering={FadeIn.delay(200)}
//       className="border-b border-gray-100"
//     >
//       <Link href={`/store/${item.documentId}`} asChild>
//         <Pressable className="p-4 active:bg-gray-50">
//           <Text className="text-base font-medium text-gray-800">
//             {item.name}
//           </Text>
//           <Text className="text-sm text-gray-500 mt-1">
//             {item.Category} • {item.Subcategory}
//           </Text>
//           <Text className="text-sm font-semibold text-red-500 mt-1">
//             {typeof item.price === "number"
//               ? `${item.price.toFixed(3)} KWD`
//               : item.price}
//           </Text>
//         </Pressable>
//       </Link>
//     </Animated.View>
//   );

//   return (
//     <>
//       <Pressable className="mx-4 my-2" onPress={() => setIsVisible(true)}>
//         <View className="flex-row items-center bg-white/90 rounded-2xl shadow-sm border border-gray-200 p-3">
//           <Search size={20} color="#9ca3af" />
//           <Text className="ml-3 text-gray-500">Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={() => setIsVisible(false)}
//       >
//         <AnimatedBlurView
//           intensity={20}
//           className="flex-1 bg-black/30"
//           entering={FadeIn}
//           exiting={FadeOut}
//         >
//           <Animated.View
//             style={[animatedStyle]}
//             className="flex-1 bg-white rounded-t-3xl "
//           >
//             {/* Search Header */}
//             <View className="p-4 border-b border-gray-200">
//               <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
//                 <Search size={20} color="#6b7280" />
//                 <TextInput
//                   className="flex-1 py-3 px-2 text-base text-gray-700"
//                   placeholder="Search products..."
//                   placeholderTextColor="#9ca3af"
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                 />
//                 {searchText.length > 0 && (
//                   <Pressable onPress={() => setSearchText("")}>
//                     <X size={20} color="#9ca3af" />
//                   </Pressable>
//                 )}
//               </View>
//               <Pressable
//                 className="absolute right-4 top-4 p-2"
//                 onPress={() => setIsVisible(false)}
//               >
//                 <Text className="text-red-500 font-medium">Cancel</Text>
//               </Pressable>
//             </View>

//             {/* Results or Recent Searches */}
//             {searchText.length < 2 ? (
//               <View className="p-4">
//                 {recentSearches.length > 0 && (
//                   <>
//                     <Text className="text-lg font-semibold mb-4">
//                       Recent Searches
//                     </Text>
//                     {recentSearches.map((search, index) => (
//                       <Pressable
//                         key={index}
//                         className="flex-row items-center py-3"
//                         onPress={() => setSearchText(search)}
//                       >
//                         <History size={20} color="#6b7280" />
//                         <Text className="ml-3 text-gray-700">{search}</Text>
//                       </Pressable>
//                     ))}
//                   </>
//                 )}
//               </View>
//             ) : (
//               <FlashList
//                 data={results}
//                 renderItem={renderSearchResult}
//                 estimatedItemSize={88}
//                 onEndReached={() => fetchSearchResults(false)}
//                 onEndReachedThreshold={0.5}
//                 ListEmptyComponent={
//                   loading ? (
//                     <>
//                       <SkeletonLoader />
//                       <SkeletonLoader />
//                       <SkeletonLoader />
//                     </>
//                   ) : (
//                     <View className="p-4">
//                       <Text className="text-center text-gray-500">
//                         No products found
//                       </Text>
//                     </View>
//                   )
//                 }
//                 ListFooterComponent={
//                   loading && results.length > 0 ? <SkeletonLoader /> : null
//                 }
//               />
//             )}
//           </Animated.View>
//         </AnimatedBlurView>
//       </Modal>
//     </>
//   );
// };

// export default SearchModal;

/*********************************************** */

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import { FlashList } from "@shopify/flash-list";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, History } from "lucide-react-native";
// import axios from "axios";
// import { Link, router } from "expo-router";
// import { BlurView } from "@react-native-community/blur";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as Animatable from "react-native-animatable";

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   // Reset state when modal closes
//   const resetState = useCallback(() => {
//     setSearchText("");
//     setResults([]);
//     setPage(1);
//     setHasMore(true);
//     setLoading(false);
//   }, []);

//   const handleClose = useCallback(() => {
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, []);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   // Handle navigation to product
//   const handleProductSelect = useCallback((documentId: string) => {
//     handleClose();
//     // Wait for modal animation to complete before navigation
//     setTimeout(() => {
//       router.push(`/store/${documentId}`);
//     }, 300);
//   }, []);

//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const fetchSearchResults = async (reset = false) => {
//     if (!searchText.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchText}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchText);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   const SkeletonLoader = () => (
//     <Animated.View
//       entering={FadeIn}
//       exiting={FadeOut}
//       className="p-4 border-b border-gray-100"
//     >
//       <View className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
//       <View className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
//       <View className="h-4 bg-gray-200 rounded w-1/4" />
//     </Animated.View>
//   );

//   const renderSearchResult = ({ item }: { item: Product }) => (
//     <Animated.View
//       entering={FadeIn.delay(200)}
//       className="border-b border-gray-100"
//     >
//       <Pressable
//         className="p-4 active:bg-gray-50"
//         onPress={() => handleProductSelect(item.documentId)}
//       >
//         <Text className="text-base font-medium text-gray-800">{item.name}</Text>
//         <Text className="text-sm text-gray-500 mt-1">
//           {item.Category} • {item.Subcategory}
//         </Text>
//         <Text className="text-sm font-semibold text-red-500 mt-1">
//           {typeof item.price === "number"
//             ? `${item.price.toFixed(3)} KWD`
//             : item.price}
//         </Text>
//       </Pressable>
//     </Animated.View>
//   );

//   return (
//     <>
//       <Pressable className="mx-4 my-2" onPress={handleOpen}>
//         <View className="flex-row items-center bg-white/90 rounded-2xl shadow-sm border border-gray-200 p-4">
//           <Search size={20} color="#EE4B2B" />
//           <Text className="ml-3 text-gray-500">
//             {" "}
//             {isVisible ? (
//               <View className="flex-1 justify-center items-center bg-white">
//                 <Animatable.Text
//                   animation="fadeIn"
//                   iterationCount="infinite"
//                   direction="alternate"
//                   className="text-lg text-gray-500"
//                 >
//                   Search products...
//                 </Animatable.Text>
//               </View>
//             ) : (
//               "Search products..."
//             )}
//           </Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <AnimatedBlurView
//           intensity={20}
//           className="flex-1 bg-black/30"
//           entering={FadeIn}
//           exiting={FadeOut}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               {
//                 width: SCREEN_WIDTH,
//                 height: SCREEN_HEIGHT,
//                 backgroundColor: "white",
//                 paddingTop: insets.top,
//               },
//             ]}
//           >
//             {/* Search Header */}
//             <View className="p-4 border-b border-gray-200">
//               <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
//                 <Search size={20} color="#6b7280" />
//                 <TextInput
//                   ref={inputRef}
//                   className="flex-1 py-3 px-2 text-base text-gray-700"
//                   placeholder="Search products..."
//                   placeholderTextColor="#9ca3af"
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                 />
//                 {searchText.length > 0 && (
//                   <Pressable onPress={() => setSearchText("")}>
//                     <X style={styles.x} size={20} color="#9ca3af" />
//                   </Pressable>
//                 )}
//               </View>
//               <Pressable
//                 className="absolute right-4 top-4 p-2"
//                 onPress={handleClose}
//               >
//                 <Text className="text-red-500 font-medium">Cancel</Text>
//               </Pressable>
//             </View>

//             {/* Results or Recent Searches */}
//             {searchText.length < 2 ? (
//               <View className="p-4">
//                 {recentSearches.length > 0 && (
//                   <>
//                     <Text className="text-lg font-semibold mb-4">
//                       Recent Searches
//                     </Text>
//                     {recentSearches.map((search, index) => (
//                       <Pressable
//                         key={index}
//                         className="flex-row items-center py-3"
//                         onPress={() => setSearchText(search)}
//                       >
//                         <History size={20} color="#6b7280" />
//                         <Text className="ml-3 text-gray-700">{search}</Text>
//                       </Pressable>
//                     ))}
//                   </>
//                 )}
//               </View>
//             ) : (
//               <FlashList
//                 data={results}
//                 renderItem={renderSearchResult}
//                 estimatedItemSize={88}
//                 onEndReached={() => fetchSearchResults(false)}
//                 onEndReachedThreshold={0.5}
//                 ListEmptyComponent={
//                   loading ? (
//                     <>
//                       <SkeletonLoader />
//                       <SkeletonLoader />
//                       <SkeletonLoader />
//                     </>
//                   ) : (
//                     <View className="p-4">
//                       <Text className="text-center text-gray-500">
//                         No products found
//                       </Text>
//                     </View>
//                   )
//                 }
//                 ListFooterComponent={
//                   loading && results.length > 0 ? <SkeletonLoader /> : null
//                 }
//               />
//             )}
//           </Animated.View>
//         </AnimatedBlurView>
//       </Modal>
//     </>
//   );
// };

// // X should be entirely deleted
// const styles = StyleSheet.create({
//   x: {
//     marginRight: 10,
//     display: "none",
//   },
// });

// export default SearchModal;

/************************************************************* */

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import { FlashList } from "@shopify/flash-list";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, History } from "lucide-react-native";
// import axios from "axios";
// import { Link, router } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as Animatable from "react-native-animatable";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const resetState = useCallback(() => {
//     setSearchText("");
//     setResults([]);
//     setPage(1);
//     setHasMore(true);
//     setLoading(false);
//   }, []);

//   const handleClose = useCallback(() => {
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, []);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   const handleProductSelect = useCallback((documentId: string) => {
//     handleClose();
//     setTimeout(() => {
//       router.push(`/store/${documentId}`);
//     }, 300);
//   }, []);

//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const fetchSearchResults = async (reset = false) => {
//     if (!searchText.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchText}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchText);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   const SkeletonLoader = () => (
//     <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.skeleton}>
//       <View style={[styles.loader, { width: "75%" }]} />
//       <View style={[styles.loader, { width: "50%" }]} />
//       <View style={[styles.loader, { width: "25%" }]} />
//     </Animated.View>
//   );

//   const renderSearchResult = ({ item }: { item: Product }) => (
//     <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
//       <Pressable
//         style={styles.pressable}
//         onPress={() => handleProductSelect(item.documentId)}
//       >
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.category}>
//           {item.Category} • {item.Subcategory}
//         </Text>
//         <Text style={styles.price}>
//           {typeof item.price === "number"
//             ? `${item.price.toFixed(3)} KWD`
//             : item.price}
//         </Text>
//       </Pressable>
//     </Animated.View>
//   );

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#EE4B2B" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <Animated.View
//           style={[
//             StyleSheet.absoluteFillObject,
//             {
//               backgroundColor: "rgba(255, 255, 255, 0.4)",
//             },
//           ]}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               {
//                 width: SCREEN_WIDTH,
//                 height: SCREEN_HEIGHT,
//                 backgroundColor: "white",
//                 paddingTop: insets.top,
//               },
//             ]}
//           >
//             {/* Add UI logic here */}
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   skeleton: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderColor: "#e5e5e5",
//   },
//   loader: {
//     height: 8,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderColor: "#e5e5e5",
//   },
//   pressable: {
//     padding: 16,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   category: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 4,
//   },
//   price: {
//     fontSize: 14,
//     color: "#d32f2f",
//     marginTop: 4,
//   },
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//   },
// });

// export default SearchModal;

/******************************************** */

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search } from "lucide-react-native";
// import axios from "axios";
// import { router } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const resetState = useCallback(() => {
//     setSearchText("");
//     setResults([]);
//     setPage(1);
//     setHasMore(true);
//     setLoading(false);
//   }, []);

//   const handleClose = useCallback(() => {
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, [resetState]);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   const handleProductSelect = useCallback(
//     (documentId: string) => {
//       handleClose();
//       setTimeout(() => {
//         router.push(`/store/${documentId}`);
//       }, 300);
//     },
//     [handleClose]
//   );

//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const fetchSearchResults = async (reset = false) => {
//     if (!searchText.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchText}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchText);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   const renderSearchResult = ({ item }: { item: Product }) => (
//     <Animated.View
//       entering={FadeIn.delay(200)}
//       style={styles.result}
//       key={item.documentId}
//     >
//       <Pressable
//         style={styles.pressable}
//         onPress={() => handleProductSelect(item.documentId)}
//       >
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.category}>
//           {item.Category} • {item.Subcategory}
//         </Text>
//         <Text style={styles.price}>
//           {typeof item.price === "number"
//             ? `${item.price.toFixed(3)} KWD`
//             : item.price}
//         </Text>
//       </Pressable>
//     </Animated.View>
//   );

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#EE4B2B" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <Animated.View
//           style={[
//             StyleSheet.absoluteFillObject,
//             { backgroundColor: "rgba(255, 255, 255, 0.4)" },
//           ]}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               {
//                 width: SCREEN_WIDTH,
//                 height: SCREEN_HEIGHT,
//                 backgroundColor: "white",
//                 paddingTop: insets.top,
//               },
//             ]}
//           >
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Search Modal</Text>
//               <TextInput
//                 ref={inputRef}
//                 style={styles.searchInput}
//                 placeholder="Type to search..."
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 autoFocus
//               />

//               {loading ? (
//                 <Text style={styles.loadingText}>Loading...</Text>
//               ) : results.length > 0 ? (
//                 results.map((item) => renderSearchResult({ item }))
//               ) : (
//                 <Text style={styles.noResultsText}>No results found.</Text>
//               )}

//               <Pressable style={styles.closeButton} onPress={handleClose}>
//                 <Text style={styles.closeButtonText}>Close Modal</Text>
//               </Pressable>
//             </View>
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//   },
//   modalContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   loadingText: {
//     textAlign: "center",
//     marginVertical: 16,
//   },
//   noResultsText: {
//     textAlign: "center",
//     marginVertical: 16,
//     color: "#999",
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderColor: "#e5e5e5",
//   },
//   pressable: {
//     padding: 16,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   category: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 4,
//   },
//   price: {
//     fontSize: 14,
//     color: "#d32f2f",
//     marginTop: 4,
//   },
//   closeButton: {
//     marginTop: 16,
//     backgroundColor: "#EE4B2B",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default SearchModal;

/******************************* */

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, Clock, ArrowRight } from "lucide-react-native";
// import axios from "axios";
// import { router } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { FlashList } from "@shopify/flash-list";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const resetState = useCallback(() => {
//     setSearchText("");
//     setResults([]);
//     setPage(1);
//     setHasMore(true);
//     setLoading(false);
//   }, []);

//   const handleClose = useCallback(() => {
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, [resetState]);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   const handleProductSelect = useCallback(
//     (documentId: string) => {
//       handleClose();
//       setTimeout(() => {
//         router.push(`/store/${documentId}`);
//       }, 300);
//     },
//     [handleClose]
//   );

//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const handleRecentSearchPress = (search: string) => {
//     setSearchText(search);
//     fetchSearchResults(true, search);
//   };

//   const fetchSearchResults = async (
//     reset = false,
//     searchQuery = searchText
//   ) => {
//     if (!searchQuery.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchQuery}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchQuery);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   const renderSearchResult = ({ item }: { item: Product }) => {
//     const thumbnailUrl = item.primaryImage?.[0]?.formats?.thumbnail?.url;

//     return (
//       <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
//         <Pressable
//           style={styles.resultPressable}
//           onPress={() => handleProductSelect(item.documentId)}
//         >
//           {thumbnailUrl ? (
//             <Image
//               source={{ uri: thumbnailUrl }}
//               style={styles.thumbnail}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.thumbnailPlaceholder} />
//           )}
//           <View style={styles.resultContent}>
//             <Text style={styles.name} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <Text style={styles.category}>
//               {item.Category} • {item.Subcategory}
//             </Text>
//             <Text style={styles.price}>
//               {typeof item.price === "number"
//                 ? `${item.price.toFixed(3)} KWD`
//                 : item.price}
//             </Text>
//           </View>
//           <ArrowRight size={20} color="#666" />
//         </Pressable>
//       </Animated.View>
//     );
//   };

//   const renderRecentSearches = () => {
//     if (recentSearches.length === 0) return null;

//     return (
//       <View style={styles.recentSearchesContainer}>
//         <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
//         {recentSearches.map((search, index) => (
//           <Pressable
//             key={index}
//             style={styles.recentSearchItem}
//             onPress={() => handleRecentSearchPress(search)}
//           >
//             <Clock size={16} color="#666" />
//             <Text style={styles.recentSearchText}>{search}</Text>
//           </Pressable>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#EE4B2B" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <Animated.View
//           style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               styles.modalContent,
//               { paddingTop: insets.top },
//             ]}
//           >
//             <View style={styles.searchHeader}>
//               <View style={styles.searchInputContainer}>
//                 <Search size={20} color="#666" />
//                 <TextInput
//                   ref={inputRef}
//                   style={styles.searchInput}
//                   placeholder="Search products..."
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                   returnKeyType="search"
//                 />
//                 {searchText.length > 0 && (
//                   <Pressable onPress={() => setSearchText("")}>
//                     <X size={20} color="#666" />
//                   </Pressable>
//                 )}
//               </View>
//               <Pressable style={styles.cancelButton} onPress={handleClose}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </Pressable>
//             </View>

//             {loading && results.length === 0 ? (
//               <ActivityIndicator style={styles.loader} color="#EE4B2B" />
//             ) : results.length > 0 ? (
//               <FlashList
//                 data={results}
//                 renderItem={renderSearchResult}
//                 estimatedItemSize={88}
//                 onEndReached={() => fetchSearchResults(false)}
//                 onEndReachedThreshold={0.5}
//               />
//             ) : searchText.length > 0 ? (
//               <View style={styles.noResults}>
//                 <Text style={styles.noResultsText}>No products found</Text>
//               </View>
//             ) : (
//               renderRecentSearches()
//             )}
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//   },
//   modalOverlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   modalContent: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     backgroundColor: "white",
//   },
//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   searchInputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 44,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginLeft: 12,
//     padding: 8,
//   },
//   cancelButtonText: {
//     color: "#EE4B2B",
//     fontSize: 16,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultPressable: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//   },
//   thumbnail: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   thumbnailPlaceholder: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   resultContent: {
//     flex: 1,
//     marginHorizontal: 12,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#EE4B2B",
//   },
//   noResults: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   recentSearchesContainer: {
//     padding: 16,
//   },
//   recentSearchesTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 12,
//   },
//   recentSearchItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   recentSearchText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 12,
//   },
// });

// export default SearchModal;

/********************************* */

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, Clock, ArrowRight } from "lucide-react-native";
// import axios from "axios";
// import { router } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { FlashList } from "@shopify/flash-list";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number;
//   documentId: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const resetState = useCallback(() => {
//     setSearchText("");
//     setResults([]);
//     setPage(1);
//     setHasMore(true);
//     setLoading(false);
//   }, []);

//   const handleClose = useCallback(() => {
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, [resetState]);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   const handleProductSelect = useCallback(
//     (documentId: string) => {
//       handleClose();
//       setTimeout(() => {
//         router.push(`/store/${documentId}`);
//       }, 300);
//     },
//     [handleClose]
//   );

//   useEffect(() => {
//     loadRecentSearches();
//   }, []);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const clearRecentSearches = async () => {
//     try {
//       await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
//       setRecentSearches([]);
//     } catch (error) {
//       console.error("Error clearing recent searches:", error);
//     }
//   };

//   const handleRecentSearchPress = (search: string) => {
//     setSearchText(search);
//     fetchSearchResults(true, search);
//   };

//   const fetchSearchResults = async (
//     reset = false,
//     searchQuery = searchText
//   ) => {
//     if (!searchQuery.trim() || (!reset && !hasMore)) return;

//     const currentPage = reset ? 1 : page;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products?populate=*&filters[name][$containsi]=${searchQuery}&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const newResults = response.data.data;
//       setResults((prev) => (reset ? newResults : [...prev, ...newResults]));
//       setHasMore(newResults.length === ITEMS_PER_PAGE);
//       setPage(currentPage + 1);

//       if (reset && newResults.length > 0) {
//         saveRecentSearch(searchQuery);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (searchText.length >= 2) {
//         fetchSearchResults(true);
//       } else {
//         setResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [searchText]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   const renderSearchResult = useMemo(
//     () =>
//       ({ item }: { item: Product }) => {
//         const thumbnailUrl = item.primaryImage?.[0]?.formats?.thumbnail?.url;

//         return (
//           <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
//             <Pressable
//               style={styles.resultPressable}
//               onPress={() => handleProductSelect(item.documentId)}
//             >
//               {thumbnailUrl ? (
//                 <Image
//                   source={{ uri: thumbnailUrl }}
//                   style={styles.thumbnail}
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <View style={styles.thumbnailPlaceholder} />
//               )}
//               <View style={styles.resultContent}>
//                 <Text style={styles.name} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//                 <Text style={styles.category}>
//                   {item.Category} • {item.Subcategory}
//                 </Text>
//                 <Text style={styles.price}>
//                   {typeof item.price === "number"
//                     ? `${item.price.toFixed(3)} KWD`
//                     : item.price}
//                 </Text>
//               </View>
//               <ArrowRight size={20} color="#666" />
//             </Pressable>
//           </Animated.View>
//         );
//       },
//     [handleProductSelect]
//   );

//   const renderRecentSearches = useMemo(() => {
//     if (recentSearches.length === 0) return null;

//     return (
//       <View style={styles.recentSearchesContainer}>
//         <View style={styles.recentSearchesHeader}>
//           <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
//           <Pressable onPress={clearRecentSearches}>
//             <Text style={styles.clearButtonText}>Clear All</Text>
//           </Pressable>
//         </View>
//         {recentSearches.map((search, index) => (
//           <Pressable
//             key={index}
//             style={styles.recentSearchItem}
//             onPress={() => handleRecentSearchPress(search)}
//           >
//             <Clock size={16} color="#666" />
//             <Text style={styles.recentSearchText}>{search}</Text>
//           </Pressable>
//         ))}
//       </View>
//     );
//   }, [recentSearches, handleRecentSearchPress, clearRecentSearches]);

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#EE4B2B" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <Animated.View
//           style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               styles.modalContent,
//               { paddingTop: insets.top },
//             ]}
//           >
//             <View style={styles.searchHeader}>
//               <View style={styles.searchInputContainer}>
//                 <Search size={20} color="#666" />
//                 <TextInput
//                   ref={inputRef}
//                   style={styles.searchInput}
//                   placeholder="Search products..."
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                   returnKeyType="search"
//                 />
//                 {searchText.length > 0 && (
//                   <Pressable onPress={() => setSearchText("")}>
//                     <X size={20} color="#666" />
//                   </Pressable>
//                 )}
//               </View>
//               <Pressable style={styles.cancelButton} onPress={handleClose}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </Pressable>
//             </View>

//             {loading && results.length === 0 ? (
//               <ActivityIndicator style={styles.loader} color="#EE4B2B" />
//             ) : results.length > 0 ? (
//               <FlashList
//                 data={results}
//                 renderItem={renderSearchResult}
//                 estimatedItemSize={88}
//                 onEndReached={() => fetchSearchResults(false)}
//                 onEndReachedThreshold={0.5}
//               />
//             ) : searchText.length > 0 ? (
//               <View style={styles.noResults}>
//                 <Text style={styles.noResultsText}>No products found</Text>
//               </View>
//             ) : (
//               renderRecentSearches
//             )}
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//   },
//   modalOverlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   modalContent: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     backgroundColor: "white",
//   },
//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   searchInputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 44,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginLeft: 12,
//     padding: 8,
//   },
//   cancelButtonText: {
//     color: "#EE4B2B",
//     fontSize: 16,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultPressable: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//   },
//   thumbnail: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   thumbnailPlaceholder: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   resultContent: {
//     flex: 1,
//     marginHorizontal: 12,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#EE4B2B",
//   },
//   noResults: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   recentSearchesContainer: {
//     padding: 16,
//   },
//   recentSearchesHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   recentSearchesTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   clearButtonText: {
//     fontSize: 14,
//     color: "#EE4B2B",
//   },
//   recentSearchItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   recentSearchText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 12,
//   },
// });

// export default SearchModal;

/*************************************** */

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, Clock, ArrowRight } from "lucide-react-native";
// import axios from "axios";
// import { router, useNavigation } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { FlashList } from "@shopify/flash-list";
// import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   documentId: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// interface SearchResponse {
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

// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";

// const SearchModal: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const queryClient = useQueryClient();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ["products", searchText],
//     queryFn: async ({ pageParam = 1 }) => {
//       if (!searchText.trim()) {
//         return { data: [], pageCount: 0, currentPage: pageParam };
//       }

//       const response = await axios.get<SearchResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//         {
//           params: {
//             populate: "*",
//             "filters[name][$containsi]": searchText,
//             "pagination[page]": pageParam,
//             "pagination[pageSize]": ITEMS_PER_PAGE,
//           },
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       // Normalize the data
//       const normalizedData = response.data.data.map((item) => ({
//         ...item,
//         price: item.price ? Number(item.price) : null,
//         documentId: item.documentId || item.id,
//       }));

//       return {
//         data: normalizedData,
//         pageCount: response.data.meta.pagination.pageCount,
//         currentPage: pageParam,
//       };
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.currentPage < lastPage.pageCount
//         ? lastPage.currentPage + 1
//         : undefined,
//     enabled: searchText.length >= 2,
//     staleTime: 1000 * 60 * 5, // Cache for 5 minutes
//   });

//   const results = useMemo(
//     () => data?.pages?.flatMap((page) => page.data) ?? [],
//     [data]
//   );

//   const resetState = useCallback(() => {
//     setSearchText("");
//     queryClient.removeQueries({ queryKey: ["products"] });
//   }, [queryClient]);

//   const handleClose = useCallback(() => {
//     Keyboard.dismiss();
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, [resetState]);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//   }, []);

//   const handleProductSelect = useCallback(
//     async (documentId: string) => {
//       Keyboard.dismiss();
//       handleClose();

//       try {
//         // Pre-fetch product details before navigation
//         await queryClient.prefetchQuery({
//           queryKey: ["product", documentId],
//           queryFn: async () => {
//             const response = await axios.get(
//               `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}`,
//               {
//                 params: { populate: "*" },
//                 headers: {
//                   Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//                 },
//               }
//             );

//             const productData = response.data.data;
//             return {
//               ...productData,
//               price: productData.price ? Number(productData.price) : null,
//               documentId: productData.documentId || productData.id,
//             };
//           },
//         });

//         setTimeout(() => {
//           router.replace({
//             pathname: "/store/[id]",
//             params: { id: documentId },
//           });
//         }, 300);
//       } catch (error) {
//         console.error("Error prefetching product:", error);
//         router.replace({
//           pathname: "/store/[id]",
//           params: { id: documentId },
//         });
//       }
//     },
//     [handleClose, queryClient]
//   );

//   useEffect(() => {
//     loadRecentSearches();

//     const unsubscribe = navigation.addListener("state", () => {
//       if (isVisible) {
//         handleClose();
//       }
//     });

//     return unsubscribe;
//   }, [navigation, isVisible, handleClose]);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     if (!search.trim()) return;

//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5);
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const clearRecentSearches = async () => {
//     try {
//       await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
//       setRecentSearches([]);
//     } catch (error) {
//       console.error("Error clearing recent searches:", error);
//     }
//   };

//   const handleRecentSearchPress = useCallback(
//     (search: string) => {
//       setSearchText(search);
//       saveRecentSearch(search);
//       refetch();
//     },
//     [refetch]
//   );

//   const renderSearchResult = useCallback(
//     ({ item }: { item: Product }) => {
//       const thumbnailUrl = item.primaryImage?.[0]?.formats?.thumbnail?.url;
//       const price =
//         item.price !== null
//           ? `${Number(item.price).toFixed(3)} KWD`
//           : "Price not available";

//       return (
//         <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
//           <Pressable
//             style={styles.resultPressable}
//             onPress={() => handleProductSelect(item.documentId)}
//           >
//             {thumbnailUrl ? (
//               <Image
//                 source={{ uri: thumbnailUrl }}
//                 style={styles.thumbnail}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={styles.thumbnailPlaceholder} />
//             )}
//             <View style={styles.resultContent}>
//               <Text style={styles.name} numberOfLines={1}>
//                 {item.name}
//               </Text>
//               <Text style={styles.category}>
//                 {item.Category} • {item.Subcategory}
//               </Text>
//               <Text style={styles.price}>{price}</Text>
//             </View>
//             <ArrowRight size={20} color="#666" />
//           </Pressable>
//         </Animated.View>
//       );
//     },
//     [handleProductSelect]
//   );

//   const renderRecentSearches = useMemo(() => {
//     if (recentSearches.length === 0) return null;

//     return (
//       <View style={styles.recentSearchesContainer}>
//         <View style={styles.recentSearchesHeader}>
//           <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
//           <Pressable onPress={clearRecentSearches}>
//             <Text style={styles.clearButtonText}>Clear All</Text>
//           </Pressable>
//         </View>
//         {recentSearches.map((search, index) => (
//           <Pressable
//             key={index}
//             style={styles.recentSearchItem}
//             onPress={() => handleRecentSearchPress(search)}
//           >
//             <Clock size={16} color="#666" />
//             <Text style={styles.recentSearchText}>{search}</Text>
//           </Pressable>
//         ))}
//       </View>
//     );
//   }, [recentSearches, handleRecentSearchPress]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#666" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <Animated.View
//             style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}
//           >
//             <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//               style={{ flex: 1 }}
//               keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
//             >
//               <Animated.View
//                 style={[
//                   animatedStyle,
//                   styles.modalContent,
//                   { paddingTop: insets.top },
//                 ]}
//               >
//                 <View style={styles.searchHeader}>
//                   <View style={styles.searchInputContainer}>
//                     <Search size={20} color="#666" />
//                     <TextInput
//                       ref={inputRef}
//                       style={styles.searchInput}
//                       placeholder="Search products..."
//                       value={searchText}
//                       onChangeText={setSearchText}
//                       autoFocus
//                       returnKeyType="search"
//                     />
//                     {searchText.length > 0 && (
//                       <Pressable onPress={() => setSearchText("")}>
//                         <X size={20} color="#666" />
//                       </Pressable>
//                     )}
//                   </View>
//                   <Pressable style={styles.cancelButton} onPress={handleClose}>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </Pressable>
//                 </View>

//                 {isFetching && results.length === 0 ? (
//                   <ActivityIndicator style={styles.loader} color="#EE4B2B" />
//                 ) : results.length > 0 ? (
//                   <FlashList
//                     data={results}
//                     renderItem={renderSearchResult}
//                     estimatedItemSize={88}
//                     onEndReached={() => {
//                       if (hasNextPage && !isFetchingNextPage) {
//                         fetchNextPage();
//                       }
//                     }}
//                     onEndReachedThreshold={0.5}
//                     ListFooterComponent={() =>
//                       isFetchingNextPage ? (
//                         <ActivityIndicator
//                           color="#EE4B2B"
//                           style={styles.loader}
//                         />
//                       ) : null
//                     }
//                   />
//                 ) : searchText.length > 0 ? (
//                   <View style={styles.noResults}>
//                     <Text style={styles.noResultsText}>No products found</Text>
//                   </View>
//                 ) : (
//                   renderRecentSearches
//                 )}
//               </Animated.View>
//             </KeyboardAvoidingView>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//   },
//   modalOverlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   modalContent: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     backgroundColor: "white",
//   },
//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   searchInputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 44,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginLeft: 12,
//     padding: 8,
//   },
//   cancelButtonText: {
//     color: "#EE4B2B",
//     fontSize: 16,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultPressable: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//   },
//   thumbnail: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   thumbnailPlaceholder: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   resultContent: {
//     flex: 1,
//     marginHorizontal: 12,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#EE4B2B",
//   },
//   noResults: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   recentSearchesContainer: {
//     padding: 16,
//   },
//   recentSearchesHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   recentSearchesTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   clearButtonText: {
//     fontSize: 14,
//     color: "#EE4B2B",
//   },
//   recentSearchItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   recentSearchText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 12,
//   },
// });

// export default SearchModal;

/***************************************** */

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import Animated, {
//   FadeIn,
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
//   runOnJS,
//   interpolate,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Search, X, Clock, ArrowRight, AlertCircle } from "lucide-react-native";
// import axios from "axios";
// import { router, useNavigation } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { FlashList } from "@shopify/flash-list";
// import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
// import debounce from "lodash.debounce";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// // Define types for better type safety
// interface Product {
//   id: string;
//   name: string;
//   Category: string;
//   Subcategory: string;
//   price: number | null;
//   documentId: string;
//   primaryImage?: {
//     formats?: {
//       thumbnail?: {
//         url?: string;
//       };
//     };
//   }[];
// }

// interface SearchResponse {
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

// interface PageData {
//   data: Product[];
//   pageCount: number;
//   currentPage: number;
// }

// // Constants
// const ITEMS_PER_PAGE = 10;
// const RECENT_SEARCHES_KEY = "recentSearches";
// const DEBOUNCE_DELAY = 300;

// const SearchBar: React.FC = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   const queryClient = useQueryClient();
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const modalVisible = useSharedValue(0);
//   const inputRef = useRef<TextInput>(null);

//   // Infinite query for search results
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     refetch,
//     error,
//     isError,
//   } = useInfiniteQuery<PageData, Error>({
//     queryKey: ["products", searchText],
//     queryFn: async ({ pageParam = 1 }) => {
//       if (!searchText.trim()) {
//         return { data: [], pageCount: 0, currentPage: pageParam };
//       }

//       const response = await axios.get<SearchResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
//         {
//           params: {
//             populate: "*",
//             "filters[name][$containsi]": searchText,
//             "pagination[page]": pageParam,
//             "pagination[pageSize]": ITEMS_PER_PAGE,
//           },
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//           },
//         }
//       );

//       const normalizedData = response.data.data.map((item) => ({
//         ...item,
//         price: item.price ? Number(item.price) : null,
//         documentId: item.documentId || item.id,
//       }));

//       return {
//         data: normalizedData,
//         pageCount: response.data.meta.pagination.pageCount,
//         currentPage: pageParam,
//       };
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.currentPage < lastPage.pageCount
//         ? lastPage.currentPage + 1
//         : undefined,
//     enabled: searchText.length >= 2,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   const results = useMemo(
//     () => data?.pages.flatMap((page) => page.data) ?? [],
//     [data]
//   );

//   // Reset state on close
//   const resetState = useCallback(() => {
//     setSearchText("");
//     queryClient.removeQueries({ queryKey: ["products"] });
//   }, [queryClient]);

//   const handleClose = useCallback(() => {
//     Keyboard.dismiss();
//     modalVisible.value = withSpring(0, {}, () => {
//       runOnJS(setIsVisible)(false);
//       runOnJS(resetState)();
//     });
//   }, [resetState]);

//   const handleOpen = useCallback(() => {
//     setIsVisible(true);
//     modalVisible.value = withSpring(1);
//     setTimeout(() => inputRef.current?.focus(), 100);
//   }, []);

//   const handleProductSelect = useCallback(
//     async (documentId: string) => {
//       Keyboard.dismiss();
//       handleClose();

//       try {
//         await queryClient.prefetchQuery({
//           queryKey: ["product", documentId],
//           queryFn: async () => {
//             const response = await axios.get(
//               `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}`,
//               {
//                 params: { populate: "*" },
//                 headers: {
//                   Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
//                 },
//               }
//             );

//             const productData = response.data.data;
//             return {
//               ...productData,
//               price: productData.price ? Number(productData.price) : null,
//               documentId: productData.documentId || productData.id,
//             };
//           },
//         });

//         setTimeout(() => {
//           router.replace({
//             pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//             params: { documentId },
//           });
//         }, 300);
//       } catch (error) {
//         console.error("Error prefetching product:", error);
//         router.replace({
//           pathname: "/(root)/(tabs)/(store)/store/[documentId]",
//           params: { documentId },
//         });
//       }
//     },
//     [handleClose, queryClient]
//   );

//   useEffect(() => {
//     loadRecentSearches();

//     const unsubscribe = navigation.addListener("state", () => {
//       if (isVisible) {
//         handleClose();
//       }
//     });

//     return unsubscribe;
//   }, [navigation, isVisible, handleClose]);

//   const loadRecentSearches = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
//       if (stored) {
//         setRecentSearches(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Error loading recent searches:", error);
//     }
//   };

//   const saveRecentSearch = async (search: string) => {
//     if (!search.trim()) return;

//     try {
//       const updatedSearches = [
//         search,
//         ...recentSearches.filter((s) => s !== search),
//       ].slice(0, 5); // Limit to 5 recent searches
//       await AsyncStorage.setItem(
//         RECENT_SEARCHES_KEY,
//         JSON.stringify(updatedSearches)
//       );
//       setRecentSearches(updatedSearches);
//     } catch (error) {
//       console.error("Error saving recent search:", error);
//     }
//   };

//   const clearRecentSearches = async () => {
//     try {
//       await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
//       setRecentSearches([]);
//     } catch (error) {
//       console.error("Error clearing recent searches:", error);
//     }
//   };

//   const handleRecentSearchPress = useCallback(
//     (search: string) => {
//       setSearchText(search);
//       saveRecentSearch(search);
//       refetch();
//     },
//     [refetch]
//   );

//   // Debounced search handler
//   const debouncedSearch = useCallback(
//     debounce(() => {
//       if (searchText.length >= 2) {
//         refetch();
//       }
//     }, DEBOUNCE_DELAY),
//     [searchText, refetch]
//   );

//   useEffect(() => {
//     debouncedSearch();
//     return () => debouncedSearch.cancel();
//   }, [searchText, debouncedSearch]);

//   const renderSearchResult = useCallback(
//     ({ item }: { item: Product }) => {
//       const thumbnailUrl = item.primaryImage?.[0]?.formats?.thumbnail?.url;
//       const price =
//         item.price !== null
//           ? `${Number(item.price).toFixed(3)} KWD`
//           : "Price not available";

//       return (
//         <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
//           <Pressable
//             style={styles.resultPressable}
//             onPress={() => handleProductSelect(item.documentId)}
//           >
//             {thumbnailUrl ? (
//               <Image
//                 source={{ uri: thumbnailUrl }}
//                 style={styles.thumbnail}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={styles.thumbnailPlaceholder} />
//             )}
//             <View style={styles.resultContent}>
//               <Text style={styles.name} numberOfLines={1}>
//                 {item.name}
//               </Text>
//               <Text style={styles.category}>
//                 {item.Category} • {item.Subcategory}
//               </Text>
//               <Text style={styles.price}>{price}</Text>
//             </View>
//             <ArrowRight size={20} color="#666" />
//           </Pressable>
//         </Animated.View>
//       );
//     },
//     [handleProductSelect]
//   );

//   const renderRecentSearches = useMemo(() => {
//     if (recentSearches.length === 0) return null;

//     return (
//       <View style={styles.recentSearchesContainer}>
//         <View style={styles.recentSearchesHeader}>
//           <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
//           <Pressable onPress={clearRecentSearches}>
//             <Text style={styles.clearButtonText}>Clear All</Text>
//           </Pressable>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {recentSearches.map((search, index) => (
//             <Pressable
//               key={index}
//               style={styles.recentSearchChip}
//               onPress={() => handleRecentSearchPress(search)}
//             >
//               <Clock size={16} color="#666" />
//               <Text style={styles.recentSearchText}>{search}</Text>
//             </Pressable>
//           ))}
//         </ScrollView>
//       </View>
//     );
//   }, [recentSearches, handleRecentSearchPress]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
//       },
//     ],
//   }));

//   return (
//     <>
//       <Pressable style={styles.searchTrigger} onPress={handleOpen}>
//         <View style={styles.triggerContainer}>
//           <Search size={20} color="#666" />
//           <Text style={styles.triggerText}>Search products...</Text>
//         </View>
//       </Pressable>

//       <Modal
//         visible={isVisible}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <StatusBar barStyle="dark-content" />
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <Animated.View
//             style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}
//           >
//             <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//               style={{ flex: 1 }}
//               keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
//             >
//               <Animated.View
//                 style={[
//                   animatedStyle,
//                   styles.modalContent,
//                   { paddingTop: insets.top },
//                 ]}
//               >
//                 <View style={styles.searchHeader}>
//                   <View style={styles.searchInputContainer}>
//                     <Search size={20} color="#666" />
//                     <TextInput
//                       ref={inputRef}
//                       style={styles.searchInput}
//                       placeholder="Search products..."
//                       value={searchText}
//                       onChangeText={setSearchText}
//                       returnKeyType="search"
//                       autoFocus
//                     />
//                     {searchText.length > 0 && (
//                       <Pressable onPress={() => setSearchText("")}>
//                         <X size={20} color="#666" />
//                       </Pressable>
//                     )}
//                   </View>
//                   <Pressable style={styles.cancelButton} onPress={handleClose}>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </Pressable>
//                 </View>

//                 {isFetching && results.length === 0 ? (
//                   <View style={styles.loaderContainer}>
//                     <ActivityIndicator size="large" color="#EE4B2B" />
//                     <Text style={styles.loaderText}>Searching...</Text>
//                   </View>
//                 ) : isError ? (
//                   <View style={styles.errorContainer}>
//                     <AlertCircle size={40} color="#EE4B2B" />
//                     <Text style={styles.errorText}>
//                       {error?.message || "Failed to load products"}
//                     </Text>
//                     <Pressable
//                       onPress={() => refetch()}
//                       style={styles.retryButton}
//                     >
//                       <Text style={styles.retryButtonText}>Retry</Text>
//                     </Pressable>
//                   </View>
//                 ) : results.length > 0 ? (
//                   <FlashList
//                     data={results}
//                     renderItem={renderSearchResult}
//                     estimatedItemSize={88}
//                     onEndReached={() => {
//                       if (hasNextPage && !isFetchingNextPage) {
//                         fetchNextPage();
//                       }
//                     }}
//                     onEndReachedThreshold={0.5}
//                     ListFooterComponent={() =>
//                       isFetchingNextPage ? (
//                         <ActivityIndicator
//                           color="#EE4B2B"
//                           style={styles.loader}
//                         />
//                       ) : null
//                     }
//                   />
//                 ) : searchText.length > 0 ? (
//                   <View style={styles.noResults}>
//                     <Text style={styles.noResultsText}>No products found</Text>
//                   </View>
//                 ) : (
//                   renderRecentSearches
//                 )}
//               </Animated.View>
//             </KeyboardAvoidingView>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   searchTrigger: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   triggerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   triggerText: {
//     marginLeft: 8,
//     color: "#666",
//     fontSize: 16,
//   },
//   modalOverlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   modalContent: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     backgroundColor: "#fff",
//   },
//   searchInputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 48,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#333",
//   },
//   cancelButton: {
//     marginLeft: 12,
//     padding: 8,
//   },
//   cancelButtonText: {
//     color: "#EE4B2B",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loaderText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   loader: {
//     marginVertical: 20,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#EE4B2B",
//     textAlign: "center",
//   },
//   retryButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#EE4B2B",
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   result: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     backgroundColor: "#fff",
//   },
//   resultPressable: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//   },
//   thumbnail: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   thumbnailPlaceholder: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   resultContent: {
//     flex: 1,
//     marginHorizontal: 12,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   category: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#EE4B2B",
//   },
//   noResults: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   recentSearchesContainer: {
//     padding: 16,
//   },
//   recentSearchesHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   recentSearchesTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   clearButtonText: {
//     fontSize: 14,
//     color: "#EE4B2B",
//     fontWeight: "500",
//   },
//   recentSearchChip: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   recentSearchText: {
//     fontSize: 14,
//     color: "#333",
//     marginLeft: 6,
//   },
// });

// export default SearchBar;

/************************************************ */

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Modal,
  Dimensions,
  StatusBar,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Search, X, Clock, ArrowRight, AlertCircle } from "lucide-react-native";
import axios from "axios";
import { router, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  Category: string;
  Subcategory: string;
  price: number | null;
  documentId: string;
  primaryImage?: {
    formats?: {
      thumbnail?: {
        url?: string;
      };
    };
  }[];
}

interface SearchResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PageData {
  data: Product[];
  pageCount: number;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;
const RECENT_SEARCHES_KEY = "recentSearches";
const DEBOUNCE_DELAY = 300;

const SearchBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const modalVisible = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    error,
    isError,
  } = useInfiniteQuery<PageData, Error>({
    queryKey: ["products", searchText],
    queryFn: async ({ pageParam = 1 }) => {
      if (!searchText.trim()) {
        return { data: [], pageCount: 0, currentPage: pageParam };
      }
      const response = await axios.get<SearchResponse>(
        `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products`,
        {
          params: {
            populate: "*",
            "filters[name][$containsi]": searchText,
            "pagination[page]": pageParam,
            "pagination[pageSize]": ITEMS_PER_PAGE,
          },
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
          },
        }
      );
      const normalizedData = response.data.data.map((item) => ({
        ...item,
        price: item.price ? Number(item.price) : null,
        documentId: item.documentId || item.id,
      }));
      return {
        data: normalizedData,
        pageCount: response.data.meta.pagination.pageCount,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.pageCount
        ? lastPage.currentPage + 1
        : undefined,
    enabled: searchText.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  const results = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const resetState = useCallback(() => {
    setSearchText("");
    queryClient.removeQueries({ queryKey: ["products"] });
  }, [queryClient]);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    modalVisible.value = withSpring(0, {}, () => {
      runOnJS(setIsVisible)(false);
      runOnJS(resetState)();
    });
  }, [resetState]);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
    modalVisible.value = withSpring(1);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleProductSelect = useCallback(
    async (documentId: string) => {
      Keyboard.dismiss();
      setIsNavigating(true);
      try {
        await queryClient.prefetchQuery({
          queryKey: ["product", documentId],
          queryFn: async () => {
            const response = await axios.get(
              `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/products/${documentId}`,
              {
                params: { populate: "*" },
                headers: {
                  Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_PRODUCTS}`,
                },
              }
            );
            const productData = response.data.data;
            return {
              ...productData,
              price: productData.price ? Number(productData.price) : null,
              documentId: productData.documentId || productData.id,
            };
          },
        });
        setTimeout(() => {
          router.replace({
            pathname: "/(root)/(tabs)/(store)/store/[documentId]",
            params: { documentId },
          });
          setIsNavigating(false);
          handleClose();
        }, 300);
      } catch (error) {
        console.error("Error prefetching product:", error);
        router.replace({
          pathname: "/(root)/(tabs)/(store)/store/[documentId]",
          params: { documentId },
        });
        setIsNavigating(false);
        handleClose();
      }
    },
    [handleClose, queryClient]
  );

  useEffect(() => {
    loadRecentSearches();
    const unsubscribe = navigation.addListener("state", () => {
      if (isVisible) {
        handleClose();
      }
    });
    return unsubscribe;
  }, [navigation, isVisible, handleClose]);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  const saveRecentSearch = async (search: string) => {
    if (!search.trim()) return;
    try {
      const updatedSearches = [
        search,
        ...recentSearches.filter((s) => s !== search),
      ].slice(0, 5);
      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (error) {
      console.error("Error clearing recent searches:", error);
    }
  };

  const handleRecentSearchPress = useCallback(
    (search: string) => {
      setSearchText(search);
      saveRecentSearch(search);
      refetch();
    },
    [refetch]
  );

  const debouncedSearch = useCallback(
    debounce(() => {
      if (searchText.length >= 2) {
        refetch();
      }
    }, DEBOUNCE_DELAY),
    [searchText, refetch]
  );

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchText, debouncedSearch]);

  const renderSearchResult = useCallback(
    ({ item }: { item: Product }) => {
      const thumbnailUrl = item.primaryImage?.[0]?.formats?.thumbnail?.url;
      const price =
        item.price !== null
          ? `${Number(item.price).toFixed(3)} KWD`
          : "Price not available";
      return (
        <Animated.View entering={FadeIn.delay(200)} style={styles.result}>
          <Pressable
            style={styles.resultPressable}
            onPress={() => handleProductSelect(item.documentId)}
          >
            {thumbnailUrl ? (
              <Image
                source={{ uri: thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.thumbnailPlaceholder} />
            )}
            <View style={styles.resultContent}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.category}>
                {item.Category} • {item.Subcategory}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <ArrowRight size={20} color="#666" />
          </Pressable>
        </Animated.View>
      );
    },
    [handleProductSelect]
  );

  const renderRecentSearches = useMemo(() => {
    if (recentSearches.length === 0) return null;
    return (
      <View style={styles.recentSearchesContainer}>
        <View style={styles.recentSearchesHeader}>
          <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
          <Pressable onPress={clearRecentSearches}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentSearches.map((search, index) => (
            <Pressable
              key={index}
              style={styles.recentSearchChip}
              onPress={() => handleRecentSearchPress(search)}
            >
              <Clock size={16} color="#666" />
              <Text style={styles.recentSearchText}>{search}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }, [recentSearches, handleRecentSearchPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(modalVisible.value, [0, 1], [SCREEN_HEIGHT, 0]),
      },
    ],
  }));

  return (
    <>
      <Pressable style={styles.searchTrigger} onPress={handleOpen}>
        <View style={styles.triggerContainer}>
          <Search size={20} color="#666" />
          <Text style={styles.triggerText}>Search products...</Text>
        </View>
      </Pressable>
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <StatusBar barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
              <Animated.View
                style={[
                  animatedStyle,
                  styles.modalContent,
                  { paddingTop: insets.top },
                ]}
              >
                <View style={styles.searchHeader}>
                  <View style={styles.searchInputContainer}>
                    <Search size={20} color="#666" />
                    <TextInput
                      ref={inputRef}
                      style={styles.searchInput}
                      placeholder="Search products..."
                      value={searchText}
                      onChangeText={setSearchText}
                      returnKeyType="search"
                      autoFocus
                    />
                    {searchText.length > 0 && (
                      <Pressable onPress={() => setSearchText("")}>
                        <X size={20} color="#666" />
                      </Pressable>
                    )}
                  </View>
                  <Pressable style={styles.cancelButton} onPress={handleClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                </View>
                {isNavigating && (
                  <View style={styles.navigationLoader}>
                    <ActivityIndicator size="large" color="#EE4B2B" />
                    <Text style={styles.loaderText}>Loading product...</Text>
                  </View>
                )}
                {!isNavigating && isFetching && results.length === 0 ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#EE4B2B" />
                    <Text style={styles.loaderText}>Searching...</Text>
                  </View>
                ) : !isNavigating && isError ? (
                  <View style={styles.errorContainer}>
                    <AlertCircle size={40} color="#EE4B2B" />
                    <Text style={styles.errorText}>
                      {error?.message || "Failed to load products"}
                    </Text>
                    <Pressable
                      onPress={() => refetch()}
                      style={styles.retryButton}
                    >
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </Pressable>
                  </View>
                ) : !isNavigating && results.length > 0 ? (
                  <FlashList
                    data={results}
                    renderItem={renderSearchResult}
                    estimatedItemSize={88}
                    onEndReached={() => {
                      if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                      }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() =>
                      isFetchingNextPage ? (
                        <ActivityIndicator
                          color="#EE4B2B"
                          style={styles.loader}
                        />
                      ) : null
                    }
                  />
                ) : !isNavigating && searchText.length > 0 ? (
                  <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>No products found</Text>
                  </View>
                ) : (
                  renderRecentSearches
                )}
              </Animated.View>
            </KeyboardAvoidingView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchTrigger: { marginHorizontal: 16, marginVertical: 8 },
  triggerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  triggerText: { marginLeft: 8, color: "#666", fontSize: 16 },
  modalOverlay: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
  modalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: "#333" },
  cancelButton: { marginLeft: 12, padding: 8 },
  cancelButtonText: { color: "#EE4B2B", fontSize: 16, fontWeight: "600" },
  navigationLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderText: { marginTop: 10, fontSize: 16, color: "#666" },
  loader: { marginVertical: 20 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#EE4B2B",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EE4B2B",
    borderRadius: 8,
  },
  retryButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  result: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  resultPressable: { flexDirection: "row", alignItems: "center", padding: 12 },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  thumbnailPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  resultContent: { flex: 1, marginHorizontal: 12 },
  name: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 4 },
  category: { fontSize: 14, color: "#666", marginBottom: 4 },
  price: { fontSize: 14, fontWeight: "600", color: "#EE4B2B" },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: { fontSize: 16, color: "#666", textAlign: "center" },
  recentSearchesContainer: { padding: 16 },
  recentSearchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recentSearchesTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  clearButtonText: { fontSize: 14, color: "#EE4B2B", fontWeight: "500" },
  recentSearchChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  recentSearchText: { fontSize: 14, color: "#333", marginLeft: 6 },
});

export default SearchBar;
