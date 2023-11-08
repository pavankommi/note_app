import React, { useState } from 'react'
import TextComponent from '../components/TextComponent'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import ScreenNames from '../navigation/Constants.js'
import { showMessage } from 'react-native-flash-message'
import { methods, urls, validateEmail, validatePhone } from '../constants/Constants'
import LoaderComponent from '../components/LoaderComponent.js'
import { apiRequest } from '../Api.js'

export default function SignupScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    //errors
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastnameError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
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
        if (phone.length == 0) {
            setPhoneError(true)
        }
        if (email.length == 0) {
            setEmailError(true)
        }
        if (password.length == 0) {
            setPasswordError(true)
        }
        if (firstName.length == 0 || lastName.length == 0 || phone.length == 0 || email.length == 0 || password.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please fill in all fields",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else if (validatePhone(phone)) {
            showMessage({
                message: "Note Down.",
                description: "Please enter valid phone number",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            })
        } else if (validateEmail(email)) {
            showMessage({
                message: "Note Down.",
                description: "Please enter valid email",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            })
        } else {

            console.log("SignUp")

            setLoading(true)

            let data = JSON.stringify({
                "firstName": `${firstName}`,
                "lastName": `${lastName}`,
                "email": `${email}`,
                "password": `${password}`,
                "phone": `${phone}`
            });

            apiRequest(methods.POST, urls.signUp, data)
                .then(response => {
                    console.log(response.data)
                    setLoading(false)
                    showMessage({
                        message: "Note Down.",
                        description: "User successfully registered, Please login to continue",
                        titleStyle: { marginTop: StatusBar.currentHeight },
                        backgroundColor: theme.colors.primary
                    })
                    navigation.replace(ScreenNames.LoginScreen)
                })
                .catch(error => {
                    console.log(error.response.data)
                    showMessage({
                        message: "Note Down.",
                        description: error.response.data.message,
                        titleStyle: { marginTop: StatusBar.currentHeight },
                        backgroundColor: theme.colors.primary
                    })
                    setLoading(false)
                })

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
                    label="Phone"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    onFocus={() => setPhoneError(false)}
                    mode='outlined'
                    error={phoneError}
                    maxLength={10}
                    keyboardType='numeric'
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
                >
                    Signup
                </Button>
            </View>
            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )
}
