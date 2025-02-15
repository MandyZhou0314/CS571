/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import BasketItem from "./BasketItem";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"

export default function BadgerBudsBasket() {

    const allCatsFromAPI = useContext(BadgerBudsDataContext);
    const [selectedCats, setSelectedCats] = useState([]);

    useEffect(() => {
        saved();
    }, [allCatsFromAPI])

    function saved()
    {
        setSelectedCats(allCatsFromAPI
            .filter(cat => {
                let status = sessionStorage.getItem(cat.id);
                return status === "saved";
            }));
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>
        {
            selectedCats.length === 0? <p>You have no buds in your basket!</p> :
            selectedCats.map(cat =>
            {
                return <BasketItem key={cat.id} adopted={saved} saved={saved} {...cat}></BasketItem>
            })
        }
        </Row>
    </div>
}