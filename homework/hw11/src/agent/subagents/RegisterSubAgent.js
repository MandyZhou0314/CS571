import { isLoggedIn, ofRandom } from "../Util";
import AIEmoteType from '../../components/chat/messages/AIEmoteType';

const createRegisterSubAgent = (end) => {

    let stage;
    let username, password, passwordConfirm;

    const handleInitialize = async (promptData) => {
        if (await isLoggedIn()) {
            return end(ofRandom)([
                "You are already logged in, try logging out first.",
                "You are already signed in, try signing out first."
            ])
        } else {
            stage = "FOLLOWUP_USERNAME";
            return ofRandom([
                "Got it! What username would you like to use?",
                "Great! What username would you like to choose?"
            ])
        }
    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_USERNAME": return await handleUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handlePassword(prompt);
            case "FOLLOWUP_PASSWORDCONFIM": return await handlePasswordConfirm(prompt);
        }
    }

    const handleUsername = async (prompt) => {
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return {
            nextIsSensitive: true,
            msg: ofRandom([
                "Thank you, what pin would you like to use? This must be 7 digits.",
                "Alright, what is your password? This must be 7 digits."
            ])
        }
    }

    const handlePassword = async (prompt) => {
        password = prompt;
        if (password.length !== 7) {
            return "Your pin must be a 7-digit number!"
        }
        stage = "FOLLOWUP_PASSWORDCONFIM";
        return {
            nextIsSensitive: true,
            msg: ofRandom([
                "Finally, please confirm your password.",
                "Great, please confirm your pin."
            ])
        }
    }

    const handlePasswordConfirm = async (prompt) => {
        passwordConfirm = prompt;
        if (passwordConfirm !== password) {
            return end({ emote: AIEmoteType.ERROR, msg: "Your pins do not match!" })
        } else if (passwordConfirm.length !== 7) {
            return end({ emote: AIEmoteType.ERROR, msg: "Your pin must be a 7-digit number!" })
        }
        const resp = await fetch("https://cs571.org/rest/f24/hw11/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: password
            })
        })

        if (resp.status === 200) {
            return end(
                {
                    emote: AIEmoteType.SUCCESS,
                    msg: ofRandom([
                        `Successfully signed up, ${username}!`,
                        `Success! Welcome to BadgerChat, ${username}.`
                    ])
                })
        } else if (resp.status === 409) {
            return end(
                {
                    emote: AIEmoteType.ERROR,
                    msg: ofRandom([
                        "Sorry, that username has already been taken!",
                        "Sorry, the user already exists, please try another usename."
                    ])
                })
        } else {
            "Error!"
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createRegisterSubAgent;