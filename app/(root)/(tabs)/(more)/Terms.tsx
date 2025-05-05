// import { View, Text } from "react-native";
// import React from "react";

// const Terms = () => {
//   return (
//     <View>
//       <Text>Terms</Text>
//     </View>
//   );
// };

// export default Terms;

/***************************************************************** */

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

// export default function TermsScreen() {
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
//             <Text className="text-gray-900">Terms and Conditions</Text>
//           </View> */}

//           {/* Content Container */}
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 Terms and Conditions
//               </Text>
//               <Text className="text-gray-600 mb-8">
//                 Please read these terms carefully before using our services
//               </Text>
//             </MotiView>

//             <Text className="mb-6 text-gray-700">
//               Welcome to the website of Abdulrahman Sultan Sons Agricultural
//               Contracting and Animal Feed Manufacturing Company. By accessing
//               and using this website, you agree to the following terms and
//               conditions:
//             </Text>

//             {/* Table of Contents */}
//             <TableOfContents
//               items={[
//                 { title: "Eligibility", level: 1 },
//                 { title: "Product Information", level: 1 },
//                 { title: "Orders", level: 1 },
//                 { title: "Payment Methods", level: 1 },
//                 { title: "Delivery Policy", level: 1 },
//                 { title: "Customer Support", level: 1 },
//               ]}
//             />

//             {/* Sections */}
//             <Section title="Eligibility">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   Users must be at least 18 years of age or have
//                   parental/guardian consent.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Product Information">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   We strive to ensure all product details, descriptions, and
//                   pricing are accurate, but errors may occur.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Orders">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>Orders are subject to availability and acceptance.</Text>
//                 <Text>
//                   We reserve the right to cancel orders in case of unforeseen
//                   circumstances.
//                 </Text>
//                 <Text>
//                   Customers can cancel orders through WhatsApp support.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Payment Methods">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   We currently accept KNET payments and Cash on Delivery (COD).
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Delivery Policy">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   Delivery services are available as per our shipping policy.
//                 </Text>
//                 <Text>
//                   Delivery is fixed at 1 Kuwaiti Dinar across all of Kuwait,
//                   regardless of order size or location.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Customer Support">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   WhatsApp customer service is available from 8:00 AM to 5:00
//                   PM.
//                 </Text>
//                 <Text>
//                   Physical stores are open from 8:00 AM to 9:00 or 10:00 PM
//                   (depending on the day).
//                 </Text>
//               </View>
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

/*******************************************************************/

import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, Link } from "expo-router";
import { Home, ChevronLeft, Mail, Phone, MapPin } from "lucide-react-native";
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
        {t("screens.more.terms.tableOfContents.title")}
      </Text>
      {items.map((item, index) => (
        <Pressable key={index}>
          <Text
            className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t(`screens.more.terms.tableOfContents.items.${index}.title`)}
          </Text>
        </Pressable>
      ))}
    </MotiView>
  );
};

type SectionProps = {
  titleKey: string;
  items: string[];
};

const Section: React.FC<SectionProps> = ({ titleKey, items }) => {
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
      <View className="list-disc pl-5 space-y-2 text-gray-700">
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
        {t("screens.more.terms.lastUpdated")} : {date}
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
        ? t("screens.more.terms.contact.phone")
        : t("screens.more.terms.contact.email");
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
        {t("screens.more.terms.contact.title")}
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
            {t("screens.more.terms.contact.address")}
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
              {t("screens.more.terms.contact.phone")}
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
              {t("screens.more.terms.contact.email")}
            </Text>
          </View>
        </Pressable>
      </View>
    </MotiView>
  );
};

export default function TermsScreen() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const sections = t("screens.more.terms.sections", { returnObjects: true });

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.terms.title"),
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
                {t("screens.more.terms.title")}
              </Text>
              <Text
                className={`text-gray-600 mb-8 ${isRTL ? "leading-[2.5]" : ""}`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.terms.subtitle")}
              </Text>
            </MotiView>

            <Text
              className={`mb-6 text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("screens.more.terms.intro")}
            </Text>

            <TableOfContents
              items={t("screens.more.terms.tableOfContents.items", {
                returnObjects: true,
              })}
            />

            <Section
              titleKey="screens.more.terms.sections.eligibility.title"
              items={sections.eligibility.items}
            />

            <Section
              titleKey="screens.more.terms.sections.productInfo.title"
              items={sections.productInfo.items}
            />

            <Section
              titleKey="screens.more.terms.sections.orders.title"
              items={sections.orders.items}
            />

            <Section
              titleKey="screens.more.terms.sections.paymentMethods.title"
              items={sections.paymentMethods.items}
            />

            <Section
              titleKey="screens.more.terms.sections.deliveryPolicy.title"
              items={sections.deliveryPolicy.items}
            />

            <Section
              titleKey="screens.more.terms.sections.customerSupport.title"
              items={sections.customerSupport.items}
            />

            <ContactBlock />

            <LastUpdated date="2025-02-05" />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
