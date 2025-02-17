import React, { useEffect, useState, useContext, useRef } from "react";
import { Col, Container, Row, Pagination, Form, Button } from "react-bootstrap";
import Message from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    function create(e) {
        e.preventDefault();
        if (titleRef.current.value === "" || contentRef.current.value === "") {
            alert("You must provide both a title and content!");
            return;
        }
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify({
                "title": titleRef.current.value,
                "content": contentRef.current.value
            })
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully posted!");
                loadMessages();
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

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        <>
            <Form.Label htmlFor="title">Post Title</Form.Label>
            <Form.Control type="text" id="username" ref={titleRef} />
            <Form.Label htmlFor="content">Post Content</Form.Label>
            <Form.Control type="text" id="password" ref={contentRef} />
            <br />
            <Button variant="primary" onClick={create}> Create Post</Button>
        </>
        {loginStatus !== "logged-in" ?
            <p>You must be logged in to post!</p>
            : null
        }
        <hr />
        {
            <div>
                {
                    messages.length > 0 ?
                        <Container fluid>
                            <Row>
                                {
                                    messages.map(m => <Col key={m.id} xs={12} md={6} lg={4} xl={3} xxl={3} style={{ marginBottom: "0.5rem" }}>
                                        <Message {...m} loadMessages={loadMessages} />
                                    </Col>)
                                }
                            </Row>
                        </Container>
                        :
                        <p>There are no messages on this page yet!</p>
                }
                <br />
                <Pagination>
                    <Pagination.Item onClick={() => setPage(1)} active={page === 1}>1</Pagination.Item>
                    <Pagination.Item onClick={() => setPage(2)} active={page === 2}>2</Pagination.Item>
                    <Pagination.Item onClick={() => setPage(3)} active={page === 3}>3</Pagination.Item>
                    <Pagination.Item onClick={() => setPage(4)} active={page === 4}>4</Pagination.Item>
                </Pagination>
            </div>
        }
    </>
}
