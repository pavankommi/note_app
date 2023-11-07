import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import LoaderComponent from '../components/LoaderComponent'

export default function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        let key = 'secure_token'
        async function getToken(key) {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
                console.log("🔐 Here's your value - HomeScreen 🔐 \n" + result);
            } else {
                console.log('No values stored under that key.');
            }
        }
        getToken(key)
    }, [])

    return (
        <View style={{ flex: 1, padding: 5 }}>



            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )
}
