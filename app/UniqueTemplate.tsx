import Header from "@/components/Header";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

const UniqueTemplate = ({ route }) => {
  const { templateData } = route?.params || {};
  const [tab, setTab] = useState(1);

  const tabOptions = [
    {
      id: 1,
      name: "Questions",
    },
    {
      id: 2,
      name: "Preview",
    },
    {
      id: 3,
      name: "Responses",
    },
    {
      id: 4,
      name: "Setting",
    },
  ];

  // if (!templateData) {
  //   return <Text>No data passed!</Text>; // Handling the case where no data is passed
  // }

  return (
    <SafeAreaView className="bg-gray-300 h-screen w-screen flex justify-start items-center">
      <Header />
      <View className="h-[50px] w-full bg-red-400 px-4 flex flex-row justify-center i-center">
        {tabOptions.map((d) => {
          return (
            <TouchableOpacity
              key={d.id}
              className="h-full w-1/4 flex justify-center items-center"
              onPress={() => {
                setTab(d.id);
              }}
            >
              <Text>{d.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="w-[98%] flex-1 bg-white">
        {tabOptions.slice(tab - 1, tab).map((d) => {
          return (
            <ScrollView
              key={d.id}
              className="w-full bg-blue-300"
              contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "green",
              }}
            >
              <Text>{tab}</Text>
            </ScrollView>
          );
        })}
      </View>

      <View className="h-[50px] bg-white">
          
      </View>
    </SafeAreaView>
  );
};

export default UniqueTemplate;
