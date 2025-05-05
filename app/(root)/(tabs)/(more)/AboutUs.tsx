// import { View, Text } from "react-native";
// import React from "react";

// const AboutUs = () => {
//   return (
//     <View>
//       <Text>about-us</Text>
//     </View>
//   );
// };

// export default AboutUs;

/****************************************************** */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   ImageBackground,
//   Image,
//   Linking,
// } from "react-native";
// import { Stack } from "expo-router";
// import { Button, useTheme } from "react-native-paper";
// import { SwiperFlatList } from "react-native-swiper-flatlist";
// import { MotiView } from "moti";

// const cards = [
//   {
//     title: "صناعة الأعلاف الحيوانية",
//     image:
//       "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "منافذ البيع في الكويت",
//     image:
//       "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "تصدير إلى الأسواق الخارجية",
//     image:
//       "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

// const AboutUs = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const theme = useTheme();

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "About Us",
//         }}
//       />

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {/* Hero Section */}
//         <MotiView
//           from={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           style={{ height: 300, marginBottom: 24 }}
//         >
//           <ImageBackground
//             source={{ uri: "https://keaaf.com/products/product1.jpg" }}
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//             imageStyle={{ opacity: 0.5 }}
//           >
//             <MotiView
//               from={{ scale: 1, opacity: 1 }}
//               animate={{ scale: 1.1, opacity: 0.8 }}
//               whileHover={{ scale: 1.1, opacity: 0.8 }}
//             >
//               <Text
//                 style={{
//                   fontSize: 32,
//                   fontWeight: "bold",
//                   color: "white",
//                   textAlign: "center",
//                   textShadowColor: "rgba(0, 0, 0, 0.75)",
//                   textShadowOffset: { width: -1, height: 1 },
//                   textShadowRadius: 10,
//                 }}
//               >
//                 شركة أولاد عبدالرحمن سلطان
//               </Text>
//             </MotiView>
//           </ImageBackground>
//         </MotiView>

//         {/* About Section */}
//         <View style={{ marginBottom: 24, alignItems: "center" }}>
//           <Text
//             style={{
//               fontSize: 24,
//               fontWeight: "bold",
//               color: theme.colors.primary,
//               marginBottom: 16,
//             }}
//           >
//             قصتنا
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: theme.colors.text,
//               textAlign: "center",
//               lineHeight: 24,
//             }}
//           >
//             نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات
//             الزراعية وصناعة الأعلاف التي تأسست عام 1980. وتشمل أغراضها صناعة
//             الأعلاف الحيوانية. هي واحدة من أكبر الشركات في هذا المجال.
//           </Text>
//         </View>

//         {/* Interactive Swiper Cards */}
//         <SwiperFlatList
//           autoplay
//           autoplayDelay={2}
//           autoplayLoop
//           index={activeIndex}
//           showPagination
//           onIndexChanged={(index) => setActiveIndex(index)}
//           paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 3 }}
//           paginationStyle={{ marginBottom: 24 }}
//           style={{ height: 300, marginBottom: 24 }}
//         >
//           {cards.map((card, index) => (
//             <View
//               key={index}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: 16,
//               }}
//             >
//               <MotiView
//                 from={{ scale: 1 }}
//                 animate={{ scale: 1.05 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: 16,
//                   overflow: "hidden",
//                   shadowColor: theme.colors.shadow,
//                   shadowOpacity: 0.2,
//                   shadowRadius: 4,
//                 }}
//               >
//                 <Image
//                   source={{ uri: card.image }}
//                   style={{ width: "100%", height: "100%" }}
//                   resizeMode="cover"
//                 />
//                 <View
//                   style={{
//                     position: "absolute",
//                     bottom: 0,
//                     width: "100%",
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     padding: 16,
//                   }}
//                 >
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
//                   >
//                     {card.title}
//                   </Text>
//                 </View>
//               </MotiView>
//             </View>
//           ))}
//         </SwiperFlatList>

//         <Text
//           style={{
//             fontSize: 16,
//             color: theme.colors.text,
//             textAlign: "center",
//             lineHeight: 24,
//             marginBottom: 16,
//           }}
//         >
//           خلال سنوات عملها الناجحة ، فتحت الشركة العديد من منافذ البيع في جميع
//           أنحاء الكويت في مناطق استهلاك الأعلاف الحيوانية لتوفير جميع أنواع
//           الأعلاف الحيوانية للمستهلكين سواء في المزارع الكبيرة أو الأفراد في
//           أماكن مختلفة.
//         </Text>

