import { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css'

export default function Login({ setToken, setTokenSession }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    function loginUser(e) {
        e.preventDefault();

        fetch("http://localhost:2000/login", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            )
        })
        .then(response => response.json())
        .then(data => { 
            if (data.success) {
                setToken(data);
                setTokenSession(data);
            }
            else {
                if (data.message === " does not exist.") {
                    setMessage("Enter a username.");
                }
                else {
                    setMessage(data.message);
                }
                setTimeout( () => setMessage(<></>), 1500);
            }
         });
    }

    return (
        <>
            <h2 className="loginTitle">Welcome to Chat Room</h2>
            <h3 className="loginSubtitle">Login</h3>
            <form className="loginForm" onSubmit={loginUser}>
                <input className="loginItem" type="text" placeholder="username or email" onChange={(e) => setUsername(e.target.value)} />
                <input className="loginItem" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <input className="loginItem loginButton" type="submit" value="Login" />
            </form>
            <div className="signinContainer"><Link className="signin" to="/signin">Sign-in</Link></div>
            <p className="signinMessage">{message}</p>
        </>
    )
}