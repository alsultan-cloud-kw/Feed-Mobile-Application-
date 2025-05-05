// import { View, Text } from "react-native";
// import React from "react";

// const more = () => {
//   return (
//     <View>
//       <Text>more </Text>
//     </View>
//   );
// };

// export default more;

/********************************** */

// import { View, Text, Pressable, ScrollView } from "react-native";
// import { Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// interface MenuItemProps {
//   iconName: keyof typeof Ionicons.glyphMap;
//   label: string;
//   href: string;
// }

// const MenuItem = ({ iconName, label, href }: MenuItemProps) => (
//   <Link href={href} asChild>
//     <Pressable>
//       {({ pressed }) => (
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             padding: 16,
//             backgroundColor: pressed ? "#f5f5f5" : "white",
//           }}
//         >
//           <View style={{ marginRight: 12 }}>
//             <Ionicons name={iconName} size={24} color="#1a1a1a" />
//           </View>
//           <Text style={{ flex: 1, fontSize: 16 }}>{label}</Text>
//           <Ionicons name="chevron-forward" size={20} color="#666" />
//         </View>
//       )}
//     </Pressable>
//   </Link>
// );

// const MenuGroup = ({ children }: { children: React.ReactNode }) => (
//   <View
//     style={{
//       backgroundColor: "white",
//       borderRadius: 12,
//       marginBottom: 20,
//       overflow: "hidden",
//     }}
//   >
//     {children}
//   </View>
// );

// const Separator = () => (
//   <View
//     style={{
//       height: 1,
//       backgroundColor: "#f0f0f0",
//       marginLeft: 16,
//     }}
//   />
// );

// export default function more() {
//   return (
//     <ScrollView>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#f8f8f8",
//           padding: 16,
//         }}
//       >
//         {/* Settings & Accessibility Group */}
//         <MenuGroup>
//           <MenuItem
//             iconName="settings-outline"
//             label="Login and User Settings"
//             href="/(Settings)"
//           />
//           <Separator />
//           <MenuItem
//             iconName="language-outline"
//             label="Language"
//             href="/language"
//           />
//           <Separator />
//           <MenuItem
//             iconName="options-outline"
//             label="Accessibility"
//             href="/Accessibility"
//           />
//         </MenuGroup>

//         {/* Help & Policies Group */}
//         <MenuGroup>
//           <MenuItem iconName="help-circle-outline" label="FAQ" href="/FAQ" />
//           <Separator />
//           <MenuItem iconName="shield-outline" label="Privacy" href="/Privacy" />
//           <Separator />
//           <MenuItem
//             iconName="return-down-back-outline"
//             label="Return Policy"
//             href="/ReturnPolicy"
//           />
//           <Separator />
//           <MenuItem
//             iconName="car-outline"
//             label="Shipping Policy"
//             href="/ShippingPolicy"
//           />
//           <Separator />
//           <MenuItem
//             iconName="document-text-outline"
//             label="Terms"
//             href="/Terms"
//           />
//         </MenuGroup>

//         {/* Company Info Group */}
//         <MenuGroup>
//           <MenuItem
//             iconName="mail-outline"
//             label="Contact Us"
//             href="/ContactUs"
//           />
//           <Separator />
//           <MenuItem
//             iconName="information-circle-outline"
//             label="About Us"
//             href="/AboutUs"
//           />
//         </MenuGroup>
//       </View>
//     </ScrollView>
//   );
// }

/***************************************************/

import { View, Text, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext"; // Adjust the import path as needed

interface MenuItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  translationKey: string;
  href: string;
}

const MenuItem = ({ iconName, translationKey, href }: MenuItemProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row", // Add RTL support
              alignItems: "center",
              padding: 16,
              backgroundColor: pressed ? "#f5f5f5" : "white",
            }}
          >
            <View
              style={{
                marginRight: isRTL ? 0 : 12,
                marginLeft: isRTL ? 12 : 0,
              }}
            >
              <Ionicons name={iconName} size={24} color="#1a1a1a" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t(translationKey)}
            </Text>
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-forward"}
              size={20}
              color="#666"
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const MenuGroup = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      backgroundColor: "white",
      borderRadius: 12,
      marginBottom: 20,
      overflow: "hidden",
    }}
  >
    {children}
  </View>
);

const Separator = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "#f0f0f0",
      marginLeft: 16,
    }}
  />
);

export default function More() {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          padding: 16,
        }}
      >
        {/* Settings & Accessibility Group */}
        <MenuGroup>
          <MenuItem
            iconName="settings-outline"
            translationKey="screens.more.settings.loginSettings"
            href="/(Settings)"
          />
          <Separator />
          <MenuItem
            iconName="language-outline"
            translationKey="screens.more.settings.language"
            href="/language"
          />
          <Separator />
          <MenuItem
            iconName="options-outline"
            translationKey="screens.more.settings.accessibility"
            href="/Accessibility"
          />
        </MenuGroup>

        {/* Help & Policies Group */}
        <MenuGroup>
          <MenuItem
            iconName="help-circle-outline"
            translationKey="screens.more.help.faq"
            href="/FAQ"
          />
          <Separator />
          <MenuItem
            iconName="shield-outline"
            translationKey="screens.more.help.privacy"
            href="/Privacy"
          />
          <Separator />
          <MenuItem
            iconName="return-down-back-outline"
            translationKey="screens.more.help.returnPolicy"
            href="/ReturnPolicy"
          />
          <Separator />
          <MenuItem
            iconName="car-outline"
            translationKey="screens.more.help.shippingPolicy"
            href="/ShippingPolicy"
          />
          <Separator />
          <MenuItem
            iconName="document-text-outline"
            translationKey="screens.more.help.terms"
            href="/Terms"
          />
        </MenuGroup>

        {/* Company Info Group */}
        <MenuGroup>
          <MenuItem
            iconName="mail-outline"
            translationKey="screens.more.company.contactUs"
            href="/ContactUs"
          />
          <Separator />
          <MenuItem
            iconName="information-circle-outline"
            translationKey="screens.more.company.aboutUs"
            href="/AboutUs"
          />
        </MenuGroup>
      </View>
    </ScrollView>
  );
}
