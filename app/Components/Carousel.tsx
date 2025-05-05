// // import React, { useState, useRef } from 'react';
// // import {
// //   View,
// //   ScrollView,
// //   Animated,
// //   Dimensions,
// //   AccessibilityInfo,
// //   AccessibilityRole,
// //   NativeSyntheticEvent,
// //   NativeScrollEvent,
// //   StyleSheet,
// // } from 'react-native';
// // import { styled } from 'nativewind';

// // const StyledView = styled(View);
// // const StyledScrollView = styled(ScrollView);

// // const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // interface CarouselProps {
// //   slides: Array<{
// //     id: string;
// //     content: React.ReactNode;
// //     accessibilityLabel: string;
// //   }>;
// // }

// // const Carousel: React.FC<CarouselProps> = ({ slides }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const scrollX = useRef(new Animated.Value(0)).current;
// //   const slidesRef = useRef<ScrollView>(null);

// //   const viewConfig = {
// //     viewAreaCoveragePercentThreshold: 50,
// //   };

// //   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
// //     Animated.event(
// //       [
// //         {
// //           nativeEvent: {
// //             contentOffset: {
// //               x: scrollX,
// //             },
// //           },
// //         },
// //       ],
// //       { useNativeDriver: false }
// //     )(event);

// //     const position = event.nativeEvent.contentOffset.x / SCREEN_WIDTH;
// //     const index = Math.round(position);
// //     setCurrentIndex(index);

// //     // Announce slide change to screen readers
// //     AccessibilityInfo.announceForAccessibility(
// //       `Showing slide ${index + 1} of ${slides.length}: ${slides[index].accessibilityLabel}`
// //     );
// //   };

// //   const Dot: React.FC<{ index: number }> = ({ index }) => {
// //     const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

// //     const width = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [8, 16, 8],
// //       extrapolate: 'clamp',
// //     });

// //     const opacity = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [0.3, 1, 0.3],
// //       extrapolate: 'clamp',
// //     });

// //     return (
// //       <Animated.View
// //         style={[
// //           {
// //             width,
// //             opacity,
// //             height: 8,
// //             borderRadius: 4,
// //             marginHorizontal: 4,
// //             backgroundColor: '#000',
// //           },
// //         ]}
// //       />
// //     );
// //   };

// //   return (
// //     <StyledView className="flex-1">
// //       <StyledScrollView
// //         ref={slidesRef}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         bounces={false}
// //         onScroll={onScroll}
// //         scrollEventThrottle={16}
// //         decelerationRate="fast"
// //         viewabilityConfig={viewConfig}
// //         accessible={true}
// //         accessibilityRole="adjustable"
// //         accessibilityLabel={`Carousel with ${slides.length} slides. Swipe left or right to navigate.`}
// //         accessibilityHint="Double tap and hold, then drag left or right to change slides"
// //         className="flex-1"
// //       >
// //         {slides.map((slide, index) => (
// //           <StyledView
// //             key={slide.id}
// //             className="w-screen justify-center items-center"
// //             accessible={true}
// //             accessibilityRole="none"
// //             accessibilityLabel={slide.accessibilityLabel}
// //           >
// //             {slide.content}
// //           </StyledView>
// //         ))}
// //       </StyledScrollView>

// //       {/* Progress Dots */}
// //       <StyledView className="flex-row justify-center items-center h-16">
// //         {slides.map((_, index) => (
// //           <Dot key={index} index={index} />
// //         ))}
// //       </StyledView>
// //     </StyledView>
// //   );
// // };

// // export default Carousel;

// /******************* */

// // import React, { useState, useRef } from 'react';
// // import {
// //   View,
// //   ScrollView,
// //   Animated,
// //   Dimensions,
// //   AccessibilityInfo,
// //   NativeSyntheticEvent,
// //   NativeScrollEvent,
// // } from 'react-native';
// // import { styled } from 'nativewind';

// // const StyledView = styled(View);
// // const StyledScrollView = styled(ScrollView);

