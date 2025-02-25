import { Button, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";

function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    return <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>

            <Text style={styles.text}>Username</Text>
            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text)} >
            </TextInput>
            <Text style={styles.text}>PIN</Text>
            <TextInput
                style={styles.textInput}
                value={pin}
                keyboardType="number-pad"
                maxLength={7}
                onChangeText={(text) => setPin(text)}
                secureTextEntry={true} >
            </TextInput>
            <Text style={styles.text}>Confirm PIN</Text>
            <TextInput
                style={styles.textInput}
                value={confirmPin}
                keyboardType="number-pad"
                maxLength={7}
                onChangeText={(text) => setConfirmPin(text)}
                secureTextEntry={true} >
            </TextInput>

            {pin.length > 0
                ? null
                : <Text style={styles.text}>Please enter a pin.</Text>}

            <View style={styles.buttons}>
                <Button color="grey" title="SIGNUP" onPress={() => props.handleSignup(username, pin, confirmPin)} />
                <Button color="grey" title="NEVERMIND!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;