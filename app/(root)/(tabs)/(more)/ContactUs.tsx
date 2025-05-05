// import { View, Text } from "react-native";
// import React from "react";

// const ContactUs = () => {
//   return (
//     <View>
//       <Text>ContactUs</Text>
//     </View>
//   );
// };

// export default ContactUs;

/************************************************************************ */

// import React from "react";
// import { View, Text, ScrollView, Image } from "react-native";
// import { Stack, Link } from "expo-router";
// import { Button, TextInput, useTheme } from "react-native-paper";
// import { MotiView } from "moti";

// const ContactForm = () => {
//   const theme = useTheme();

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: 200 }}
//       style={{
//         padding: 16,
//         backgroundColor: theme.colors.background,
//         borderRadius: 8,
//         shadowColor: theme.colors.shadow,
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       }}
//     >
//       <TextInput label="Name" mode="outlined" style={{ marginBottom: 16 }} />
//       <TextInput label="Email" mode="outlined" style={{ marginBottom: 16 }} />
//       <TextInput
//         label="Message"
//         mode="outlined"
//         multiline
//         numberOfLines={4}
//         style={{ marginBottom: 16 }}
//       />
//       <Button mode="contained" onPress={() => {}}>
//         Submit
//       </Button>
//     </MotiView>
//   );
// };

// export default function ContactUs() {
//   const theme = useTheme();

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: "Contact Us",
//         }}
//       />

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         <MotiView
//           from={{ opacity: 0, translateY: -20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           style={{ marginBottom: 24 }}
//         >
//           <Text
//             style={{
//               fontSize: 24,
//               fontWeight: "bold",
//               marginBottom: 8,
//               color: theme.colors.text,
//             }}
//           >
//             Contact Us
//           </Text>
//           <View
//             style={{
//               height: 2,
//               width: 80,
//               backgroundColor: theme.colors.primary,
//             }}
//           ></View>
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ delay: 200 }}
//           style={{ marginBottom: 24 }}
//         >
//           <Image
//             source={{
//               uri: "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             }}
//             style={{
//               height: 200,
//               width: "100%",
//               borderRadius: 8,
//               marginBottom: 16,
//             }}
//           />
//           <Text style={{ color: theme.colors.text, lineHeight: 24 }}>
//             نود أن نقدم لكم شركتنا ، شركة أولاد عبدالرحمن سلطان للمقاولات
//             الزراعية وصناعة الأعلاف ...
//           </Text>
//         </MotiView>

//         <ContactForm />
//       </ScrollView>
//     </View>
//   );
// }

/*****************************************************************/

// import React from "react";
// import { View, Text, ScrollView, Image } from "react-native";
// import { Stack, Link } from "expo-router";
// import { Button, TextInput, useTheme } from "react-native-paper";
// import { MotiView } from "moti";
// import { useTranslation } from "react-i18next";
// import { useLanguage } from "../../../contexts/LanguageContext";

// const ContactForm = () => {
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const { currentLanguage } = useLanguage();
//   const isRTL = currentLanguage === "ar";

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{ delay: 200 }}
//       style={{
//         padding: 16,
//         backgroundColor: theme.colors.background,
//         borderRadius: 8,
//         shadowColor: theme.colors.shadow,
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       }}
//     >
//       <TextInput
//         label={t("screens.more.contactUs.form.name")}
//         mode="outlined"
//         style={{ marginBottom: 16, textAlign: isRTL ? "right" : "left" }}
//         right={isRTL}
//       />
//       <TextInput
//         label={t("screens.more.contactUs.form.email")}
//         mode="outlined"
//         style={{ marginBottom: 16, textAlign: isRTL ? "right" : "left" }}
//         right={isRTL}
//       />
//       <TextInput
//         label={t("screens.more.contactUs.form.message")}
//         mode="outlined"
//         multiline
//         numberOfLines={4}
//         style={{ marginBottom: 16, textAlign: isRTL ? "right" : "left" }}
//         right={isRTL}
//       />
//       <Button
//         mode="contained"
//         onPress={() => {}}
//         style={[{ alignSelf: isRTL ? "flex-end" : "flex-start" }]}
//       >
//         {t("screens.more.contactUs.form.submit")}
//       </Button>
//     </MotiView>
//   );
// };

