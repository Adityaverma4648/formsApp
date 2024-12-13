import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Tab1 from "../../components/Tab1";
import Tab2 from "../../components/Tab2";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  GiftIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import {
  ChatBubbleBottomCenterTextIcon,
  FilmIcon,
  PhotoIcon,
  ShareIcon,
  Squares2X2Icon,
  TrashIcon,
} from "react-native-heroicons/solid";

const UniqueTemplate = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(1);
  const [array, setArray] = useState([]);
  const [rename, setRename] = useState(array[0?.type]);
  const [isLoading, setisLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      type: "survey",
      user: "64fa32b8c5d3e4567890abcd", // Example User ID
      questions: [
        {
          type: "info",
          data: {
            question: "Question",
            description: "Description (optional)",
          },
        },
        {
          type: "image",
          data: {
            title: "Title",
            image: ["https://example.com/image1.jpg"],
          },
        },
        {
          type: "video",
          data: {
            title: "Title",
            video: ["https://example.com/video1.mp4"],
          },
        },
        {
          type: "section",
          data: {
            question: "Question",
            description: "Description (optional)",
          },
        },
        {
          type: "checkbox",
          data: {
            question: "Question",
            options: ["JavaScript", "Python", "Java", "C++"],
            allowMultiple: true,
          },
        },
        {
          type: "checkbox-grid",
          data: {
            title: "Rate your expertise in the following skills:",
            rows: [
              "Frontend Development",
              "Backend Development",
              "Database Management",
            ],
            columns: ["Beginner", "Intermediate", "Expert"],
            allowMultipleInCell: true,
          },
        },
        {
          type: "date",
          data: {
            title: "What is your date of birth?",
            date: "1995-07-10T00:00:00.000Z",
          },
        },
        {
          type: "time",
          data: {
            title: "What time do you usually start work?",
            time: "09:30",
          },
        },
        {
          type: "dropdown",
          data: {
            question: "Select your preferred working environment:",
            options: ["Remote", "Hybrid", "On-Site"],
            allowMultiple: false,
          },
        },
        {
          type: "radio",
          data: {
            question: "What is your highest level of education?",
            options: ["High School", "Bachelor's", "Master's", "Ph.D."],
          },
        },
        {
          type: "text",
          data: {
            question: "What is your favorite book?",
            placeholder: "Type your answer here...",
          },
        },
        {
          type: "multiple-choice",
          data: {
            question: "Which fruits do you like?",
            options: ["Apple", "Banana", "Cherry", "Date"],
            allowMultiple: true,
          },
        },
        {
          type: "multiple-choice-grid",
          data: {
            title: "Select your preferences for these meals:",
            rows: ["Breakfast", "Lunch", "Dinner"],
            columns: ["Vegan", "Vegetarian", "Non-Vegetarian"],
          },
        },
      ],
      createdAt: "2024-12-13T09:30:00.000Z",
      updatedAt: "2024-12-13T09:30:00.000Z",
    },
  ]);

  const handlePress = (d) => {
    switch (d.type) {
      case "checkbox":
        addCheckbox();
        break;
      case "checkbox-grid":
        addCheckboxGrid();
        break;
      case "date":
        addDate();
        break;
      case "time":
        addTime();
        break;
      case "dropdown":
        addDropdown();
        break;
      case "radio":
        addRadio();
        break;
      case "text":
        addText();
        break;
      case "multiple-choice":
        addMultipleChoice();
        break;
      case "multiple-choice-grid":
        addMultipleChoiceGrid();
        break;
      default:
        console.log("Unknown type");
    }
  };

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

  useEffect(() => {
    const fetchAllTemplates = async () => {
      setisLoading(true);
      try {
        const response = await fetch(
          "https://forms-backend-4b66.onrender.com/templates/all-templates"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }

        const data = await response.json();
        // console.log(data.templates, id);

        // Filter templates based on the `id`
        const slicedArray = data.templates?.filter((item) => item._id === id);
        setArray(slicedArray);
        setRename(slicedArray[0].type);
        setisLoading(true);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    if (id) {
      fetchAllTemplates();
    }
  }, [id]);

  const addInfo = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "info",
          data: {
            question: "",
            description: "",
          },
        },
      ];
      return updatedData;
    });
  };

  const addImage = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "image",
          data: {
            title: "",
            image: [],
          },
        },
      ];
      return updatedData;
    });
  };

  const addVideo = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "video",
          data: {
            title: "",
            video: [],
          },
        },
      ];
      return updatedData;
    });
  };

  const addSection = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "section",
          data: {
            question: "",
            video: [],
          },
        },
      ];
      return updatedData;
    });
  };

  const addCheckbox = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "checkbox-grid",
          data: {
            title: "Rate your expertise in the following skills:",
            rows: [
              "Frontend Development",
              "Backend Development",
              "Database Management",
            ],
            columns: ["Beginner", "Intermediate", "Expert"],
            allowMultipleInCell: true,
          },
        },
      ];
      return updatedData;
    });
  };

  const addCheckboxGrid = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "image",
          data: {
            title: "",
            image: [],
          },
        },
      ];
      return updatedData;
    });
  };

  const addDate = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "date",
          data: {
            title: "Date",
            date: "Date",
          },
        },
      ];
      return updatedData;
    });
  };

  const addTime = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "time",
          data: {
            title: "What time do you usually start work?",
            time: "09:30",
          },
        },
      ];
      return updatedData;
    });
  };

  const addDropdown = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "dropdown",
          data: {
            question: "Select your preferred working environment:",
            options: ["Remote", "Hybrid", "On-Site"],
            allowMultiple: false,
          },
        },
      ];
      return updatedData;
    });
  };

  const addRadio = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "date",
          data: {
            title: "Date",
            date: "Date",
          },
        },
      ];
      return updatedData;
    });
  };

  const addText = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "text",
          data: {
            question: "What is your favorite book?",
            placeholder: "Type your answer here...",
          },
        },
      ];
      return updatedData;
    });
  };

  const addMultipleChoice = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "multiple-choice",
          data: {
            question: "Which fruits do you like?",
            options: ["Apple", "Banana", "Cherry", "Date"],
            allowMultiple: true,
          },
        },
      ];
      return updatedData;
    });
  };

  const addMultipleChoiceGrid = () => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].questions = [
        ...updatedData[0].questions,
        {
          type: "multiple-choice-grid",
          data: {
            title: "Select your preferences for these meals:",
            rows: ["Breakfast", "Lunch", "Dinner"],
            columns: ["Vegan", "Vegetarian", "Non-Vegetarian"],
          },
        },
      ];
      return updatedData;
    });
  };

  return (
    <SafeAreaView className="bg-gray-300 h-screen w-screen flex justify-start items-center">
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
      <View className="h-[50px] w-full bg-white px-4 flex flex-row justify-center i-center">
        {tabOptions.map((d) => {
          return (
            <TouchableOpacity
              key={d.id}
              className={`h-full w-1/4 flex justify-center items-center ${
                tab === d.id && "border-b border-3 border-red-400"
              }`}
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
              className="w-full h-full bg-red-300"
              contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {tab === 1 && <Tab1 initialData={data} />}
              {tab === 2 && <Tab2 data={data} />}
              {tab === 3 && <Tab1 data={data} />}
              {tab === 4 && <Tab1 data={data} />}
            </ScrollView>
          );
        })}
      </View>

      <View className="h-[50px] bg-white flex flex-row justify-center items-center">
        <TouchableOpacity
          className="w-1/5 flex justify-center items-center"
          onPress={() => setModalVisible(true)}
        >
          <PlusCircleIcon color={"#000"} />
          <Modal
            animationType="slide" // or 'fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View
              className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
            >
              <View
                className={`w-[90%] h-2/4 absolute bottom-0 mb-4 bg-white p-5 rounded-lg shadow-lg`}
              >
                <View className="flex h-full flex-1 flex-row flex-wrap justify-center items-center">
                  <View className="w-full flex flex-row flex-wrap justify-center items-center">
                    {[
                      {
                        type: "checkbox",
                        data: {
                          question: "Question",
                          options: ["JavaScript", "Python", "Java", "C++"],
                          allowMultiple: true,
                        },
                      },
                      {
                        type: "checkbox-grid",
                        data: {
                          title: "Rate your expertise in the following skills:",
                          rows: [
                            "Frontend Development",
                            "Backend Development",
                            "Database Management",
                          ],
                          columns: ["Beginner", "Intermediate", "Expert"],
                          allowMultipleInCell: true,
                        },
                      },
                      {
                        type: "date",
                        data: {
                          title: "What is your date of birth?",
                          date: "1995-07-10T00:00:00.000Z",
                        },
                      },
                      {
                        type: "time",
                        data: {
                          title: "What time do you usually start work?",
                          time: "09:30",
                        },
                      },
                      {
                        type: "dropdown",
                        data: {
                          question:
                            "Select your preferred working environment:",
                          options: ["Remote", "Hybrid", "On-Site"],
                          allowMultiple: false,
                        },
                      },
                      {
                        type: "radio",
                        data: {
                          question: "What is your highest level of education?",
                          options: [
                            "High School",
                            "Bachelor's",
                            "Master's",
                            "Ph.D.",
                          ],
                        },
                      },
                      {
                        type: "text",
                        data: {
                          question: "What is your favorite book?",
                          placeholder: "Type your answer here...",
                        },
                      },
                      {
                        type: "multiple-choice",
                        data: {
                          question: "Which fruits do you like?",
                          options: ["Apple", "Banana", "Cherry", "Date"],
                          allowMultiple: true,
                        },
                      },
                      {
                        type: "multiple-choice-grid",
                        data: {
                          title: "Select your preferences for these meals:",
                          rows: ["Breakfast", "Lunch", "Dinner"],
                          columns: ["Vegan", "Vegetarian", "Non-Vegetarian"],
                        },
                      },
                    ].map((d, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          className={`mt-4 py-2 px-4 `}
                          onPress={() => {
                            handlePress(d);
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text className={`text-black text-center font-bold`}>
                            {d.type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View className="w-full h-[20%] flex justify-center items-center">
                    <TouchableOpacity
                      className={`mt-4 py-2 px-4 w-1/3 bg-red-400 rounded-sm`}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text className={`text-black text-center font-bold`}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-1/5 flex justify-center items-center"
          onPress={() => {
            addInfo();
          }}
        >
          <ChatBubbleBottomCenterTextIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-1/5 flex justify-center items-center"
          onPress={() => {
            addImage();
          }}
        >
          <PhotoIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-1/5 flex justify-center items-center"
          onPress={() => {
            addVideo();
          }}
        >
          <FilmIcon color={"#000"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-1/5 flex justify-center items-center"
          onPress={() => {
            addSection();
          }}
        >
          <Squares2X2Icon color={"#000"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UniqueTemplate;
