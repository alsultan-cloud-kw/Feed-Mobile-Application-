// app/(root)/(tabs)/(more)/language.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Text } from "react-native";
import { Stack } from "expo-router";

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: "en", label: t("common.languageSelector.english") },
    { code: "ar", label: t("common.languageSelector.arabic") },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#F9FAFB",
          },
          headerTitle: "Language",
          headerTitleStyle: {
            color: "#1F2937",
          },
        }}
      />
      <Text style={styles.title}>{t("common.languageSelector.title")}</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && styles.selectedLanguage,
          ]}
          onPress={() => changeLanguage(lang.code)}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === lang.code && styles.selectedLanguageText,
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  languageButton: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  selectedLanguage: {
    backgroundColor: "#e63746",
  },
  languageText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedLanguageText: {
    color: "#fff",
  },
});
