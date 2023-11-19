import React, { useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { apiRequest } from '../Api'
import ScreenNames from '../navigation/Constants.js'
import LoaderComponent from '../components/LoaderComponent'
import { methods, urls } from '../constants/Constants'

export default function ChangePasswordScreen({ route, navigation }) {

    const { email, otp, screen } = route.params;

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    //error
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const theme = useTheme();

    const showPopUp = (data) => {
        showMessage({
            message: "Note Down.",
            description: data,
            titleStyle: { marginTop: StatusBar.currentHeight },
            backgroundColor: theme.colors.primary
        });
    }

    const handleSubmit = () => {
        if (password.length == 0) {
            setPasswordError(true)
        }
        if (confirmPassword.length == 0) {
            setConfirmPasswordError(true)
        }
        if (password.length == 0 && confirmPassword.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please enter passwords",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else if (password.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please enter password",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else if (password.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please confirm password",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else if (password != confirmPassword) {
            showMessage({
                message: "Note Down.",
                description: "Passwords doesn't match",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else {
            console.log('change password')

            let data = JSON.stringify({
                "email": `${email}`,
                "resetToken": `${otp}`,
                "newPassword": `${password}`
            });

            console.log(data)

            setLoading(true)

            apiRequest(methods.POST, urls.resetPassword, data)
                .then(response => {
                    console.log(response)
                    showPopUp(response.data.message)
                    setLoading(false)
                    navigation.navigate(ScreenNames.LoginScreen)
                })
                .catch(error => {
                    console.log(error.response.data)
                    showPopUp(error.response.data.message)
                    setLoading(false)
                })

        }
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Enter password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onFocus={() => setPasswordError(false)}
                    mode='outlined'
                    secureTextEntry={secureTextEntry}
                    error={passwordError}
                />
            </View>
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Confirm password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    onFocus={() => setConfirmPasswordError(false)}
                    mode='outlined'
                    secureTextEntry={secureTextEntry}
                    error={confirmPasswordError}
                />
            </View>
            <View style={{ padding: 5, alignSelf: "flex-end" }}>
                <TouchableOpacity
                    onPress={() => password.length == 0 && confirmPassword.length == 0 ? null : setSecureTextEntry(!secureTextEntry)}
                >
                    <Text>{secureTextEntry ? "Show password! " : "Hide password! "}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => handleSubmit()}
                >
                    Submit
                </Button>
            </View>
            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )
}
