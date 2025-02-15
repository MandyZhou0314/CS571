/* eslint-disable react/prop-types */
// the information of one cat
import { Button, Card, Col } from "react-bootstrap";

export default function BasketItem(props) {

    const unselect = () => {
        alert(`${props.name} has been removed from your basket!`);
        sessionStorage.setItem(props.id, "no-status");
        props.saved();
    }

    const adopt = () => {
        alert(`${props.name} has been adopted!`);
        sessionStorage.setItem(props.id, "adopted");
        props.adopted();
    }

    return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={props.id}>
        <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
            <img
                style={{ aspectRatio: "1 / 1" }}
                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                alt={`A picture of ${props.name}`}></img>
            <h4>{props.name}</h4>
            <Button variant="secondary" onClick={unselect}> Unselect</Button>
            <Button variant="success" onClick={adopt}> Adopt</Button>
        </Card>
    </Col>;
}