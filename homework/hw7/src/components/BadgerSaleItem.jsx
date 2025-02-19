import { Text, View, Image, StyleSheet, Button, Alert } from "react-native";

export default function BadgerSaleItem(props) {
    const cart = props.cart;
    const currentItemCount = (cart[props.item.name] || 0);
    const totalItems = Object.values(cart).reduce((acc, val) => acc + val, 0);
    const totalPrice = props.totalPrice;
    const setTotalPrice = props.setTotalPrice;

    return <View style={styles.container}>
        <Image style={{ width: 200, height: 200 }} source={{ uri: props.item.imgSrc }} />
        <Text style={{ fontSize: 30 }}>{props.item.name}</Text>
        <Text style={{ fontSize: 20 }}>${props.item.price.toFixed(2)} each</Text>
        <Text style={{ fontSize: 12 }}> You can order up to {props.item.upperLimit} units!</Text>

         // add or remove items to the bascket
        <View style={{ flexDirection: "row" }}>
            <View style={styles.buttonContainer}>
                <Button
                    title="-"
                    onPress={() => {
                        // change the cart item
                        let updatedCount = currentItemCount - 1;
                        props.setCart({ ...cart, [props.item.name]: updatedCount });
                        setTotalPrice(totalPrice - props.item.price);
                    }}
                    disabled={currentItemCount === 0}
                    color="white" />
            </View>
            <Text style={styles.FruitContainer}>{currentItemCount}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="+"
                    onPress={() => {
                        let updatedCount = currentItemCount + 1;
                        props.setCart({ ...cart, [props.item.name]: updatedCount });
                        setTotalPrice(totalPrice + props.item.price);
                    }}
                    disabled={props.basketNum === props.item.upperLimit}
                    color="white" />
            </View>
        </View>

        {
         totalItems > 0 ?
            <View>
                <View style={styles.costContainer}>
                    <Text>You have {totalItems} item(s) costing ${totalPrice.toFixed(2)} in your cart!</Text>
                </View>
                <View style={styles.orderContainer}>
                    <Button
                        title="PLACE ORDER"
                        onPress={() => {
                            props.setCart({});
                            setTotalPrice(0);
                            Alert.alert(`Order Confirmed!`, `Your order contains ${totalItems} items and would have cost $${(totalPrice).toFixed(2)}!`)
                        }}
                        disabled={totalItems === 0}
                        color="white" />
                </View>
            </View>
            : <></>
        }
    </View>
}

const styles = StyleSheet.create({
    // item container
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -150,
    },
    // "+", "-" buttons
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "blue",
        marginHorizontal: 2,
        borderRadius: 3,
        marginHorizontal: 10,
    },
    // basket number
    FruitContainer: {
        marginTop: 25,
        marginHorizontal: 10,
        fontSize: 20,
    },
    // total cost of the items
    costContainer: {
        marginTop: 20,
        bottom: 0,
        alignItems: "center",
    },
    // "PLACE ORDER" buttons
    orderContainer: {
        marginTop: 20,
        bottom: 0,
        alignItems: "center",
        backgroundColor: "blue",
    }
})
