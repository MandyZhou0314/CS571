
const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "IXCQ56BG4NBVOHI2BKSWSJM3EEPBV746"; // Put your CLIENT access token here.

    let availableItems = [];
    let priceMap = {};
    let cart = {};

    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/rest/f24/hw10/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        availableItems = await resp.json();
        for (let item of availableItems) {
            priceMap[item.name] = item.price
        }
        console.log(priceMap)
        return "Welcome to BadgerMart Voice!:) Type your question, or ask for help if you're lost!"
    }

    const handleReceive = async (prompt) => {
        const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "get_items": return getItems();
                case "get_help": return getHelp();
                case "get_price": return getPrice(data);
                case "add_item": return addItem(data);
                case "remove_item": return removeItem(data);
                case "view_cart": return viewCart();
            }
        }
        return "I'm sorry, I don't understand!"
    }

    const viewCart = async () => {
        if (Object.keys(cart).length === 0) {
            return "Your cart is empty now."
        } else {
            let cartItemList = []
            let totalCost = 0
            for (const [key, value] of Object.entries(cart)) {
                let keyValuePair = value + " " + key.toLowerCase()
                cartItemList.push(keyValuePair)
                totalCost += value * priceMap[key]
            }
            let listString = listToString(cartItemList)
            return `You have ${listString} in your cart, totalling $${totalCost}`
        }
    }

    const removeItem = async (promptData) => {
        const hasRemoveItem = promptData.entities["specific_item_price:specific_item_price"] ? true : false;
        const hasSpecificNum = promptData.entities["wit$number:number"] ? true : false;

        const removeItem = hasRemoveItem ? promptData.entities["specific_item_price:specific_item_price"][0].value : null;
        const numRemoveItems = hasSpecificNum ? promptData.entities["wit$number:number"][0].value : 1;

        let removeResponse = "This item is not in stock!"
        let numItems = cart[removeItem]

        for (let item of availableItems) {
            if (removeItem === item.name) {
                if (numRemoveItems === 0 || numRemoveItems < 1) {
                    removeResponse = 'This quantity is invalid.'
                } else if (numRemoveItems > numItems) {
                    cart[removeItem] = 0
                    removeResponse = 'Remove all!'
                } else {
                    cart[removeItem] = Math.floor(numItems - numRemoveItems);
                    removeResponse = `Sure, removing ${Math.floor(numRemoveItems)} ${removeItem.toLowerCase()}(s) from your cart.`
                }
                break;
            }
        }
        return removeResponse;
    }

    const addItem = async (promptData) => {
        const hasAddItem = promptData.entities["specific_item_price:specific_item_price"] ? true : false;
        const hasSpecificNum = promptData.entities["wit$number:number"] ? true : false;

        const addItem = hasAddItem ? promptData.entities["specific_item_price:specific_item_price"][0].value : null;
        const numItems = hasSpecificNum ? promptData.entities["wit$number:number"][0].value : 1;

        let addResponse = "This item is not in stock!"
        for (let item of availableItems) {
            if (addItem === item.name) {
                if (numItems === 0 || numItems < 1) {
                    addResponse = 'This quantity is invalid.'
                } else {
                    cart[addItem] = Math.floor(numItems);
                    addResponse = `Sure, adding ${Math.floor(numItems)} ${addItem.toLowerCase()}(s) to your cart.`
                }
                break;
            }
        } return addResponse;
    }

    // use priceMap
    const getPrice = async (promptData) => {
        const hasSpecificItem = promptData.entities["specific_item_price:specific_item_price"] ? true : false;
        const specificItem = hasSpecificItem ? promptData.entities["specific_item_price:specific_item_price"][0].value : null;

        let priceResponse = "This item is not in stock!"
        for (let item of availableItems) {
            if (specificItem === item.name) {
                let specificPrice = item.price
                priceResponse = `${specificItem} cost $${specificPrice} each.`
            }
        } return priceResponse;
    }

    const getHelp = async () => {
        return "In BadgerMart Voice, you can get the list of items, the price of an item, add or remove an item from your cart, and checkout!"
    }

    const getItems = async () => {
        let itemList = []
        for (let availableItem of availableItems) {
            itemList.push(availableItem.name.toLowerCase())
        }
        return `We have ${listToString(itemList)} for sale!`
    }

    // helper method of getItems to convert items list to available items string
    function listToString(lst) {
        if (lst.length === 0) {
            return "no item";
        } else if (lst.length === 1) {
            return lst[0];
        } else if (lst.length === 2) {
            return lst.join(" and ");
        } else {
            const firstPart = lst.slice(0, -1).join(", ");
            return firstPart + ", and " + lst[lst.length - 1];
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;