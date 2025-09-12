import {Tabs} from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../../constants/Colours'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
    const insets= useSafeAreaInsets()


  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:COLORS.primary,
        headerTitleStyle:{
            color:COLORS.textPrimary,
            fontWeight:"800",
        },
        headerShadowVisible:false,
        tabBarStyle:{
            backgroundColor:COLORS.background,
            borderTopColor:COLORS.border,
            borderTopWidth:1,
            paddingTop:5,
            paddingBottom:insets.bottom,
            height:60 + insets.bottom
        }
    }}>
        <Tabs.Screen name='index' options={{
            title:"Home",
            tabBarIcon:({size,color})=>(
                <Ionicons name='home-outline' size={size} color={color} />
            )
          
         }} />
         <Tabs.Screen name="Create" options={{
            title:"Create",
            tabBarIcon:({size,color})=>{
                <Ionicons name="create-outline" size={size} color={color} />
            }
         }} />
        <Tabs.Screen name='Profile' options={{
            title:"Profile",
            tabBarIcon:({size,color})=>(
                <Ionicons name='person-outline' size={size} color={color} />
            )
        }} />
    </Tabs>
    
  )
}