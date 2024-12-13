import { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import "../global.css";
import { EllipsisVerticalIcon, PlusIcon } from "react-native-heroicons/solid";;
import {
  Cog8ToothIcon,
  GiftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import formatDate from "../utils/DateFormatter";


const Index = () => {
  const navigation = useNavigation();
  const [array, setArray] = useState([]);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    const fetchAllTemplates = async () => {
      try {
        const response = await fetch("https://forms-backend-4b66.onrender.com/templates/all-templates");
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }

        const data = await response.json();
        setArray(data.templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchAllTemplates();
  }, []);

  const filteredArray = array.filter((d) =>
    d.type.toLowerCase().includes(text.toLowerCase())
  );

  const handleTemplateClick = (id) => {
    if (!id) {
      console.error("ID is missing or undefined");
      return;
    }
    navigation.navigate("template/[id]", { id: id });
  };

  return (
    <View className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <View className="w-screen top-0 left-0 h-[100px] bg-white z-10">
        <View className="w-full h-full flex flex-col justify-center items-center">
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
          <View className="w-full h-[55%] flex justify-center items-center px-2.5">
            <View className="w-[98%] h-[80%] flex flex-row justify-center items-center bg-gray-200 rounded-md px-4">
              <MagnifyingGlassIcon color={"#000"} size={20} />
              <TextInput
                className="flex-1 bg-transparent h-full px-3 text-sm"
                onChangeText={setText}
                value={text}
                placeholder="Search for Forms"
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="w-[90%] flex">
        {filteredArray.map((d, index) => (
          <View
            key={index}
            className={`w-[100%] h-[100px] m-2 flex flex-row justify-center items-center rounded-md overflow-hidden ${
              index % 2 !== 0 ? "bg-gray-200" : "bg-white"
            }`}
          >
            <TouchableOpacity
              onPress={() => handleTemplateClick(d._id)}
              className="h-full w-1/3 flex justify-center items-center"
            >
              <Image
                className="w-full h-full"
                source={{
                  uri: "https://blog.routinehub.co/content/images/2023/02/openAI-chat-gpt-1.jpg",
                }}
              />
            </TouchableOpacity>
            <View className="h-full flex-1 flex-row justify-center items-center">
              <View className="flex-1 ps-4">
                <Text className="font-semibold text-lg">{d.type}</Text>
                <Text>{formatDate(d.createdAt)}</Text>
              </View>
            </View>
          </View>
        ))}
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

export default Index;
