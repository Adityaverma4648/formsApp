import Header from "@/components/Header";
import SettingOptions from "@/components/SettingOptions";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  ChevronRightIcon,
  GiftIcon,
  LanguageIcon,
  ShareIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const setting = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="w-screen h-screen flex flex-col justify-start items-center bg-gray-200">
      <Header />

      {/* UserINfo */}
      <View className="my-4 w-[90%] h-[20%] flex justify-center items-center">
        <Text className="w-full text-lg flex justify-start items-center">
          Email Or Google Account
        </Text>
        <View className="w-full bg-white flex flex-row rounded-md justify-center items-center overflow-hidden">
          {/*  userInfo */}
          <View className="w-5/6 h-full flex flex-row justify-start items-center">
            <View className="w-1/4 h-full flex justify-center items-center">
              <View className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden bg-red-900">
                <Text>Profile Image</Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-lg">UserName</Text>
              <Text>adityaverma4648@gmail.com</Text>
            </View>
          </View>

          {/* Icon */}
          <View className="w-1/6 h-full flex justify-center items-center">
            <ChevronRightIcon color="#000" />
          </View>
        </View>
      </View>

      {/*  Upgrade to premium */}
      <View className="w-[90%] h-[15%] flex justify-center items-center mb-4 bg-white rounded-md">
        <TouchableOpacity
          accessibilityLabel="Premium Features"
          onPress={() => navigation.navigate("premium")}
          className="w-[90%]  flex justify-center items-center overflow-hidden"
        >
          <SettingOptions
            iconLeft="GiftIcon"
            text="Upgrade to Premium"
            iconRight="chevronRight"
            height={""}
            // to="premium"
          />
        </TouchableOpacity>
        <SettingOptions
          iconLeft="languageIcon"
          text="Select Language"
          iconRight={null}
          height={`h-[50%]`}
        />
      </View>

      {/* options */}
      <View className="w-[90%] h-[25%] bg-white flex justify-center items-center rounded-md">
        {/*  share the PlayStore link  */}
        <SettingOptions
          height={"h-[33%]"}
          iconLeft="shareIcon"
          text="Share the PlayStore link"
          iconRight="chevronRight"
        />

        {/*  share the rating link  */}
        <SettingOptions
          height={"h-[33%]"}
          iconLeft="starIcon"
          text="Rate the app on PlayStore"
          iconRight="chevronRight"
        />

        {/*  share the email link  */}
        <SettingOptions
          height={"h-[33%]"}
          iconLeft="emailIcon"
          text="Email"
          iconRight="chevronRight"
        />
      </View>

      <View className="w-[90%] h-[15%] bg-white flex justify-center items-center rounded-md mt-4">
        {/*  share the PlayStore link  */}
        <SettingOptions
          height="h-[50%]"
          iconLeft="privacyIcon"
          text="Privacy policy"
          iconRight="chevronRight"
        />

        {/*  share the PlayStore link  */}
        <SettingOptions
          height="h-[50%]"
          iconLeft="documentIcon"
          text="Term of use"
          iconRight="chevronRight"
        />
      </View>
    </SafeAreaView>
  );
};

export default setting;
