import { View, Text, TouchableOpacity } from 'react-native'
import useAuthStore from '../../store/authStore'

export default function index() {

  const {logout,user,token}=useAuthStore()



  return (
    <View style={{flex:1, justifyContent:'center',alignItems:"center"}}>
      <Text>Hello</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{textAlign:"center", fontSize:40}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}