import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  useRoute,
  useNavigation,
  ThemeProvider,
} from "@react-navigation/native";
import "../global.css";
import Header from "@/components/Header";
import {
  ArrowLeftCircleIcon,
  GiftIcon,
  PlusIcon,
} from "react-native-heroicons/solid";

const index = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [text, setText] = useState("");

  const array = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <View className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <Header />

      <ScrollView
        className="w-[90%] flex"
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        {array?.map((d) => {
          return (
            <View
              key={d}
              className={`w-[100%] h-[100px] m-2 flex flex-row justify-center items-center rounded-md overflow-hidden ${
                d % 2 == 0 ? "bg-gray-200" : "bg-white"
              }`}
            >
              <View className="h-full w-1/3 bg-blue-300 flex justify-center items-center">
                <Text>Preview Image</Text>
              </View>
              <View className="h-full flex-1 flex-row justify-center items-center">
                <View className="flex-1 ps-4">
                  <Text className="font-semibold text-lg">Template Name</Text>
                  <Text>11:10AM ,Dec 12,2024</Text>
                </View>
                <View className="w-1/6">
                  {/* modal bottom oreiented */}
                  <TouchableOpacity
                    accessibilityLabel="Settings"
                    onPress={() => navigation.navigate("setting")}
                  >
                    <ArrowLeftCircleIcon color={"#000"} size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        accessibilityLabel="Templates"
        className="w-[70px] h-[70px] rounded-full bottom-0 right-0 absolute z-10 bg-violet-600  flex justify-center items-center mx-4 mb-16"
        onPress={() => navigation.navigate("template")}
      >
        <PlusIcon color="#fff" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default index;