//         <Text
//           style={{
//             fontSize: 16,
//             color: theme.colors.text,
//             textAlign: "center",
//             lineHeight: 24,
//             marginBottom: 16,
//           }}
//         >
//           علاوة على ذلك ، تفتح الشركة أسواقًا خارجية لتمكينها من التصدير إلى هذه
//           الأسواق والشركات الشريكة لها. نحن من أوائل الشركات التي تعمل في هذا
//           المجال على المستوى المحلي والدولي.
//         </Text>

//         <View style={{ alignItems: "center" }}>
//           <Button
//             mode="contained"
//             onPress={() => Linking.openURL("mailto:info@example.com")}
//           >
//             تواصل معنا
//           </Button>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default AboutUs;

/*************************************************** */

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   Linking,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { MotiView, MotiImage } from "moti";
// import Carousel from "react-native-reanimated-carousel";
// import { Stack } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const cards = [
//   {
//     title: "صناعة الأعلاف الحيوانية",
//     image: IMAGE_URL,
//   },
//   {
//     title: "منافذ البيع في الكويت",
//     image: IMAGE_URL,
//   },
//   {
//     title: "تصدير إلى الأسواق الخارجية",
//     image: IMAGE_URL,
//   },
// ];

// const HeroSection = () => (
//   <MotiView
//     from={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1000 }}
//     className="w-full h-[60vh] relative"
//   >
//     <Image
//       source={{ uri: IMAGE_URL }}
//       className="w-full h-full absolute"
//       resizeMode="cover"
//     />
//     <LinearGradient
//       colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
//       className="absolute inset-0 items-center justify-center"
//     >
//       <MotiView
//         from={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 800, delay: 300 }}
//         className="px-6"
//       >
//         <Text className="text-4xl font-bold text-white text-center">
//           شركة أولاد عبدالرحمن سلطان
//         </Text>
//       </MotiView>
//     </LinearGradient>
//   </MotiView>
// );

// const CarouselCard = ({ item }) => (
//   <MotiView
//     from={{ scale: 0.95, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     className="flex-1 overflow-hidden rounded-2xl"
//   >
//     <Image
//       source={{ uri: item.image }}
//       className="w-full h-full"
//       resizeMode="cover"
//     />
//     <LinearGradient
//       colors={["transparent", "rgba(0,0,0,0.8)"]}
//       className="absolute bottom-0 w-full p-4"
//     >
//       <Text className="text-white text-xl font-bold text-right">
//         {item.title}
//       </Text>
//     </LinearGradient>
//   </MotiView>
// );

// export default function OurStory() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const handleContact = () => {
//     Linking.openURL("mailto:info@example.com");
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//       />

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Content Section */}
//       <View className="px-6 py-12">
//         <MotiView
//           from={{ translateY: 20, opacity: 0 }}
//           animate={{ translateY: 0, opacity: 1 }}
//           transition={{ delay: 300 }}
//           className="space-y-8"
//         >
//           {/* Section Title */}
//           <View className="items-center">
//             <Text className="text-3xl font-bold text-green-700 text-center">
//               قصتنا
//             </Text>
//           </View>

//           {/* Story Text */}
//           <Text className="text-lg leading-relaxed text-gray-800 text-right">
//             نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات
//             الزراعية وصناعة الأعلاف التي تأسست عام 1980. وتشمل أغراضها صناعة
//             الأعلاف الحيوانية. هي واحدة من أكبر الشركات في هذا المجال.
//           </Text>

//           {/* Carousel Section */}
//           <View className="h-96 my-8">
//             <Carousel
//               ref={carouselRef}
//               loop
//               width={SCREEN_WIDTH - 48}
//               height={380}
//               data={cards}
//               onSnapToItem={setActiveIndex}
//               renderItem={({ item }) => <CarouselCard item={item} />}
//               mode="parallax"
//               modeConfig={{
//                 parallaxScrollingScale: 0.9,
//                 parallaxScrollingOffset: 50,
//               }}
//               autoPlay
//               autoPlayInterval={3000}
//             />
//           </View>

//           {/* Additional Content */}
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ delay: 600 }}
//             className="space-y-6"
//           >
//             <Text className="text-lg leading-relaxed text-gray-800 text-right">
//               خلال سنوات عملها الناجحة ، فتحت الشركة العديد من منافذ البيع في
//               جميع أنحاء الكويت في مناطق استهلاك الأعلاف الحيوانية لتوفير جميع
//               أنواع الأعلاف الحيوانية للمستهلكين سواء في المزارع الكبيرة أو
//               الأفراد في أماكن مختلفة.
//             </Text>

