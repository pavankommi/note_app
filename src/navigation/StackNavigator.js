import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ScreenNames from './Constants.js'
import { StyleSheet } from 'react-native';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import { constants } from '../constants/Constants';
import EnterOtpScreen from '../screens/EnterOtpScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

export default function StackNavigator() {

    const [loaded] = useFonts({
        Montserrat: require('../../assets/Montserrat-Bold.otf'),
    });

    if (!loaded) {
        return null;
    }

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ScreenNames.LoginScreen}
                component={LoginScreen}
                options={{
                    title: "Note Down.",
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name={ScreenNames.SignupScreen}
                component={SignupScreen}
                options={{
                    title: "Signup",
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name={ScreenNames.ForgetPasswordScreen}
                component={ForgetPasswordScreen}
                options={{
                    title: constants.appName,
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name={ScreenNames.EnterOtpScreen}
                component={EnterOtpScreen}
                options={{
                    title: constants.appName,
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name={ScreenNames.ChangePasswordScreen}
                component={ChangePasswordScreen}
                options={{
                    title: constants.appName,
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center"
                }}
            />
        </Stack.Navigator>
    )
}
