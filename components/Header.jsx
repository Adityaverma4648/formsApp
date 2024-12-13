import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  GiftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { Cog8ToothIcon, ShareIcon } from "react-native-heroicons/outline";
const Header = ({ templateName }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [rename, setRename] = useState(templateName);

  const renderHeaderContent = () => (
    <View className="w-full h-[40%] flex flex-row justify-between items-center px-4">
      <TouchableOpacity
        accessibilityLabel="Settings"
        onPress={() => navigation.navigate("setting")}
      >
        <Cog8ToothIcon color={"#000"} size={24} />
      </TouchableOpacity>
      <Text className="font-semibold text-xl"> All Forms</Text>
      <TouchableOpacity
        accessibilityLabel="Premium Features"
        onPress={() => navigation.navigate("premium")}
      >
        <GiftIcon color="#FFD700" size={24} />
      </TouchableOpacity>
    </View>
  );

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(text.toLowerCase())
  );

  const renderSearchBar = () => (
    <View className="w-[98%] h-[80%] flex flex-row justify-center items-center bg-gray-200 rounded-md px-4">
      <MagnifyingGlassIcon color={"#000"} size={20} />
      <TextInput
        className="flex-1 bg-transparent h-full px-3 text-sm"
        onChangeText={setText}
        value={text}
        placeholder="Search for Forms"
        accessibilityLabel="Search Forms"
      />
    </View>
  );

  return (
    <>
      {route.name === "index" && (
        <View className="w-screen top-0 left-0 h-[100px] bg-white z-10">
          <View className="w-full h-full flex flex-col justify-center items-center">
            {renderHeaderContent()}
            <View className="w-full h-[55%] flex justify-center items-center px-2.5">
              {renderSearchBar()}
            </View>
          </View>
        </View>
      )}

      {route.name === "template" && (
        <View className="w-screen bg-violet-600 h-[50px] flex flex-row justify-center items-center text-white">
          <View className="w-full h-full flex flex-row justify-between items-center px-4">
            <TouchableOpacity
              accessibilityLabel="index"
              onPress={() => navigation.navigate("index")}
            >
              <ArrowLeftIcon color={"#fff"} size={24} />
            </TouchableOpacity>
            <View className="font-semibold text-xl flex-1 h-full flex justify-center items-start ps-4">
              <Text className="font-semibold text-xl text-white">
                Templates
              </Text>
            </View>
          </View>
        </View>
      )}

      {route.name === "setting" && (
        <View className="w-screen top-0 left-0 z-10 bg-white h-[80px] flex flex-row justify-center items-center text-black">
          <View className="w-full h-full flex flex-row justify-between items-center px-4">
            <TouchableOpacity
              accessibilityLabel="index"
              onPress={() => navigation.navigate("index")}
            >
              <ArrowLeftIcon color={"#000"} size={24} />
            </TouchableOpacity>
            <View className="font-semibold text-xl flex-1 h-full flex justify-center items-start ps-4">
              <Text className="font-semibold text-xl text-black">Settings</Text>
            </View>
          </View>
        </View>
      )}

      {route.name === "UniqueTemplate" && (
        <View className="w-screen top-0 left-0 z-10 bg-white h-[50px] flex flex-row justify-center items-center text-black">
          <View className="w-full h-full flex flex-row justify-between items-center px-4">
            <TouchableOpacity
              accessibilityLabel="index"
              onPress={() => navigation.navigate("index")}
            >
              <ArrowLeftIcon color={"#000"} size={24} />
            </TouchableOpacity>
            <View className="font-semibold text-xl flex-1 h-full flex flex-row justify-center items-start ps-4">
              <View className="h-full flex justify-center items-center flex-1">
                <TextInput
                  value={rename}
                  onChangeText={(text) => setRename(text)}
                  className="font-semibold text-xl text-black"
                ></TextInput>
              </View>

              <View className="flex flex-row justify-evenly items-center h-full w-1/3">
                <TouchableOpacity
                  accessibilityLabel="premium"
                  onPress={() => navigation.navigate("premium")}
                >
                  <GiftIcon color={"#000"} size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                  accessibilityLabel="premium"
                  onPress={() => navigation.navigate("premium")}
                >
                  <ShareIcon color={"#000"} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* {route.name === "template/[id]" && (
        <View className="w-screen top-0 left-0 z-10 bg-white h-[50px] flex flex-row justify-center items-center text-black">
          <View className="w-full h-full flex flex-row justify-between items-center px-4">
            <TouchableOpacity
              accessibilityLabel="index"
              onPress={() => navigation.navigate("index")}
            >
              <ArrowLeftIcon color={"#000"} size={24} />
            </TouchableOpacity>
            <View className="font-semibold text-xl flex-1 h-full flex flex-row justify-center items-start ps-4">
              <View className="h-full flex justify-center items-center flex-1">
                <TextInput
                  value={rename}
                  onChangeText={(text) => setRename(text)}
                  className="font-semibold text-xl text-black"
                ></TextInput>
              </View>

              <View className="flex flex-row justify-evenly items-center h-full w-1/3">
                <TouchableOpacity
                  accessibilityLabel="premium"
                  onPress={() => navigation.navigate("premium")}
                >
                  <GiftIcon color={"#000"} size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                  accessibilityLabel="premium"
                  onPress={() => navigation.navigate("premium")}
                >
                  <ShareIcon color={"#000"} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )} */}
    </>
  );
};

export default Header;
