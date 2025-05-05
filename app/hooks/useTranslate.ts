// src/hooks/useTranslate.ts
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";

const useTranslate = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  return {
    translate: t,
    isRTL,
    currentLanguage,
  };
};

export default useTranslate;
