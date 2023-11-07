import React, { useState } from 'react'
import { StatusBar, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import ScreenNames from '../navigation/Constants.js'
import { showMessage } from 'react-native-flash-message'
import * as SecureStore from 'expo-secure-store';
import { apiRequest } from '../Api.js'
import { methods, urls } from '../constants/Constants.js'
import LoaderComponent from '../components/LoaderComponent.js'

export default function EnterOtpScreen({ route, navigation }) {

    const { email, screen } = route.params;

    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')

    //error
    const [otpError, setOtpError] = useState(false)

    const theme = useTheme();

    async function saveToken(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const showPopUp = (data) => {
        showMessage({
            message: "Note Down.",
            description: data,
            titleStyle: { marginTop: StatusBar.currentHeight },
            backgroundColor: theme.colors.primary
        });
    }

    const submitHandle = () => {
        if (otp.length == 0) {
            setOtpError(true)
        }
        if (otp.length == 0) {
            showPopUp("Please enter OTP")
        } else {

            let data = JSON.stringify({
                // "email": "rkodali1s@semo.edu",
                // "password": "Rupa.123"
                "email": `${email}`,
                "code": `${'666666'}`
            });

            setLoading(true)

            apiRequest(methods.POST, urls.verifyEmail, data)
                .then(response => {
                    console.log(response.data)
                    //storing token async
                    saveToken('secure_token',response.data.token)
                    setLoading(false)
                    navigation.replace(ScreenNames.HomeScreen)
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
                    label="Enter OTP"
                    value={otp}
                    onChangeText={text => setOtp(text)}
                    onFocus={() => setOtpError(false)}
                    mode='outlined'
                    error={otpError}
                    keyboardType='number-pad'
                />
            </View>
            <View style={{ padding: 5 }}>
                <Button
                    mode="contained"
                    onPress={() => submitHandle()}
                >
                    Submit
                </Button>
            </View>

            {loading ? <LoaderComponent loading={loading} /> : null}

        </View>
    )
}
