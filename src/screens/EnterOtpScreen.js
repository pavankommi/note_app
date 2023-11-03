import React, { useState } from 'react'
import { StatusBar, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import ScreenNames from '../navigation/Constants.js'
import { showMessage } from 'react-native-flash-message'

export default function EnterOtpScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')

    //error
    const [otpError, setOtpError] = useState(false)

    const theme = useTheme();

    const submitHandle = () => {
        if (otp.length == 0) {
            setOtpError(true)
        }
        if (otp.length == 0) {
            showMessage({
                message: "Note Down.",
                description: "Please enter OTP",
                titleStyle: { marginTop: StatusBar.currentHeight },
                backgroundColor: theme.colors.primary
            });
        } else {
            setOtpError(false)
            navigation.navigate(ScreenNames.ChangePasswordScreen)
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
                    loading={loading}
                >
                    Submit
                </Button>
            </View>
        </View>
    )
}
