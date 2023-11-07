import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function LoaderComponent(data) {

    const { loading } = data

    return (
        <View style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.67)",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <ActivityIndicator
                animating={loading}
                size={"large"}
            />
        </View>
    )
}
