import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";

const Template = () => {
  const navigation = useNavigation(); // Hook to access navigation

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  const uniqueTemplates = [
    {
      id: 1,
      name: "Your Canvas",
      options: [
        { id: 1, name: "Using ChatGPT", image: "" },
        { id: 2, name: "Blank", image: "" },
      ],
    },
    {
      id: 2,
      name: "Personal",
      options: [
        { id: 1, name: "Collect Information", image: "" },
        { id: 2, name: "Find a Time", image: "" },
      ],
    },
    {
      id: 3,
      name: "Work",
      options: [
        { id: 1, name: "Event Feedback", image: "" },
        { id: 2, name: "Order Form", image: "" },
      ],
    },
    {
      id: 4,
      name: "Assessment",
      options: [
        { id: 1, name: "Exit Ticket", image: "" },
        { id: 2, name: "Assessment", image: "" },
      ],
    },
  ];

  const handleTemplateClick = (templateData) => {
    // Navigate to UniqueTemplate component, passing templateData as params
    navigation.navigate("UniqueTemplate", {
      templateData,
    });
  };

  return (
    <SafeAreaView className="">
      <Header />

      <ScrollView className="w-screen flex bg-green-200">
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
                      onPress={() =>
                        handleTemplateClick({ ...d, selectedOption: items })
                      }
                    >
                      <View className="flex-1">
                        <Text>Image</Text>
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
