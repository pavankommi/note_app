import React, { useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { TextInput, Button, useTheme } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";
import TextComponent from '../components/TextComponent'
import ScreenNames from '../navigation/Constants.js'
import LoaderComponent from '../components/LoaderComponent';
import { methods, urls, validateEmail } from '../constants/Constants';
import { apiRequest } from '../Api.js';

export default function LoginScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //errors
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const theme = useTheme();

    const showPopUp = (data) => {
        showMessage({
            message: "Note Down.",
            description: data,
            titleStyle: { marginTop: StatusBar.currentHeight },
            backgroundColor: theme.colors.primary
        });
    }

    const loginHandle = () => {
        if (email.length == 0) {
            setEmailError(true)
        }
        if (password.length == 0) {
            setPasswordError(true)
        }
        if (email.length == 0 && password.length == 0) {
            showPopUp("Please enter email and password")
        } else if (email.length == 0) {
            showPopUp("Please enter email")
        } else if (password.length == 0) {
            showPopUp("Please enter password")
        } else if (validateEmail(email)) {
            showPopUp("Please enter valid email")
        } else {

            let data = JSON.stringify({
                "email": `${email}`,
                "password": `${password}`
            });

            setLoading(true)

            apiRequest(methods.POST, urls.loginUrl, data)
                .then(response => {
                    console.log(response.data)
                    setLoading(false)
                    navigation.replace(ScreenNames.EnterOtpScreen, {
                        email: email,
                        screen: 'login'
                    })
                })
                .catch(error => {
                    console.log(error.response.data)
                    showPopUp(error.response.data.message)
                    setLoading(false)
                })

        }
    }

    const signUpHandle = () => {
        setEmailError(false)
        setPasswordError(false)
        navigation.navigate(ScreenNames.SignupScreen)
    }

    const forgetPasswordHandle = () => {
        setEmailError(false)
        setPasswordError(false)
        navigation.navigate(ScreenNames.ForgetPasswordScreen)
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            {/* <TextComponent
                text="Login Page"
            /> */}
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onFocus={() => setEmailError(false)}
                    mode='outlined'
                    error={emailError}
                />
            </View>
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onFocus={() => setPasswordError(false)}
                    mode='outlined'
                    error={passwordError}
                    secureTextEntry
                />
            </View>
            <View style={{ padding: 5, alignSelf: "flex-end" }}>
                <TouchableOpacity
                    onPress={() => forgetPasswordHandle()}
                >
                    <Text>{"Forgot password! "}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => loginHandle()}
                >
                    Login
                </Button>
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => signUpHandle()}
                >
                    Signup
                </Button>
            </View>
            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )

}
