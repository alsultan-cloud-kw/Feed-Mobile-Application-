// import { View, Text } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";

// const params = useLocalSearchParams();
// console.log("------------------------------------", params);

// const BlogPost = () => {
//   return (
//     <View>
//       <Text>
//         This is slug from dynamic segment and your slug is : {params.slug}
//       </Text>
//     </View>
//   );
// };

// export default BlogPost;

/*************************** */

// import { View, Text } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";

// const BlogPost = () => {
//   const params = useLocalSearchParams();
//   console.log("------------------------------------", params);

//   return (
//     <View>
//       <Text>
//         This is slug from dynamic segment and your slug is: {params.slug}
//       </Text>
//     </View>
//   );
// };

// export default BlogPost;

/*********************************************** */

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import axios from "axios";
// import { ArrowLeft, Calendar, User } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// interface BlogPost {
//   id: number;
//   Title: string;
//   Author: string;
//   Content: string;
//   Category: string;
//   SubCategory: string | null;
//   publishedAt: string;
//   SEODescription: string;
// }

// const BlogPostDetail = () => {
//   const { slug } = useLocalSearchParams();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     fetchPost();
//   }, [slug]);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?filters[Slug][$eq]=${slug}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//           },
//         }
//       );

//       if (response.data.data?.[0]) {
//         setPost(response.data.data[0]);
//       } else {
//         setError("Post not found");
//       }
//     } catch (err) {
//       console.error("Error fetching post:", err);
//       setError("Failed to load blog post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (error || !post) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-red-500 text-base">{error}</Text>
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
//           {/* Header with Back Button */}
//           <View className="p-4 flex-row items-center justify-between">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//             {post.Category && (
//               <Text className="text-sm text-gray-600 font-medium">
//                 {post.Category}
//               </Text>
//             )}
//           </View>

//           {/* Title Section */}
//           <View className="px-4 py-2">
//             <Text className="text-2xl font-bold text-gray-900 mb-4 text-right leading-10">
//               {post.Title}
//             </Text>

//             {/* Meta Information */}
//             <View className="flex-row items-center justify-end gap-4 mb-6">
//               <View className="flex-row items-center">
//                 <Text className="text-gray-600 text-sm ml-2">
//                   {post.Author}
//                 </Text>
//                 <User size={16} color="#666666" />
//               </View>
//               <View className="flex-row items-center">
//                 <Text className="text-gray-600 text-sm ml-2">
//                   {new Date(post.publishedAt).toLocaleDateString("ar-KW")}
//                 </Text>
//                 <Calendar size={16} color="#666666" />
//               </View>
//             </View>
//           </View>

//           {/* Description */}
//           {/* {post.SEODescription && (
//             <View className="px-4 py-2 mb-4">
//               <Text className="text-gray-600 text-base text-right leading-10">
//                 {post.SEODescription}
//               </Text>
//               <View className=" mt-4 w-[50%] border-b-2 border-red-400 m-auto"></View>
//             </View>
//           )} */}

