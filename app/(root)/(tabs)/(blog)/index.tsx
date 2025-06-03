// import { View, Text, Linking } from "react-native";
// import React from "react";
// import { Link } from "expo-router";
// const Blog = () => {
//   return (
//     <View>
//       <Link href="/store"></Link>
//     </View>
//   );
// };

// export default Blog;

/*////////////////////********************************************* */

// import {
//   View,
//   Text,
//   Image,
//   Animated,
//   Dimensions,
//   ActivityIndicator,
// } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import HTML from "react-native-render-html";
// import { useWindowDimensions } from "react-native";
// // Types for the Strapi response
// interface BlogPost {
//   id: number;
//   Title: string;
//   Author: string;
//   Content: string;
//   publishedAt: string;
//   FeaturedImage: {
//     formats: {
//       medium: {
//         url: string;
//       };
//     };
//   };
// }

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// const { width } = Dimensions.get("window");
// const ITEM_HEIGHT = 400; // Increased to accommodate HTML content

// export default function BlogScreen() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const { width: windowWidth } = useWindowDimensions();

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//           },
//         }
//       );
//       setPosts(response.data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const renderItem = ({ item, index }: { item: BlogPost; index: number }) => {
//     const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];

//     const opacity = scrollY.interpolate({
//       inputRange,
//       outputRange: [1, 1, 1, 0],
//     });

//     const scale = scrollY.interpolate({
//       inputRange,
//       outputRange: [1, 1, 1, 0.9],
//     });

//     return (
//       <Animated.View
//         style={{
//           opacity,
//           transform: [{ scale }],
//           marginBottom: 24,
//           backgroundColor: "white",
//           borderRadius: 16,
//           overflow: "hidden",
//           elevation: 2,
//           shadowColor: "#000",
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 8,
//         }}
//       >
//         {item.FeaturedImage?.formats?.medium?.url && (
//           <Image
//             source={{ uri: item.FeaturedImage.formats.medium.url }}
//             style={{
//               width: width - 32,
//               height: 200,
//               resizeMode: "cover",
//             }}
//           />
//         )}
//         <View style={{ padding: 16 }}>
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: "600",
//               marginBottom: 8,
//               color: "#1a1a1a",
//             }}
//           >
//             {item.Title}
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               color: "#666",
//               marginBottom: 12,
//             }}
//           >
//             By {item.Author} • {new Date(item.publishedAt).toLocaleDateString()}
//           </Text>
//           <HTML
//             source={{ html: item.Content }}
//             contentWidth={windowWidth - 64}
//             baseStyle={{
//               fontSize: 16,
//               color: "#444",
//               lineHeight: 24,
//             }}
//             tagsStyles={{
//               p: {
//                 marginBottom: 10,
//               },
//               img: {
//                 borderRadius: 8,
//                 marginVertical: 10,
//               },
//             }}
//           />
//         </View>
//       </Animated.View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 16,
//         }}
//       >
//         <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
//       <Animated.FlatList
//         data={posts}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ padding: 16 }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         showsVerticalScrollIndicator={false}
//         refreshing={loading}
//         onRefresh={fetchPosts}
//       />
//     </View>
//   );
// }

/************************************************** */

// import { View, Text, Image, Animated, Pressable } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import { Link, useRouter } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "@motify/components";
// import { StyleSheet } from "react-native";
// import { Stack } from "expo-router";

