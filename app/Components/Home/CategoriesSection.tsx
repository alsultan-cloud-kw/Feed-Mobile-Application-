/***************************** */
// Old code

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import { MotiView } from "moti";

// interface CategoryImage {
//   formats: {
//     large: {
//       url: string;
//     };
//   };
// }

// interface Category {
//   id: number;
//   title: string;
//   categoryImage: CategoryImage;
// }

// interface CategoriesSectionProps {
//   categories: Category[];
//   onCategoryPress?: (category: Category) => void;
//   isLoading?: boolean;
// }

// const CategorySkeleton = () => (
//   <View className="items-center mx-2">
//     <View className="mb-3 bg-gray-200 rounded-lg w-32 h-10 animate-pulse" />
//     <View className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <CategorySkeleton />}
//       keyExtractor={(item) => item.toString()}
//       ItemSeparatorComponent={() => <View className="w-4" />}
//     />
//   </View>
// );

// const CategoryItem: React.FC<{
//   item: Category;
//   index: number;
//   onPress: (category: Category) => void;
// }> = ({ item, index, onPress }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{
//         type: "timing",
//         duration: 500,
//         delay: index * 100,
//       }}
//       className="items-center mx-2"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.7}
//         className="items-center"
//       >
//         <View className="mb-3">
//           <MotiView
//             from={{ translateY: 0 }}
//             animate={{ translateY: [0, -4, 0] }}
//             transition={{
//               type: "timing",
//               duration: 2000,
//               loop: true,
//             }}
//             className="bg-gradient-to-r from-red-700/90 to-green-800/90 rounded-xl px-5 py-2.5 shadow-lg shadow-black/5"
//           >
//             <Text className="text-black font-bold text-base">{item.title}</Text>
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ rotate: "0deg" }}
//           animate={{ rotate: ["0deg", "2deg", "-2deg", "0deg"] }}
//           transition={{
//             type: "timing",
//             duration: 2000,
//             loop: true,
//             delay: index * 200,
//           }}
//         >
//           <Image
//             source={{ uri: item.categoryImage.formats.large.url }}
//             className="w-32 h-32 rounded-full"
//             resizeMode="cover"
//           />
//           {/* Overlay gradient */}
//           <View className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/20 to-green-700/20" />

//           {/* Ring effect */}
//           <View className="absolute -inset-1 rounded-full border-2 border-red-500/20" />
//           <View className="absolute -inset-2 rounded-full border-2 border-green-500/10" />
//         </MotiView>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const CategoriesSection: React.FC<CategoriesSectionProps> = ({
//   categories,
//   onCategoryPress = () => {},
//   isLoading = false,
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <View className="py-4">
//       <View className="px-4 mb-5">
//         <Text className="text-2xl font-bold text-gray-900">Categories</Text>
//         <Text className="text-sm text-gray-600 mt-1">Browse by category</Text>
//       </View>

//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <CategoryItem item={item} index={index} onPress={onCategoryPress} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//         snapToInterval={144} // Width of item (128) + margin (16)
//         decelerationRate="fast"
//         snapToAlignment="start"
//       />
//     </View>
//   );
// };

// export default CategoriesSection;

/********************************** */

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import { MotiView } from "moti";

// interface CategoryImage {
//   formats: {
//     large: {
//       url: string;
//     };
//   };
// }

// interface Category {
//   id: number;
//   title: string;
//   categoryImage: CategoryImage;
// }

// interface CategoriesSectionProps {
//   categories: Category[];
//   onCategoryPress?: (category: Category) => void;
//   isLoading?: boolean;
// }

// const CategorySkeleton = () => (
//   <View className="items-center mx-2">
//     <View className="mb-3 bg-gray-200 rounded-lg w-32 h-10 animate-pulse" />
//     <View className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
//   </View>
// );

// const LoadingSkeleton = () => (
//   <View className="px-4">
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={() => <CategorySkeleton />}
//       keyExtractor={(item) => item.toString()}
//       ItemSeparatorComponent={() => <View className="w-4" />}
//     />
//   </View>
// );

