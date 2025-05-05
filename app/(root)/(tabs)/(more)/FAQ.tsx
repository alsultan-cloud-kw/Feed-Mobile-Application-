// import { View, Text, ScrollView, Pressable, Linking } from "react-native";
// import { Stack, Link } from "expo-router";
// import {
//   Home,
//   ChevronLeft,
//   MapPin,
//   Phone,
//   Mail,
//   Settings,
// } from "lucide-react-native";
// import { MotiView } from "moti";

// const CONTACT_INFO = {
//   address: "Shuwaikh Al Rai, Behind Mustafa Karam",
//   phone: "+965 94076117",
//   email: "info@keaaf.com",
// };

// const FAQ_ITEMS = [
//   {
//     question: "Do you offer delivery?",
//     answer: "Yes, we deliver to all locations across Kuwait.",
//   },
//   {
//     question: "When will my order be delivered?",
//     answer: [
//       "Standard: Next-day delivery",
//       "Exception: Orders placed before 9:00 AM may qualify for same-day delivery (subject to availability)",
//     ],
//   },
//   {
//     question: "What payment methods do you accept?",
//     answer: ["KNET", "Cash on Delivery (COD)"],
//   },
//   {
//     question: "Where are your physical stores located?",
//     answer: [
//       "3 in Al Rai",
//       "2 in Kabd",
//       "2 in Wafra",
//       "1 in Jahra",
//       "1 in Abdali",
//     ],
//   },
//   {
//     question: "What are your store hours?",
//     answer:
//       "Physical stores are open from 8:00 AM to 9:00 or 10:00 PM, depending on the day.",
//   },
//   {
//     question: "Do you have customer support?",
//     answer:
//       "Yes, our WhatsApp customer service is available from 8:00 AM to 5:00 PM.",
//   },
//   {
//     question: "Can I cancel my order?",
//     answer:
//       "Yes, cancellations are accepted. Contact us via WhatsApp customer service to request cancellation.",
//   },
// ];

// const ContactBlock = () => {
//   const handlePress = (type: "phone" | "email") => {
//     const value = type === "phone" ? CONTACT_INFO.phone : CONTACT_INFO.email;
//     const prefix = type === "phone" ? "tel:" : "mailto:";
//     Linking.openURL(`${prefix}${value}`);
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: 600 }}
//       className="mt-6 p-6 bg-gray-50 rounded-2xl"
//     >
//       <Text className="text-lg font-medium text-gray-900 mb-4">Contact Us</Text>
//       <View className="space-y-4">
//         <View className="flex-row items-center space-x-2">
//           <MapPin size={20} color="#374151" />
//           <Text className="text-gray-700 flex-1">{CONTACT_INFO.address}</Text>
//         </View>

//         <Pressable onPress={() => handlePress("phone")}>
//           <View className="flex-row items-center space-x-2">
//             <Phone size={20} color="#374151" />
//             <Text className="text-gray-700">{CONTACT_INFO.phone}</Text>
//           </View>
//         </Pressable>

//         <Pressable onPress={() => handlePress("email")}>
//           <View className="flex-row items-center space-x-2">
//             <Mail size={20} color="#374151" />
//             <Text className="text-gray-700">{CONTACT_INFO.email}</Text>
//           </View>
//         </Pressable>
//       </View>
//     </MotiView>
//   );
// };

// const FAQ = ({
//   question,
//   answer,
//   index,
// }: {
//   question: string;
//   answer: string | string[];
//   index: number;
// }) => (
//   <MotiView
//     from={{ opacity: 0, translateX: -20 }}
//     animate={{ opacity: 1, translateX: 0 }}
//     transition={{ delay: index * 100 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-2">{question}</Text>
//     {Array.isArray(answer) ? (
//       <View className="ml-5">
//         {answer.map((item, idx) => (
//           <View key={idx} className="flex-row items-center mb-1">
//             <View className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
//             <Text className="text-gray-700">{item}</Text>
//           </View>
//         ))}
//       </View>
//     ) : (
//       <Text className="text-gray-700">{answer}</Text>
//     )}
//   </MotiView>
// );

// export default function FAQScreen() {
//   return (
//     <View className="flex-1 bg-gray-50">
//       <Stack.Screen
//         options={{
//           headerShown: true,
//         }}
//       />

//       <ScrollView className="flex-1">
//         <MotiView
//           from={{ opacity: 0, translateY: -20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           className="py-12 px-4"
//         >
//           {/* Navigation */}
//           {/* <View className="flex-row items-center  space-x-4 mb-6">
//             <Link href="/" className="flex-row items-center">
//               <Settings size={16} color="#4B5563" />
//               <Text className="ml-1 text-gray-600">More</Text>
//             </Link>
//             <ChevronLeft size={16} color="#9CA3AF" />
//             <Text className="text-gray-900">FAQ</Text>
//           </View> */}

