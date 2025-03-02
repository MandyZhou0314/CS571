import { isLoggedIn, ofRandom } from "../Util";
import AIEmoteType from '../../components/chat/messages/AIEmoteType';

const createPostSubAgent = (end) => {

    const CS571_WITAI_ACCESS_TOKEN = "DNEYOAEYS4YP7SCTWUNWL5VUTQ25UP2Q";
    let stage;
    let chatroom = "";

    let title, content, confirm;

    const handleInitialize = async (promptData) => {
        const hasChatroom = promptData.entities["chatrooms:chatrooms"] ? true : false;
        chatroom = hasChatroom ? promptData.entities["chatrooms:chatrooms"][0].value : null;

        if (await isLoggedIn() && hasChatroom) {
            stage = "FOLLOWUP_TITLE";
            return ofRandom([
                "Sure, what should be the title of your post?",
                "Alright, what title would you like to use for your post?"
            ])
        } else if (isLoggedIn() && !hasChatroom) {
            return end(
                {
                    emote: AIEmoteType.ERROR,
                    msg: "Please specific chatroom before creating a post."
                })
        } else if (!isLoggedIn() && hasChatroom) {
            return end(
                {
                    emote: AIEmoteType.ERROR,
                    msg: "Please login first."
                })
        } else {
            return end(
                {
                    emote: AIEmoteType.ERROR,
                    msg: "Please login and then specific a chatroom before posting."
                })
        }
    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_TITLE": return await handleTitle(prompt);
            case "FOLLOWUP_CONTENT": return await handleContent(prompt);
            case "FOLLOWUP_COMFIRM": return await handleConfirm(prompt)
        }
    }

    const handleTitle = async (prompt) => {
        title = prompt;
        stage = "FOLLOWUP_CONTENT";
        return ofRandom([
            "Sounds good, and what should be the content of your post?",
            "Great, what content would you like to post?"
        ])
    }

    const handleContent = async (prompt) => {
        content = prompt;
        stage = "FOLLOWUP_COMFIRM";
        return `Excellent! To confirm, you want to create this post titled ${title} in ${chatroom}?`
    }

    const handleConfirm = async (prompt) => {
        confirm = prompt;
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0 && data.intents[0].name === 'wit$confirmation') {
            await fetch(`https://cs571.org/rest/f24/hw11/messages?chatroom=${chatroom}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })
            return end(
                {
                    emote: AIEmoteType.SUCCESS,
                    msg: `All set! Your post has been made in ${chatroom}.`
                })
        } else {
            return end(
                {
                    emote: AIEmoteType.ERROR,
                    msg: ofRandom([
                        "No worries, if you want to create a comment in the future, just ask!",
                        "That's alright, if you want to create a comment in the future, just ask!"
                    ])
                })
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createPostSubAgent;