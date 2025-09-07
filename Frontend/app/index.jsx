import { StyleSheet, Text, View } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
function Index()
{
  return(<>
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Link href="/(auth)/login">Login</Link>
    <Link href="/(auth)/signUp">Signup</Link>
  
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