//             <Text className="text-lg leading-relaxed text-gray-800 text-right">
//               علاوة على ذلك ، تفتح الشركة أسواقًا خارجية لتمكينها من التصدير إلى
//               هذه الأسواق والشركات الشريكة لها. نحن من أوائل الشركات التي تعمل
//               في هذا المجال على المستوى المحلي والدولي.
//             </Text>
//           </MotiView>

//           {/* Contact Button */}
//           <MotiView
//             from={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 800 }}
//             className="items-center mt-8"
//           >
//             <Pressable
//               onPress={handleContact}
//               className="bg-red-500 px-8 py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
//             >
//               <Text className="text-white font-bold text-lg">تواصل معنا</Text>
//             </Pressable>
//           </MotiView>
//         </MotiView>
//       </View>
//     </ScrollView>
//   );
// }

/************************************************************* */

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   Linking,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   ImageBackground,
// } from "react-native";
// import { MotiView } from "moti";
// import Carousel from "react-native-reanimated-carousel";
// import { Stack } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const cards = [
//   {
//     title: "صناعة الأعلاف الحيوانية",
//     image: IMAGE_URL,
//   },
//   {
//     title: "منافذ البيع في الكويت",
//     image: IMAGE_URL,
//   },
//   {
//     title: "تصدير إلى الأسواق الخارجية",
//     image: IMAGE_URL,
//   },
// ];

// const HeroSection = () => (
//   <MotiView
//     from={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1000 }}
//     style={styles.heroContainer}
//   >
//     <ImageBackground
//       source={{ uri: IMAGE_URL }}
//       style={styles.heroImage}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
//         style={styles.heroGradient}
//       >
//         <MotiView
//           from={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 800, delay: 300 }}
//           style={styles.heroTextContainer}
//         >
//           <Text style={styles.heroText}>شركة أولاد عبدالرحمن سلطان</Text>
//         </MotiView>
//       </LinearGradient>
//     </ImageBackground>
//   </MotiView>
// );

// const CarouselCard = ({ item }) => (
//   <MotiView
//     from={{ scale: 0.95, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     style={styles.carouselCard}
//   >
//     <Image
//       source={{ uri: item.image }}
//       style={styles.carouselImage}
//       resizeMode="cover"
//     />
//     <LinearGradient
//       colors={["transparent", "rgba(0,0,0,0.8)"]}
//       style={styles.carouselGradient}
//     >
//       <Text style={styles.carouselText}>{item.title}</Text>
//     </LinearGradient>
//   </MotiView>
// );

// export default function OurStory() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const handleContact = () => {
//     Linking.openURL("mailto:info@example.com").catch((err) =>
//       console.error("Failed to open URL:", err)
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//       />

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Content Section */}
//       <View style={styles.contentContainer}>
//         <MotiView
//           from={{ translateY: 20, opacity: 0 }}
//           animate={{ translateY: 0, opacity: 1 }}
//           transition={{ delay: 300 }}
//           style={styles.contentMotionView}
//         >
//           {/* Section Title */}
//           <View style={styles.sectionTitleContainer}>
//             <Text style={styles.sectionTitle}>قصتنا</Text>
//           </View>

//           {/* Story Text */}
//           <Text style={styles.storyText}>
//             نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات
//             الزراعية وصناعة الأعلاف التي تأسست عام 1980. وتشمل أغراضها صناعة
//             الأعلاف الحيوانية. هي واحدة من أكبر الشركات في هذا المجال.
//           </Text>

//           {/* Carousel Section */}
//           <View style={styles.carouselContainer}>
//             <Carousel
//               ref={carouselRef}
//               loop
//               width={SCREEN_WIDTH - 48}
//               height={380}
//               data={cards}
//               onSnapToItem={setActiveIndex}
//               renderItem={({ item }) => <CarouselCard item={item} />}
//               mode="parallax"
//               modeConfig={{
//                 parallaxScrollingScale: 0.9,
//                 parallaxScrollingOffset: 50,
//               }}
//               autoPlay
//               autoPlayInterval={3000}
//             />
//           </View>

//           {/* Additional Content */}
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ delay: 600 }}
//             style={styles.additionalContent}
//           >
//             <Text style={styles.additionalText}>
//               خلال سنوات عملها الناجحة ، فتحت الشركة العديد من منافذ البيع في
//               جميع أنحاء الكويت في مناطق استهلاك الأعلاف الحيوانية لتوفير جميع
//               أنواع الأعلاف الحيوانية للمستهلكين سواء في المزارع الكبيرة أو
//               الأفراد في أماكن مختلفة.
//             </Text>

//             <Text style={styles.additionalText}>
//               علاوة على ذلك ، تفتح الشركة أسواقًا خارجية لتمكينها من التصدير إلى
//               هذه الأسواق والشركات الشريكة لها. نحن من أوائل الشركات التي تعمل
//               في هذا المجال على المستوى المحلي والدولي.
//             </Text>
//           </MotiView>

