import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert } from "react-native"
import styles from "../../assets/Styles/login.style"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import COLORS from "../../constants/Colours"
import { Link } from "expo-router"
import useAuthStore from "../../store/authStore"

const Login = () => {

    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ShowPassword, setShowPassword] = useState(false)
    const { user, token, login,isLoading,authCheck,logout } = useAuthStore()


    useEffect(()=>{
        authCheck()

    },[])

    async function handleLogin() {
        const result = await login(userName, password)

        if (!result.success) {
            Alert.alert("Error",result.error)

        }

        Alert.alert("Success","User Logged In Successfull")
    }    


        return (<>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    <View style={styles.topIllustration}>
                        <Image source={require("../../assets/images/login.png")} style={styles.illustrationImage}
                            contentFit="contain"
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons
                                        name="mail-outline"
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Your Email"
                                        placeholderTextColor={COLORS.placeholderText}
                                        value={userName}
                                        keyboardType="email-address"
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View>
                                </View>

                            </View>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="lock-closed"
                                            size={20}
                                            color={COLORS.primary}
                                            style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Your Password"
                                            placeholderTextColor={COLORS.placeholderText}
                                            value={password}
                                            keyboardType="default"
                                            onChangeText={setPassword}
                                            secureTextEntry={!ShowPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            onPress={() => { setShowPassword(!ShowPassword) }}
                                            style={styles.eyeIcon}
                                        >
                                            <Ionicons
                                                name={ShowPassword ? "eye-outline" : "eye-off-outline"}
                                                size={20}
                                                style={styles.eyeIcon} />
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={handleLogin}
                                            style={styles.button}
                                        >
                                            {
                                                isLoading ? <View>
                                                    <ActivityIndicator color="#fff" />
                                                </View> : <Text style={styles.buttonText}>Login</Text>
                                            }
                                        </TouchableOpacity>
                                        <View style={styles.footer}>
                                            <Text style={styles.footerText}>Don't have an Account </Text>
                                            <TouchableOpacity>
                                                <Link href={"/(auth)/signUp"} style={styles.link}>Sign Up</Link>
                                            </TouchableOpacity>
                                        </View>
                                        <Text>Hello {user?.username}</Text>
                                        <TouchableOpacity onPress={logout}>
                                            <Text>Logout</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>)

    }
    export default Login