import { HeaderShownContext } from "@react-navigation/elements";
import { Stack, useRouter, useSegments } from "expo-router";
import Safe_Screen from "../Components/SafeScreen"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import {  useEffect, useState } from "react";
import useAuthStore from "../store/authStore"
export default function RootLayout() {

  const router = useRouter()
  const segments = useSegments()
  const { user,token,checkAuth } = useAuthStore()
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    checkAuth()
    setMounted(true)

  },[])

  useEffect(()=>{
    if(!mounted)
    {
      return
    }
    const isAuthScreen = segments[0]==="(auth)"
    const isSigned = user && token

    if(!isAuthScreen && !isSigned)
    {
      router.replace("/(auth)/login")
    }
    else if (isAuthScreen && isSigned)
    {
      router.replace("/(tabs)")
    }

  },[user,token,segments])






  return (<>
    <SafeAreaProvider>
      <Safe_Screen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"></Stack.Screen>
          <Stack.Screen name="(auth)"></Stack.Screen>
        </Stack>
      </Safe_Screen>
      <StatusBar barStyle="dark-content" />
    </SafeAreaProvider>


  </>)

}
