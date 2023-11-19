import React, { useEffect, useState } from 'react'
import { CommonActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ScreenNames from './Constants.js'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import { constants, methods, urls } from '../constants/Constants';
import EnterOtpScreen from '../screens/EnterOtpScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import HomeScreen from '../screens/HomeScreen.js';
import MaterialIcons from '@expo/vector-icons/MaterialIcons.js';
import { apiRequest, logoutRequest } from '../Api.js';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import AddNoteScreen from '../screens/AddNoteScreen.js';

export default function StackNavigator() {

    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [initialScreen, setInitialScreen] = useState(ScreenNames.LoginScreen)

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    const theme = useTheme();

    const [loaded] = useFonts({
        Montserrat: require('../../assets/Montserrat-Bold.otf'),
    });

    useEffect(() => {
        let key = 'secure_token'
        async function getToken(key) {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
                setInitialScreen(ScreenNames.HomeScreen)
                console.log("🔐 Here's your value - StackNavigator🔐 \n" + result);
            } else {
                setInitialScreen(ScreenNames.LoginScreen)
                console.log('No values stored under that key.');
            }
        }
        getToken(key)
    }, [])

    async function deleteToken(key) {
        await SecureStore.deleteItemAsync(key)
    }

    const logoutHandle = (token) => {

        Alert.alert('Confirm Logout!', 'Are you sure you want to log out? You will be redirected to the login screen.', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => logoutFunc(token) },
        ]);
        return true;

    }

    const logoutFunc = (token) => {
        setLoading(true)
        let headers = { 'Authorization': `Bearer {{${token}}}` }
        logoutRequest(methods.POST, urls.logout, headers)
            .then(response => {
                console.log(response.data.message)
                deleteToken('secure_token')
                setLoading(false)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: ScreenNames.LoginScreen }
                        ],
                    })
                );
                // navigation.reset(ScreenNames.LoginScreen)
            })
            .catch(error => {
                console.log(error)
                // showPopUp(error.response.data.message)
                setLoading(false)
            })
    }

    if (!loaded) {
        return null;
    }

    return (
        <Stack.Navigator
            initialRouteName={initialScreen}
        >
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
            <Stack.Screen
                name={ScreenNames.HomeScreen}
                component={HomeScreen}
                options={{
                    title: constants.appName,
                    headerTitleStyle: {
                        fontFamily: "Montserrat"
                    },
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <View>
                            {loading ? <ActivityIndicator color={theme.colors.primary} size={26} /> :
                                <TouchableOpacity
                                    onPress={() => logoutHandle(token)}
                                >
                                    <MaterialIcons name='logout' size={26} color='black' />
                                </TouchableOpacity>}
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name={ScreenNames.AddNoteScreen}
                component={AddNoteScreen}
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
