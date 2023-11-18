import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TextInput, View } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import LoaderComponent from '../components/LoaderComponent'
import { apiRequest, noteRequest, notesRequest, updateNoteRequest } from '../Api'
import { methods, urls } from '../constants/Constants'
import { Button, Text } from 'react-native-paper'

export default function AddNoteScreen({ navigation, route }) {

    const { item } = route.params;

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(item?.title ? item?.title : '')
    const [description, setDescription] = useState(item?.description ? item?.description : '')

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    //     return () => backHandler.remove();
    // }, []);

    console.log(title)

    const backAction = async () => {

        setLoading(true)

        let key = 'secure_token'
        let result = await SecureStore.getItemAsync(key);

        let headers = {
            'Authorization': `Bearer ${result}`,
            'Content-Type': 'application/json',
        }

        if (item == null) {

            let data = JSON.stringify({
                "title": `${title}`,
                "description": `${description}`
            })

            noteRequest(methods.POST, urls.addNote, headers, data)
                .then(response => {
                    console.log(response.data)
                    setLoading(false)
                    navigation.goBack();
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                    navigation.goBack();
                })

            return true
        } else {
            //update

            console.log('update')

            let data = JSON.stringify({
                "title": `${title}`,
                "description": `${description}`
            })

            let url = urls.updateNote + `?id=${item.noteId}`

            console.log(methods.POST, url, headers)

            updateNoteRequest(methods.POST, url, headers, data)
                .then(response => {
                    console.log(response.data)
                    setLoading(false)
                    navigation.goBack();
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                    navigation.goBack();
                })

            return true

        }

    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <TextInput
                    placeholder='Title'
                    placeholderTextColor={"#a9a9a9"}
                    onChangeText={(val) => setTitle(val)}
                    style={{ fontSize: 24 }}
                    value={title}
                    autoFocus={true}
                    multiline={true}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset={0}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <TextInput
                        placeholder='description'
                        placeholderTextColor={"#a9a9a9"}
                        onChangeText={(val) => setDescription(val)}
                        style={{ height: "100%", fontSize: 18, paddingBottom: '10%' }}
                        value={description}
                        // autoFocus={true}
                        multiline={true}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <View style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end" }}>
                <Button onPress={() => navigation.goBack()} labelStyle={{ fontSize: 18 }}>
                    Cancel
                </Button>

                <Button onPress={() => backAction()} labelStyle={{ fontSize: 18 }}>
                    Save
                </Button>
            </View>

            {loading ? <LoaderComponent loading={loading} /> : null}

        </SafeAreaView>
    )
}
