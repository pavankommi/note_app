import React, { useState } from 'react'
import { StatusBar, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import ScreenNames from '../navigation/Constants.js'
import { showMessage } from 'react-native-flash-message'
import { validateEmail } from '../constants/Constants.js'
import LoaderComponent from '../components/LoaderComponent.js'


export default function ForgetPasswordScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    //error
    const [emailError, setEmailError] = useState(false)

    const theme = useTheme();

    const submitHandle = () => {
        if (email.length == 0) {
            setEmailError(true)
        }
        if (email.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please enter email",
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
            setEmailError(false)
            navigation.navigate(ScreenNames.EnterOtpScreen)
        }
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ padding: 5 }}>
                <TextInput
                    label="Enter email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onFocus={() => setEmailError(false)}
                    mode='outlined'
                    error={emailError}
                />
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => submitHandle()}
                >
                    Send OTP
                </Button>
            </View>
            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )
}
