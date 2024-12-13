import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { RouteParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlusCircleIcon } from "react-native-heroicons/outline";
import {
  ChatBubbleBottomCenterTextIcon,
  FilmIcon,
  PhotoIcon,
  Squares2X2Icon,
} from "react-native-heroicons/solid";

const UniqueTemplate = () => {
  const route = useRoute();
  const [user, setUser] = useState(null);
  const { templateData } = route?.params || { templateData: null };
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

  const questions = [
     
  ];

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("userDetails");
        if (storedUsername) {
          const username = JSON.parse(storedUsername);
          setUser(username);
        } else {
          console.log("No user details found.");
        }
      } catch (error) {
        console.error("Error retrieving user details:", error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <SafeAreaView className="bg-gray-300 h-screen w-screen flex justify-start items-center">
      <Header templateName={templateData?.name || templateData.type} />
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
              <View>
                <Text>{JSON.stringify(templateData)}</Text>
              </View>

              <View>
                <Text>{JSON.stringify(questions)}</Text>
              </View> 
              
              {tab === 1 && <View className="">
                  {questions?.map((d,index)=>{
                    return <View key={index} className="">

                    </View>
                  })}
                </View>}
            </ScrollView>

           
          );
        })}
      </View>

      <View className="h-[50px] bg-white flex flex-row justify-center items-center">
        <TouchableOpacity className="w-1/5 flex justify-center items-center">
          <PlusCircleIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity className="w-1/5 flex justify-center items-center">
          <ChatBubbleBottomCenterTextIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity className="w-1/5 flex justify-center items-center">
          <PhotoIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity className="w-1/5 flex justify-center items-center">
          <FilmIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity className="w-1/5 flex justify-center items-center">
          <Squares2X2Icon color={"#000"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UniqueTemplate;
