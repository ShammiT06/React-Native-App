import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,



    register: async function (name, email, password) {
        set({ isLoading: true })
        try {
            const response = await fetch("https://react-native-app-u6yo.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password
                })
            })

            const data = await response.json()




            if (!response.ok) {
                throw new Error(data.message || "Something Went Wrong")
            }

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)
            set({ user: data.user, token: data.token, isLoading: false })

        } catch (err) {
            console.error("Register error:", err)
            set({ isLoading: false })
        }
    },

    authCheck: async function () {
        try {
            const token = await AsyncStorage.getItem("token")
            const userJson = await AsyncStorage.getItem("user")

            const user = userJson ? JSON.parse(userJson) : null
            
            set({user,token})

        } catch (error) {
            console.error("Auth Check Failed :",error)

        }

    },
    logout: async function ()
    {
        await AsyncStorage.removeItem("user")
        await AsyncStorage.removeItem('token')
        set({user:null,token:null})

    },
    login: async function (username,password){
        set({isLoading:true})
        try {
            const response = await fetch("https://react-native-app-u6yo.onrender.com/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:username,
                    password:password
                })

                
            })
            const data = response.json()


            if(!response.ok)
            {
                throw new Error("There is an Error",data.message);
                
            }

            await AsyncStorage.setItem("user",JSON.stringify(data.user))
            await AsyncStorage.setItem("token",data.token)


            set({token:data.token,user:data.user,isLoading:false})

            return {success:true}
        } catch (error) {
            console.Error("Something Went Wrong",error)
            set({isLoading:false})
        }
    }



}))



export default useAuthStore