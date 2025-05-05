// src/hooks/useLocalizedApi.ts
import { useLanguage } from "../contexts/LanguageContext";

export const useLocalizedApi = () => {
  const { currentLanguage } = useLanguage();

  const getLocalizedUrl = (baseUrl: string) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return currentLanguage === "en"
      ? baseUrl
      : `${baseUrl}${separator}locale=${currentLanguage}`;
  };

  return { getLocalizedUrl };
};

// ---------- How to use -------------

// const { getLocalizedUrl } = useLocalizedApi();

// // In your API function
// const fetchProducts = async () => {
//   const response = await fetch(getLocalizedUrl('http://localhost:1337/api/products'));
//   return response.json();
// };
