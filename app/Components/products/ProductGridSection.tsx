// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Animated,
//   Platform,
// } from "react-native";
// import { BlurView } from "@react-native-community/blur";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Haptics from "expo-haptics";

// const { width } = Dimensions.get("window");
// const COLUMN_COUNT = 2;
// const GRID_GAP = 12;
// const ITEM_WIDTH = (width - 32 - GRID_GAP) / COLUMN_COUNT;
// const ITEMS_PER_PAGE = 6; // 3 rows × 2 columns

// const ProductGridSection = ({ products, onProductPress }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const scrollY = new Animated.Value(0);

//   const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
//   const paginatedProducts = products.slice(0, currentPage * ITEMS_PER_PAGE);

//   const renderProduct = ({ item, index }) => {
//     const inputRange = [
//       -1,
//       0,
//       (index + 1) * (ITEM_WIDTH + GRID_GAP) * 0.5,
//       (index + 2) * (ITEM_WIDTH + GRID_GAP),
//     ];

//     const scale = scrollY.interpolate({
//       inputRange,
//       outputRange: [1, 1, 1, 0.9],
//     });

//     const opacity = scrollY.interpolate({
//       inputRange,
//       outputRange: [1, 1, 1, 0.8],
//     });

//     return (
//       <Animated.View
//         style={[
//           styles.productWrapper,
//           {
//             transform: [{ scale }],
//             opacity,
//           },
//         ]}
//       >
//         <TouchableOpacity
//           style={styles.productCard}
//           onPress={() => {
//             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//             onProductPress?.(item);
//           }}
//           activeOpacity={0.95}
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: item.primaryImage[0]?.formats?.medium?.url }}
//               style={styles.productImage}
//               resizeMode="cover"
//             />
//             <LinearGradient
//               colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
//               style={styles.imageGradient}
//             />
//           </View>
//           <BlurView intensity={80} style={styles.productInfo}>
//             <Text style={styles.productName} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <Text style={styles.productPrice}>{item.price.toFixed(3)} KWD</Text>
//             <View style={styles.categoryPill}>
//               <Text style={styles.categoryText}>{item.Category}</Text>
//             </View>
//           </BlurView>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   const loadMore = async () => {
//     if (currentPage < totalPages && !loadingMore) {
//       setLoadingMore(true);
//       // Simulate loading delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setCurrentPage((prev) => prev + 1);
//       setLoadingMore(false);
//     }
//   };

//   const renderPaginationDots = () => {
//     const dots = [];
//     const maxVisibleDots = 5;
//     let startDot = Math.max(1, currentPage - 2);
//     let endDot = Math.min(totalPages, startDot + maxVisibleDots - 1);

//     // Adjust start if we're near the end
//     if (endDot === totalPages) {
//       startDot = Math.max(1, endDot - maxVisibleDots + 1);
//     }

//     // First page dot
//     if (startDot > 1) {
//       dots.push(
//         <TouchableOpacity
//           key="1"
//           style={[styles.paginationDot, currentPage === 1 && styles.activeDot]}
//           onPress={() => setCurrentPage(1)}
//         >
//           <Text
//             style={[styles.dotText, currentPage === 1 && styles.activeDotText]}
//           >
//             1
//           </Text>
//         </TouchableOpacity>
//       );
//       if (startDot > 2) dots.push(<Text key="startEllipsis">...</Text>);
//     }

//     // Visible page dots
//     for (let i = startDot; i <= endDot; i++) {
//       dots.push(
//         <TouchableOpacity
//           key={i}
//           style={[styles.paginationDot, currentPage === i && styles.activeDot]}
//           onPress={() => setCurrentPage(i)}
//         >
//           <Text
//             style={[styles.dotText, currentPage === i && styles.activeDotText]}
//           >
//             {i}
//           </Text>
//         </TouchableOpacity>
//       );
//     }

//     // Last page dot
//     if (endDot < totalPages) {
//       if (endDot < totalPages - 1)
//         dots.push(<Text key="endEllipsis">...</Text>);
//       dots.push(
//         <TouchableOpacity
//           key={totalPages}
//           style={[
//             styles.paginationDot,
//             currentPage === totalPages && styles.activeDot,
//           ]}
//           onPress={() => setCurrentPage(totalPages)}
//         >
//           <Text
//             style={[
//               styles.dotText,
//               currentPage === totalPages && styles.activeDotText,
//             ]}
//           >
//             {totalPages}
//           </Text>
//         </TouchableOpacity>
//       );
//     }

//     return dots;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionHeader}>All Products</Text>