// export default function ContactUs() {
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const { currentLanguage } = useLanguage();
//   const isRTL = currentLanguage === "ar";

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           title: t("screens.more.contactUs.title"),
//         }}
//       />

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         <MotiView
//           from={{ opacity: 0, translateY: -20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           style={{ marginBottom: 24 }}
//         >
//           <Text
//             style={{
//               fontSize: 24,
//               fontWeight: "bold",
//               marginBottom: 8,
//               color: theme.colors.text,
//               textAlign: isRTL ? "right" : "left",
//             }}
//           >
//             {t("screens.more.contactUs.title")}
//           </Text>
//           <View
//             style={{
//               height: 2,
//               width: 80,
//               backgroundColor: theme.colors.primary,
//               alignSelf: isRTL ? "flex-end" : "flex-start",
//             }}
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ delay: 200 }}
//           style={{ marginBottom: 24 }}
//         >
//           <Image
//             source={{
//               uri: "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             }}
//             style={{
//               height: 200,
//               width: "100%",
//               borderRadius: 8,
//               marginBottom: 16,
//             }}
//           />
//           <Text
//             style={{
//               color: theme.colors.text,
//               lineHeight: 24,
//               textAlign: isRTL ? "right" : "left",
//               ...(isRTL && { lineHeight: 40 }), // Increased line height for Arabic
//             }}
//           >
//             {t("screens.more.contactUs.intro")}
//           </Text>
//         </MotiView>

//         <ContactForm />
//       </ScrollView>
//     </View>
//   );
// }

/********************************************** */

import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Stack } from "expo-router";
import { Button, TextInput, useTheme, HelperText } from "react-native-paper";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";
import axios from "axios";
import * as yup from "yup";

const ContactForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  // Form validation schema - Initialize with translation function
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("screens.more.contactUs.validate.name.required"))
      .min(2, t("screens.more.contactUs.validate.name.min")),
    email: yup
      .string()
      .email(t("screens.more.contactUs.validate.email.invalid"))
      .required(t("screens.more.contactUs.validate.email.required")),
    message: yup
      .string()
      .required(t("screens.more.contactUs.validate.message.required"))
      .min(10, t("screens.more.contactUs.validate.message.min")),
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Validate form data using the initialized schema
      await validationSchema.validate(formData, { abortEarly: false });

      // Make API request
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/contact-forms`,
        {
          data: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_TOKEN_CONTACT}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitStatus("success");
      // Clear form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.name === "ValidationError") {
        // Handle Yup validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        // Handle API errors
        setSubmitStatus("error");
        console.error("Submission error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 200 }}
      style={{
        padding: 16,
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {/* Name Input */}
      <TextInput
        label={t("screens.more.contactUs.form.name")}
        mode="outlined"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
        style={{
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
          direction: isRTL ? "rtl" : "ltr",
        }}
        error={!!errors.name}
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={!!errors.name}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {errors.name}
      </HelperText>

      {/* Email Input */}
      <TextInput
        label={t("screens.more.contactUs.form.email")}
        mode="outlined"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        style={{
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
          direction: isRTL ? "rtl" : "ltr",
        }}
        error={!!errors.email}
        disabled={loading}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText
        type="error"
        visible={!!errors.email}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {errors.email}
      </HelperText>

      {/* Message Input */}
      <TextInput
        label={t("screens.more.contactUs.form.message")}
        mode="outlined"
        value={formData.message}
        onChangeText={(text) => handleChange("message", text)}
        multiline
        numberOfLines={4}
        style={{
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
          direction: isRTL ? "rtl" : "ltr",
        }}
        error={!!errors.message}
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={!!errors.message}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {errors.message}
      </HelperText>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <Text
          style={{
            color: "green",
            marginBottom: 8,
            textAlign: "center",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {t("screens.more.contactUs.form.successMessage")}
        </Text>
      )}
      {submitStatus === "error" && (
        <Text
          style={{
            color: "red",
            marginBottom: 8,
            textAlign: "center",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {t("screens.more.contactUs.form.errorMessage")}
        </Text>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 16,
        }}
      >
        {t("screens.more.contactUs.form.submit")}
      </Button>
    </MotiView>
  );
};
export default function ContactUs() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Screen Header Configuration */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("screens.more.contactUs.title"),
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={{ marginBottom: 24 }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
              color: theme.colors.text,
              textAlign: isRTL ? "right" : "left",
              fontFamily: "System", // You might want to use your custom font here
            }}
          >
            {t("screens.more.contactUs.title")}
          </Text>

          {/* Decorative Underline */}
          <View
            style={{
              height: 2,
              width: 80,
              backgroundColor: theme.colors.primary,
              alignSelf: isRTL ? "flex-end" : "flex-start",
            }}
          />
        </MotiView>

        {/* Banner Image Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
          style={{ marginBottom: 24 }}
        >
          {/* Contact Banner Image */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1734640113825-24dd7c056052?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              height: 200,
              width: "100%",
              borderRadius: 8,
              marginBottom: 16,
              backgroundColor: theme.colors.surfaceVariant, // Placeholder color while loading
            }}
            resizeMode="cover"
          />

          {/* Introductory Text */}
          <Text
            style={{
              color: theme.colors.text,
              lineHeight: isRTL ? 40 : 24, // Increased line height for Arabic
              textAlign: isRTL ? "right" : "left",
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            {t("screens.more.contactUs.intro")}
          </Text>
        </MotiView>

        {/* Contact Form Component */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "timing",
            duration: 500,
            delay: 300,
          }}
        >
          <ContactForm />
        </MotiView>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