// // Types
// interface BlogPost {
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

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// export default function BlogPreviewScreen() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get<BlogResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//           },
//         }
//       );
//       setPosts(response.data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const renderItem = ({ item, index }: { item: BlogPost; index: number }) => (
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
//         onPress={() => router.push(`/blog/${item.Slug}`)}
//         style={({ pressed }) => [
//           styles.pressable,
//           { opacity: pressed ? 0.9 : 1 },
//         ]}
//       >
//         {item.FeaturedImage?.formats?.medium?.url && (
//           <Image
//             source={{ uri: item.FeaturedImage.formats.medium.url }}
//             style={styles.image}
//           />
//         )}
//         <View style={styles.contentContainer}>
//           {item.Category && (
//             <Text style={styles.category}>{item.Category}</Text>
//           )}
//           <Text style={styles.title} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <View style={styles.metaContainer}>
//             <Text style={styles.meta}>
//               {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
//             </Text>
//             <Text style={styles.meta}>•</Text>
//             <Text style={styles.meta}>{item.Author}</Text>
//           </View>
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
//     <View style={styles.container} className="">
//       <FlashList
//         data={posts}
//         renderItem={renderItem}
//         estimatedItemSize={300}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={loading}
//         onRefresh={fetchPosts}
//         className="w-full h-full"
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
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   meta: {
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//   },
// });

/******************************************************** */

// import { View, Text, Image, Animated } from "react-native";
// import { useEffect, useState } from "react";
// import { Link } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "moti";
// import { StyleSheet } from "react-native";
// import { Stack } from "expo-router";
// // Types
// interface BlogPost {
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

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// export default function BlogPreviewScreen() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get<BlogResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//           },
//         }
//       );
//       setPosts(response.data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const renderItem = ({ item, index }: { item: BlogPost; index: number }) => (
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
//       <Link href={`/post/${item.Slug}`} key={item.id} style={styles.link}>
//         {item.FeaturedImage?.formats?.medium?.url && (
//           <Image
//             source={{ uri: item.FeaturedImage.formats.medium.url }}
//             style={styles.image}
//           />
//         )}
//         <View style={styles.contentContainer}>
//           {item.Category && (
//             <Text style={styles.category}>{item.Category}</Text>
//           )}
//           <Text style={styles.title} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <View style={styles.metaContainer}>
//             <Text style={styles.meta}>
//               {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
//             </Text>
//             <Text style={styles.meta}>•</Text>
//             <Text style={styles.meta}>{item.Author}</Text>
//           </View>
//         </View>
//       </Link>
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
//         data={posts}
//         renderItem={renderItem}
//         estimatedItemSize={300}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={loading}
//         onRefresh={fetchPosts}
//         className="w-full h-full"
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
//     // gap: 16,
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
//   link: {
//     flex: 1,
//     textDecoration: "none",
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
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   meta: {
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//   },
// });

/********************************************** */

// import { View, Text, Image, Animated } from "react-native";
// import { useEffect, useState } from "react";
// import { Link } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "moti";
// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_MARGIN = 16;
// const CARD_WIDTH = width - CARD_MARGIN * 2;

// // Types
// interface BlogPost {
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

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// export default function BlogPreviewScreen() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get<BlogResponse>(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//           },
//         }
//       );
//       setPosts(response.data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const renderItem = ({ item, index }: { item: BlogPost; index: number }) => (
//     <MotiView
//       from={{ opacity: 0, translateY: 50 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         type: "timing",
//         duration: 600,
//         delay: index * 100,
//       }}
//       style={styles.card}
//     >
//       <Link href={`/post/${item.Slug}`} key={item.id} style={styles.link}>
//         <View style={styles.imageContainer}>
//           {item.FeaturedImage?.formats?.medium?.url && (
//             <Image
//               source={{ uri: item.FeaturedImage.formats.medium.url }}
//               style={styles.image}
//             />
//           )}
//           {item.Category && (
//             <View style={styles.categoryContainer}>
//               <Text style={styles.category}>{item.Category}</Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.contentContainer}>
//           <Text style={styles.title} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <View style={styles.divider} />
//           <View style={styles.metaContainer}>
//             <Text style={styles.meta}>
//               {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
//             </Text>
//             <Text style={styles.metaDot}>•</Text>
//             <Text style={styles.meta}>{item.Author}</Text>
//           </View>
//         </View>
//       </Link>
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
//         data={posts}
//         renderItem={renderItem}
//         estimatedItemSize={350}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={loading}
//         onRefresh={fetchPosts}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   listContainer: {
//     padding: CARD_MARGIN,
//   },
//   card: {
//     marginBottom: 20,
//     width: CARD_WIDTH,
//     height: 380,
//     backgroundColor: "white",
//     borderRadius: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     overflow: "hidden",
//   },
//   link: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: "100%",
//     height: 220,
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   categoryContainer: {
//     position: "absolute",
//     bottom: 12,
//     right: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   category: {
//     fontSize: 12,
//     color: "#1a1a1a",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   contentContainer: {
//     padding: 16,
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     textAlign: "right",
//     lineHeight: 26,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#f0f0f0",
//     marginVertical: 12,
//   },
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     marginTop: "auto",
//   },
//   meta: {
//     fontSize: 14,
//     color: "#666",
//     marginHorizontal: 8,
//   },
//   metaDot: {
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     color: "#dc2626",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "500",
//   },
// });

/********************************************* */

// import { View, Text, Image, Pressable } from "react-native";
// import { Link } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "moti";
// import { StyleSheet, Dimensions } from "react-native";
// import {
//   useQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { useCallback, useMemo } from "react";

// const { width } = Dimensions.get("window");
// const CARD_MARGIN = 16;
// const CARD_WIDTH = width - CARD_MARGIN * 2;

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
//       cacheTime: 30 * 60 * 1000, // Cache kept for 30 minutes
//       retry: 2,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// // Types
// interface BlogPost {
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

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// // Separate API function
// const fetchBlogPosts = async (): Promise<BlogPost[]> => {
//   const response = await axios.get<BlogResponse>(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//       },
//     }
//   );
//   return response.data.data;
// };

// // Wrapper component
// export default function BlogPreviewWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BlogPreviewScreen />
//     </QueryClientProvider>
//   );
// }

// function BlogPreviewScreen() {
//   const queryClient = useQueryClient();

//   const {
//     data: posts = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["blogPosts"],
//     queryFn: fetchBlogPosts,
//     placeholderData: [], // Prevents undefined data
//   });

//   // Memoized render item function
//   const renderItem = useCallback(
//     ({ item, index }: { item: BlogPost; index: number }) => (
//       <MotiView
//         from={{ opacity: 0, translateY: 50 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{
//           type: "timing",
//           duration: 600,
//           delay: index * 100,
//         }}
//         style={styles.card}
//       >
//         <Link href={`/post/${item.Slug}`} key={item.id} style={styles.link}>
//           <View style={styles.imageContainer}>
//             {item.FeaturedImage?.formats?.medium?.url && (
//               <Image
//                 source={{ uri: item.FeaturedImage.formats.medium.url }}
//                 style={styles.image}
//                 loading="lazy"
//                 progressiveRenderingEnabled={true}
//               />
//             )}
//             {item.Category && (
//               <View style={styles.categoryContainer}>
//                 <Text style={styles.category}>{item.Category}</Text>
//               </View>
//             )}
//           </View>
//           <View style={styles.contentContainer}>
//             <Text style={styles.title} numberOfLines={2}>
//               {item.Title}
//             </Text>
//             <View style={styles.divider} />
//             <View style={styles.metaContainer}>
//               <Text style={styles.meta}>
//                 {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
//               </Text>
//               <Text style={styles.metaDot}>•</Text>
//               <Text style={styles.meta}>{item.Author}</Text>
//             </View>
//           </View>
//         </Link>
//       </MotiView>
//     ),
//     []
//   );

//   // Memoize keyExtractor
//   const keyExtractor = useCallback((item: BlogPost) => item.id.toString(), []);

//   // Prefetch next page of posts when nearing the end
//   const handleEndReached = useCallback(() => {
//     // You can implement pagination logic here
//     // For example, prefetch next page:
//     // queryClient.prefetchQuery(['blogPosts', currentPage + 1], () => fetchBlogPosts(currentPage + 1));
//   }, []);

//   if (isError) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>
//           {error instanceof Error ? error.message : "An error occurred"}
//         </Text>
//         <Pressable style={styles.retryButton} onPress={() => refetch()}>
//           <Text style={styles.retryText}>Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlashList
//         data={posts}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         estimatedItemSize={350}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={isLoading}
//         onRefresh={refetch}
//         onEndReached={handleEndReached}
//         onEndReachedThreshold={0.5}
//         removeClippedSubviews={true}
//         maxToRenderPerBatch={5}
//         windowSize={5}
//         initialNumToRender={3}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   listContainer: {
//     padding: CARD_MARGIN,
//   },
//   card: {
//     marginBottom: 20,
//     width: CARD_WIDTH,
//     height: 380,
//     backgroundColor: "white",
//     borderRadius: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     overflow: "hidden",
//   },
//   link: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: "100%",
//     height: 220,
//     position: "relative",
//     backgroundColor: "#f0f0f0", // Placeholder color
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   categoryContainer: {
//     position: "absolute",
//     bottom: 12,
//     right: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   category: {
//     fontSize: 12,
//     color: "#1a1a1a",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   contentContainer: {
//     padding: 16,
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     textAlign: "right",
//     lineHeight: 40,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#f0f0f0",
//     marginVertical: 12,
//   },
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     marginTop: "auto",
//   },
//   meta: {
//     fontSize: 14,
//     color: "#666",
//     marginHorizontal: 8,
//   },
//   metaDot: {
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     color: "#dc2626",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   retryButton: {
//     marginTop: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#2196F3",
//     borderRadius: 8,
//   },
//   retryText: {
//     color: "white",
//     fontWeight: "500",
//   },
// });

/********************************************* */

// import { View, Text, Image, Pressable, Dimensions } from "react-native";
// import { Link } from "expo-router";
// import { FlashList } from "@shopify/flash-list";
// import axios from "axios";
// import { MotiView } from "moti";
// import { StyleSheet } from "react-native";
// import {
//   useInfiniteQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { useCallback, useMemo } from "react";

// const { width } = Dimensions.get("window");
// const CARD_MARGIN = 16;
// const CARD_WIDTH = width - CARD_MARGIN * 2;

// // Types
// interface BlogPost {
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

// interface BlogResponse {
//   data: BlogPost[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// // Skeleton Components
// const SkeletonCard = ({ index }: { index: number }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 50 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         type: "timing",
//         duration: 600,
//         delay: index * 100,
//       }}
//       style={styles.card}
//     >
//       <MotiView
//         from={{ opacity: 0.5 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           type: "timing",
//           duration: 1000,
//           loop: true,
//           repeatReverse: true,
//         }}
//       >
//         <View style={styles.skeletonImage} />

//         <View style={styles.contentContainer}>
//           <View style={styles.skeletonTitle} />
//           <View style={styles.skeletonTitleShort} />

//           <View style={styles.divider} />

//           <View style={styles.metaContainer}>
//             <View style={styles.skeletonMeta} />
//             <View style={styles.skeletonMetaDot} />
//             <View style={styles.skeletonMeta} />
//           </View>
//         </View>
//       </MotiView>
//     </MotiView>
//   );
// };

// const LoadingFooter = () => (
//   <MotiView
//     from={{ opacity: 0.5 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//       repeatReverse: true,
//     }}
//     style={styles.loadingFooter}
//   >
//     <View style={styles.skeletonFooterBar} />
//   </MotiView>
// );

// // Create a client with optimized settings
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
//       cacheTime: 30 * 60 * 1000, // Cache kept for 30 minutes
//       retry: 2,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// // API function with pagination support
// const fetchBlogPosts = async (
//   page: number = 1,
//   pageSize: number = 10
// ): Promise<BlogPost[]> => {
//   try {
//     const response = await axios.get<BlogResponse>(
//       `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//         },
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching blog posts:", error);
//     throw error;
//   }
// };

// // Wrapper component with QueryClientProvider
// export default function BlogPreviewWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BlogPreviewScreen />
//     </QueryClientProvider>
//   );
// }

// // New component for empty state
// const EmptyState = () => (
//   <MotiView
//     from={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{
//       type: "timing",
//       duration: 800,
//     }}
//     style={styles.emptyStateContainer}
//   >
//     <View style={styles.emptyStateIconContainer}>
//       <Text style={styles.emptyStateIcon}>📝</Text>
//     </View>
//     <Text style={styles.emptyStateTitle}>لا توجد مقالات بعد</Text>
//     <Text style={styles.emptyStateDescription}>
//       سيتم إضافة مقالات جديدة قريباً
//     </Text>
//   </MotiView>
// );

// // Main component
// function BlogPreviewScreen() {
//   // 1. Always initialize hooks at the top level
//   const queryClient = useQueryClient();
//   const pageSize = 10;

//   // 2. useInfiniteQuery hook
//   const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//     error,
//     refetch,
//     hasNextPage,
//     fetchNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["blogPosts"],
//     queryFn: ({ pageParam = 1 }) => fetchBlogPosts(pageParam, pageSize),
//     getNextPageParam: (lastPage, allPages) => {
//       const nextPage = allPages.length + 1;
//       return lastPage.length === pageSize ? nextPage : undefined;
//     },
//   });

//   // 3. useMemo for posts data
//   const posts = useMemo(
//     () => data?.pages.flatMap((page) => page) ?? [],
//     [data]
//   );

//   // 4. useCallback for handleEndReached
//   const handleEndReached = useCallback(() => {
//     if (hasNextPage && !isFetching) {
//       fetchNextPage();
//     }
//   }, [hasNextPage, isFetching, fetchNextPage]);

//   // 5. useCallback for renderItem
//   const renderItem = useCallback(
//     ({ item, index }: { item: BlogPost; index: number }) => (
//       <MotiView
//         from={{ opacity: 0, translateY: 50 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{
//           type: "timing",
//           duration: 600,
//           delay: index * 100,
//         }}
//         style={styles.card}
//       >
//         <Link href={`/post/${item.Slug}`} key={item.id} style={styles.link}>
//           <View style={styles.imageContainer}>
//             {item.FeaturedImage?.formats?.medium?.url && (
//               <Image
//                 source={{ uri: item.FeaturedImage.formats.medium.url }}
//                 style={styles.image}
//                 loading="lazy"
//                 progressiveRenderingEnabled={true}
//               />
//             )}
//             {item.Category && (
//               <View style={styles.categoryContainer}>
//                 <Text style={styles.category}>{item.Category}</Text>
//               </View>
//             )}
//           </View>
//           <View style={styles.contentContainer}>
//             <Text style={styles.title} numberOfLines={2}>
//               {item.Title}
//             </Text>
//             <View style={styles.divider} />
//             <View style={styles.metaContainer}>
//               <Text style={styles.meta}>
//                 {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
//               </Text>
//               <Text style={styles.metaDot}>•</Text>
//               <Text style={styles.meta}>{item.Author}</Text>
//             </View>
//           </View>
//         </Link>
//       </MotiView>
//     ),
//     [] // Empty dependency array since nothing from component scope is used
//   );

//   // Early return for loading state
//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <FlashList
//           data={Array.from({ length: 5 }, (_, i) => i)}
//           renderItem={({ index }) => <SkeletonCard index={index} />}
//           estimatedItemSize={350}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//       </View>
//     );
//   }

//   // Early return for error state
//   if (isError) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>
//           {error instanceof Error ? error.message : "An error occurred"}
//         </Text>
//         <Pressable style={styles.retryButton} onPress={() => refetch()}>
//           <Text style={styles.retryText}>Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlashList
//         data={posts}
//         renderItem={renderItem}
//         keyExtractor={(item: BlogPost) => item.id.toString()}
//         estimatedItemSize={350}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshing={isLoading}
//         onRefresh={refetch}
//         onEndReached={handleEndReached}
//         onEndReachedThreshold={0.5}
//         removeClippedSubviews={true}
//         maxToRenderPerBatch={5}
//         windowSize={5}
//         initialNumToRender={3}
//         ListFooterComponent={() =>
//           isFetching && hasNextPage ? <LoadingFooter /> : null
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   listContainer: {
//     padding: CARD_MARGIN,
//   },
//   card: {
//     marginBottom: 20,
//     width: CARD_WIDTH,
//     height: 380,
//     backgroundColor: "white",
//     borderRadius: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     overflow: "hidden",
//   },
//   link: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: "100%",
//     height: 220,
//     position: "relative",
//     backgroundColor: "#f0f0f0",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   categoryContainer: {
//     position: "absolute",
//     bottom: 12,
//     right: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   category: {
//     fontSize: 12,
//     color: "#1a1a1a",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   contentContainer: {
//     padding: 16,
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     textAlign: "right",
//     lineHeight: 40,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#f0f0f0",
//     marginVertical: 12,
//   },
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     marginTop: "auto",
//   },
//   meta: {
//     fontSize: 14,
//     color: "#666",
//     marginHorizontal: 8,
//   },
//   metaDot: {
//     fontSize: 14,
//     color: "#666",
//   },
//   errorText: {
//     color: "#dc2626",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   retryButton: {
//     marginTop: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#2196F3",
//     borderRadius: 8,
//   },
//   retryText: {
//     color: "white",
//     fontWeight: "500",
//   },
//   // Skeleton-specific styles
//   skeletonImage: {
//     width: "100%",
//     height: 220,
//     backgroundColor: "#e0e0e0",
//   },
//   skeletonTitle: {
//     height: 24,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   skeletonTitleShort: {
//     height: 24,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 12,
//     width: "60%",
//   },
//   skeletonMeta: {
//     height: 16,
//     width: 80,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   skeletonMetaDot: {
//     height: 16,
//     width: 16,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 8,
//   },
//   loadingFooter: {
//     padding: 16,
//     alignItems: "center",
//   },
//   skeletonFooterBar: {
//     height: 8,
//     width: 120,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//   },
// });

/************************************/

import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";
import {
  useInfiniteQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 16;
const CARD_WIDTH = width - CARD_MARGIN * 2;

// Types
interface BlogPost {
  id: number;
  Title: string;
  Author: string;
  Category: string;
  Slug: string;
  publishedAt: string;
  FeaturedImage: {
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Skeleton Components
const SkeletonCard = ({ index }: { index: number }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 600,
        delay: index * 100,
      }}
      style={styles.card}
    >
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "timing",
          duration: 1000,
          loop: true,
          repeatReverse: true,
        }}
      >
        <View style={styles.skeletonImage} />

        <View style={styles.contentContainer}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonTitleShort} />

          <View style={styles.divider} />

          <View style={styles.metaContainer}>
            <View style={styles.skeletonMeta} />
            <View style={styles.skeletonMetaDot} />
            <View style={styles.skeletonMeta} />
          </View>
        </View>
      </MotiView>
    </MotiView>
  );
};

const LoadingFooter = () => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
      repeatReverse: true,
    }}
    style={styles.loadingFooter}
  >
    <View style={styles.skeletonFooterBar} />
  </MotiView>
);

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache kept for 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// API function with pagination support and Basic Auth
const fetchBlogPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<BlogPost[]> => {
  try {
    const auth = {
      username: process.env.EXPO_PUBLIC_STRAPI_API_USERNAME,
      password: process.env.EXPO_PUBLIC_STRAPI_API_PASSWORD,
    };
    const response = await axios.get<BlogResponse>(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { auth }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

// Wrapper component with QueryClientProvider
export default function BlogPreviewWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPreviewScreen />
    </QueryClientProvider>
  );
}

// Empty State component (already defined in the original code)
const EmptyState = () => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      type: "timing",
      duration: 800,
    }}
    style={styles.emptyStateContainer}
  >
    <View style={styles.emptyStateIconContainer}>
      <Text style={styles.emptyStateIcon}>📝</Text>
    </View>
    <Text style={styles.emptyStateTitle}>لا توجد مقالات بعد</Text>
    <Text style={styles.emptyStateDescription}>
      سيتم إضافة مقالات جديدة قريباً
    </Text>
  </MotiView>
);

