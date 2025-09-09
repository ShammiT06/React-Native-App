import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../assets/Styles/register.style";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colours.js";
import { useRouter } from "expo-router"
import axios from "axios"
import useAuthStore from "../../store/authStore.js";

function Signup() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isPassword, setIsPassword] = useState(false)

    const router = useRouter()

    const { isLoading, register,user,token,logout} = useAuthStore()



    async function handleRegister() {
        register(name,email,password)
        console.log("The user is:",user)
        console.log("The token is:",token)



    }




    return (<>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>ReadStream</Text>
                    <Text style={styles.subtitle}>Share Your favourite Reads</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="person"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Email"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={name}
                                    keyboardType="email-address"
                                    onChangeText={setName}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View>
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                    name="mail-outline"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Email id"
                                    placeholderTextColor={COLORS.placeholderText}
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}>
                                </TextInput>

                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                    name="lock-closed" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Password"
                                    placeholderTextColor={COLORS.placeholderText}
                                    keyboardType="default"
                                    secureTextEntry={!isPassword}
                                    value={password}
                                    onChangeText={setPassword} />
                                <TouchableOpacity
                                    onPress={() => { setIsPassword(!isPassword) }}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={isPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.eyeIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                {
                                    isLoading ? <View>
                                        <ActivityIndicator color="#fff" />
                                    </View> : <Text style={styles.buttonText}>Sign Up</Text>
                                }
                            </TouchableOpacity>
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Already have an account ?</Text>
                                <TouchableOpacity onPress={() => { router.back() }} >
                                    <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </KeyboardAvoidingView>
    </>)

}
export default Signup