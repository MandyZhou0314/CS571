import { Text, Button, Alert, View } from "react-native";
import BadgerCard from "./BadgerCard";
import CS571 from '@cs571/mobile-client';
import * as SecureStore from 'expo-secure-store'

function BadgerChatMessage(props) {

    async function deletePost() {
        const token = await SecureStore.getItemAsync('token');
        fetch(`https://cs571.org/rest/f24/hw9/messages?id=${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId(),
                "Authorization": `Bearer ${token}`,
            },
        }).then(res => {
            if (res.status === 200) {
                Alert.alert("Successfully deleted the post!");
                props.loadMessages();
            }
            else if (res.status === 401) {
                Alert.alert("You must be logged in to post!");
            } else {
                Alert.alert("Error")
            }
        }
        )
    }

    const dt = new Date(props.created);

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
        <Text style={{ fontSize: 12 }}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        {
            props.poster === SecureStore.getItem("username") ?
                <View style={{ backgroundColor: 'crimson', marginTop: 15 }}>
                    <Button
                        title="DELETE POST"
                        onPress={deletePost}
                        color="white">
                    </Button>
                </View>
                : null
        }
    </BadgerCard>
}

export default BadgerChatMessage;