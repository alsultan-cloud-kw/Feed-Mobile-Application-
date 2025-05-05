// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Platform,
//   Dimensions,
//   Image,
// } from "react-native";
// import React from "react";
// import Animated from "react-native-reanimated";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");

// const BannerSection = ({ banners }: { banners: any }) => {
//   return (
//     <View style={styles.section}>
//       <FlatList
//         data={banners}
//         renderItem={({ item }) => (
//           <Animated.View style={styles.bannerContainer}>
//             <LinearGradient
//               colors={["rgba(0,0,0,0.3)", "transparent"]}
//               style={styles.bannerGradient}
//             >
//               <Image
//                 style={styles.bannerImage}
//                 source={{ uri: item.img?.formats?.large?.url }}
//                 resizeMode="cover"
//               />
//               <Text style={styles.bannerTitle}>{item.title}</Text>
//             </LinearGradient>
//           </Animated.View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={width * 0.85}
//         decelerationRate="fast"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   section: {
//     marginBottom: 24,
//   },
//   bannerContainer: {
//     width: width * 0.85,
//     marginHorizontal: (width - width * 0.85) / 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   bannerGradient: {
//     height: 200,
//     justifyContent: "space-between",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     position: "absolute",
//   },
//   bannerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
// });

// export default BannerSection;

/***************************************** */

//WOrks perfectly as Carousel but no navigation

// import React, { useCallback, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Platform,
//   useWindowDimensions,
//   Image,
//   StyleSheet,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { MotiView } from "moti";
// import Animated, {
//   SharedValue,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";

// const AnimatedView = Animated.createAnimatedComponent(View);

// interface Banner {
//   id: number;
//   title: string;
//   img: {
//     formats: {
//       large: { url: string };
//       medium: { url: string };
//       small: { url: string };
//     };
//   };
// }

// interface BannerSectionProps {
//   banners: Banner[];
// }

// const BannerItem = React.memo(
//   ({
//     item,
//     index,
//     BANNER_WIDTH,
//     BANNER_HEIGHT,
//     scrollX,
//   }: {
//     item: Banner;
//     index: number;
//     BANNER_WIDTH: number;
//     BANNER_HEIGHT: number;
//     scrollX: SharedValue<number>;
//   }) => {
//     const animatedStyle = useAnimatedStyle(() => {
//       const inputRange = [
//         (index - 1) * BANNER_WIDTH,
//         index * BANNER_WIDTH,
//         (index + 1) * BANNER_WIDTH,
//       ];

//       const scale = withSpring(
//         scrollX.value >= inputRange[0] && scrollX.value <= inputRange[2]
//           ? 1
//           : 0.95
//       );

//       const opacity = withSpring(
//         scrollX.value >= inputRange[0] && scrollX.value <= inputRange[2]
//           ? 1
//           : 0.7
//       );

//       return {
//         transform: [{ scale }],
//         opacity,
//       };
//     });

//     return (
//       <MotiView
//         from={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{
//           type: "spring",
//           duration: 350,
//           delay: index * 50,
//         }}
//         style={[styles.bannerWrapper, { width: BANNER_WIDTH }]}
//       >
//         <AnimatedView style={[styles.bannerContainer, animatedStyle]}>
//           <Image
//             source={{ uri: item.img?.formats?.large?.url }}
//             style={[styles.bannerImage, { height: BANNER_HEIGHT }]}
//             resizeMode="cover"
//           />
//           <LinearGradient
//             colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
//             style={[styles.gradient, { height: BANNER_HEIGHT }]}
//           >
//             <Text style={styles.bannerTitle} numberOfLines={2}>
//               {item.title}
//             </Text>
//           </LinearGradient>
//         </AnimatedView>
//       </MotiView>
//     );
//   }
// );

// const PaginationDot = React.memo(({ isActive }: { isActive: boolean }) => (
//   <MotiView
//     animate={{
//       width: isActive ? 24 : 8,
//       backgroundColor: isActive ? "#4ECB71" : "rgba(0,0,0,0.2)",
//     }}
//     transition={{
//       type: "spring",
//       damping: 10,
//     }}
//     style={[styles.paginationDot]}
//   />
// ));

// const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
//   const { width, height } = useWindowDimensions();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const scrollX = useSharedValue(0);

//   const BANNER_WIDTH = width * 0.92;
//   const BANNER_HEIGHT = height * 0.33;
//   const SPACING = width * 0.04;

//   const handleScroll = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const offsetX = event.nativeEvent.contentOffset.x;
//       scrollX.value = offsetX;
//       const newIndex = Math.round(offsetX / BANNER_WIDTH);
//       if (newIndex !== activeIndex) {
//         setActiveIndex(newIndex);
//       }
//     },
//     [BANNER_WIDTH, activeIndex]
//   );

