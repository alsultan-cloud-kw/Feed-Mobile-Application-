// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ImageBackground,
// } from "react-native";
// import { MotiView } from "moti";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");
// const BLOG_ITEM_WIDTH = width * 0.85;
// const BLOG_ITEM_HEIGHT = BLOG_ITEM_WIDTH * 1.2;

// interface BlogImage {
//   formats: {
//     medium: {
//       url: string;
//     };
//   };
// }

// interface BlogPost {
//   id: number;
//   Title: string;
//   Category: string;
//   Author: string;
//   publishedAt: string;
//   FeaturedImage: BlogImage;
// }

// interface BlogSectionProps {
//   blogs: BlogPost[];
//   onBlogPress?: (blog: BlogPost) => void;
//   isLoading?: boolean;
// }

// const BlogSkeleton = () => (
//   <View className="w-[85vw] h-[120vw] mr-4 rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
//     <View className="absolute bottom-0 left-0 right-0 p-6">
//       <View className="h-4 w-20 bg-gray-300 rounded mb-3" />
//       <View className="h-6 w-48 bg-gray-300 rounded mb-4" />
//       <View className="flex-row justify-between">
//         <View className="h-4 w-24 bg-gray-300 rounded" />
//         <View className="h-4 w-24 bg-gray-300 rounded" />
//       </View>
//     </View>
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <BlogSkeleton />}
//       keyExtractor={(item) => item.toString()}
//     />
//   </View>
// );

// const BlogCard: React.FC<{
//   item: BlogPost;
//   index: number;
//   onPress: (blog: BlogPost) => void;
// }> = ({ item, index, onPress }) => {
//   const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <MotiView
//       from={{ opacity: 0, translateX: 50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{
//         type: "timing",
//         duration: 600,
//         delay: index * 100,
//       }}
//       className="mr-4"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.95}
//         className="relative"
//       >
//         <View className="rounded-3xl overflow-hidden shadow-lg">
//           <ImageBackground
//             source={{ uri: item.FeaturedImage?.formats?.medium?.url }}
//             className={`w-[85vw] h-[120vw]`}
//             resizeMode="cover"
//           >
//             {/* Top gradient for category */}
//             <LinearGradient
//               colors={["rgba(0,0,0,0.4)", "transparent"]}
//               className="absolute top-0 left-0 right-0 h-24"
//             >
//               <View className="p-6">
//                 <View className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-1.5 self-start">
//                   <Text className="text-white font-medium text-sm">
//                     {item.Category}
//                   </Text>
//                 </View>
//               </View>
//             </LinearGradient>

//             {/* Bottom gradient for content */}
//             <LinearGradient
//               colors={["transparent", "rgba(0,0,0,0.95)"]}
//               className="absolute bottom-0 left-0 right-0 pt-24 pb-6 px-6"
//             >
//               <MotiView
//                 from={{ translateY: 20, opacity: 0 }}
//                 animate={{ translateY: 0, opacity: 1 }}
//                 transition={{ delay: 200 }}
//               >
//                 <Text
//                   className="text-xl font-bold text-white mb-3 leading-loose"
//                   numberOfLines={2}
//                 >
//                   {item.Title}
//                 </Text>

//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row items-center">
//                     <View className="w-4 h-4 rounded-full bg-red-500 mr-2" />
//                     <Text className="text-white/90 font-medium">
//                       {item.Author}
//                     </Text>
//                   </View>
//                 </View>
//                 <View className="flex-row items-center mt-1">
//                   <View className="w-4 h-4 rounded-full bg-red-500 mr-2 tran" />
//                   <Text className="text-white/70">{formattedDate}</Text>
//                 </View>
//               </MotiView>
//             </LinearGradient>
//           </ImageBackground>
//         </View>

//         {/* Reading time indicator */}
//         <View className="absolute top-20 right-6 bg-red-500/60 backdrop-blur-md rounded-full px-3 py-1">
//           <Text className="text-white text-xs">5 min read</Text>
//         </View>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const BlogSection: React.FC<BlogSectionProps> = ({
//   blogs,
//   onBlogPress = () => {},
//   isLoading = false,
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <View className="py-6">
//       <View className="px-4 mb-6">
//         <Text className="text-2xl font-bold text-gray-900 mb-2">
//           Latest Articles
//         </Text>
//         <Text className="text-base text-gray-600">
//           Stay updated with our newest stories
//         </Text>
//       </View>

