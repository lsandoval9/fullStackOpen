import axios from "axios";

const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const result = await axios.post("/api/login", {
                username,
                password,
            });

            if (result.status === 200) {
                window.localStorage.setItem("token", result.data.token);

                window.localStorage.setItem("username", result.data.username);

                dispatch({
                    type: "LOGIN",
                    payload: {
                        username,
                        token: result.data.token,
                    },
                });

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.dir(error);
            return false;
        }
    };
};

const logoutUser = () => {
    return (dispatch) => {
        window.localStorage.removeItem("username");

        window.localStorage.removeItem("token");

        dispatch({
            type: "LOGOUT",
            payload: null,
        });
    };
};

const loginFromLocalStorage = () => {
    return (dispatch) => {
        const username = window.localStorage.getItem("username");

        const token = window.localStorage.getItem("token");

        if (token && username) {
            dispatch({type: "LOGIN", payload: {username, token} });
        }
    };
};

const credentialsActions = {
    loginUser,
    logoutUser,
    loginFromLocalStorage,
};

export default credentialsActions;
