import React from 'react'
import { Text, View } from 'react-native'
import { useFonts } from 'expo-font';

export default function TextComponent(data) {

    const { text } = data

    const [loaded] = useFonts({
        Montserrat: require('../../assets/Montserrat-Bold.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <Text
            style={{ fontFamily: 'Montserrat' }}
        >{text}</Text>
    )
}
