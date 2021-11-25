import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import credentialsActions from "../store/credentials/actions/credentialsActions";
import notificationActions from "../store/notification/actions/notificationActions";

function Login(props) {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();

        const isOk = await dispatch(
            credentialsActions.loginUser(username, password)
        );

        if (!isOk) {
            dispatch(
                notificationActions.notificate("Invalid credentials", true)
            );
        }
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className="container-fluid">
            <h3>Log in to application</h3>
            <form onSubmit={onLogin}>
                <div>
                    <label htmlFor="username">username: </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onUsernameChange}
                        id="username-input"
                    />
                </div>
                <div>
                    <label htmlFor="password">password: </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onPasswordChange}
                        id="password-input"
                    />
                </div>
                <input type="submit" value="login" id="login-button" />
            </form>
        </div>
    );
}

export default Login;