//           {/* Main Content */}
//           <View className="px-4 leading-4 w-full">
//             <RenderHtml
//               contentWidth={width}
//               source={{ html: post.Content }}
//               tagsStyles={{
//                 body: {
//                   color: "#1a1a1a",
//                   fontSize: 16,
//                   lineHeight: 24,
//                   textAlign: "right",
//                 },
//                 p: {
//                   marginBottom: 16,
//                   textAlign: "right",
//                   marginVertical: 20,
//                   lineHeight: 40,
//                 },
//                 h1: {
//                   fontSize: 24,
//                   fontWeight: "bold",
//                   marginVertical: 16,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 h2: {
//                   fontSize: 22,
//                   fontWeight: "bold",
//                   marginVertical: 14,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 h3: {
//                   width: "100%",
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   marginVertical: 12,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 img: {
//                   borderRadius: 12,
//                   marginVertical: 16,
//                 },
//                 a: {
//                   color: "#2196F3",
//                   textDecorationLine: "none",
//                 },
//                 figure: {
//                   marginVertical: 16,
//                 },
//                 figcaption: {
//                   textAlign: "center",
//                   color: "#666",
//                   fontSize: 14,
//                   marginTop: 8,
//                 },
//               }}
//             />
//           </View>

//           {/* Bottom Padding */}
//           <View className="h-8" />
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// };

// export default BlogPostDetail;

/************************************************************* */

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { MotiView } from "moti";
// import axios from "axios";
// import { ArrowLeft, Calendar, User } from "lucide-react-native";
// import RenderHtml from "react-native-render-html";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   useQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// const { width } = Dimensions.get("window");

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
//       cacheTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
//       retry: 2,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// interface BlogPost {
//   id: number;
//   Title: string;
//   Author: string;
//   Content: string;
//   Category: string;
//   SubCategory: string | null;
//   publishedAt: string;
//   SEODescription: string;
// }

// // API function separated for better organization
// const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
//   const response = await axios.get(
//     `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?filters[Slug][$eq]=${slug}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
//       },
//     }
//   );

//   if (!response.data.data?.[0]) {
//     throw new Error("Post not found");
//   }

//   return response.data.data[0];
// };

// // Wrapper component for QueryClientProvider
// export default function BlogPostDetailWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BlogPostDetail />
//     </QueryClientProvider>
//   );
// }

// function BlogPostDetail() {
//   const { slug } = useLocalSearchParams();
//   const insets = useSafeAreaInsets();
//   const queryClient = useQueryClient();

//   // Use React Query for data fetching and caching
//   const {
//     data: post,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["blogPost", slug],
//     queryFn: () => fetchBlogPost(String(slug)),
//     enabled: !!slug,
//   });

//   // Prefetch related posts
//   useEffect(() => {
//     if (post?.Category) {
//       queryClient.prefetchQuery({
//         queryKey: ["relatedPosts", post.Category],
//         queryFn: () => fetchBlogPost(String(slug)),
//       });
//     }
//   }, [post?.Category]);

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#2196F3" />
//       </View>
//     );
//   }

//   if (isError || !post) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-red-500 text-base">
//           {error instanceof Error ? error.message : "Failed to load blog post"}
//         </Text>
//         <Pressable
//           className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
//           onPress={() => refetch()}
//         >
//           <Text className="text-white font-medium">Try Again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         onScrollBeginDrag={() => {
//           // Prefetch next post if available
//           if (post.id) {
//             queryClient.prefetchQuery({
//               queryKey: ["blogPost", post.id + 1],
//               queryFn: () => fetchBlogPost(String(post.id + 1)),
//             });
//           }
//         }}
//       >
//         <MotiView
//           from={{ opacity: 0, translateY: 50 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           {/* Header with Back Button */}
//           <View className="p-4 flex-row items-center justify-between">
//             <Pressable
//               className="p-2 rounded-xl bg-gray-100"
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={24} color="#000" />
//             </Pressable>
//             {post.Category && (
//               <Text className="text-sm text-gray-600 font-medium">
//                 {post.Category}
//               </Text>
//             )}
//           </View>

//           {/* Title Section */}
//           <View className="px-4 py-2">
//             <Text className="text-2xl font-bold text-gray-900 mb-4 text-right leading-10">
//               {post.Title}
//             </Text>

//             {/* Meta Information */}
//             <View className="flex-row items-center justify-end gap-4 mb-6">
//               <View className="flex-row items-center">
//                 <Text className="text-gray-600 text-sm ml-2">
//                   {post.Author}
//                 </Text>
//                 <User size={16} color="#666666" />
//               </View>
//               <View className="flex-row items-center">
//                 <Text className="text-gray-600 text-sm ml-2">
//                   {new Date(post.publishedAt).toLocaleDateString("ar-KW")}
//                 </Text>
//                 <Calendar size={16} color="#666666" />
//               </View>
//             </View>
//           </View>

//           {/* Main Content */}
//           <View className="px-4 leading-4 w-full">
//             <RenderHtml
//               contentWidth={width}
//               source={{ html: post.Content }}
//               tagsStyles={{
//                 body: {
//                   color: "#1a1a1a",
//                   fontSize: 16,
//                   lineHeight: 24,
//                   textAlign: "right",
//                 },
//                 p: {
//                   marginBottom: 16,
//                   textAlign: "right",
//                   marginVertical: 20,
//                   lineHeight: 40,
//                 },
//                 h1: {
//                   fontSize: 24,
//                   fontWeight: "bold",
//                   marginVertical: 16,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 h2: {
//                   fontSize: 22,
//                   fontWeight: "bold",
//                   marginVertical: 14,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 h3: {
//                   width: "100%",
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   marginVertical: 12,
//                   textAlign: "right",
//                   lineHeight: 100,
//                 },
//                 img: {
//                   borderRadius: 12,
//                   marginVertical: 16,
//                 },
//                 a: {
//                   color: "#2196F3",
//                   textDecorationLine: "none",
//                 },
//                 figure: {
//                   marginVertical: 16,
//                 },
//                 figcaption: {
//                   textAlign: "center",
//                   color: "#666",
//                   fontSize: 14,
//                   marginTop: 8,
//                 },
//               }}
//             />
//           </View>

//           {/* Bottom Padding */}
//           <View className="h-8" />
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

/************************************* */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MotiView } from "moti";
import axios from "axios";
import { ArrowLeft, Calendar, User } from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderHTML from "@builder.io/react-native-render-html";

