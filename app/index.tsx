import React, { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import "../global.css";
import Header from "@/components/Header";
import {
  ArrowLeftCircleIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from "react-native-heroicons/outline";

const Index = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [array, setArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState(null);

  // Fetch templates only once on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          navigation.navigate("login");
          return;
        }

        const response = await fetch(
          "https://forms-backend-4b66.onrender.com/auth/verify",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const rawResponse = await response.text();
        if (response.ok) {
          const data = JSON.parse(rawResponse);
          await AsyncStorage.setItem(
            "userDetails",
            JSON.stringify(data.username)
          );
          setUsername(data.username);
        } else {
          throw new Error("Authentication failed: " + response.statusText);
        }
      } catch (err) {
        console.error("Authentication verification failed:", err.message);
        navigation.navigate("login");
      }
    };

    checkAuth();
  }, [navigation]);

  // Fetch templates on initial load

    const fetchAllTemplates = async () => {
      try {
        const response = await fetch(
          "https://forms-backend-4b66.onrender.com/templates/all-templates"
        );
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


  const handleDeleteTemplate = async (templateId) => {
    try {
      const response = await fetch(
        `https://forms-backend-4b66.onrender.com/templates/delete-template/${templateId}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        // Filter out the deleted template from the array
        setArray((prevArray) => prevArray.filter((template) => template._id !== templateId));
        setModalVisible(false); // Close the modal
        console.log("Template deleted successfully");
      } else {
        throw new Error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("login");
  };

  const handleTemplateClick = (templateData) => {
    navigation.navigate("UniqueTemplate", {
      templateData,
      username,
    });
  };

  return (
    <View className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <Header />

      <ScrollView
        className="w-[90%] flex"
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {array?.map((d, index) => (
          <View
            key={d._id}
            className={`w-[100%] h-[100px] m-2 flex flex-row justify-center items-center rounded-md overflow-hidden ${
              index % 2 !== 0 ? "bg-gray-200" : "bg-white"
            }`}
          >
            <TouchableOpacity
              onPress={() => {
                console.log(d);
                handleTemplateClick(d);
              }}
              className="h-full w-1/3 flex justify-center items-center"
            >
              <Image
                className="w-full h-full"
                source={require("../assets/images/preview.jpg")}
              />
            </TouchableOpacity>
            <View className="h-full flex-1 flex-row justify-center items-center">
              <View className="flex-1 ps-4">
                <Text className="font-semibold text-lg">{d.type}</Text>
                <Text>
                  {d.createdAt?.slice(11, 16)}{" "}
                  {1 < d.createdAt?.slice(11, 16) > 12 ? "AM" : "PM"},
                  {d.createdAt?.slice(0, 10)}
                </Text>
              </View>
              <View className="w-1/6">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setModalId(index); // Set modalId for the clicked template
                  }}
                  className="z-10"
                >
                  <EllipsisVerticalIcon color={"#000"} size={24} />
                </TouchableOpacity>
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

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50 relative">
            <View className="w-full h-[50%] bg-white p-5 rounded-lg shadow-lg absolute bottom-0">
              <View className="w-full h-1/3 flex justify-center items-center">
                {array.slice(modalId, modalId + 1)?.map((d) => {
                  return (
                    <View
                      key={d._id}
                      className={`w-[100%] h-[100px] m-2 flex flex-row justify-center items-center rounded-md overflow-hidden bg-white}`}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          console.log(d);
                          handleTemplateClick(d);
                        }}
                        className="h-full w-1/3 flex justify-center items-center"
                      >
                        <Image
                          className="w-full h-full"
                          source={require("../assets/images/preview.jpg")}
                        />
                      </TouchableOpacity>
                      <View className="h-full flex-1 flex-row justify-center items-center">
                        <View className="flex-1 ps-4">
                          <Text className="font-semibold text-lg">
                            {d.type} }
                          </Text>
                          <Text>
                            {d.createdAt?.slice(11, 16)}{" "}
                            {1 < d.createdAt?.slice(11, 16) > 12 ? "AM" : "PM"},
                            {d.createdAt?.slice(0, 10)}
                          </Text>
                        </View>
                        <View className="w-1/6">
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(true);
                              setModalId(d._id); // Set modalId for the clicked template
                            }}
                            className="z-10"
                          >
                            <EllipsisVerticalIcon color={"#000"} size={24} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View className="flex-1 flex flex-col justify-center items-center">
                <TouchableOpacity className="w-full h-1/4 flex flex-row justify-start items-center">
                  <View className="w-1/6 flex justify-center items-center">
                    <ShareIcon color={"#000"} />
                  </View>
                  <Text>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full h-1/4 flex flex-row justify-start items-center">
                  <View className="w-1/6 flex justify-center items-center">
                    <ClipboardDocumentIcon color={"#000"} />
                  </View>
                  <Text>Duplicate Form</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full h-1/4 flex flex-row justify-start items-center">
                  <View className="w-1/6 flex justify-center items-center">
                    <PencilSquareIcon color={"#000"} />
                  </View>
                  <Text>Edit Form Link</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full h-1/4 flex flex-row justify-start items-center" 
                  onPress={() => {
                    if (modalId !== null) {
                      console.log(array[modalId]._id);
                      handleDeleteTemplate(array[modalId]._id); // Pass the template ID
                    }
                  }}
                >
                  <View className="w-1/6 flex justify-center items-center">
                    <TrashIcon color={"#000"} />
                  </View>

                  <Text>Delete Form</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Index;
