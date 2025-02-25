import { Button, StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useState } from "react";

function BadgerLoginScreen(props) {


    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');

    return <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }} >BadgerChat Login</Text>
            <Text style={styles.text}>Username</Text>
            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text)} >
            </TextInput>
            <Text style={styles.text}>Pin</Text>
            <TextInput
                style={styles.textInput}
                value={pin}
                keyboardType="number-pad"
                maxLength={7}
                onChangeText={(text) => setPin(text)}
                secureTextEntry={true} >
            </TextInput>

            <Button color="crimson" title="LOGIN" onPress={() => props.handleLogin(username, pin)} />
            <Text style={styles.text}>New Here?</Text>
            <View style={styles.buttons}>
                <Button color="grey" title="SIGNUP" onPress={() => props.setIsRegistering(true)} />
                <Button color="grey" title="CONTINUE AS GUEST" onPress={() => props.setIsGuest(true)} />
            </View>

        </View>
    </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
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
    }
});

export default BadgerLoginScreen;