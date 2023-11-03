import React, { useState } from 'react'
import TextComponent from '../components/TextComponent'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import ScreenNames from '../navigation/Constants.js'
import { showMessage } from 'react-native-flash-message'
import { validateEmail } from '../constants/Constants'

export default function SignupScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    //errors
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const theme = useTheme();

    const signUpHandle = () => {
        if (firstName.length == 0) {
            setFirstNameError(true)
        }
        if (lastName.length == 0) {
            setLastnameError(true)
        }
        if (email.length == 0) {
            setEmailError(true)
        }
        if (password.length == 0) {
            setPasswordError(true)
        }
        if (firstName.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please fill in all fields",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else if (validateEmail(email)) {
            showMessage({
                message: "Note Down.",
                description: "Please enter valid email",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else {
            console.log("SignUp")
        }
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            {/* <TextComponent
                text="Signup Page"
            /> */}
            <View style={{ padding: 5 }}>
                <TextInput
                    label="First Name"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    onFocus={() => setFirstNameError(false)}
                    mode='outlined'
                    error={firstNameError}
                />
            </View>
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Last Name"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    onFocus={() => setLastnameError(false)}
                    mode='outlined'
                    error={lastNameError}
                />
            </View>
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
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <View style={{ padding: 5, alignSelf: "flex-end" }}>
                <TouchableOpacity
                    onPress={() => password.length == 0 ? null : setSecureTextEntry(!secureTextEntry)}
                >
                    <Text>{secureTextEntry ? "Show password! " : "Hide password! "}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => signUpHandle()}
                    loading={loading}
                >
                    Signup
                </Button>
            </View>
        </View>
    )
}