//           {/* Content Container */}
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 Frequently Asked Questions
//               </Text>
//               <Text className="text-gray-600 mb-8">
//                 Find answers to the most commonly asked questions about our
//                 services
//               </Text>
//             </MotiView>

//             {/* FAQ Items */}
//             <View>
//               {FAQ_ITEMS.map((item, index) => (
//                 <FAQ key={index} {...item} index={index} />
//               ))}
//             </View>

//             {/* Contact Block */}
//             <ContactBlock />
//           </View>
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

/******************************************* */

// import { View, Text, ScrollView, Pressable, Linking } from "react-native";
// import { Stack, Link } from "expo-router";
// import {
//   Home,
//   ChevronLeft,
//   MapPin,
//   Phone,
//   Mail,
//   Settings,
// } from "lucide-react-native";
// import { MotiView } from "moti";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "../../../contexts/LanguageContext";

// const ContactBlock = () => {
//   const { t } = useTranslation();
//   const { currentLanguage } = useLanguage();
//   const isRTL = currentLanguage === "ar";

//   const contactInfo = {
//     address: t("screens.more.faq.contact.address"),
//     phone: t("screens.more.faq.contact.phone"),
//     email: t("screens.more.faq.contact.email"),
//   };

//   const handlePress = (type: "phone" | "email") => {
//     const value = type === "phone" ? contactInfo.phone : contactInfo.email;
//     const prefix = type === "phone" ? "tel:" : "mailto:";
//     Linking.openURL(`${prefix}${value}`);
//   };

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: 600 }}
//       className="mt-6 p-6 bg-gray-50 rounded-2xl"
//     >
//       <Text
//         className="text-lg font-medium text-gray-900 mb-4"
//         style={{ textAlign: isRTL ? "right" : "left" }}
//       >
//         {t("screens.more.faq.contact.title")}
//       </Text>
//       <View className="space-y-4">
//         <View
//           className="flex-row items-center space-x-2"
//           style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
//         >
//           <MapPin size={20} color="#374151" />
//           <Text
//             className="text-gray-700 flex-1"
//             style={{ textAlign: isRTL ? "right" : "left" }}
//           >
//             {contactInfo.address}
//           </Text>
//         </View>

//         <Pressable onPress={() => handlePress("phone")}>
//           <View
//             className="flex-row items-center space-x-2"
//             style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
//           >
//             <Phone size={20} color="#374151" />
//             <Text
//               className="text-gray-700"
//               style={{ textAlign: isRTL ? "right" : "left" }}
//             >
//               {contactInfo.phone}
//             </Text>
//           </View>
//         </Pressable>

//         <Pressable onPress={() => handlePress("email")}>
//           <View
//             className="flex-row items-center space-x-2"
//             style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
//           >
//             <Mail size={20} color="#374151" />
//             <Text
//               className="text-gray-700"
//               style={{ textAlign: isRTL ? "right" : "left" }}
//             >
//               {contactInfo.email}
//             </Text>
//           </View>
//         </Pressable>
//       </View>
//     </MotiView>
//   );
// };

// const FAQ = ({
//   question,
//   answer,
//   index,
//   isRTL,
// }: {
//   question: string;
//   answer: string | string[];
//   index: number;
//   isRTL: boolean;
// }) => (
//   <MotiView
//     from={{ opacity: 0, translateX: isRTL ? 20 : -20 }}
//     animate={{ opacity: 1, translateX: 0 }}
//     transition={{ delay: index * 100 }}
//     className="mb-6"
//   >
//     <Text
//       className="text-lg font-medium text-gray-900 mb-2"
//       style={{ textAlign: isRTL ? "right" : "left" }}
//     >
//       {question}
//     </Text>
//     {Array.isArray(answer) ? (
//       <View
//         className="ml-5"
//         style={{ marginLeft: isRTL ? 0 : 20, marginRight: isRTL ? 20 : 0 }}
//       >
//         {answer.map((item, idx) => (
//           <View
//             key={idx}
//             className="flex-row items-center mb-1"
//             style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
//           >
//             <View
//               className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"
//               style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
//             />
//             <Text
//               className="text-gray-700"
//               style={{ textAlign: isRTL ? "right" : "left" }}
//             >
//               {item}
//             </Text>
//           </View>
//         ))}
//       </View>
//     ) : (
//       <Text
//         className="text-gray-700"
//         style={{ textAlign: isRTL ? "right" : "left" }}
//       >
//         {answer}
//       </Text>
//     )}
//   </MotiView>
// );

// export default function FAQScreen() {
//   const { t } = useTranslation();
//   const { currentLanguage } = useLanguage();
//   const isRTL = currentLanguage === "ar";

