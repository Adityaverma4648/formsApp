import Header from "@/components/Header";
import SettingOptions from "@/components/SettingOptions";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  ChevronRightIcon,
  GiftIcon,
  LanguageIcon,
  ShareIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const setting = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("login");
  };

  const chooseImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0]);
        uploadImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg", // Change to appropriate image type
      name: "image.jpg",
    });

    try {
      const response = await axios.post(
        "https://forms-backend-4b66.onrender.com/uploadProfilePic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("userDetails");
        if (storedUsername) {
          const username = JSON.parse(storedUsername);
          setUser(username);
          console.log(username, user);
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
              <TouchableOpacity
                className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden bg-red-900"
                onPress={() => {
                  chooseImage;
                }}
              ></TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-lg">{user?.userName}</Text>
              <Text>{user?.email}</Text>
            </View>
          </View>

          {/* Icon */}
          <View className="w-1/6 h-full flex justify-center items-center">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ChevronRightIcon color="#000" />
            </TouchableOpacity>
            <Modal
              animationType="slide" // or 'fade'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <View
                className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
              >
                <View className={`w-3/4 bg-white p-5 rounded-lg shadow-lg`}>
                  <Text className={`text-lg text-center mb-4`}>
                    Please Pick An Action
                  </Text>
                  <View className="flex flex-row justify-center items-center">
                  <TouchableOpacity
                    className={`mt-4 py-2 px-4 h-full w-1/3`}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text className={`text-black text-center font-bold`}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`mt-4 py-2 px-4 h-full w-1/3`}
                    onPress={() => handleLogout()}
                  >
                    <Text className={`text-black text-center font-bold`}>
                      signOut
                    </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
