import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://forms-backend-4b66.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const { token } = data;
  
      // Save token to AsyncStorage
      await AsyncStorage.setItem("token", token);
  
      // Navigate to the index page
      navigation.navigate("index");
    } catch (err) {
      console.error("Login failed:", err.message || err);
    }
  };

  const oAuthHandling = async () => {
    try {
      const response = await fetch("https://forms-backend-4b66.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const { token } = data;
  
      // Save token to AsyncStorage
      await AsyncStorage.setItem("token", token);
  
      // Navigate to the index page
      navigation.navigate("index");
    } catch (err) {
      console.error("Login failed:", err.message || err);
    }
  };
  
  
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-4">
      <View className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <Text className="text-2xl font-bold mb-4 text-center">Sign In</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
        />
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-500 py-2 rounded"
        >
          <Text className="text-center text-white font-bold">Sign In</Text>
        </TouchableOpacity> 
         <View className="w-fullh-[40px] flex justify-center items-center text-center">
           <Text className="w-full text-center">
              Or
           </Text>
         </View>
         <TouchableOpacity className="w-full flex justify-center items-center bg-red-600 rounded-sm h-[40px]"
          onPress={()=>{
            oAuthHandling()
          }}
         >
           <Text className="w-full font-semibold text-white text-center">
             Google
           </Text>
         </TouchableOpacity>
      </View>
     
    </View>
  );
};

export default Login;
