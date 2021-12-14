import { useMutation } from "@apollo/client";
import React from "react";
import queries from "../graphql/queries";

function Login(props) {
    const { show, saveLogin } = props;

    const [loginMutation] = useMutation(queries.LOGIN, {
        onError: (error) => console.dir(error),
    });

    if (!show) {
        return null;
    }

    const login = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const result = await loginMutation({
            variables: { username, password },
        });

        if (result?.data?.login?.value) {
            saveLogin(username, result.data.login.value);
        }
    };

    return (
        <>
            <h3>login form</h3>
            <form onSubmit={login}>
                <input type="text" name="username" id="username" />
                <br />
                <input type="password" name="password" id="password" />
                <br />
                <input type="submit" value="login" />
            </form>
        </>
    );
}

export default Login;