// // const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // interface CarouselProps {
// //   slides: Array<{
// //     id: string;
// //     content: React.ReactNode;
// //     accessibilityLabel: string;
// //   }>;
// // }

// // const Carousel: React.FC<CarouselProps> = ({ slides }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const scrollX = useRef(new Animated.Value(0)).current;
// //   const slidesRef = useRef<ScrollView>(null);

// //   const viewConfig = {
// //     viewAreaCoveragePercentThreshold: 50,
// //   };

// //   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
// //     Animated.event(
// //       [
// //         {
// //           nativeEvent: {
// //             contentOffset: {
// //               x: scrollX,
// //             },
// //           },
// //         },
// //       ],
// //       { useNativeDriver: false }
// //     )(event);

// //     const position = event.nativeEvent.contentOffset.x / SCREEN_WIDTH;
// //     const index = Math.round(position);
// //     setCurrentIndex(index);

// //     // Announce slide change to screen readers
// //     AccessibilityInfo.announceForAccessibility(
// //       `Showing slide ${index + 1} of ${slides.length}: ${slides[index].accessibilityLabel}`
// //     );
// //   };

// //   const Dot: React.FC<{ index: number }> = ({ index }) => {
// //     const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

// //     const width = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [8, 16, 8],
// //       extrapolate: 'clamp',
// //     });

// //     const opacity = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [0.3, 1, 0.3],
// //       extrapolate: 'clamp',
// //     });

// //     return (
// //       <Animated.View
// //         style={{
// //           width,
// //           opacity,
// //         }}
// //         className="h-2 rounded-full mx-1 bg-black"
// //       />
// //     );
// //   };

// //   return (
// //     <StyledView className="flex-1">
// //       <StyledScrollView
// //         ref={slidesRef}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         bounces={false}
// //         onScroll={onScroll}
// //         scrollEventThrottle={16}
// //         decelerationRate="fast"
// //         viewabilityConfig={viewConfig}
// //         accessible={true}
// //         accessibilityRole="adjustable"
// //         accessibilityLabel={`Carousel with ${slides.length} slides. Swipe left or right to navigate.`}
// //         accessibilityHint="Double tap and hold, then drag left or right to change slides"
// //         className="flex-1"
// //       >
// //         {slides.map((slide) => (
// //           <StyledView
// //             key={slide.id}
// //             className="w-screen justify-center items-center"
// //             accessible={true}
// //             accessibilityRole="none"
// //             accessibilityLabel={slide.accessibilityLabel}
// //           >
// //             {slide.content}
// //           </StyledView>
// //         ))}
// //       </StyledScrollView>

// //       {/* Progress Dots */}
// //       <StyledView className="flex-row justify-center items-center h-16">
// //         {slides.map((_, index) => (
// //           <Dot key={index} index={index} />
// //         ))}
// //       </StyledView>
// //     </StyledView>
// //   );
// // };

// // export default Carousel;

// /***************** */
// // import React, { useState, useRef } from "react";
// // import {
// //   View,
// //   ScrollView,
// //   Animated,
// //   Dimensions,
// //   AccessibilityInfo,
// //   AccessibilityRole,
// //   NativeSyntheticEvent,
// //   NativeScrollEvent,
// // } from "react-native";

// // const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // interface CarouselProps {
// //   slides: Array<{
// //     id: string;
// //     content: React.ReactNode;
// //     accessibilityLabel: string;
// //   }>;
// // }

// // const Carousel: React.FC<CarouselProps> = ({ slides }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const scrollX = useRef(new Animated.Value(0)).current;
// //   const slidesRef = useRef<ScrollView>(null);

// //   const viewConfig = {
// //     viewAreaCoveragePercentThreshold: 50,
// //   };

// //   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
// //     Animated.event(
// //       [
// //         {
// //           nativeEvent: {
// //             contentOffset: {
// //               x: scrollX,
// //             },
// //           },
// //         },
// //       ],
// //       { useNativeDriver: false }
// //     )(event);

// //     const position = event.nativeEvent.contentOffset.x / SCREEN_WIDTH;
// //     const index = Math.round(position);
// //     setCurrentIndex(index);