// Main component
function BlogPreviewScreen() {
  const queryClient = useQueryClient();
  const pageSize = 10;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogPosts"],
    queryFn: ({ pageParam = 1 }) => fetchBlogPosts(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length === pageSize ? nextPage : undefined;
    },
  });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const renderItem = useCallback(
    ({ item, index }: { item: BlogPost; index: number }) => (
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: index * 100,
        }}
        style={styles.card}
      >
        <Link href={`/post/${item.Slug}`} key={item.id} style={styles.link}>
          <View style={styles.imageContainer}>
            {item.FeaturedImage?.formats?.medium?.url && (
              <Image
                source={{ uri: item.FeaturedImage.formats.medium.url }}
                style={styles.image}
                loading="lazy"
                progressiveRenderingEnabled={true}
              />
            )}
            {item.Category && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{item.Category}</Text>
              </View>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.Title}
            </Text>
            <View style={styles.divider} />
            <View style={styles.metaContainer}>
              <Text style={styles.meta}>
                {new Date(item.publishedAt).toLocaleDateString("ar-KW")}
              </Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.meta}>{item.Author}</Text>
            </View>
          </View>
        </Link>
      </MotiView>
    ),
    []
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <FlashList
          data={Array.from({ length: 5 }, (_, i) => i)}
          renderItem={({ index }) => <SkeletonCard index={index} />}
          estimatedItemSize={350}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : "An error occurred"}
        </Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item: BlogPost) => item.id.toString()}
        estimatedItemSize={350}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        ListFooterComponent={() =>
          isFetching && hasNextPage ? <LoadingFooter /> : null
        }
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  listContainer: {
    padding: CARD_MARGIN,
  },
  card: {
    marginBottom: 20,
    width: CARD_WIDTH,
    height: 380,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  link: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  category: {
    fontSize: 12,
    color: "#1a1a1a",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "right",
    lineHeight: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 8,
  },
  metaDot: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2196F3",
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "500",
  },
  // Skeleton-specific styles
  skeletonImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#e0e0e0",
  },
  skeletonTitle: {
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 8,
  },
  skeletonTitleShort: {
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    width: "60%",
  },
  skeletonMeta: {
    height: 16,
    width: 80,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  skeletonMetaDot: {
    height: 16,
    width: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  loadingFooter: {
    padding: 16,
    alignItems: "center",
  },
  skeletonFooterBar: {
    height: 8,
    width: 120,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyStateIconContainer: {
    marginBottom: 16,
  },
  emptyStateIcon: {
    fontSize: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