//           {/* Contact Button */}
//           <MotiView
//             from={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 800 }}
//             style={styles.contactButtonContainer}
//           >
//             <Pressable onPress={handleContact} style={styles.contactButton}>
//               <Text style={styles.contactButtonText}>تواصل معنا</Text>
//             </Pressable>
//           </MotiView>
//         </MotiView>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   heroContainer: {
//     width: "100%",
//     height: "60vh",
//     position: "relative",
//   },
//   heroImage: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   heroGradient: {
//     position: "absolute",
//     inset: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heroTextContainer: {
//     paddingHorizontal: 24,
//   },
//   heroText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   contentContainer: {
//     paddingHorizontal: 24,
//     paddingVertical: 48,
//   },
//   contentMotionView: {
//     spaceY: 32,
//   },
//   sectionTitleContainer: {
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#16A34A",
//     textAlign: "center",
//   },
//   storyText: {
//     fontSize: 18,
//     lineHeight: 28,
//     color: "#1F2937",
//     textAlign: "right",
//   },
//   carouselContainer: {
//     height: 384,
//     marginVertical: 32,
//   },
//   carouselCard: {
//     flex: 1,
//     overflow: "hidden",
//     borderRadius: 16,
//   },
//   carouselImage: {
//     width: "100%",
//     height: "100%",
//   },
//   carouselGradient: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: 16,
//   },
//   carouselText: {
//     color: "#FFFFFF",
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "right",
//   },
//   additionalContent: {
//     spaceY: 24,
//   },
//   additionalText: {
//     fontSize: 18,
//     lineHeight: 28,
//     color: "#1F2937",
//     textAlign: "right",
//   },
//   contactButtonContainer: {
//     alignItems: "center",
//     marginTop: 32,
//   },
//   contactButton: {
//     backgroundColor: "#DC2626",
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     transform: [{ scale: 0.95 }],
//   },
//   contactButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

/************************************************************************* */

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   Linking,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   ImageBackground,
// } from "react-native";
// import { MotiView } from "moti";
// import Carousel from "react-native-reanimated-carousel";
// import { Stack } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const cards = [
//   {
//     title: "صناعة الأعلاف الحيوانية",
//     image: IMAGE_URL,
//   },
//   {
//     title: "منافذ البيع في الكويت",
//     image: IMAGE_URL,
//   },
//   {
//     title: "تصدير إلى الأسواق الخارجية",
//     image: IMAGE_URL,
//   },
// ];

// const HeroSection = () => (
//   <MotiView
//     from={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1000 }}
//     style={styles.heroContainer}
//   >
//     <ImageBackground
//       source={{ uri: IMAGE_URL }}
//       style={styles.heroImage}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
//         style={styles.heroGradient}
//       >
//         <MotiView
//           from={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 800, delay: 300 }}
//           style={styles.heroTextContainer}
//         >
//           <Text style={styles.heroText}>شركة أولاد عبدالرحمن سلطان</Text>
//         </MotiView>
//       </LinearGradient>
//     </ImageBackground>
//   </MotiView>
// );

// const CarouselCard = ({ item }) => (
//   <MotiView
//     from={{ scale: 0.95, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     style={styles.carouselCard}
//   >
//     <Image
//       source={{ uri: item.image }}
//       style={styles.carouselImage}
//       resizeMode="cover"
//     />
//     <LinearGradient
//       colors={["transparent", "rgba(0,0,0,0.8)"]}
//       style={styles.carouselGradient}
//     >
//       <Text style={styles.carouselText}>{item.title}</Text>
//     </LinearGradient>
//   </MotiView>
// );

// export default function OurStory() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const handleContact = () => {
//     Linking.openURL("mailto:info@example.com").catch((err) =>
//       console.error("Failed to open URL:", err)
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "About Us",
//         }}
//       />

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Content Section */}
//       <View style={styles.contentContainer}>
//         <MotiView
//           from={{ translateY: 20, opacity: 0 }}
//           animate={{ translateY: 0, opacity: 1 }}
//           transition={{ delay: 300 }}
//           style={styles.contentMotionView}
//         >
//           {/* Section Title */}
//           <View style={styles.sectionTitleContainer}>
//             <Text style={styles.sectionTitle}>قصتنا</Text>
//           </View>

//           {/* Story Text */}
//           <Text style={styles.storyText}>
//             نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات
//             الزراعية وصناعة الأعلاف التي تأسست عام 1980. وتشمل أغراضها صناعة
//             الأعلاف الحيوانية. هي واحدة من أكبر الشركات في هذا المجال.
//           </Text>

