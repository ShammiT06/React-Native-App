import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import useAuthStore from '../store/authStore.js'
import { useEffect } from "react"

function Index()
{   
  
  const {user,token,authCheck,logout}=useAuthStore()

  useEffect(()=>{
    authCheck()

  },[])





  console.log(user,token)


  return(<>
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Text style={{color:"red",fontSize:20}}>Hello</Text>
    <Link href="/(auth)/login">Login</Link>
    <Link href="/(auth)/signUp">Signup</Link>
    <TouchableOpacity onPress={logout}>
      <Text>Log Out</Text>
    </TouchableOpacity>
  
  </View>
  </>)

}
export default Index



const Styles= StyleSheet.create({
head:{
  fontSize:35,
  color:"blue",
  textAlign:"center",
  flexWrap:"wrap"
}
})