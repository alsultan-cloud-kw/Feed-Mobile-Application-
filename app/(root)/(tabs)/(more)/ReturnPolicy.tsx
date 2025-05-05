// import React from "react";
// import { View, Text, ScrollView, Pressable, Linking } from "react-native";
// import { Stack, Link } from "expo-router";
// import { Home, ChevronLeft, Mail, MapPin, Phone } from "lucide-react-native";
// import { MotiView } from "moti";

// const CONTACT_INFO = {
//   address: "Shuwaikh Al Rai, Behind Mustafa Karam",
//   phone: "+965 94076117",
//   email: "info@keaaf.com",
// };

// const TableOfContents = ({ items }: { items: [] }) => (
//   <MotiView
//     from={{ opacity: 0, translateY: -20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-4">
//       Table of Contents
//     </Text>
//     {items.map((item: any, index: any) => (
//       <Pressable key={index}>
//         <Text className="text-gray-700">{item.title}</Text>
//       </Pressable>
//     ))}
//   </MotiView>
// );

// const Section = ({ title, children }: { title: string; children: string }) => (
//   <MotiView
//     from={{ opacity: 0, translateY: 20 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     className="mb-6"
//   >
//     <Text className="text-lg font-medium text-gray-900 mb-2">{title}</Text>
//     <Text className="text-gray-700">{children}</Text>
//   </MotiView>
// );

// const LastUpdated = ({ date }: { date: string }) => (
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

// export default function ReturnPolicy() {
//   return (
//     <View className="flex-1 bg-gray-50">
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "Return Policy",
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
//             <Text className="text-gray-900">Return Policy</Text>
//           </View> */}

//           {/* Content Container */}
//           <View className="bg-white rounded-2xl shadow-sm p-6">
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 200 }}
//             >
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 Return Policy
//               </Text>
//               <Text className="text-gray-600 mb-8">
//                 Information about our return and refund processes
//               </Text>
//             </MotiView>

//             <Text className="mb-6 text-gray-700">
//               Your satisfaction is our priority. Here&apos;s how we handle
//               returns:
//             </Text>

//             {/* Table of Contents */}
//             <TableOfContents
//               items={[
//                 { id: "eligibility", title: "Return Eligibility", level: 1 },
//                 { id: "refunds", title: "Refunds Process", level: 1 },
//                 {
//                   id: "non-returnable",
//                   title: "Non-Returnable Items",
//                   level: 1,
//                 },
//                 { id: "return-process", title: "Return Process", level: 1 },
//               ]}
//             />

//             {/* Sections */}
//             <Section title="Return Eligibility">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>Returns are accepted within 15 days of purchase.</Text>
//                 <Text>
//                   Products must be unused, undamaged, and in their original
//                   packaging.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Refunds Process">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   Refunds will be processed within 7–10 business days after the
//                   product is received and inspected.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Non-Returnable Items">
//               <View className="list-disc pl-5 space-y-2 text-gray-700">
//                 <Text>
//                   Perishable goods (e.g., fresh feed) are non-returnable.
//                 </Text>
//               </View>
//             </Section>

//             <Section title="Return Process">
//               <View className="space-y-4 text-gray-700">
//                 <Text>To initiate a return:</Text>
//                 <View className="list-decimal pl-5 space-y-2">
//                   <Text>
//                     Contact our support team through WhatsApp or email
//                   </Text>
//                   <Text>Provide your order number and reason for return</Text>
//                   <Text>Receive return authorization and instructions</Text>
//                   <Text>Package the item(s) in their original packaging</Text>
//                   <Text>Return the item(s) to the specified location</Text>
//                 </View>
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

/******************************************************** */

import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, Link } from "expo-router";
import { Home, ChevronLeft, Mail, MapPin, Phone } from "lucide-react-native";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";

const TableOfContents = ({ items }: { items: [] }) => {
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
        {t("screens.more.returnPolicy.tableOfContents.title")}
      </Text>
      {items.map((item: any, index: any) => (
        <Pressable key={index}>
          <Text
            className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t(
              `screens.more.returnPolicy.tableOfContents.items.${index}.title`
            )}
          </Text>
        </Pressable>
      ))}
    </MotiView>
  );
};

const Section = ({
  titleKey,
  items,
  intro,
  steps,
}: {
  titleKey: string;
  items?: string[];
  intro?: string;
  steps?: string[];
}) => {
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

      {items &&
        items.map((item, index) => (
          <Text
            key={index}
            className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {item}
          </Text>
        ))}

      {intro && (
        <Text
          className={`text-gray-700 mb-2 ${isRTL ? "leading-[2.5]" : ""}`}
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {intro}
        </Text>
      )}

      {steps && (
        <View className="space-y-2">
          {steps.map((step, index) => (
            <Text
              key={index}
              className={`text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {`${index + 1}. ${step}`}
            </Text>
          ))}
        </View>
      )}
    </MotiView>
  );
};

const LastUpdated = ({ date }: { date: string }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View className="mt-4">
      <Text
        className={`text-gray-500 ${isRTL ? "leading-[2.5]" : ""}`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {t("screens.more.returnPolicy.lastUpdated")} : {date}
      </Text>
    </View>
  );
};

const ContactBlock = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const contactInfo = {
    address: t("screens.more.returnPolicy.contact.address"),
    phone: t("screens.more.returnPolicy.contact.phone"),
    email: t("screens.more.returnPolicy.contact.email"),
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
        {t("screens.more.returnPolicy.contact.title")}
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

export default function ReturnPolicy() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  const sections = t("screens.more.returnPolicy.sections", {
    returnObjects: true,
  });

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.returnPolicy.title"),
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
                {t("screens.more.returnPolicy.title")}
              </Text>
              <Text
                className={`text-gray-600 mb-8 ${isRTL ? "leading-[2.5]" : ""}`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("screens.more.returnPolicy.subtitle")}
              </Text>
            </MotiView>

            <Text
              className={`mb-6 text-gray-700 ${isRTL ? "leading-[2.5]" : ""}`}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("screens.more.returnPolicy.intro")}
            </Text>

            <TableOfContents
              items={t("screens.more.returnPolicy.tableOfContents.items", {
                returnObjects: true,
              })}
            />

            <Section
              titleKey="screens.more.returnPolicy.sections.eligibility.title"
              items={sections.eligibility.items}
            />

            <Section
              titleKey="screens.more.returnPolicy.sections.refunds.title"
              items={sections.refunds.items}
            />

            <Section
              titleKey="screens.more.returnPolicy.sections.nonReturnable.title"
              items={sections.nonReturnable.items}
            />

            <Section
              titleKey="screens.more.returnPolicy.sections.returnProcess.title"
              intro={sections.returnProcess.intro}
              steps={sections.returnProcess.steps}
            />

            <ContactBlock />

            <LastUpdated date="February 5, 2025" />
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