//           {/* Carousel Section */}
//           <View style={styles.carouselContainer}>
//             <Carousel
//               ref={carouselRef}
//               loop
//               width={SCREEN_WIDTH - 48}
//               height={380}
//               data={cards}
//               onSnapToItem={(index) => setActiveIndex(index)}
//               renderItem={({ item }) => <CarouselCard item={item} />}
//               mode="parallax"
//               modeConfig={{
//                 parallaxScrollingScale: 0.9,
//                 parallaxScrollingOffset: 50,
//               }}
//               autoPlay
//               autoPlayInterval={3000}
//             />
//           </View>

//           {/* Additional Content */}
//           <MotiView
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ delay: 600 }}
//             style={styles.additionalContent}
//           >
//             <Text style={styles.additionalText}>
//               خلال سنوات عملها الناجحة ، فتحت الشركة العديد من منافذ البيع في
//               جميع أنحاء الكويت في مناطق استهلاك الأعلاف الحيوانية لتوفير جميع
//               أنواع الأعلاف الحيوانية للمستهلكين سواء في المزارع الكبيرة أو
//               الأفراد في أماكن مختلفة.
//             </Text>

//             <Text styl={styles.additionalText}>
//               علاوة على ذلك ، تفتح الشركة أسواقًا خارجية لتمكينها من التصدير إلى
//               هذه الأسواق والشركات الشريكة لها. نحن من أوائل الشركات التي تعمل
//               في هذا المجال على المستوى المحلي والدولي.
//             </Text>
//           </MotiView>

//           {/* Contact Button */}
//           <MotiView
//             from={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 800 }}
//             style={styles.contactButtonContainer}
//           >
//             <Pressable onPress={handleContact} style={styles.contactButton}>
//               <Text style={styles.contactButtonText}>تواصل معنا</Text>
//             </Pressable>
//           </MotiView>
//         </MotiView>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   heroContainer: {
//     width: "100%",
//     height: "60vh",
//     position: "relative",
//   },
//   heroImage: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   heroGradient: {
//     position: "absolute",
//     inset: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heroTextContainer: {
//     paddingHorizontal: 24,
//   },
//   heroText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   contentContainer: {
//     paddingHorizontal: 24,
//     paddingVertical: 48,
//   },
//   contentMotionView: {
//     spaceY: 32,
//   },
//   sectionTitleContainer: {
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#16A34A",
//     textAlign: "center",
//   },
//   storyText: {
//     fontSize: 18,
//     lineHeight: 28,
//     color: "#1F2937",
//     textAlign: "right",
//   },
//   carouselContainer: {
//     height: 384,
//     marginVertical: 32,
//   },
//   carouselCard: {
//     flex: 1,
//     overflow: "hidden",
//     borderRadius: 16,
//   },
//   carouselImage: {
//     width: "100%",
//     height: "100%",
//   },
//   carouselGradient: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: 16,
//   },
//   carouselText: {
//     color: "#FFFFFF",
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "right",
//   },
//   additionalContent: {
//     spaceY: 24,
//   },
//   additionalText: {
//     fontSize: 18,
//     lineHeight: 28,
//     color: "#1F2937",
//     textAlign: "right",
//   },
//   contactButtonContainer: {
//     alignItems: "center",
//     marginTop: 32,
//   },
//   contactButton: {
//     backgroundColor: "#DC2626",
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     transform: [{ scale: 0.95 }],
//   },
//   contactButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

/************************************************ */

// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   Linking,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   ImageBackground,
//   Animated,
//   ViewToken,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Stack } from "expo-router";

// // Types
// interface Card {
//   id: string;
//   title: string;
//   image: string;
// }

// interface CarouselCardProps {
//   item: Card;
//   index: number;
//   scrollX: Animated.Value;
//   cardWidth: number;
// }

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const CARD_WIDTH = SCREEN_WIDTH * 0.85; // Slightly larger cards
// const SPACING = 10;
// const CARD_FULL_WIDTH = CARD_WIDTH + SPACING * 2;
// const CARD_HEIGHT = 400; // Increased height for better visibility

// const IMAGE_URL =
//   "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const cards: Card[] = [
//   {
//     id: "1",
//     title: "صناعة الأعلاف الحيوانية",
//     image: IMAGE_URL,
//   },
//   {
//     id: "2",
//     title: "منافذ البيع في الكويت",
//     image: IMAGE_URL,
//   },
//   {
//     id: "3",
//     title: "تصدير إلى الأسواق الخارجية",
//     image: IMAGE_URL,
//   },
// ];

// const HeroSection: React.FC = () => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(20)).current;