// //     // Announce slide change to screen readers
// //     AccessibilityInfo.announceForAccessibility(
// //       `Showing slide ${index + 1} of ${slides.length}: ${
// //         slides[index].accessibilityLabel
// //       }`
// //     );
// //   };

// //   const Dot: React.FC<{ index: number }> = ({ index }) => {
// //     const inputRange = [
// //       (index - 1) * SCREEN_WIDTH,
// //       index * SCREEN_WIDTH,
// //       (index + 1) * SCREEN_WIDTH,
// //     ];

// //     const width = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [8, 16, 8],
// //       extrapolate: "clamp",
// //     });

// //     const opacity = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [0.3, 1, 0.3],
// //       extrapolate: "clamp",
// //     });

// //     return (
// //       <Animated.View
// //         style={[
// //           {
// //             width,
// //             opacity,
// //             height: 8,
// //             borderRadius: 4,
// //             marginHorizontal: 4,
// //             backgroundColor: "#000",
// //           },
// //         ]}
// //       />
// //     );
// //   };

// //   return (
// //     <View className="flex-1">
// //       <ScrollView
// //         ref={slidesRef}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         bounces={false}
// //         onScroll={onScroll}
// //         scrollEventThrottle={16}
// //         decelerationRate="fast"
// //         viewabilityConfig={viewConfig}
// //         accessible={true}
// //         accessibilityRole="adjustable"
// //         accessibilityLabel={`Carousel with ${slides.length} slides. Swipe left or right to navigate.`}
// //         accessibilityHint="Double tap and hold, then drag left or right to change slides"
// //         className="flex-1"
// //       >
// //         {slides.map((slide, index) => (
// //           <View
// //             key={slide.id}
// //             className="w-screen justify-center items-center"
// //             accessible={true}
// //             accessibilityRole="none"
// //             accessibilityLabel={slide.accessibilityLabel}
// //           >
// //             {slide.content}
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {/* Progress Dots */}
// //       <View className="flex-row justify-center items-center h-16">
// //         {slides.map((_, index) => (
// //           <Dot key={index} index={index} />
// //         ))}
// //       </View>
// //     </View>
// //   );
// // };

// // export default Carousel;

// /************************************************** */
// // import React, { useState, useRef } from "react";
// // import {
// //   View,
// //   ScrollView,
// //   Animated,
// //   Dimensions,
// //   AccessibilityInfo,
// //   AccessibilityRole,
// //   NativeSyntheticEvent,
// //   NativeScrollEvent,
// //   Image,
// // } from "react-native";

// // const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // interface CarouselProps {
// //   slides: Array<{
// //     id: string;
// //     content: React.ReactNode;
// //     accessibilityLabel: string;
// //   }>;
// // }

// // const Carousel: React.FC<CarouselProps> = ({ slides }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const scrollX = useRef(new Animated.Value(0)).current;
// //   const slidesRef = useRef<ScrollView>(null);

// //   const viewConfig = {
// //     viewAreaCoveragePercentThreshold: 50,
// //   };

// //   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
// //     Animated.event(
// //       [
// //         {
// //           nativeEvent: {
// //             contentOffset: {
// //               x: scrollX,
// //             },
// //           },
// //         },
// //       ],
// //       { useNativeDriver: false }
// //     )(event);

// //     const position = event.nativeEvent.contentOffset.x / SCREEN_WIDTH;
// //     const index = Math.round(position);
// //     setCurrentIndex(index);

// //     // Announce slide change to screen readers
// //     AccessibilityInfo.announceForAccessibility(
// //       `Showing slide ${index + 1} of ${slides.length}: ${
// //         slides[index].accessibilityLabel
// //       }`
// //     );
// //   };

// //   const Dot: React.FC<{ index: number }> = ({ index }) => {
// //     const inputRange = [
// //       (index - 1) * SCREEN_WIDTH,
// //       index * SCREEN_WIDTH,
// //       (index + 1) * SCREEN_WIDTH,
// //     ];

