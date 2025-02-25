import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Button, Modal, TextInput, Alert } from "react-native";
import CS571 from '@cs571/mobile-client';
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from 'expo-secure-store'

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [popoutShown, setPopoutShown] = useState(false);

    const loadMessages = () => {
        setIsLoading(true)
        fetch(`https://cs571.org/rest/f24/hw9/messages?chatroom=${props.name}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            setIsLoading(false)
        })
    };

    const handleButtonPress = () => {
        setPopoutShown(true);
    };
    const create = async () => {
        const token = await SecureStore.getItemAsync('token');
        console.log(token);
        fetch(`https://cs571.org/rest/f24/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        }).then(res => {
            if (res.status === 200) {
                Alert.alert("Successfully posted message!");
                res.json().then(data => {
                    loadMessages();
                })
            } else {
                Alert.alert("Error!");
            }
        })
    };
    const cancel = () => {
        setPopoutShown(false);
    };
    const lacking = () => {
        return title.length === 0 || body.length === 0
    };

    useEffect(loadMessages, [props]);

    return (<View style={styles.container}>
        <FlatList
            data={messages}
            renderItem={({ item }) => {
                return <BadgerChatMessage {...item} loadMessages={loadMessages} />
            }}
            // to load messages
            onRefresh={loadMessages}
            // set isLoading to true while waiting for data and false after got data
            refreshing={isLoading}
        >
        </FlatList>
        <View style={styles.buttonContainer}>
            <Button
                title="ADD POST"
                onPress={handleButtonPress}
                color="white"
                disabled={props.isGuest}
            />
        </View>

        <Modal
            animationType="fade"
            transparent={true}
            visible={popoutShown}
        //presentationStyle={"pageSheet"} // supports iOS dismiss gesture
        >
            <View
                style={[styles.modalView, {
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }]}>
                <View>
                    <Text style={{ fontSize: 20 }}>Create A Post</Text>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        value={title}
                        onChangeText={(text) => setTitle(text)} >
                    </TextInput>
                    <Text style={styles.text}>Body</Text>
                    <TextInput
                        style={styles.textInput}
                        value={body}
                        onChangeText={(text) => setBody(text)} >
                    </TextInput>
                </View>
                <View style={styles.buttons}>
                    <Button
                        title="CREATE POST"
                        onPress={create}
                        color="white"
                        disabled={lacking()}>

                    </Button>
                    <Button
                        title="CANCEL"
                        onPress={cancel}
                        color="white">

                    </Button>
                </View>
            </View>
        </Modal>

    </View>
    )

    // old way without FlatList
    // <View style={{ flex: 1 }}>
    //     {messages.map((message) => <BadgerChatMessage {...message} />)}
    // </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'grey',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'crimson'
    },
    text: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16
    },
    textInput: {
        width: 200,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default BadgerChatroomScreen;