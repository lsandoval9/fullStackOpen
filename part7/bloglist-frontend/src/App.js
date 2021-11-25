import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Notification from "./components/Notification";

import blogsActions from "./store/blogs/actions/blogActions";
import MainView from "./components/MainView";
import credentialsActions from "./store/credentials/actions/credentialsActions";
import usersActions from "./store/users/actions/usersActions";

const App = () => {

    // Redux state

    const notification = useSelector(state => state.notification);

    const credentials = useSelector(state => state.credentials);

    const state = useSelector(state => state);

    console.log(state)

    const dispatch = useDispatch();

    const [loggedUsername, setLoggedUsername] = useState(() => {
        return window.localStorage.getItem("username");
    });

    const [token, setToken] = useState(() => {
        return window.localStorage.getItem("token");
    });

    const [isCreateBlogVisible, setIsCreateBlogVisible] = useState(false);

    

    const logout = () => {
        setToken(undefined);

        setLoggedUsername(undefined);
    };

    const toggleNotification = (message, isError) => {
        setNotification({
            show: true,
            message,
            isError,
        });

        setTimeout(() => {
            setNotification({
                show: false,
                message: "No message",
                isError: false,
            });
        }, 6500);
    };

    useEffect(() => {
        fetchBlogs();

        dispatch(credentialsActions.loginFromLocalStorage());

        dispatch(usersActions.getUsers());

    }, []);

    const fetchBlogs = async () => {
        
        dispatch(blogsActions.getBlogs())
    };

    return (
        <div>
            {notification.show && (
                <Notification
                    message={notification.message}
                    isError={notification.isError}
                />
            )}
            {credentials?.token ? (
                <MainView 
                    isCreateBlogVisible={isCreateBlogVisible}
                    setIsCreateBlogVisible={setIsCreateBlogVisible}
                />
                
            ) : (
                <Login
                    setLoggedUsername={setLoggedUsername}
                    loggedUsername={loggedUsername}
                />
            )}
        </div>
    );
};

export default App;