//   const faqItems = Array.from({ length: 7 }, (_, i) => ({
//     question: t(`screens.more.faq.items.${i}.question`),
//     answer: t(`screens.more.faq.items.${i}.answer`, { returnObjects: true }),
//   }));

//   return (
//     <View className="flex-1 bg-gray-50">
//       <Stack.Screen
//         options={{
//           headerShown: true,
//         }}
//       />

//       <ScrollView className="flex-1">
//         <MotiView
//           from={{ opacity: 0, translateY: -20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           className="py-12 px-4"
//         >
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text
//                 className="text-3xl font-bold text-gray-900 mb-2"
//                 style={{ textAlign: isRTL ? "right" : "left" }}
//               >
//                 {t("screens.more.faq.title")}
//               </Text>
//               <Text
//                 className="text-gray-600 mb-8"
//                 style={{ textAlign: isRTL ? "right" : "left" }}
//               >
//                 {t("screens.more.faq.subtitle")}
//               </Text>
//             </MotiView>

//             <View>
//               {faqItems.map((item, index) => (
//                 <FAQ key={index} {...item} index={index} isRTL={isRTL} />
//               ))}
//             </View>

//             <ContactBlock />
//           </View>
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

/******************************************************************** */

import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, Link } from "expo-router";
import {
  Home,
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Settings,
} from "lucide-react-native";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";

const ContactBlock = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const contactInfo = {
    address: t("screens.more.faq.contact.address"),
    phone: t("screens.more.faq.contact.phone"),
    email: t("screens.more.faq.contact.email"),
  };

  const handlePress = (type: "phone" | "email") => {
    const value = type === "phone" ? contactInfo.phone : contactInfo.email;
    const prefix = type === "phone" ? "tel:" : "mailto:";
    Linking.openURL(`${prefix}${value}`);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 600 }}
      className="mt-6 p-6 bg-gray-50 rounded-2xl"
    >
      <Text
        className={`text-lg font-medium text-gray-900 mb-4 ${
          isRTL ? "leading-[2.5]" : ""
        }`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t("screens.more.faq.contact.title")}
      </Text>
      <View className="space-y-4">
        <View
          className="flex-row items-center space-x-2"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <MapPin size={20} color="#374151" />
          <Text
            className={`text-gray-700 flex-1 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {contactInfo.address}
          </Text>
        </View>

        <Pressable onPress={() => handlePress("phone")}>
          <View
            className="flex-row items-center space-x-2"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <Phone size={20} color="#374151" />
            <Text
              className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {contactInfo.phone}
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress("email")}>
          <View
            className="flex-row items-center space-x-2"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <Mail size={20} color="#374151" />
            <Text
              className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {contactInfo.email}
            </Text>
          </View>
        </Pressable>
      </View>
    </MotiView>
  );
};

const FAQ = ({
  question,
  answer,
  index,
  isRTL,
}: {
  question: string;
  answer: string | string[];
  index: number;
  isRTL: boolean;
}) => (
  <MotiView
    from={{ opacity: 0, translateX: isRTL ? 20 : -20 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ delay: index * 100 }}
    className="mb-6"
  >
    <Text
      className={`text-lg font-medium text-gray-900 mb-2 ${
        isRTL ? "leading-[2.5]" : ""
      }`}
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      {question}
    </Text>
    {Array.isArray(answer) ? (
      <View
        className="ml-5"
        style={{ marginLeft: isRTL ? 0 : 20, marginRight: isRTL ? 20 : 0 }}
      >
        {answer.map((item, idx) => (
          <View
            key={idx}
            className="flex-row items-center mb-1"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <View
              className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <Text
              className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    ) : (
      <Text
        className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {answer}
      </Text>
    )}
  </MotiView>
);

export default function FAQScreen() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const faqItems = Array.from({ length: 7 }, (_, i) => ({
    question: t(`screens.more.faq.items.${i}.question`),
    answer: t(`screens.more.faq.items.${i}.answer`, { returnObjects: true }),
  }));

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />

      <ScrollView className="flex-1">
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="py-12 px-4"
        >
          <View className="bg-white rounded-2xl shadow-sm p-6">
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 200 }}
            >
              <Text
                className={`text-3xl font-bold text-gray-900 mb-2 ${
                  isRTL ? "leading-[2.5]" : ""
                }`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.faq.title")}
              </Text>
              <Text
                className={`text-gray-600 mb-8 ${isRTL ? "leading-[2.5]" : ""}`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.faq.subtitle")}
              </Text>
            </MotiView>

            <View>
              {faqItems.map((item, index) => (
                <FAQ key={index} {...item} index={index} isRTL={isRTL} />
              ))}
            </View>

            <ContactBlock />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
