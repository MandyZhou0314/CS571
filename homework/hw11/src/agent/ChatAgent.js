import createChatDelegator from "./ChatDelegator";
import { isLoggedIn, ofRandom, getLoggedInUsername, logout } from "./Util";

const createChatAgent = () => {
    const CS571_WITAI_ACCESS_TOKEN = "DNEYOAEYS4YP7SCTWUNWL5VUTQ25UP2Q"; // Put your CLIENT access token here.

    const delegator = createChatDelegator();

    let chatrooms = [];

    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/rest/f24/hw11/chatrooms", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        });
        const data = await resp.json();
        chatrooms = data;

        return "Welcome to BadgerChat! My name is Bucki, how can I help you?";
    }

    const handleReceive = async (prompt) => {
        if (delegator.hasDelegate()) { return delegator.handleDelegation(prompt); }
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "get_help": return handleGetHelp();
                case "get_chatrooms": return handleGetChatrooms();
                case "get_messages": return handleGetMessages(data);
                case "login": return handleLogin();
                case "register": return handleRegister();
                case "create_message": return handleCreateMessage(data);
                case "logout": return handleLogout();
                case "whoami": return handleWhoAmI();
            }
        }
        return "Sorry, I didn't get that. Type 'help' to see what you can do!";
    }

    const handleGetHelp = async () => {
        return ofRandom([
            "Try asking 'give me a list of chatrooms', or ask for more help!",
            "Try asking 'register for an account', or ask for more help!"
        ])
    }

    const handleGetChatrooms = async () => {
        return `Of course, there are ${chatrooms.length} chatrooms: ${chatrooms.slice(0, -1).join(", ")}`
    }

    const handleGetMessages = async (data) => {
        const hasSpecifiedNumber = data.entities["wit$number:number"] ? true : false;
        const numPosts = hasSpecifiedNumber ? data.entities["wit$number:number"][0].value : 1;

        const hasSpecificRoom = data.entities["chatrooms:chatrooms"] ? true : false;
        const chatroomName = hasSpecificRoom ? data.entities["chatrooms:chatrooms"][0].value : "";

        const resp = await fetch(`https://cs571.org/rest/f24/hw11/messages?chatroom=${chatroomName}&num=${numPosts}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        });
        const responses = await resp.json()
        console.log(responses.messages.chatroom)
        return responses.messages.map(m => `In ${m.chatroom}, ${m.poster} created a post titled '${m.title}' saying '${m.content}'`);
    }

    const handleLogin = async () => {
        return await delegator.beginDelegation("LOGIN");
    }

    const handleRegister = async () => {
        return await delegator.beginDelegation("REGISTER");
    }

    const handleCreateMessage = async (data) => {
        return await delegator.beginDelegation("CREATE", data);
    }

    const handleLogout = async () => {
        if (await isLoggedIn()) {
            logout();
            return "You habe been logged out."
        } else {
            return "You need to be logged in before logging out."
        }
    }

    const handleWhoAmI = async () => {
        if (await isLoggedIn()) {
            const username = await getLoggedInUsername()
            return `You are currently logged in as ${username}`
        }
        return "You are not logged in yet"
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;