import React from "react";
import { View, Text, Button } from "react-native";
import i18n from "./i18n"; // Import i18n instance
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t } = useTranslation(); // `t` function for translations

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{t("language")}</Text>

      <Button title="English" onPress={() => changeLanguage("en")} />
      <Button title="Español" onPress={() => changeLanguage("es")} />
    </View>
  );
};

export default LanguageSwitcher;
