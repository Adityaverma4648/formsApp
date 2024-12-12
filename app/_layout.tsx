import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { Text } from "react-native";

const screenOptions = {
  headerShown: false, // Common options for all screens
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Stack screenOptions={screenOptions}>
          {/* Define the screens */}
          <Stack.Screen name="index" options={{ title: "Form App" }} />
          <Stack.Screen
            name="premium"
            options={{ title: "Premium Features" }}
          />
          <Stack.Screen name="setting" options={{ title: "Settings" }} />
          <Stack.Screen name="template" options={{ title: "Template" }} />
          <Stack.Screen name="uniqueTemplate" options={{ title: "Unique Template" }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
