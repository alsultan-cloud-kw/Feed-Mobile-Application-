// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { i18n } from "i18next";
import { I18nManager } from "react-native";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  changeLanguage: async () => {},
});

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  i18n: i18n;
}> = ({ children, i18n }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = useCallback(
    async (lang: string) => {
      try {
        await i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
        // Handle RTL layout for Arabic
        const isRTL = lang === "ar";
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.forceRTL(isRTL);
          // You might want to reload the app here to apply RTL changes properly
        }
      } catch (error) {
        console.error("Error changing language:", error);
      }
    },
    [i18n]
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