//       <FlatList
//         data={paginatedProducts}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={COLUMN_COUNT}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.gridContainer}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         ListFooterComponent={() => (
//           <View style={styles.footer}>
//             {loadingMore && (
//               <ActivityIndicator
//                 size="small"
//                 color="#0066CC"
//                 style={styles.loadingIndicator}
//               />
//             )}
//             <View style={styles.pagination}>{renderPaginationDots()}</View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingTop: 24,
//     backgroundColor: "#f8f9fa",
//   },
//   sectionHeader: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     color: "#1a1a1a",
//   },
//   gridContainer: {
//     paddingBottom: 24,
//   },
//   productWrapper: {
//     width: ITEM_WIDTH,
//     marginBottom: GRID_GAP,
//     marginHorizontal: GRID_GAP / 2,
//   },
//   productCard: {
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#fff",
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
//   imageContainer: {
//     height: ITEM_WIDTH * 1.2,
//     width: "100%",
//   },
//   productImage: {
//     width: "100%",
//     height: "100%",
//   },
//   imageGradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "50%",
//   },
//   productInfo: {
//     padding: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#1a1a1a",
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#EE4B2B",
//     marginBottom: 8,
//   },
//   categoryPill: {
//     backgroundColor: "#f1f3f5",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: "flex-start",
//   },
//   categoryText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   footer: {
//     paddingVertical: 20,
//     alignItems: "center",
//   },
//   loadingIndicator: {
//     marginBottom: 12,
//   },
//   pagination: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   paginationDot: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f1f3f5",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   activeDot: {
//     backgroundColor: "#0066CC",
//   },
//   dotText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   activeDotText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

// export default ProductGridSection;

/***************************************** */
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const GRID_GAP = 12;
const ITEM_WIDTH = (width - 32 - GRID_GAP) / COLUMN_COUNT;
const ITEMS_PER_PAGE = 6; // 3 rows × 2 columns

const ProductGridSection = ({ products, onProductPress }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollY = new Animated.Value(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(0, currentPage * ITEMS_PER_PAGE);

  const renderProduct = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      (index + 1) * (ITEM_WIDTH + GRID_GAP) * 0.5,
      (index + 2) * (ITEM_WIDTH + GRID_GAP),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.9],
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8],
    });

    return (
      <Animated.View
        style={[
          styles.productWrapper,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onProductPress?.(item);
          }}
          activeOpacity={0.95}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.primaryImage[0]?.formats?.medium?.url }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
              style={styles.imageGradient}
            />
          </View>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Light translucent
                padding: 12,
              },
            ]}
          >
            <Text style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.productPrice}>{item.price.toFixed(3)} KWD</Text>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{item.Category}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const loadMore = async () => {
    if (currentPage < totalPages && !loadingMore) {
      setLoadingMore(true);
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPage((prev) => prev + 1);
      setLoadingMore(false);
    }
  };

  const renderPaginationDots = () => {
    const dots = [];
    const maxVisibleDots = 5;
    let startDot = Math.max(1, currentPage - 2);
    let endDot = Math.min(totalPages, startDot + maxVisibleDots - 1);

    // Adjust start if we're near the end
    if (endDot === totalPages) {
      startDot = Math.max(1, endDot - maxVisibleDots + 1);
    }

    // First page dot
    if (startDot > 1) {
      dots.push(
        <TouchableOpacity
          key="1"
          style={[styles.paginationDot, currentPage === 1 && styles.activeDot]}
          onPress={() => setCurrentPage(1)}
        >
          <Text
            style={[styles.dotText, currentPage === 1 && styles.activeDotText]}
          >
            1
          </Text>
        </TouchableOpacity>
      );
      if (startDot > 2) dots.push(<Text key="startEllipsis">...</Text>);
    }

    // Visible page dots
    for (let i = startDot; i <= endDot; i++) {
      dots.push(
        <TouchableOpacity
          key={i}
          style={[styles.paginationDot, currentPage === i && styles.activeDot]}
          onPress={() => setCurrentPage(i)}
        >
          <Text
            style={[styles.dotText, currentPage === i && styles.activeDotText]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    // Last page dot
    if (endDot < totalPages) {
      if (endDot < totalPages - 1)
        dots.push(<Text key="endEllipsis">...</Text>);
      dots.push(
        <TouchableOpacity
          key={totalPages}
          style={[
            styles.paginationDot,
            currentPage === totalPages && styles.activeDot,
          ]}
          onPress={() => setCurrentPage(totalPages)}
        >
          <Text
            style={[
              styles.dotText,
              currentPage === totalPages && styles.activeDotText,
            ]}
          >
            {totalPages}
          </Text>
        </TouchableOpacity>
      );
    }

    return dots;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>All Products</Text>

      <FlatList
        data={paginatedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loadingMore && (
              <ActivityIndicator
                size="small"
                color="#0066CC"
                style={styles.loadingIndicator}
              />
            )}
            <View style={styles.pagination}>{renderPaginationDots()}</View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#f8f9fa",
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  gridContainer: {
    paddingBottom: 24,
  },
  productWrapper: {
    width: ITEM_WIDTH,
    marginBottom: GRID_GAP,
    marginHorizontal: GRID_GAP / 2,
  },
  productCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    height: ITEM_WIDTH * 1.2,
    width: "100%",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  productInfo: {
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EE4B2B",
    marginBottom: 8,
  },
  categoryPill: {
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingIndicator: {
    marginBottom: 12,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  paginationDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f3f5",
    alignItems: "center",
    justifyContent: "center",
  },
  activeDot: {
    backgroundColor: "#0066CC",
  },
  dotText: {
    fontSize: 14,
    color: "#666",
  },
  activeDotText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ProductGridSection;