// const CategoryItem: React.FC<{
//   item: Category;
//   index: number;
//   onPress: (category: Category) => void;
// }> = ({ item, index, onPress }) => {
//   return (
//     <MotiView
//       from={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{
//         type: "timing",
//         duration: 500,
//         delay: index * 100,
//       }}
//       className="items-center mx-2"
//     >
//       <TouchableOpacity
//         onPress={() => onPress(item)}
//         activeOpacity={0.7}
//         className="items-center"
//       >
//         <View className="mb-3">
//           <MotiView
//             from={{ translateY: 0 }}
//             animate={{ translateY: [0, -4, 0] }}
//             transition={{
//               type: "timing",
//               duration: 2000,
//               loop: true,
//             }}
//             className="bg-gradient-to-r from-red-700/90 to-green-800/90 rounded-xl px-5 py-2.5 shadow-lg shadow-black/5"
//           >
//             <Text className="text-black font-bold text-base">{item.title}</Text>
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ rotate: "0deg" }}
//           animate={{ rotate: ["0deg", "2deg", "-2deg", "0deg"] }}
//           transition={{
//             type: "timing",
//             duration: 2000,
//             loop: true,
//             delay: index * 200,
//           }}
//         >
//           <Image
//             source={{ uri: item.categoryImage.formats.large.url }}
//             className="w-32 h-32 rounded-full"
//             resizeMode="cover"
//           />
//           {/* Overlay gradient */}
//           <View className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/20 to-green-700/20" />

//           {/* Ring effect */}
//           <View className="absolute -inset-1 rounded-full border-2 border-red-500/20" />
//           <View className="absolute -inset-2 rounded-full border-2 border-green-500/10" />
//         </MotiView>
//       </TouchableOpacity>
//     </MotiView>
//   );
// };

// const CategoriesSection: React.FC<CategoriesSectionProps> = ({
//   categories,
//   onCategoryPress = () => {},
//   isLoading = false,
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <View className="py-4">
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <CategoryItem item={item} index={index} onPress={onCategoryPress} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//         snapToInterval={144} // Width of item (128) + margin (16)
//         decelerationRate="fast"
//         snapToAlignment="start"
//       />
//     </View>
//   );
// };

// export default CategoriesSection;

/************************** */

// import React, { useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   Image,
//   StyleSheet,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { MotiView } from "moti";
// import { router } from "expo-router";
// import * as Haptics from "expo-haptics";
// import { LinearGradient } from "expo-linear-gradient";

// interface CategoryImage {
//   formats: {
//     large: {
//       url: string;
//     };
//   };
// }

// interface Category {
//   id: number;
//   title: string;
//   categoryImage: CategoryImage;
// }

// interface CategoriesSectionProps {
//   categories: Category[];
//   isLoading?: boolean;
// }

// const CategorySkeleton = React.memo(() => (
//   <MotiView
//     from={{ opacity: 0.5 }}
//     animate={{ opacity: 1 }}
//     transition={{
//       type: "timing",
//       duration: 1000,
//       loop: true,
//       repeatReverse: true,
//     }}
//     style={styles.skeletonContainer}
//   >
//     <View style={styles.skeletonTitle} />
//     <View style={styles.skeletonImage} />
//   </MotiView>
// ));