//       <FlatList
//         data={blogs}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <BlogCard item={item} index={index} onPress={onBlogPress} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingLeft: 16 }}
//         snapToInterval={BLOG_ITEM_WIDTH + 16}
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// export default BlogSection;

/********************************************* */

import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const BLOG_ITEM_WIDTH = width * 0.7;
const BLOG_ITEM_HEIGHT = BLOG_ITEM_WIDTH * 0.8;

interface BlogImage {
  formats: {
    medium: {
      url: string;
    };
    small: {
      url: string;
    };
  };
}

interface BlogPost {
  id: number;
  Title: string;
  Slug: string;
  Category: string;
  Author: string;
  publishedAt: string;
  FeaturedImage: BlogImage;
  readingTime?: number;
}

interface BlogSectionProps {
  blogs: BlogPost[];
  isLoading?: boolean;
}

const BlogSkeleton = React.memo(() => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
      repeatReverse: true,
    }}
    style={{ width: BLOG_ITEM_WIDTH, height: BLOG_ITEM_HEIGHT }}
    className="mr-3 rounded-2xl overflow-hidden bg-gray-100"
  >
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.1)"]}
      className="absolute bottom-0 left-0 right-0 h-24 p-4"
    >
      <View className="h-2 w-16 bg-gray-200 rounded mb-2" />
      <View className="h-3 w-32 bg-gray-200 rounded" />
    </LinearGradient>
  </MotiView>
));

const BlogCard = React.memo(
  ({ item, index }: { item: BlogPost; index: number }) => {
    const formattedDate = new Date(item.publishedAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );

    const handlePress = useCallback(async () => {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({
          pathname: "/(root)/(tabs)/(blog)/post/[slug]",
          params: { slug: item.Slug },
        });
      } catch (error) {
        console.error("Navigation error:", error);
        Toast.show({
          type: "error",
          text1: "Failed to open article",
          position: "top",
          visibilityTime: 2000,
          topOffset: 60,
        });
      }
    }, [item.Slug]);

    const imageUrl = item.FeaturedImage?.formats?.small?.url;

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          damping: 15,
          delay: index * 100,
        }}
        style={{ width: BLOG_ITEM_WIDTH }}
        className="mr-3"
      >
        <Pressable
          onPress={handlePress}
          className="relative rounded-2xl overflow-hidden active:scale-98"
          style={{
            height: BLOG_ITEM_HEIGHT,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              },
              android: {
                elevation: 3,
              },
            }),
          }}
        >
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../../../assets/product-placeholder.png")
            }
            className="absolute inset-0 w-full h-full bg-gray-100"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            className="absolute bottom-0 left-0 right-0 pt-12 pb-4 px-4"
          >
            <View className="bg-green-500/90 rounded-full px-2 py-0.5 self-start mb-2">
              <Text className="text-white text-xs font-medium">
                {item.Category}
              </Text>
            </View>
            <Text
              className="text-white text-sm font-semibold mb-1 leading-loose"
              numberOfLines={2}
            >
              {item.Title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white/80 text-xs">By {item.Author}</Text>
              <Text className="text-white/70 text-xs">{formattedDate}</Text>
            </View>
          </LinearGradient>
          {item.readingTime && (
            <View className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5">
              <Text className="text-white text-xs">
                {item.readingTime} min read
              </Text>
            </View>
          )}
        </Pressable>
      </MotiView>
    );
  }
);

const BlogSection: React.FC<BlogSectionProps> = React.memo(
  ({ blogs, isLoading = false }) => {
    if (isLoading) {
      return (
        <View className="py-4">
          <Text className="text-base font-medium text-gray-600 mb-4 px-4">
            Latest Articles
          </Text>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={() => <BlogSkeleton />}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
      );
    }

    const validBlogs = blogs?.filter((blog) => blog && blog.id && blog.Title);

    return (
      <View className="py-4">
        <Text className="text-sm font-medium text-gray-600 mb-4 px-4">
          Latest Articles
        </Text>
        <FlatList
          data={validBlogs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BlogCard item={item} index={index} />
          )}
          keyExtractor={(item) => `blog-${item.id}`}
          contentContainerStyle={{ paddingLeft: 16 }}
          snapToInterval={BLOG_ITEM_WIDTH + 12}
          decelerationRate="fast"
          snapToAlignment="center"
        />
      </View>
    );
  }
);

BlogCard.displayName = "BlogCard";
BlogSkeleton.displayName = "BlogSkeleton";
BlogSection.displayName = "BlogSection";

export default BlogSection;
