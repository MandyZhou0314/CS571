import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

/* eslint-disable react/prop-types */
export default function FeaturedItem(props) {

    const [status, setStatus] = useState(0);

    function showAndHide() {
        setStatus(s => !s)
    }

    return <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img} alt={props.name} style={{ width: '300px', height: '300px', margin: "auto"}} />
                <h5>{props.name}</h5>
                <h6>${props.price} per unit</h6>
                <p>{props.description}</p>

                {/* click button and check status, if hide, then display the table*/}
                {
                    status ? "" :
                        <>
                            <h5>Nutrition Facts</h5>
                            <Table>

                                <thead>
                                    <tr>
                                        <th>Calories</th>
                                        <th>Fat</th>
                                        <th>Carbohydrates</th>
                                        <th>Protein</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{props.nutrition.calories ? props.nutrition.calories : "0g"}</td>
                                        <td>{props.nutrition.fat ? props.nutrition.fat : "0g"}</td>
                                        <td>{props.nutrition.carbohydrates ? props.nutrition.carbohydrates : "0g"}</td>
                                        <td>{props.nutrition.protein ? props.nutrition.protein : "0g"}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                }

                <Button variant="secondary" onClick={showAndHide}> {status ? "Show" : "Hide"} Nutrition Facts</Button>
            </> : <p>Loading...</p>
        }
    </Card>
}