// const LoadingSkeleton = React.memo(() => (
//   <View style={styles.loadingContainer}>
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={({ index }) => (
//         <MotiView
//           from={{ opacity: 0, translateX: 20 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: index * 100 }}
//         >
//           <CategorySkeleton />
//         </MotiView>
//       )}
//       keyExtractor={(item) => item.toString()}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       contentContainerStyle={styles.skeletonList}
//     />
//   </View>
// ));

// const CategoryItem = React.memo(
//   ({ item, index }: { item: Category; index: number }) => {
//     const handlePress = useCallback(async () => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         router.push({
//           pathname: "/(root)/(tabs)/(store)",
//           params: { category: item.id },
//         });
//       } catch (error) {
//         console.error("Navigation error:", error);
//       }
//     }, [item.id]);

//     return (
//       <MotiView
//         from={{ opacity: 0, scale: 0.9, translateY: 10 }}
//         animate={{ opacity: 1, scale: 1, translateY: 0 }}
//         transition={{
//           type: "spring",
//           damping: 15,
//           delay: index * 100,
//         }}
//         style={styles.categoryContainer}
//       >
//         <Pressable
//           onPress={handlePress}
//           style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
//         >
//           <MotiView
//             from={{ translateY: 0 }}
//             animate={{ translateY: [0, -4, 0] }}
//             transition={{
//               type: "timing",
//               duration: 2000,
//               loop: true,
//               delay: index * 200,
//             }}
//             style={styles.titleContainer}
//           >
//             <LinearGradient
//               colors={["#4ECB71", "#34D399"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradient}
//             >
//               <Text style={styles.title} numberOfLines={1}>
//                 {item.title}
//               </Text>
//             </LinearGradient>
//           </MotiView>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: ["0deg", "2deg", "-2deg", "0deg"] }}
//             transition={{
//               type: "timing",
//               duration: 4000,
//               loop: true,
//               delay: index * 200,
//             }}
//             style={styles.imageContainer}
//           >
//             <Image
//               source={{ uri: item.categoryImage.formats.large.url }}
//               style={styles.image}
//               resizeMode="cover"
//             />
//             <LinearGradient
//               colors={["rgba(78, 203, 113, 0.2)", "rgba(52, 211, 153, 0.2)"]}
//               style={styles.imageOverlay}
//             />
//             <View style={styles.innerRing} />
//             <View style={styles.outerRing} />
//           </MotiView>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const CategoriesSection: React.FC<CategoriesSectionProps> = ({
//   categories,
//   isLoading = false,
// }) => {
//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <CategoryItem item={item} index={index} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.list}
//         snapToInterval={180}
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 16,
//   },
//   list: {
//     paddingHorizontal: 16,
//   },
//   categoryContainer: {
//     alignItems: "center",
//     marginHorizontal: 8,
//   },
//   pressable: {
//     alignItems: "center",
//   },
//   pressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.98 }],
//   },
//   titleContainer: {
//     marginBottom: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   gradient: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 12,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   imageContainer: {
//     position: "relative",
//     width: 120,
//     height: 120,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   imageOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderRadius: 60,
//   },
//   innerRing: {
//     position: "absolute",
//     top: -4,
//     left: -4,
//     right: -4,
//     bottom: -4,
//     borderRadius: 64,
//     borderWidth: 1,
//     borderColor: "rgba(78, 203, 113, 0.2)",
//   },
//   outerRing: {
//     position: "absolute",
//     top: -8,
//     left: -8,
//     right: -8,
//     bottom: -8,
//     borderRadius: 68,
//     borderWidth: 1,
//     borderColor: "rgba(52, 211, 153, 0.1)",
//   },
//   loadingContainer: {
//     paddingVertical: 16,
//   },
//   skeletonContainer: {
//     alignItems: "center",
//     marginHorizontal: 8,
//   },
//   skeletonTitle: {
//     width: 100,
//     height: 32,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   skeletonImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#E5E7EB",
//   },
//   skeletonList: {
//     paddingHorizontal: 16,
//   },
//   separator: {
//     width: 16,
//   },
// });

// export default React.memo(CategoriesSection);

/***************************** */

// import React, { useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   Image,
//   StyleSheet,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { MotiView } from "moti";
// import { router } from "expo-router";
// import * as Haptics from "expo-haptics";
// import { LinearGradient } from "expo-linear-gradient";

// interface CategoryImage {
//   formats: {
//     large: { url: string };
//   };
// }

// interface Category {
//   id: number;
//   title: string;
//   categoryImage: CategoryImage;
// }

// interface CategoriesSectionProps {
//   categories: Category[];
//   isLoading?: boolean;
// }

// const CategorySkeleton = React.memo(() => (
//   <MotiView
//     from={{ opacity: 0.5 }}
//     animate={{ opacity: 1 }}
//     transition={{ type: "timing", duration: 1000, loop: true }}
//     style={styles.skeletonContainer}
//   >
//     <View style={styles.skeletonTitle} />
//     <View style={styles.skeletonImage} />
//   </MotiView>
// ));

// const LoadingSkeleton = React.memo(() => (
//   <View style={styles.loadingContainer}>
//     <FlatList
//       data={[1, 2, 3]}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       renderItem={({ index }) => (
//         <MotiView
//           from={{ opacity: 0, translateX: 20 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: index * 100 }}
//         >
//           <CategorySkeleton />
//         </MotiView>
//       )}
//       keyExtractor={(item) => item.toString()}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       contentContainerStyle={styles.skeletonList}
//     />
//   </View>
// ));

// const CategoryItem = React.memo(
//   ({ item, index }: { item: Category; index: number }) => {
//     const handlePress = useCallback(async () => {
//       try {
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         router.push({
//           pathname: "/(root)/(tabs)/(store)",
//           params: { category: item.title }, // Use title instead of id
//         });
//       } catch (error) {
//         console.error("Navigation error:", error);
//       }
//     }, [item.title]);

//     return (
//       <MotiView
//         from={{ opacity: 0, scale: 0.9, translateY: 10 }}
//         animate={{ opacity: 1, scale: 1, translateY: 0 }}
//         transition={{ type: "spring", damping: 15, delay: index * 100 }}
//         style={styles.categoryContainer}
//       >
//         <Pressable
//           onPress={handlePress}
//           style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
//         >
//           <MotiView
//             from={{ translateY: 0 }}
//             animate={{ translateY: [0, -4, 0] }}
//             transition={{
//               type: "timing",
//               duration: 2000,
//               loop: true,
//               delay: index * 200,
//             }}
//             style={styles.titleContainer}
//           >
//             <LinearGradient
//               colors={["#4ECB71", "#34D399"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradient}
//             >
//               <Text style={styles.title} numberOfLines={1}>
//                 {item.title}
//               </Text>
//             </LinearGradient>
//           </MotiView>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: ["0deg", "2deg", "-2deg", "0deg"] }}
//             transition={{
//               type: "timing",
//               duration: 4000,
//               loop: true,
//               delay: index * 200,
//             }}
//             style={styles.imageContainer}
//           >
//             <Image
//               source={{ uri: item.categoryImage.formats.large.url }}
//               style={styles.image}
//               resizeMode="cover"
//               defaultSource={require("../../../assets/product-placeholder.png")} // Add placeholder
//             />
//             <LinearGradient
//               colors={["rgba(78, 203, 113, 0.2)", "rgba(52, 211, 153, 0.2)"]}
//               style={styles.imageOverlay}
//             />
//             <View style={styles.innerRing} />
//             <View style={styles.outerRing} />
//           </MotiView>
//         </Pressable>
//       </MotiView>
//     );
//   }
// );

// const CategoriesSection: React.FC<CategoriesSectionProps> = ({
//   categories,
//   isLoading = false,
// }) => {
//   if (isLoading) return <LoadingSkeleton />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <CategoryItem item={item} index={index} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.list}
//         snapToInterval={180}
//         decelerationRate="fast"
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { paddingVertical: 16 },
//   list: { paddingHorizontal: 16 },
//   categoryContainer: { alignItems: "center", marginHorizontal: 8 },
//   pressable: { alignItems: "center" },
//   pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
//   titleContainer: {
//     marginBottom: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: { elevation: 3 },
//     }),
//   },
//   gradient: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
//   title: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   imageContainer: { position: "relative", width: 120, height: 120 },
//   image: { width: 120, height: 120, borderRadius: 60 },
//   imageOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderRadius: 60,
//   },
//   innerRing: {
//     position: "absolute",
//     top: -4,
//     left: -4,
//     right: -4,
//     bottom: -4,
//     borderRadius: 64,
//     borderWidth: 1,
//     borderColor: "rgba(78, 203, 113, 0.2)",
//   },
//   outerRing: {
//     position: "absolute",
//     top: -8,
//     left: -8,
//     right: -8,
//     bottom: -8,
//     borderRadius: 68,
//     borderWidth: 1,
//     borderColor: "rgba(52, 211, 153, 0.1)",
//   },
//   loadingContainer: { paddingVertical: 16 },
//   skeletonContainer: { alignItems: "center", marginHorizontal: 8 },
//   skeletonTitle: {
//     width: 100,
//     height: 32,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   skeletonImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#E5E7EB",
//   },
//   skeletonList: { paddingHorizontal: 16 },
//   separator: { width: 16 },
// });

// export default React.memo(CategoriesSection);

/******************************************************** */

import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { MotiView } from "moti";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryImage {
  formats: {
    large: { url: string };
  };
}

interface Category {
  id: number;
  title: string;
  categoryImage: CategoryImage;
}

interface CategoriesSectionProps {
  categories: Category[];
  isLoading?: boolean;
}

const CategorySkeleton = React.memo(() => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ type: "timing", duration: 1000, loop: true }}
    style={styles.skeletonContainer}
  >
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonTitle} />
  </MotiView>
));