//   React.useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(translateY, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);
//   return (
//     <Animated.View
//       style={[
//         styles.heroContainer,
//         {
//           opacity,
//           transform: [{ translateY }],
//         },
//       ]}
//     >
//       <ImageBackground
//         source={{ uri: IMAGE_URL }}
//         style={styles.heroImage}
//         resizeMode="cover"
//       >
//         <LinearGradient
//           colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
//           locations={[0, 0.5, 1]}
//           style={styles.heroGradient}
//         >
//           <View style={styles.heroTextContainer}>
//             <Text style={styles.heroText}>شركة أولاد عبدالرحمن سلطان</Text>
//             <Text style={styles.heroSubtext}>نحو مستقبل مستدام</Text>
//           </View>
//         </LinearGradient>
//       </ImageBackground>
//     </Animated.View>
//   );
// };
// const CarouselCard: React.FC<CarouselCardProps> = ({
//   item,
//   index,
//   scrollX,
//   cardWidth,
// }) => {
//   const inputRange = [
//     (index - 1) * CARD_FULL_WIDTH,
//     index * CARD_FULL_WIDTH,
//     (index + 1) * CARD_FULL_WIDTH,
//   ];

//   const scale = scrollX.interpolate({
//     inputRange,
//     outputRange: [0.9, 1.05, 0.9],
//     extrapolate: "clamp",
//   });

//   const opacity = scrollX.interpolate({
//     inputRange,
//     outputRange: [0.7, 1, 0.7],
//     extrapolate: "clamp",
//   });

//   return (
//     <Animated.View
//       style={[
//         styles.carouselCard,
//         {
//           width: cardWidth,
//           transform: [{ scale }],
//           opacity,
//           marginHorizontal: SPACING,
//         },
//       ]}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.carouselImage}
//         resizeMode="cover"
//       />
//       <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.8)"]}
//         style={styles.carouselGradient}
//       >
//         <Text style={styles.carouselText}>{item.title}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// };

// const CustomCarousel: React.FC = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef<any>(null);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     {
//       useNativeDriver: true,
//       listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//         const newIndex = Math.round(
//           event.nativeEvent.contentOffset.x / CARD_FULL_WIDTH
//         );
//         setActiveIndex(newIndex);
//       },
//     }
//   );

//   // Auto-scroll functionality
//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (activeIndex < cards.length - 1) {
//         flatListRef.current?.scrollToIndex({
//           index: activeIndex + 1,
//           animated: true,
//         });
//       } else {
//         flatListRef.current?.scrollToIndex({
//           index: 0,
//           animated: true,
//         });
//       }
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(timer);
//   }, [activeIndex]);

//   const renderItem = ({ item, index }: { item: Card; index: number }) => (
//     <CarouselCard
//       item={item}
//       index={index}
//       scrollX={scrollX}
//       cardWidth={CARD_WIDTH}
//     />
//   );