//   const renderItem = useCallback(
//     ({ item, index }: { item: Banner; index: number }) => (
//       <BannerItem
//         item={item}
//         index={index}
//         BANNER_WIDTH={BANNER_WIDTH}
//         BANNER_HEIGHT={BANNER_HEIGHT}
//         scrollX={scrollX}
//       />
//     ),
//     [BANNER_WIDTH, BANNER_HEIGHT, scrollX]
//   );

//   return (
//     <View style={styles.section}>
//       <FlatList
//         data={banners}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         snapToInterval={BANNER_WIDTH}
//         decelerationRate="fast"
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         contentContainerStyle={[
//           styles.listContainer,
//           { paddingHorizontal: SPACING / 2 },
//         ]}
//       />
//       <View style={styles.paginationContainer}>
//         {banners.map((_, index) => (
//           <PaginationDot key={index} isActive={index === activeIndex} />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   section: {
//     marginBottom: 24,
//   },
//   listContainer: {
//     alignItems: "center",
//   },
//   bannerWrapper: {
//     paddingHorizontal: 4,
//   },
//   bannerContainer: {
//     borderRadius: 16,
//     overflow: Platform.OS === "android" ? "hidden" : "visible",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   bannerImage: {
//     width: "100%",
//     borderRadius: 16,
//   },
//   gradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     borderRadius: 16,
//     justifyContent: "flex-end",
//     padding: 16,
//   },
//   bannerTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#fff",
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 12,
//     gap: 6,
//   },
//   paginationDot: {
//     height: 8,
//     borderRadius: 4,
//   },
// });

// export default React.memo(BannerSection);

/*********************************** */

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  useWindowDimensions,
  Image,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

const AnimatedView = Animated.createAnimatedComponent(View);

interface Banner {
  id: number;
  title: string;
  img: {
    formats: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
    };
  };
}

interface BannerSectionProps {
  banners: Banner[];
}

const BannerItem = React.memo(
  ({
    item,
    index,
    BANNER_WIDTH,
    BANNER_HEIGHT,
    scrollX,
    onPress,
  }: {
    item: Banner;
    index: number;
    BANNER_WIDTH: number;
    BANNER_HEIGHT: number;
    scrollX: SharedValue<number>;
    onPress: () => void;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * BANNER_WIDTH,
        index * BANNER_WIDTH,
        (index + 1) * BANNER_WIDTH,
      ];

      const scale = withSpring(
        scrollX.value >= inputRange[0] && scrollX.value <= inputRange[2]
          ? 1
          : 0.95
      );

      const opacity = withSpring(
        scrollX.value >= inputRange[0] && scrollX.value <= inputRange[2]
          ? 1
          : 0.7
      );

      return {
        transform: [{ scale }],
        opacity,
      };
    });

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          duration: 350,
          delay: index * 50,
        }}
        style={[styles.bannerWrapper, { width: BANNER_WIDTH }]}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <AnimatedView style={[styles.bannerContainer, animatedStyle]}>
            <Image
              source={{ uri: item.img?.formats?.large?.url }}
              style={[styles.bannerImage, { height: BANNER_HEIGHT }]}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
              style={[styles.gradient, { height: BANNER_HEIGHT }]}
            >
              <Text style={styles.bannerTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </LinearGradient>
          </AnimatedView>
        </Pressable>
      </MotiView>
    );
  }
);

const PaginationDot = React.memo(({ isActive }: { isActive: boolean }) => (
  <MotiView
    animate={{
      width: isActive ? 24 : 8,
      backgroundColor: isActive ? "#4ECB71" : "rgba(0,0,0,0.2)",
    }}
    transition={{
      type: "spring",
      damping: 10,
    }}
    style={[styles.paginationDot]}
  />
));

const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const BANNER_WIDTH = width * 0.92;
  const BANNER_HEIGHT = height * 0.33;
  const SPACING = width * 0.04;

  const handleBannerPress = useCallback(async () => {
    if (isNavigating) return;

    try {
      setIsNavigating(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await router.push("/(root)/(tabs)/(store)");
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsNavigating(false);
    }
  }, [isNavigating]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      scrollX.value = offsetX;
      const newIndex = Math.round(offsetX / BANNER_WIDTH);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [BANNER_WIDTH, activeIndex]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Banner; index: number }) => (
      <BannerItem
        item={item}
        index={index}
        BANNER_WIDTH={BANNER_WIDTH}
        BANNER_HEIGHT={BANNER_HEIGHT}
        scrollX={scrollX}
        onPress={handleBannerPress}
      />
    ),
    [BANNER_WIDTH, BANNER_HEIGHT, scrollX, handleBannerPress]
  );

  return (
    <View style={styles.section}>
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.listContainer,
          { paddingHorizontal: SPACING / 2 },
        ]}
      />
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <PaginationDot key={index} isActive={index === activeIndex} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  listContainer: {
    alignItems: "center",
  },
  bannerWrapper: {
    paddingHorizontal: 4,
  },
  bannerContainer: {
    borderRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bannerImage: {
    width: "100%",
    borderRadius: 16,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
    justifyContent: "flex-end",
    padding: 16,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
});

export default React.memo(BannerSection);