const LoadingSkeleton = React.memo(() => (
  <View style={styles.loadingContainer}>
    <FlatList
      data={[1, 2, 3]}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ index }) => (
        <MotiView
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: index * 100 }}
        >
          <CategorySkeleton />
        </MotiView>
      )}
      keyExtractor={(item) => item.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.skeletonList}
    />
  </View>
));

const CategoryItem = React.memo(
  ({ item, index }: { item: Category; index: number }) => {
    const handlePress = useCallback(async () => {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({
          pathname: "/(root)/(tabs)/(store)",
          params: { category: item.title },
        });
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }, [item.title]);

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, delay: index * 100 }}
        style={styles.categoryContainer}
      >
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: [0, -4, 0] }}
            transition={{
              type: "timing",
              duration: 2000,
              loop: true,
              delay: index * 200,
            }}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: item.categoryImage.formats.large.url }}
              style={styles.image}
              resizeMode="cover"
              defaultSource={require("../../../assets/product-placeholder.png")}
            />
            <LinearGradient
              colors={["rgba(78, 203, 113, 0.2)", "rgba(52, 211, 153, 0.2)"]}
              style={styles.imageOverlay}
            />
            <View style={styles.innerRing} />
            <View style={styles.outerRing} />
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 400,
              delay: index * 200,
            }}
            style={styles.titleContainer}
          >
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </MotiView>
        </Pressable>
      </MotiView>
    );
  }
);

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  isLoading = false,
}) => {
  if (isLoading) return <LoadingSkeleton />;

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        snapToInterval={180}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 160,
  },
  pressable: {
    alignItems: "center",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  titleContainer: {
    marginTop: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
  },
  imageContainer: {
    position: "relative",
    width: 120,
    height: 120,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
  },
  innerRing: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: "rgba(78, 203, 113, 0.2)",
  },
  outerRing: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 68,
    borderWidth: 1,
    borderColor: "rgba(52, 211, 153, 0.1)",
  },
  loadingContainer: {
    paddingVertical: 16,
  },
  skeletonContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  skeletonTitle: {
    width: 100,
    height: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginTop: 12,
  },
  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E7EB",
  },
  skeletonList: {
    paddingHorizontal: 16,
  },
  separator: {
    width: 16,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 12
//   },
//   list: {
//     paddingHorizontal: 12
//   },
//   categoryContainer: {
//     alignItems: "center",
//     marginHorizontal: 6,
//     width: 140 // Reduced from 160
//   },
//   pressable: {
//     alignItems: "center"
//   },
//   pressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.98 }]
//   },
//   titleContainer: {
//     marginTop: 8, // Reduced from 12
//     paddingHorizontal: 4 // Reduced from 8
//   },
//   title: {
//     fontSize: 13, // Slightly reduced
//     fontWeight: "500",
//     color: "#4B5563",
//     textAlign: "center",
//     lineHeight: 18 // Reduced from 20
//   },
//   imageContainer: {
//     position: "relative",
//     width: 100, // Reduced from 120
//     height: 100 // Reduced from 120
//   },
//   image: {
//     width: 100, // Reduced from 120
//     height: 100, // Reduced from 120
//     borderRadius: 50 // Adjusted for new size
//   },
//   imageOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderRadius: 50
//   },
//   innerRing: {
//     position: "absolute",
//     top: -3, // Reduced from -4
//     left: -3,
//     right: -3,
//     bottom: -3,
//     borderRadius: 53,
//     borderWidth: 1,
//     borderColor: "rgba(78, 203, 113, 0.2)"
//   },
//   outerRing: {
//     position: "absolute",
//     top: -6, // Reduced from -8
//     left: -6,
//     right: -6,
//     bottom: -6,
//     borderRadius: 56,
//     borderWidth: 1,
//     borderColor: "rgba(52, 211, 153, 0.1)"
//   },
//   loadingContainer: {
//     paddingVertical: 12
//   },
//   skeletonContainer: {
//     alignItems: "center",
//     marginHorizontal: 6
//   },
//   skeletonTitle: {
//     width: 80, // Reduced from 100
//     height: 16, // Reduced from 20
//     backgroundColor: "#E5E7EB",
//     borderRadius: 4,
//     marginTop: 8 // Reduced from 12
//   },
//   skeletonImage: {
//     width: 100, // Reduced from 120
//     height: 100, // Reduced from 120
//     borderRadius: 50,
//     backgroundColor: "#E5E7EB"
//   },
//   skeletonList: {
//     paddingHorizontal: 12
//   },
//   separator: {
//     width: 12 // Reduced from 16
//   }
// });

export default React.memo(CategoriesSection);