const { width } = Dimensions.get("window");

interface BlogPost {
  id: number;
  Title: string;
  Author: string;
  Content: string;
  Category: string;
  SubCategory: string | null;
  publishedAt: string;
  SEODescription: string;
}

const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/blog-posts?filters[Slug][$eq]=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_BLOG}`,
        },
      }
    );

    if (!response.data.data?.[0]) {
      throw new Error("المقال غير موجود");
    }

    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("فشل في تحميل المقال");
  }
};

const HeaderComponent = ({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) => (
  <MotiView
    from={{ opacity: 0, translateY: -20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "spring", damping: 15 }}
  >
    <View className="p-4 flex-row items-center justify-between">
      <Pressable
        onPress={onBack}
        className="p-2 rounded-xl bg-gray-50 active:bg-gray-100"
        style={Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: { elevation: 2 },
        })}
      >
        <ArrowLeft size={24} color="#374151" />
      </Pressable>
      {post.Category && (
        <Text className="text-sm text-gray-600 font-medium">
          {post.Category}
        </Text>
      )}
    </View>
  </MotiView>
);

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => fetchBlogPost(String(slug)),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const handleBack = () => {
    router.back();
  };

  const renderersProps = {
    h1: {
      baseStyle: {
        fontSize: 24,
        lineHeight: 60,
        marginVertical: 16,
        fontWeight: "700",
        color: "#111827",
        textAlign: "right",
      },
    },
    h2: {
      baseStyle: {
        fontSize: 22,
        lineHeight: 60,
        marginVertical: 14,
        fontWeight: "600",
        color: "#111827",
        textAlign: "right",
      },
    },
    h3: {
      baseStyle: {
        fontSize: 20,
        lineHeight: 60,
        marginVertical: 12,
        fontWeight: "600",
        color: "#111827",
        textAlign: "right",
      },
    },
    h4: {
      baseStyle: {
        fontSize: 18,
        lineHeight: 60,
        marginVertical: 10,
        fontWeight: "600",
        color: "#111827",
        textAlign: "right",
      },
    },
    p: {
      baseStyle: {
        fontSize: 16,
        lineHeight: 60,
        marginVertical: 8,
        color: "#374151",
        textAlign: "right",
      },
    },
  };

  if (isLoading) {
    return (
      <MotiView
        className="flex-1 justify-center items-center bg-white"
        style={{ paddingTop: insets.top }}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 300 }}
      >
        <ActivityIndicator size="large" color="#16A34A" />
        <Text className="mt-4 text-gray-600">جاري التحميل...</Text>
      </MotiView>
    );
  }

  if (isError || !post) {
    return (
      <MotiView
        className="flex-1 justify-center items-center bg-white p-4"
        style={{ paddingTop: insets.top }}
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <Text className="text-red-500 text-center mb-4 text-lg">
          {error instanceof Error ? error.message : "حدث خطأ"}
        </Text>
        <Pressable
          onPress={() => refetch()}
          className="bg-green-500 px-6 py-3 rounded-xl active:bg-green-600"
        >
          <Text className="text-white font-medium">المحاولة مرة أخرى</Text>
        </Pressable>
      </MotiView>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <HeaderComponent post={post} onBack={handleBack} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="px-4"
        >
          <Text className="text-2xl font-bold text-gray-900 mb-4 text-right leading-loose">
            {post.Title}
          </Text>

          <View className="flex-row items-center justify-end gap-4 mb-6">
            <View className="flex-row items-center">
              <Text className="text-gray-600 text-sm ml-2">{post.Author}</Text>
              <User size={16} color="#666666" />
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-600 text-sm ml-2">
                {new Date(post.publishedAt).toLocaleDateString("ar-KW")}
              </Text>
              <Calendar size={16} color="#666666" />
            </View>
          </View>
          <View className="flex ">
            <RenderHTML
              source={{ html: post.Content }}
              contentWidth={width - 32}
              baseStyle={{
                color: "#374151",
                fontSize: 16,
                lineHeight: 40,
                textAlign: "right",
                paddingVertical: 20,
              }}
              renderersProps={renderersProps}
              enableExperimentalGhostLinesPrevention
              enableExperimentalMarginCollapsing
              defaultTextProps={{
                selectable: true,
              }}
              systemFonts={["Cairo", "Cairo-Bold", "Cairo-SemiBold"]}
            />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
