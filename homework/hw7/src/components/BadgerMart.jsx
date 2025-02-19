import { Button, Text, View, StyleSheet } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import { useEffect, useState } from "react";
import CS571 from '@cs571/mobile-client';

export default function BadgerMart(props) {

    const [items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState(0);
    // cart as a dict
    const [cart, setCart] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch("https://cs571.org/rest/f24/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
    });

    return <View style={styles.container}>
        <Text style={styles.title}>Welcome to Badger Mart!</Text>

        // navigate through items
        <View style={{ flexDirection: "row" }}>
            <View style={styles.buttonContainer}>
                <Button
                    title="PREVIOUS"
                    onPress={() => {
                        setCurrentItem(currentItem - 1);
                    }}
                    disabled={currentItem === 0}
                    color="white" />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="NEXT"
                    onPress={() => {
                        setCurrentItem(currentItem + 1);
                    }}
                    disabled={currentItem === items.length - 1}
                    color="white" />
            </View>
        </View>

        {items.length > 0 ?
            <BadgerSaleItem item={items[currentItem]} cart={cart} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            : <Text>Loading...</Text>}
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 150,
    },
    // welcome title
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    // prev and next buttons
    buttonContainer: {
        marginTop: 20,
        backgroundColor: 'blue',
        marginHorizontal: 10,
        borderRadius: 3,
    },
})