// //     const width = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [8, 16, 8],
// //       extrapolate: "clamp",
// //     });

// //     const opacity = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [0.3, 1, 0.3],
// //       extrapolate: "clamp",
// //     });

// //     return (
// //       <Animated.View
// //         style={[
// //           {
// //             width,
// //             opacity,
// //             height: 8,
// //             borderRadius: 4,
// //             marginHorizontal: 4,
// //             backgroundColor: "#000",
// //           },
// //         ]}
// //       />
// //     );
// //   };

// //   return (
// //     <View className="flex-1">
// //       <ScrollView
// //         ref={slidesRef}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         bounces={false}
// //         onScroll={onScroll}
// //         scrollEventThrottle={16}
// //         decelerationRate="fast"
// //         viewabilityConfig={viewConfig}
// //         accessible={true}
// //         accessibilityRole="adjustable"
// //         accessibilityLabel={`Carousel with ${slides.length} slides. Swipe left or right to navigate.`}
// //         accessibilityHint="Double tap and hold, then drag left or right to change slides"
// //         className="flex-1"
// //       >
// //         {slides.map((slide, index) => (
// //           <View
// //             key={slide.id}
// //             className="w-screen justify-center items-center"
// //             accessible={true}
// //             accessibilityRole="none"
// //             accessibilityLabel={slide.accessibilityLabel}
// //           >
// //             {slide.content}
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {/* Progress Dots */}
// //       <View className="flex-row justify-center items-center h-16">
// //         {slides.map((_, index) => (
// //           <Dot key={index} index={index} />
// //         ))}
// //       </View>
// //     </View>
// //   );
// // };

// // export default Carousel;

// /************************** */

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   View,
// //   Image,
// //   StyleSheet,
// //   Dimensions,
// //   FlatList,
// //   Text,
// //   TouchableOpacity,
// //   Platform,
// //   AccessibilityInfo,
// // } from "react-native";

// // const { width } = Dimensions.get("window");

// // const slides = [
// //   {
// //     id: "1",
// //     imageSource: require("../../assets/banner/banner1.png"),
// //     accessibilityLabel:
// //       "Banner image 1: Special offers on our latest collection",
// //   },
// //   {
// //     id: "2",
// //     imageSource: require("../../assets/banner/banner2.png"),
// //     accessibilityLabel: "Banner image 2: Discover new arrivals for the season",
// //   },
// //   {
// //     id: "3",
// //     imageSource: require("../../assets/banner/banner3.png"),
// //     accessibilityLabel: "Banner image 3: Explore exclusive discounts today",
// //   },
// // ];

// // const Carousel = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const flatListRef = useRef(null);
// //   const isScreenReaderEnabled = useRef(false);

// //   useEffect(() => {
// //     // Check if screen reader is enabled
// //     AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
// //       isScreenReaderEnabled.current = enabled;
// //     });

// //     // Auto-slide functionality
// //     const timer = setInterval(() => {
// //       if (!isScreenReaderEnabled.current) {
// //         const nextIndex = (currentIndex + 1) % slides.length;
// //         flatListRef.current?.scrollToIndex({ index: nextIndex });
// //         setCurrentIndex(nextIndex);
// //       }
// //     }, 5000);

// //     return () => clearInterval(timer);
// //   }, [currentIndex]);

// //   const handleScroll = (event) => {
// //     const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
// //     setCurrentIndex(newIndex);
// //   };

