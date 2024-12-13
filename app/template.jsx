import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Template = () => {
  const navigation = useNavigation(); // Hook to access navigation
  const [user, setUser] = useState(null);

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  const uniqueTemplates = [
    {
      id: 1,
      name: "Your Canvas",
      options: [
        {
          id: 1,
          name: "Using ChatGPT",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
        {
          id: 2,
          name: "Blank",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Personal",
      options: [
        {
          id: 1,
          name: "Collect Information",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
        {
          id: 2,
          name: "Find a Time",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Work",
      options: [
        {
          id: 1,
          name: "Event Feedback",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
        {
          id: 2,
          name: "Order Form",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Assessment",
      options: [
        {
          id: 1,
          name: "Exit Ticket",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
        {
          id: 2,
          name: "Assessment",
          image:
            "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
        },
      ],
    },
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

  const handleTemplateClick = async (data) => {
    console.log(user._id, data.name);
  
    try {
      const response = await fetch(
        "https://forms-backend-4b66.onrender.com/templates/save-template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: data.name,
            user: {
              _id: user._id,
            },
            questions: [],
          }),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json(); // Parse the response
        console.log("Template saved successfully!", responseData);
  
        // Navigate with the template's ID
        navigation.navigate("template/[id]", { id: responseData._id });
      } else {
        console.error("Failed to save template:", response.status);
      }
    } catch (error) {
      console.error("Error while saving template:", error);
    }
  };
  

  return (
    <SafeAreaView className="w-screen h-screen flex justify-center items-centers">
      {/* <Header /> */}

      <ScrollView className="w-screen flex">
        {uniqueTemplates?.map((d) => {
          return (
            <View key={d.id} className="w-full h-[250px] p-6">
              <View>
                <Text className="text-xl font-semibold">{d.name}</Text>
              </View>

              <View className="w-full flex flex-1 flex-row justify-center items-center">
                {d.options.map((items) => {
                  return (
                    <TouchableOpacity
                      key={items.id}
                      className="bg-orange-300 w-[48%] h-full mx-1 rounded-lg overflow-hidden"
                      onPress={() => handleTemplateClick({ ...items })}
                    >
                      <View className="flex-1">
                        <Image
                          className="w-full h-full flex justify-center items-center"
                          source={{ uri: items.image }}
                        />
                      </View>
                      <View className="h-[25%] w-full bg-white flex justify-center items-center">
                        <Text className="text-[15px] text-center w-full">
                          {items.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Template;
