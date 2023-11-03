import React, { useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Button, TextInput, useTheme } from 'react-native-paper'

export default function ChangePasswordScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    //error
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const theme = useTheme();

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
                    loading={loading}
                >
                    Submit
                </Button>
            </View>
        </View>
    )
}
