// import React from "react";
// import { View, Text, ScrollView, Pressable, Linking } from "react-native";
// import { Stack, Link } from "expo-router";
// import { Home, ChevronLeft, Mail, Phone, MapPin } from "lucide-react-native";
// import { MotiView } from "moti";

// const CONTACT_INFO = {
//   address: "Shuwaikh Al Rai, Behind Mustafa Karam",
//   phone: "+965 94076117",
//   email: "info@keaaf.com",
// };

// const TableOfContents = ({ items }) => (
//   <MotiView
//     from={{ opacity: 0, translateY: -20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-4">
//       Table of Contents
//     </Text>
//     {items.map((item, index) => (
//       <Pressable key={index}>
//         <Text className="text-gray-700">{item.title}</Text>
//       </Pressable>
//     ))}
//   </MotiView>
// );

// const Section = ({ title, children }) => (
//   <MotiView
//     from={{ opacity: 0, translateY: 20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-2">{title}</Text>
//     <Text className="text-gray-700">{children}</Text>
//   </MotiView>
// );

// const LastUpdated = ({ date }) => (
//   <View className="mt-4">
//     <Text className="text-gray-500">Last Updated: {date}</Text>
//   </View>
// );

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
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "Privacy Policy",
//         }}
//       />
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

// export default function Privacy() {
//   return (
//     <View className="flex-1 bg-gray-50">
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//       />

//       <ScrollView className="flex-1">
//         <MotiView
//           from={{ opacity: 0, translateY: -20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           className="py-12 px-4"
//         >
//           {/* Navigation */}
//           {/* <View className="flex-row items-center space-x-4 mb-6">
//             <Link href="/" className="flex-row items-center">
//               <Home size={16} color="#4B5563" />
//               <Text className="ml-1 text-gray-600">Home</Text>
//             </Link>
//             <ChevronLeft size={16} color="#9CA3AF" />
//             <Text className="text-gray-900">Privacy Policy</Text>
//           </View> */}

//           {/* Content Container */}
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 Privacy Policy
//               </Text>
//               <Text className="text-gray-600 mb-8">
//                 How we protect and handle your personal information
//               </Text>
//             </MotiView>

//             {/* Table of Contents */}
//             <TableOfContents
//               items={[
//                 {
//                   id: "information-collection",
//                   title: "Information Collection",
//                   level: 1,
//                 },
//                 { id: "usage", title: "Usage of Information", level: 1 },
//                 { id: "third-parties", title: "Third Parties", level: 1 },
//                 { id: "security", title: "Security", level: 1 },
//               ]}
//             />

//             {/* Sections */}
//             <Section title="Information Collection">
//               We collect necessary details such as your name, contact
//               information, and order history to process orders.
//             </Section>

//             <Section title="Usage of Information">
//               Personal data is used strictly for processing orders, improving
//               services, and marketing (if consent is provided).
//             </Section>

//             <Section title="Third Parties">
//               We do not share your data with third parties except as required to
//               fulfill your orders or comply with legal obligations.
//             </Section>

//             <Section title="Security">
//               We use industry-standard encryption and security measures to
//               protect your data.
//             </Section>

//             {/* Contact Block */}
//             <ContactBlock />

//             {/* Last Updated */}
//             <LastUpdated date="December 28, 2024" />
//           </View>
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

/************************************************************ */

import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, Link } from "expo-router";
import { Home, ChevronLeft, Mail, Phone, MapPin } from "lucide-react-native";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";

const TableOfContents = ({ items }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="mb-6"
    >
      <Text
        className={`text-lg font-medium text-gray-900 mb-4 ${
          isRTL ? "leading-[2.5]" : ""
        }`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t("screens.more.privacy.tableOfContents.title")}
      </Text>
      {items.map((item, index) => (
        <Pressable key={index}>
          <Text
            className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t(`screens.more.privacy.tableOfContents.items.${index}.title`)}
          </Text>
        </Pressable>
      ))}
    </MotiView>
  );
};

const Section = ({ titleKey, contentKey }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="mb-6"
    >
      <Text
        className={`text-lg font-medium text-gray-900 mb-2 ${
          isRTL ? "leading-[2.5]" : ""
        }`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t(titleKey)}
      </Text>
      <Text
        className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t(contentKey)}
      </Text>
    </MotiView>
  );
};

const LastUpdated = ({ date }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View className="mt-4">
      <Text
        className={`text-gray-500 ${isRTL ? "leading-[2.5]" : ""}`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t("screens.more.privacy.lastUpdated")} : {date}
      </Text>
    </View>
  );
};

const ContactBlock = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const contactInfo = {
    address: t("screens.more.privacy.contact.address"),
    phone: t("screens.more.privacy.contact.phone"),
    email: t("screens.more.privacy.contact.email"),
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
        {t("screens.more.privacy.contact.title")}
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

export default function Privacy() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.privacy.title"),
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
                {t("screens.more.privacy.title")}
              </Text>
              <Text
                className={`text-gray-600 mb-8 ${isRTL ? "leading-[2.5]" : ""}`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.privacy.subtitle")}
              </Text>
            </MotiView>

            <TableOfContents
              items={t("screens.more.privacy.tableOfContents.items", {
                returnObjects: true,
              })}
            />

            {Object.keys(
              t("screens.more.privacy.sections", { returnObjects: true })
            ).map((key) => (
              <Section
                key={key}
                titleKey={`screens.more.privacy.sections.${key}.title`}
                contentKey={`screens.more.privacy.sections.${key}.content`}
              />
            ))}

            <ContactBlock />
            <LastUpdated date="December 28, 2024" />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
