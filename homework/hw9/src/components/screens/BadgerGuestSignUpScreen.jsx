import { Button, StyleSheet, Text, View } from "react-native";

function BadgerGuestSignUpScreen(props) {

    return <View style={styles.container}>
        <Text style={{ fontSize: 24, marginTop: -100 }}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text />
        <Button title="SIGNUP" color="darkred" onPress={() => { props.setIsRegistering(true); props.setIsGuest(false) }} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerGuestSignUpScreen;