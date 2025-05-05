// import { View, Text } from "react-native";
// import React from "react";

// const ShippingPolicy = () => {
//   return (
//     <View>
//       <Text>ShippingPolicy</Text>
//     </View>
//   );
// };

// export default ShippingPolicy;

/********************************************************* */

// import React from "react";
// import { View, Text, ScrollView, Pressable, Linking } from "react-native";
// import { Stack, Link } from "expo-router";
// import { Home, ChevronLeft, Phone, Mail, MapPin } from "lucide-react-native";
// import { MotiView } from "moti";

// const CONTACT_INFO = {
//   address: "Shuwaikh Al Rai, Behind Mustafa Karam",
//   phone: "+965 94076117",
//   email: "info@keaaf.com",
// };

// type TableOfContentsProps = {
//   items: { title: string; level: number }[];
// };

// const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => (
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

// type SectionProps = {
//   title: string;
//   children: React.ReactNode;
// };

// const Section: React.FC<SectionProps> = ({ title, children }) => (
//   <MotiView
//     from={{ opacity: 0, translateY: 20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-2">{title}</Text>
//     <Text className="text-gray-700">{children}</Text>
//   </MotiView>
// );

// const LastUpdated: React.FC<{ date: string }> = ({ date }) => (
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

// export default function ShippingPolicy() {
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
//           {/* <View className="flex-row items-center space-x-4 mb-6">
//             <Link href="/" className="flex-row items-center">
//               <Home size={16} color="#4B5563" />
//               <Text className="ml-1 text-gray-600">Home</Text>
//             </Link>
//             <ChevronLeft size={16} color="#9CA3AF" />
//             <Text className="text-gray-900">Shipping Policy</Text>
//           </View> */}

//           {/* Content Container */}
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 Shipping Policy
//               </Text>
//               <Text className="text-gray-600 mb-8">
//                 Information about our delivery services across Kuwait
//               </Text>
//             </MotiView>

//             {/* Table of Contents */}
//             <TableOfContents
//               items={[
//                 { title: "Delivery Locations", level: 1 },
//                 { title: "Delivery Costs", level: 1 },
//                 { title: "Delivery Schedule", level: 1 },
//                 { title: "Store Pickup", level: 1 },
//               ]}
//             />

//             {/* Sections */}
//             <Section title="Delivery Locations">
//               We deliver anywhere within Kuwait.
//             </Section>

//             <Section title="Delivery Costs">
//               Fixed delivery cost: 1 Kuwaiti Dinar for all orders, regardless of
//               size or location.
//             </Section>

//             <Section title="Delivery Schedule">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>Standard: Next-day delivery.</Text>
//                 <Text>
//                   Exception: Orders placed before 9:00 AM may qualify for
//                   same-day delivery (subject to availability).
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Store Pickup">
//               Customers can locate physical stores through our Store Locator
//               tool.
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

/************************************************************************/

import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, Link } from "expo-router";
import { Home, ChevronLeft, Phone, Mail, MapPin } from "lucide-react-native";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";

type TableOfContentsProps = {
  items: { title: string; level: number }[];
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
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
        {t("screens.more.shippingPolicy.tableOfContents.title")}
      </Text>
      {items.map((item, index) => (
        <Pressable key={index}>
          <Text
            className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t(
              `screens.more.shippingPolicy.tableOfContents.items.${index}.title`
            )}
          </Text>
        </Pressable>
      ))}
    </MotiView>
  );
};

type SectionProps = {
  titleKey: string;
  contentKey?: string;
  items?: string[];
};

const Section: React.FC<SectionProps> = ({ titleKey, contentKey, items }) => {
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
      {contentKey && (
        <Text
          className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {t(contentKey)}
        </Text>
      )}
      {items && (
        <View className="space-y-2">
          {items.map((item, index) => (
            <Text
              key={index}
              className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {item}
            </Text>
          ))}
        </View>
      )}
    </MotiView>
  );
};

const LastUpdated: React.FC<{ date: string }> = ({ date }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View className="mt-4">
      <Text
        className={`text-gray-500 ${isRTL ? "leading-[2.5]" : ""}`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t("screens.more.shippingPolicy.lastUpdated")} : {date}
      </Text>
    </View>
  );
};

const ContactBlock = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const handlePress = (type: "phone" | "email") => {
    const value =
      type === "phone"
        ? t("screens.more.shippingPolicy.contact.phone")
        : t("screens.more.shippingPolicy.contact.email");
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
        {t("screens.more.shippingPolicy.contact.title")}
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
            {t("screens.more.shippingPolicy.contact.address")}
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
              {t("screens.more.shippingPolicy.contact.phone")}
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
              {t("screens.more.shippingPolicy.contact.email")}
            </Text>
          </View>
        </Pressable>
      </View>
    </MotiView>
  );
};

export default function ShippingPolicy() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.shippingPolicy.title"),
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
                {t("screens.more.shippingPolicy.title")}
              </Text>
              <Text
                className={`text-gray-600 mb-8 ${isRTL ? "leading-[2.5]" : ""}`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.shippingPolicy.subtitle")}
              </Text>
            </MotiView>

            <TableOfContents
              items={t("screens.more.shippingPolicy.tableOfContents.items", {
                returnObjects: true,
              })}
            />

            <Section
              titleKey="screens.more.shippingPolicy.sections.deliveryLocations.title"
              contentKey="screens.more.shippingPolicy.sections.deliveryLocations.content"
            />

            <Section
              titleKey="screens.more.shippingPolicy.sections.deliveryCosts.title"
              contentKey="screens.more.shippingPolicy.sections.deliveryCosts.content"
            />

            <Section
              titleKey="screens.more.shippingPolicy.sections.deliverySchedule.title"
              items={t(
                "screens.more.shippingPolicy.sections.deliverySchedule.items",
                { returnObjects: true }
              )}
            />

            <Section
              titleKey="screens.more.shippingPolicy.sections.storePickup.title"
              contentKey="screens.more.shippingPolicy.sections.storePickup.content"
            />

            <ContactBlock />
            <LastUpdated date="February 5, 2025" />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
