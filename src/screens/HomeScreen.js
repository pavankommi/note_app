import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";
import LoaderComponent from '../components/LoaderComponent'
import AnimatedFab from '../components/AnimatedFab';
import { methods, urls } from '../constants/Constants';
import { deleteNoteRequest, notesRequest } from '../Api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons.js';
import ScreenNames from '../navigation/Constants.js'
import { Avatar, Button, Card, useTheme, Text } from 'react-native-paper';
import ParsedText from 'react-native-parsed-text';

export default function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isExtended, setIsExtended] = React.useState(true);

    //notes
    const [allNotes, setAllNotes] = useState([])

    const theme = useTheme();
    const isFocused = useIsFocused();

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
        loadNotes()
    }, [isFocused, isRefreshing])

    const loadNotes = async () => {
        setLoading(true)

        let key = 'secure_token'
        let result = await SecureStore.getItemAsync(key);

        let headers = { 'Authorization': `Bearer ${result}` }

        notesRequest(methods.GET, urls.getallNotes, headers)
            .then(response => {
                setAllNotes(response.data?.data)
                setLoading(false)
                setIsRefreshing(false)
            })
            .catch(error => {
                console.log("error")
                console.log(error.response.data)
                // showPopUp(error.response.data.message)
                setLoading(false)
                setIsRefreshing(false)
            })
    }

    const deleteNoteHandler = async (item) => {
        setLoading(true)

        let key = 'secure_token'
        let result = await SecureStore.getItemAsync(key);

        let headers = { 'Authorization': `Bearer ${result}` }

        let url = urls.deleteNote + `?id=${item.noteId}`

        console.log(url)

        deleteNoteRequest(methods.POST, url, headers)
            .then(response => {
                console.log(response)
                setLoading(false)
                setIsRefreshing(false)
                loadNotes()
            })
            .catch(error => {
                console.log("error")
                console.log(error.response.data)
                setIsRefreshing(false)
                loadNotes()
            })

    }

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };

    const renderNotes = ({ item }) => {
        return (
            <View style={{ marginVertical: 5 }}>
                <Card>
                    <Card.Content>
                        <ParsedText
                            // style={{ fontSize: 18 }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            parse={
                                [
                                    { pattern: /Sravya|Pavan/, style: { fontFamily: "Montserrat" } },
                                    { pattern: /^([\w\-]+)/, style: { fontFamily: "Montserrat", fontSize: 26 } }
                                ]
                            }
                        >
                            <Text variant="titleLarge" >{item.title}</Text>
                        </ParsedText>
                        <ParsedText
                            // style={{ fontSize: 18 }}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            parse={
                                [
                                    { pattern: /Sravya|Pavan/, style: { fontFamily: "Montserrat" } },
                                    { pattern: /^([\w\-]+)/, style: { fontFamily: "Montserrat", fontSize: 26 } }
                                ]
                            }
                        >
                            <Text variant="bodyLarge" >{item.description}</Text>
                        </ParsedText>
                    </Card.Content>
                    <Card.Actions>
                        <TouchableOpacity onPress={() => deleteNoteHandler(item)}>
                            <MaterialIcons name='delete' size={26} color={theme.colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.AddNoteScreen, {
                            item: item
                        })}>
                            <MaterialIcons name='edit' size={26} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>

            <FlatList
                data={allNotes}
                refreshing={isRefreshing}
                onScroll={onScroll}
                onRefresh={() => {
                    setIsRefreshing(true);
                }}
                renderItem={renderNotes}
                keyExtractor={item => item._id}
                // style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            <AnimatedFab extended={isExtended} navigation={navigation} />

            {loading ? <LoaderComponent loading={loading} /> : null}
        </View>
    )
}
