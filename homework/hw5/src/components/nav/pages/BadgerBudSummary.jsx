/* eslint-disable react/prop-types */
// the information of one cat
import { useState } from "react";
import { Button, Card, Col, Carousel } from "react-bootstrap";

export default function BadgerBudSummary(props) {

    const [displayStatus, setdisplayStatus] = useState(1);

    const showAndHide = () => {
        setdisplayStatus(s => !s)
    }

    const save = () => {
        alert(`${props.name} has been added to your basket!`)
        sessionStorage.setItem(props.id, "saved")
        props.onSave();
    }

    const imgUrls = Array.isArray(props.imgIds)
        ? props.imgIds.map((id) => `https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${id}`)
        : [`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.imgIds}`];

    return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={props.id}>
        <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
            {
                displayStatus ?
                    <img style={{ aspectRatio: "1 / 1" }} src={imgUrls[0]} alt={`A picture of ${props.name}`} /> :
                    <>
                        <Carousel>
                            {imgUrls.map((url, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        style={{ aspectRatio: "1 / 1" }}
                                        className="d-block w-100 aspect-ratio-1x1"
                                        src={url}
                                        alt={`A picture of ${props.name} - ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <p>{props.gender}</p>
                        <p>{props.breed}</p>
                        <p>{props.age}</p>
                        <p>{props.description}</p>
                    </>
            }
            <h4>{props.name}</h4>
            <Button variant="primary" onClick={showAndHide}> {displayStatus ? "Show More" : "Show Less"}</Button>
            <Button variant="secondary" onClick={save}>Save</Button>
        </Card>
    </Col>;
}