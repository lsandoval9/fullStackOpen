import { useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { client } from "./index";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Logged from "./components/Logged";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";
import queries from "./graphql/queries";

const notificationStyle = {
    backgroundColor: "green",
    color: "white",
    fontSize: "30px",
    padding: "20px",
    margin: "8px 0px 8px",
    border: "5px solid darkgreen",
    borderRadius: "4px"
    
}

const errorNotification = {
    backgroundColor: "red",
    border: "5px solid darkred",
}

const App = () => {

    const [page, setPage] = useState("authors");

    const [notification, setNotification] = useState(null);

    const [username, setUsername] = useState(() => {
        return window.localStorage.getItem("username");
    });

    const [_, setAuthenticationToken] = useState(() => {
        return window.localStorage.getItem("authentication-token");
    });

    const notify = (message, isError=false) => {

        setNotification({message, isError});

        setTimeout(() => {
            setNotification(null);
        }, 6000);

    }

    useSubscription(queries.BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedBook = subscriptionData.data.bookAdded
            notify(`${addedBook.title} added - genres: ${addedBook.genres.join(", ")}`)
            updateCacheWith(addedBook)
        },
        
    })

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => 
          set.map(p => p.id).includes(object.id)  
    
        const dataInStore = client.readQuery({ query: queries.GET_BOOKS })
        console.log(dataInStore)
        console.log(addedBook)
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            console.log("I'M IN")
          client.writeQuery({
            query: queries.GET_BOOKS,
            data: { allBooks: dataInStore.allBooks.concat(addedBook) },
          })
        }   
    }

    const saveLogin = (username, token) => {
        window.localStorage.setItem("authentication-token", token);
        window.localStorage.setItem("username", username);

        setUsername(username);
        setAuthenticationToken(token);
    };

    const logout = () => {
        setUsername(null);
        setAuthenticationToken(null);

        window.localStorage.clear();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={() => setPage("recommended")}>recommended</button>
                {username ? (
                    <Logged username={username} logout={logout} />
                ) : (
                    <button onClick={() => setPage("login")}>Login</button>
                )}
                {notification && 
                <div style={notification.isError? {...notificationStyle, ...errorNotification}: notificationStyle}>
                    {notification.message}
                </div>
                }
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook notify={notify}show={page === "add"} />

            <Recommended show={page === "recommended"} />

            {username ? null : (
                <Login show={page === "login"} saveLogin={saveLogin} />
            )}
        </div>
    );
};

export default App;
