// import Slider from "@/app/Components/Carousel/Slider";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import slides from "../../Utils/slides";
// import AnimatedCarousel from "@/app/Components/AnimatedCarousel";
// import ProductsGrid from "@/app/Components/ProductsGrid";
// import Parallex from "@/app/Components/Animated/Carousel/Parallex";
// import HomePage from "@/app/Screens/HomePage";
// import { useAuth } from "@/app/contexts/useAuth";
// import LoginModal from "@/app/LoginModal";
// import Animated from "react-native-reanimated";
// export default function Index() {
//   // const slides = [
//   //   {
//   //     id: "1",
//   //     content: (
//   //       <View className="bg-blue-100 w-full h-64 items-center justify-center p-6">
//   //         <Text className="text-2xl font-bold text-blue-900 mb-2">
//   //           Welcome!
//   //         </Text>
//   //         <Text className="text-base text-blue-800 text-center">
//   //           Start your journey with our amazing app
//   //         </Text>
//   //       </View>
//   //     ),
//   //     accessibilityLabel: "Welcome slide with introduction to the app",
//   //   },
//   //   {
//   //     id: "2",
//   //     content: (
//   //       <View className="bg-purple-100 w-full h-64 items-center justify-center p-6">
//   //         <View className="mb-4">
//   //           <Text className="text-xl font-bold text-purple-900 mb-2">
//   //             Key Features
//   //           </Text>
//   //           <Text className="text-purple-800">• Easy to use</Text>
//   //           <Text className="text-purple-800">• Always available</Text>
//   //           <Text className="text-purple-800">• 24/7 support</Text>
//   //         </View>
//   //       </View>
//   //     ),
//   //     accessibilityLabel: "Features slide showcasing key app benefits",
//   //   },
//   //   {
//   //     id: "3",
//   //     content: (
//   //       <View className="bg-green-100 w-full h-64 items-center justify-center p-6">
//   //         <Text className="text-2xl font-bold text-green-900 mb-2">
//   //           Get Started
//   //         </Text>
//   //         <Pressable
//   //           className="bg-green-500 px-6 py-3 rounded-full"
//   //           accessibilityRole="button"
//   //         >
//   //           <Text className="text-white font-semibold">Sign Up Now</Text>
//   //         </Pressable>
//   //       </View>
//   //     ),
//   //     accessibilityLabel: "Call to action slide with sign up button",
//   //   },
//   // ];
//   const { isSignedIn, showModal, setShowModal } = useAuth();
//   return (
//     <Animated.ScrollView nestedScrollEnabled={true}>
//       <View>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         ></View>

//         <View>
//           <HomePage />
//         </View>
//         {/* <View>
//           <Parallex />
//         </View> */}
//         {/* <View>
//           <Slider />
//         </View> */}

//         {/* <View>
//           <AnimatedCarousel />
//         </View> */}

//         {/* <View>
//           <ProductsGrid />
//         </View> */}
//       </View>
//     </Animated.ScrollView>
//   );
// }

/************************************************** */

// import Slider from "@/app/Components/Carousel/Slider";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import slides from "../../Utils/slides";
// import AnimatedCarousel from "@/app/Components/AnimatedCarousel";
// import ProductsGrid from "@/app/Components/ProductsGrid";
// import Parallex from "@/app/Components/Animated/Carousel/Parallex";
// import HomePage from "@/app/Screens/HomePage";
// import { useAuth } from "@/app/contexts/useAuth";
// import LoginModal from "@/app/LoginModal";
// import Animated from "react-native-reanimated";

// export default function Index() {
//   const { isSignedIn, showModal, setShowModal } = useAuth();

//   return (
//     <Animated.ScrollView nestedScrollEnabled>
//       <View>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         ></View>

//         <View>
//           <HomePage />
//         </View>
//         {/* <View>
//           <Parallex />
//         </View> */}
//         {/* <View>
//           <Slider />
//         </View> */}

//         {/* <View>
//           <AnimatedCarousel />
//         </View> */}

//         {/* <View>
//           <ProductsGrid />
//         </View> */}
//       </View>

//       {/* Login Modal */}
//       <LoginModal visible={showModal} onClose={() => setShowModal(false)} />
//     </Animated.ScrollView>
//   );
// }

/************************************************* */

// import Slider from "@/app/Components/Carousel/Slider";
// import { Pressable, Text, View } from "react-native";
// import slides from "../../Utils/slides";
// import AnimatedCarousel from "@/app/Components/AnimatedCarousel";
// import ProductsGrid from "@/app/Components/ProductsGrid";
// import Parallex from "@/app/Components/Animated/Carousel/Parallex";
// import HomePage from "@/app/Screens/HomePage";
// // import { useAuth } from "@/app/contexts/useAuth";
// // import LoginModal from "@/app/LoginModal";
// import Animated from "react-native-reanimated";

// export default function Index() {
//   // const { isSignedIn, showModal, setShowModal } = useAuth();

//   return (
//     <View style={{ flex: 1 }}>
//       {/* HomePage already contains its own scrollable content */}
//       <HomePage />

//       {/* Login Modal rendered outside any scrollable container */}
//       {/* <LoginModal visible={showModal} onClose={() => setShowModal(false)} /> */}
//     </View>
//   );
// }

/************************************************ */

import { View } from "react-native";
import HomePage from "@/app/Screens/HomePage";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* HomePage already contains its own scrollable content */}
      <HomePage />
      {/* Login Modal rendered outside any scrollable container */}
      {/* <LoginModal visible={showModal} onClose={() => setShowModal(false)} /> */}
    </View>
  );
}
