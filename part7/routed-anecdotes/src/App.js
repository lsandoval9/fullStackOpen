import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Link,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import SingleAnecdote from "./components/SingleAnecdote";

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: "1",
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: "2",
        },
    ]);

    const match = useRouteMatch("/anecdotes/:id");

    const [notification, setNotification] = useState(null);

    const singleAnecdote = match
        ? anecdotes.find((anecdote) => {
            
            console.log(anecdote)
            return Number(anecdote.id) === Number(match.params.id)})
        : null;

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };


    const notificate = (content, timeInSeconds) => {

        setNotification(content)


        setTimeout(() => {
            
            setNotification(null)

        }, timeInSeconds * 1000);

    }

    useEffect(() => {
        
        notificate("Welcome to my anecdotes app", 5)
    }, [])

    return (
        <>

            

            <h1>Software anecdotes</h1>

            {notification && <Notification notification={notification}/>}

            <Menu />

            <Switch>
                <Route path="/" exact>
                    <AnecdoteList anecdotes={anecdotes} />
                </Route>

                <Route path="/anecdotes/:id">
                    <SingleAnecdote anecdote={singleAnecdote} />
                </Route>

                <Route path="/about">
                    <About />
                </Route>
                <Route path="/create">
                    <CreateNew notificate={notificate} addNew={addNew} />
                </Route>
            </Switch>

            <Footer />
        </>
    );
};

export default App;