//   return (
//     <View style={styles.carouselContainer}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={cards}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={CARD_FULL_WIDTH}
//         decelerationRate="fast"
//         bounces={false}
//         onScroll={handleScroll}
//         renderItem={renderItem}
//         contentContainerStyle={styles.carouselContent}
//         initialScrollIndex={0}
//         getItemLayout={(data, index) => ({
//           length: CARD_FULL_WIDTH,
//           offset: CARD_FULL_WIDTH * index,
//           index,
//         })}
//       />
//       {/* Enhanced pagination dots */}
//       <View style={styles.pagination}>
//         {cards.map((_, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.paginationDot,
//               activeIndex === index && styles.paginationDotActive,
//               {
//                 transform: [
//                   {
//                     scale: scrollX.interpolate({
//                       inputRange: [
//                         (index - 1) * CARD_FULL_WIDTH,
//                         index * CARD_FULL_WIDTH,
//                         (index + 1) * CARD_FULL_WIDTH,
//                       ],
//                       outputRange: [0.8, 1.2, 0.8],
//                       extrapolate: "clamp",
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default function OurStory() {
//   const handleContact = () => {
//     Linking.openURL("mailto:info@example.com").catch((err) =>
//       console.error("Failed to open URL:", err)
//     );
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "About Us",
//           headerStyle: {
//             backgroundColor: "#F9FAFB",
//           },
//           headerTitleStyle: {
//             color: "#1F2937",
//           },
//         }}
//       />

//       <HeroSection />

//       <View style={styles.contentContainer}>
//         <View style={styles.sectionTitleContainer}>
//           <Text style={styles.sectionTitle}>قصتنا</Text>
//         </View>

//         <Text style={styles.storyText}>
//           نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات الزراعية
//           وصناعة الأعلاف التي تأسست عام 1980. وتشمل أغراضها صناعة الأعلاف
//           الحيوانية. هي واحدة من أكبر الشركات في هذا المجال.
//         </Text>

//         <CustomCarousel />

//         <View style={styles.additionalContent}>
//           <Text style={styles.additionalText}>
//             خلال سنوات عملها الناجحة ، فتحت الشركة العديد من منافذ البيع في جميع
//             أنحاء الكويت في مناطق استهلاك الأعلاف الحيوانية لتوفير جميع أنواع
//             الأعلاف الحيوانية للمستهلكين سواء في المزارع الكبيرة أو الأفراد في
//             أماكن مختلفة.
//           </Text>

//           <Text style={styles.additionalText}>
//             علاوة على ذلك ، تفتح الشركة أسواقًا خارجية لتمكينها من التصدير إلى
//             هذه الأسواق والشركات الشريكة لها. نحن من أوائل الشركات التي تعمل في
//             هذا المجال على المستوى المحلي والدولي.
//           </Text>
//         </View>

//         <Pressable
//           onPress={handleContact}
//           style={({ pressed }) => [
//             styles.contactButton,
//             pressed && styles.contactButtonPressed,
//           ]}
//         >
//           <Text style={styles.contactButtonText}>تواصل معنا</Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },

//   heroImage: {
//     width: "100%",
//     height: "100%",
//   },
//   heroGradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentContainer: {
//     padding: 24,
//   },
//   sectionTitleContainer: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#16A34A",
//     textAlign: "center",
//   },
//   storyText: {
//     fontSize: 18,
//     lineHeight: 35,
//     color: "#1F2937",
//     textAlign: "right",
//     marginBottom: 32,
//   },
//   carouselContainer: {
//     height: CARD_HEIGHT,
//     marginBottom: 32,
//   },
//   carouselContent: {
//     paddingHorizontal: (SCREEN_WIDTH - CARD_FULL_WIDTH) / 2,
//   },
//   carouselCard: {
//     height: CARD_HEIGHT,
//     overflow: "hidden",
//     borderRadius: 16,
//     backgroundColor: "#FFFFFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//     orderWidth: 1,
//     borderColor: "rgba(0,0,0,0.1)",
//   },
//   carouselImage: {
//     width: "100%",
//     height: "100%",
//   },
//   carouselGradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "50%",
//     padding: 16,
//     justifyContent: "flex-end",
//   },
//   carouselText: {
//     color: "#FFFFFF",
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "right",
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 16,
//   },

//   additionalContent: {
//     gap: 16,
//     marginBottom: 32,
//   },
//   additionalText: {
//     fontSize: 18,
//     lineHeight: 40,
//     color: "#1F2937",
//     textAlign: "right",
//   },
//   contactButton: {
//     backgroundColor: "#DC2626",
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   contactButtonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.98 }],
//   },
//   contactButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   heroContainer: {
//     width: "100%",
//     height: 450, // Increased height
//     marginBottom: 20,
//   },

//   heroTextContainer: {
//     padding: 20,
//     alignItems: "center",
//   },

//   heroText: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//     paddingHorizontal: 24,
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 4,
//   },

//   heroSubtext: {
//     fontSize: 20,
//     color: "#FFFFFF",
//     marginTop: 10,
//     opacity: 0.9,
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },

//   paginationDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "rgba(22, 163, 74, 0.3)",
//     marginHorizontal: 6,
//     transition: "0.3s",
//   },

//   paginationDotActive: {
//     backgroundColor: "#16A34A",
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//   },
// });

/**************************************** */

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Animated,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/contexts/LanguageContext";

// Types
interface Card {
  id: string;
  title: string;
  image: string;
}

