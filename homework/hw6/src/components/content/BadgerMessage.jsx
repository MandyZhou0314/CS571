import React, { useState } from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    //const [deleted, setDeleted] = useState(false);

    function deletePost(e) {
        e.preventDefault();
        fetch(`https://cs571.org/rest/f24/hw6/messages?id=${props.id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                props.loadMessages();
            }
            else if (res.status === 401) {
                alert("You must be logged in to post!");
            }
            else if (res.status === 400) {
                alert("You must provide both a title and content!");
            }
        }
        )
    }


    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br />
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.poster === sessionStorage.getItem("username") ?
            <Button variant="danger" onClick={deletePost}> Delete Post</Button>
            : null}
    </Card>

}

export default BadgerMessage;