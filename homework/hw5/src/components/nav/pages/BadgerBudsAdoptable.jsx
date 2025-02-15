/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import BadgerBudSummary from "./BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import { Row } from "react-bootstrap";

export default function BadgerBudsAdoptable() {

    const allCatsFromAPI = useContext(BadgerBudsDataContext);
    const [adoptableCats, setAdoptableCats] = useState([]);

    useEffect(() => {
        onSave();
    }, [allCatsFromAPI])

    function onSave()
    {
        setAdoptableCats(allCatsFromAPI
            .filter(cat => {
                let status = sessionStorage.getItem(cat.id);
                return status === null || status === "no-status";
            }));
        console.log("save")
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
        {
            adoptableCats.length === 0? <p>No buds are available for adoption!</p> :
            adoptableCats.map(cat => 
            {
                return <BadgerBudSummary key={cat.id} onSave={onSave} {...cat}></BadgerBudSummary>
            })
        }
        </Row>
    </div>
}