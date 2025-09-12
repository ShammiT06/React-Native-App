import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL_KEY } from "../constants/api.js"

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,



    register: async function (name, email, password) {
        set({ isLoading: true })
        try {
            const response = await fetch(`${API_URL_KEY}/api/auth/register`, {
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
            set({ isLoading: false })

            return ({ success: true })

        } catch (err) {
            console.error("Register error:", err)
            set({ isLoading: false })
        }
    },

    login: async (userName, password) => {

        set({ isLoading: true })
        try {

            const response = await fetch("https://react-native-app-u6yo.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userName,
                    password: password

                })
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Something Went Wrong");
            }
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)
            set({ user: data.user, token: data.token, isLoading: false })
            return ({ success: true })


        } catch (error) {
            console.error("There is an Error", error)
            set({ isLoading: false })
        }

    },
    create: async () => {
        isLoading(true)
        try {

            const response = fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })

        } catch (error) {

        }

    },

    checkAuth: async () => {
        const tokens = await AsyncStorage.getItem("token")
        const users = await AsyncStorage.getItem("user")
        const userValues = users ? JSON.parse(users) : null

        set({ token: tokens, user: userValues })
    },
    logout: async () => {

        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")

        set({ user: null, token: null })

    },



}))



export default useAuthStore