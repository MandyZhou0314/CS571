import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRef, useContext  } from "react";
import { useNavigate} from 'react-router';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    const regex = /^\d{7}$/;
    const usernameInputRef = useRef(null);
    const pinInputRef = useRef(null);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    
    function login(e) {
        e.preventDefault();
        const username = usernameInputRef.current.value;
        const pin = pinInputRef.current.value; 
            // pin and repeatPin must be 7 digits
        if (!regex.test(pin)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }
        // must input username and pin
        if (username === "" || pin === "") {
            alert("You must provide both a username and pin!");
            return;
        }

        fetch("https://cs571.org/rest/f24/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.status === 200) {
                alert("Login was successful!");
                sessionStorage.setItem("loginStatus", "logged-in");
                sessionStorage.setItem("username", username);
                setLoginStatus("logged-in");
                navigate("/");
            }
        }
        )
    }
    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="text" id="username" ref={usernameInputRef} />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" id="password" ref={pinInputRef} />
        <br />
        <Button variant="primary" onClick={login}> Login</Button>
    </>
}
