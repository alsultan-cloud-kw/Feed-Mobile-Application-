// import { View, Text } from "react-native";
// import React from "react";

// const Accessibility = () => {
//   return (
//     <View>
//       <Text>Accessibility</Text>
//     </View>
//   );
// };

// export default Accessibility;

/******************************************************** */

// import { View, Text, ScrollView } from "react-native";
// import { Stack } from "expo-router";
// import { MotiView } from "moti";
// import { useEffect, useState } from "react";
// import AnimatedLottieView from "lottie-react-native"; // Use this for animations

// export default function Accessibility() {
//   const [animationLoaded, setAnimationLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setAnimationLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View className="flex-1 bg-red-50">
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: "#f87171" },
//           headerTintColor: "#fff",
//           title: "Coming Soon",
//         }}
//       />

//       <ScrollView className="flex-1">
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ delay: 200 }}
//           className="py-20 px-6"
//         >
//           {/* Animated SVG or Lottie */}
//           <View className="flex items-center mb-10">
//             {animationLoaded ? (
//               <AnimatedLottieView
//                 source={require("../../../../assets/lotties/soon.json")} // Replace with your Lottie file path
//                 autoPlay
//                 loop
//                 style={{ width: 200, height: 200 }}
//               />
//             ) : (
//               <View className="w-16 h-16 rounded-full bg-red-200" />
//             )}
//           </View>

//           {/* Title */}
//           <Text className="text-4xl font-bold text-center text-red-700 mb-4">
//             Coming Soon!
//           </Text>

//           {/* Subtitle */}
//           <Text className="text-lg text-center text-gray-700 mb-8">
//             We're working hard to bring you this feature. Stay tuned!
//           </Text>

//           {/* Placeholder Content */}
//           <View className="bg-red-100 rounded-2xl shadow-md p-6">
//             <Text className="text-xl font-medium text-gray-800 mb-4">
//               What to Expect:
//             </Text>
//             <View className="ml-4">
//               <View className="flex-row items-center mb-2">
//                 <View className="w-2 h-2 rounded-full bg-red-400 mr-2" />
//                 <Text className="text-gray-700">Exciting new features</Text>
//               </View>
//               <View className="flex-row items-center mb-2">
//                 <View className="w-2 h-2 rounded-full bg-red-400 mr-2" />
//                 <Text className="text-gray-700">Seamless user experience</Text>
//               </View>
//               <View className="flex-row items-center">
//                 <View className="w-2 h-2 rounded-full bg-red-400 mr-2" />
//                 <Text className="text-gray-700">Updates coming your way</Text>
//               </View>
//             </View>
//           </View>
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

/***************************************** */
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext"; // Adjust path as needed

export default function Accessibility() {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  useEffect(() => {
    const timer = setTimeout(() => setAnimationLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-red-50">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#f87171" },
          headerTintColor: "#fff",
          title: t("screens.more.accessibility.title"),
        }}
      />

      <ScrollView
        className="flex-1"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
          className="py-20 px-6"
        >
          {/* Animated SVG or Lottie */}
          <View className="flex items-center mb-10">
            {animationLoaded ? (
              <AnimatedLottieView
                source={require("../../../../assets/lotties/soon.json")}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <View className="w-16 h-16 rounded-full bg-red-200" />
            )}
          </View>

          {/* Title */}
          <Text
            className="text-4xl font-bold text-center text-red-700 mb-4 leading-[3]"
            style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
          >
            {t("screens.more.accessibility.mainHeading")}
          </Text>

          {/* Subtitle */}
          <Text
            className="text-lg text-center text-gray-700 mb-8 leading-[2.5]"
            style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
          >
            {t("screens.more.accessibility.subtitle")}
          </Text>

          {/* Placeholder Content */}
          <View className="bg-red-100 rounded-2xl shadow-md p-6 ">
            <Text
              className="text-xl font-medium text-gray-800 mb-4 leading-[2.5]"
              style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
            >
              {t("screens.more.accessibility.expectationsTitle")}
            </Text>
            <View
              className="ml-4"
              style={{
                marginLeft: isRTL ? 0 : 16,
                marginRight: isRTL ? 16 : 0,
              }}
            >
              <View
                className="flex-row items-center mb-2"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <View
                  className="w-2 h-2 rounded-full bg-red-400 mr-2"
                  style={{
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
                  }}
                />
                <Text
                  className="text-gray-700"
                  style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
                >
                  {t("screens.more.accessibility.expectations.feature1")}
                </Text>
              </View>
              <View
                className="flex-row items-center mb-2"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <View
                  className="w-2 h-2 rounded-full bg-red-400 mr-2"
                  style={{
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
                  }}
                />
                <Text
                  className="text-gray-700"
                  style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
                >
                  {t("screens.more.accessibility.expectations.feature2")}
                </Text>
              </View>
              <View
                className="flex-row items-center"
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <View
                  className="w-2 h-2 rounded-full bg-red-400 mr-2"
                  style={{
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
                  }}
                />
                <Text
                  className="text-gray-700"
                  style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
                >
                  {t("screens.more.accessibility.expectations.feature3")}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
