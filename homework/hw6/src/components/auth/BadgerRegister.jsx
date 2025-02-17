import { Form, Button } from 'react-bootstrap';
import { useState } from "react";

export default function BadgerRegister() {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [repeatPin, setRepeatPin] = useState("");
    const regex = /^\d{7}$/;

    function register(e) {
        e.preventDefault();
        // pin and repeatPin must be 7 digits
        if (!regex.test(pin) || !regex.test(repeatPin)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }
        // must input username and pin
        if (username === "" || pin === "" || repeatPin === "") {
            alert("You must provide both a username and pin!");
            return;
        }
        // pin and repeatPin must match
        if (pin !== repeatPin) {
            alert("Your pins do not match!");
            return;
        }

        fetch("https://cs571.org/rest/f24/hw6/register", {
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
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.status === 200) {
                alert("Registration was successful!");
            }
        }
        )
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" value={pin} onChange={(e) => setPin(e.target.value)}/>
            <Form.Label htmlFor="repeatPin">Repeat Password</Form.Label>
            <Form.Control type="password" id="repeatPin" value={repeatPin} onChange={(e) => setRepeatPin(e.target.value)}/>
            <br />
            <Button variant="primary"onClick={register}> Register</Button>
            <br />
        </Form>
    </>
}
