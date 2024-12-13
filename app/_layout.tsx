import { Stack } from "expo-router";

const screenOptions = {
  headerShown: false,  
};

export default function RootLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      {/* Define the screens */}
      <Stack.Screen name="index" options={{ title: "Form App" }} />
      <Stack.Screen name="premium" options={{ title: "Premium Features" }} />
      <Stack.Screen name="setting" options={{ title: "Settings" }} />
      <Stack.Screen name="template" options={{ title: "Template" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen
        name="template/[id]"
        options={{ title: "Unique Template" }}
      />
      {/* <Stack.Screen
        name="UniqueTemplate"
        options={{ title: "Unique Template" }}
      /> */}
    </Stack>
  );
}
