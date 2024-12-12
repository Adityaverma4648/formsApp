import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

// Import language files
import en from "./locales/en.json";
import es from "./locales/es.json";

// Get device language
const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale || "en"
    : NativeModules.I18nManager.localeIdentifier || "en";

// i18next initialization
i18n
  .use(initReactI18next) // Passes i18n to React
  .init({
    fallbackLng: "en", // Default language
    lng: deviceLanguage.split("_")[0], // Device language
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
