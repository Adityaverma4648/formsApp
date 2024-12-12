import React, { useState } from "react";
import { View, Text } from "react-native";
import { GiftIcon } from "react-native-heroicons/solid";

import {
  ChevronRightIcon,
  DocumentIcon,
  LanguageIcon,
  ShareIcon,
  ShieldExclamationIcon,
  StarIcon,
  EnvelopeIcon,
} from "react-native-heroicons/outline";
import languages from "../utils/language.json";
import RNPickerSelect from "react-native-picker-select";

const SettingOptions = ({ iconLeft, iconRight, text, height }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languageOptions = languages.map((lang) => ({
    label: lang.languageCode.toUpperCase(),
    value: lang.languageCode,
  }));

  return (
    <View
      className={`w-full ${height} border-b border-gray-300 flex flex-row justify-center items-center`}
    >
      <View className="h-full flex-1 flex flex-row justify-start items-center ">
        <View
          className={` ${
            iconLeft === " languageIcon" ? "w-1/2" : "w-1/4"
          }  h-full flex justify-center items-center`}
        >
          {iconLeft === "GiftIcon" && <GiftIcon color={"#000"} className="" />}
          {iconLeft === "shareIcon" ? <ShareIcon color={"#000"} /> : ""}
          {iconLeft === "privacyIcon" ? (
            <ShieldExclamationIcon color={"#000"} />
          ) : (
            ""
          )}
          {iconLeft === "starIcon" ? <StarIcon color={"#000"} /> : ""}
          {iconLeft === "documentIcon" ? <DocumentIcon color={"#000"} /> : ""}
          {iconLeft === "languageIcon" ? <LanguageIcon color={"#000"} /> : ""}
          {iconLeft === "emailIcon" ? <EnvelopeIcon color={"#000"} /> : ""}
        </View>
        <View className={`flex px-2`}>
          <Text>{text}</Text>
        </View>
      </View>

      <View
        className={`w-1/6 h-full flex justify-center items-center ${
          iconLeft === "languageIcon" ? "w-1/3" : ""
        }`}
      >
        {iconRight === "chevronRight" && <ChevronRightIcon color={"#000"} />}
        {iconLeft === "languageIcon" && (
          <RNPickerSelect
            onValueChange={(value) => {
              setSelectedLanguage(value);
              const selectedLangObject = languages.find(
                (lang) => lang.languageCode === value
              );
              setSelectedLanguage(selectedLanguage); // Pass selected language data to the parent
            }}
            items={languageOptions}
            placeholder={{ label: "Choose a language...", value: null }}
            value={selectedLanguage}
          />
        )}
      </View>
    </View>
  );
};

export default SettingOptions;