interface CarouselCardProps {
  item: Card;
  index: number;
  scrollX: Animated.Value;
  cardWidth: number;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.85; // Slightly larger cards
const SPACING = 10;
const CARD_FULL_WIDTH = CARD_WIDTH + SPACING * 2;
const CARD_HEIGHT = 400; // Increased height for better visibility

const IMAGE_URL =
  "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const cards: Card[] = [
  {
    id: "1",
    title: "صناعة الأعلاف الحيوانية",
    image: IMAGE_URL,
  },
  {
    id: "2",
    title: "منافذ البيع في الكويت",
    image: IMAGE_URL,
  },
  {
    id: "3",
    title: "تصدير إلى الأسواق الخارجية",
    image: IMAGE_URL,
  },
];

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <Animated.View
      style={[
        styles.heroContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <ImageBackground
        source={{ uri: IMAGE_URL }}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
          locations={[0, 0.5, 1]}
          style={styles.heroGradient}
        >
          <View style={styles.heroTextContainer}>
            <Text
              style={[styles.heroText, { textAlign: isRTL ? "right" : "left" }]}
            >
              {t("screens.more.aboutUs.hero.companyName")}
            </Text>
            <Text
              style={[
                styles.heroSubtext,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("screens.more.aboutUs.hero.subtitle")}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
};

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  scrollX,
  cardWidth,
}) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";
  const inputRange = [
    (index - 1) * CARD_FULL_WIDTH,
    index * CARD_FULL_WIDTH,
    (index + 1) * CARD_FULL_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1.05, 0.9],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.carouselCard,
        {
          width: cardWidth,
          transform: [{ scale }],
          opacity,
          marginHorizontal: SPACING,
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.carouselGradient}
      >
        <Text
          style={[styles.carouselText, { textAlign: isRTL ? "right" : "left" }]}
        >
          {t(item.title)}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

const CustomCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(
          event.nativeEvent.contentOffset.x / CARD_FULL_WIDTH
        );
        setActiveIndex(newIndex);
      },
    }
  );

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < cards.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [activeIndex]);

  const renderItem = ({ item, index }: { item: Card; index: number }) => (
    <CarouselCard
      item={item}
      index={index}
      scrollX={scrollX}
      cardWidth={CARD_WIDTH}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={cards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_FULL_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={handleScroll}
        renderItem={renderItem}
        contentContainerStyle={styles.carouselContent}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: CARD_FULL_WIDTH,
          offset: CARD_FULL_WIDTH * index,
          index,
        })}
      />
      {/* Enhanced pagination dots */}
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
              {
                transform: [
                  {
                    scale: scrollX.interpolate({
                      inputRange: [
                        (index - 1) * CARD_FULL_WIDTH,
                        index * CARD_FULL_WIDTH,
                        (index + 1) * CARD_FULL_WIDTH,
                      ],
                      outputRange: [0.8, 1.2, 0.8],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default function OurStory() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const handleContact = () => {
    Linking.openURL("mailto:info@keaaf.com").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.aboutUs.title"),
          headerStyle: {
            backgroundColor: "#F9FAFB",
          },
          headerTitleStyle: {
            color: "#1F2937",
            textAlign: isRTL ? "right" : "left",
          },
        }}
      />

      <HeroSection />

      <View style={styles.contentContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("screens.more.aboutUs.story.title")}
          </Text>
        </View>

        <Text
          style={[styles.storyText, { textAlign: isRTL ? "right" : "left" }]}
        >
          {t("screens.more.aboutUs.story.mainText")}
        </Text>

        <CustomCarousel />

        <View style={styles.additionalContent}>
          <Text
            style={[
              styles.additionalText,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("screens.more.aboutUs.story.additionalText1")}
          </Text>

          <Text
            style={[
              styles.additionalText,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("screens.more.aboutUs.story.additionalText2")}
          </Text>
        </View>

        <Pressable
          className="bg-red-600 rounded-full p-4  w-[100%] items-center justify-center"
          onPress={handleContact}
          style={({ pressed }) => [
            styles.contactButton,
            pressed && styles.contactButtonPressed,
          ]}
        >
          <Text
            style={[
              styles.contactButtonText,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("screens.more.aboutUs.contact.buttonText")}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 24,
  },
  sectionTitleContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16A34A",
    textAlign: "center",
  },
  storyText: {
    fontSize: 18,
    lineHeight: 35,
    color: "#1F2937",
    textAlign: "right",
    marginBottom: 32,
  },
  carouselContainer: {
    height: CARD_HEIGHT,
    marginBottom: 32,
  },
  carouselContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_FULL_WIDTH) / 2,
  },
  carouselCard: {
    height: CARD_HEIGHT,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    orderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  carouselImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  carouselGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    padding: 16,
    justifyContent: "flex-end",
  },
  carouselText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    position: "absolute",
    top: 50,
    bottom: 50,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    margin: "auto",
    justifyContent: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  additionalContent: {
    gap: 16,
    marginBottom: 32,
  },
  additionalText: {
    fontSize: 18,
    lineHeight: 40,
    color: "#1F2937",
    textAlign: "right",
  },
  contactButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  heroContainer: {
    width: "100%",
    height: 450, // Increased height
    marginBottom: 20,
  },

  heroTextContainer: {
    padding: 20,
    alignItems: "center",
  },

  heroText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 24,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  heroSubtext: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 10,
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(22, 163, 74, 0.3)",
    marginHorizontal: 6,
    transition: "0.3s",
  },

  paginationDotActive: {
    backgroundColor: "#16A34A",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