// //   const renderSlide = ({ item }) => (
// //     <View
// //       style={styles.slide}
// //       accessible={true}
// //       accessibilityRole="image"
// //       accessibilityLabel={item.accessibilityLabel}
// //     >
// //       <Image
// //         source={item.imageSource}
// //         style={styles.image}
// //         resizeMode="cover"
// //       />
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         ref={flatListRef}
// //         data={slides}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         onScroll={handleScroll}
// //         renderItem={renderSlide}
// //         keyExtractor={(item) => item.id}
// //       />
// //       <View style={styles.pagination}>
// //         {slides.map((_, index) => (
// //           <View
// //             key={index}
// //             style={[styles.dot, currentIndex === index && styles.activeDot]}
// //           />
// //         ))}
// //       </View>
// //       <TouchableOpacity
// //         style={styles.nextButton}
// //         onPress={() => {
// //           const nextIndex = (currentIndex + 1) % slides.length;
// //           flatListRef.current?.scrollToIndex({ index: nextIndex });
// //           setCurrentIndex(nextIndex);
// //         }}
// //         accessible={true}
// //         accessibilityRole="button"
// //         accessibilityLabel="Next slide"
// //       >
// //         <Text style={styles.nextButtonText}>›</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   slide: {
// //     width,
// //     height: "100%",
// //   },
// //   image: {
// //     width: "100%",
// //     height: "100%",
// //   },
// //   pagination: {
// //     position: "absolute",
// //     bottom: 20,
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   dot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: 4,
// //     backgroundColor: "#ccc",
// //     marginHorizontal: 4,
// //   },
// //   activeDot: {
// //     backgroundColor: "#000",
// //   },
// //   nextButton: {
// //     position: "absolute",
// //     right: 20,
// //     bottom: 50,
// //     padding: 10,
// //     backgroundColor: "#000",
// //     borderRadius: 20,
// //   },
// //   nextButtonText: {
// //     color: "#fff",
// //     fontSize: 20,
// //   },
// // });

// // export default Carousel;

// /************************************ */

// import React, { useState, useRef } from "react";
// import {
//   View,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   Image,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

// const { width } = Dimensions.get("window");

// const images = [
//   { id: "1", uri: "../../assets/banner/banner1.png" },
//   { id: "2", uri: "../../assets/banner/banner1.png" },
//   { id: "3", uri: "../../assets/banner/banner1.png" },
// ];

// export default function Carousel() {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const scrollViewRef = useRef<ScrollView>(null);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const newIndex = Math.round(contentOffsetX / width);
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <GestureHandlerRootView style={styles.root}>
//       <SafeAreaView style={styles.container}>
//         <ScrollView
//           ref={scrollViewRef}
//           horizontal
//           pagingEnabled
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           showsHorizontalScrollIndicator={false}
//           style={styles.scrollView}
//         >
//           {images.map((image) => (
//             <View key={image.id} style={styles.slide}>
//               <Image source={image.uri} style={styles.image} />
//             </View>
//           ))}
//         </ScrollView>
//         <View style={styles.dotsContainer}>
//           <AnimatedDotsCarousel
//             length={images.length}
//             currentIndex={currentIndex}
//             maxIndicators={3}
//             interpolateOpacityAndColor={true}
//             decreasingDots={[
//               {
//                 config: { color: "#E0E0E0", size: 6, opacity: 0.5, margin: 3 },
//                 quantity: 1,
//               },
//               {
//                 config: { color: "#E0E0E0", size: 4, opacity: 0.3, margin: 3 },
//                 quantity: 1,
//               },
//             ]}
//             activeIndicatorConfig={{
//               color: "#FF4500",
//               size: 8,
//               opacity: 1,
//               margin: 3,
//             }}
//             inactiveIndicatorConfig={{
//               color: "#E0E0E0",
//               size: 6,
//               opacity: 0.5,
//               margin: 3,
//             }}
//             scrollableDotsConfig={{
//               setIndex: setCurrentIndex,
//               onNewIndex: (newIndex) => {
//                 scrollViewRef?.current?.scrollTo({
//                   x: newIndex * width,
//                   animated: true,
//                 });
//               },
//               containerBackgroundColor: "rgba(0, 0, 0, 0.5)",
//             }}
//           />
//         </View>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   scrollView: {
//     width: "100%",
//     height: 300,
//   },
//   slide: {
//     width: width,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   dotsContainer: {
//     marginTop: 20,
//   },
// });

import { View, Text } from "react-native";
import React from "react";

const Carousel = () => {
  return (
    <View>
      <Text>xxx</Text>
    </View>
  );
};

export default Carousel;
