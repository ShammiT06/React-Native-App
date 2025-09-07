import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import Safe_Screen from "../Components/SafeScreen"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (<>
    <SafeAreaProvider>
      <Safe_Screen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen name="(auth)"></Stack.Screen>
      </Stack>
      </Safe_Screen>
    <StatusBar barStyle="dark-content" />
    </SafeAreaProvider>
    

  </>)

}
