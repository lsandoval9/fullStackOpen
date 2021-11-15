import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { anecdotesActions } from "./reducers/anecdoteReducer";
import { filterActions } from "./reducers/filterReducer";
import anecdotesService from "./services/anecdotesService";

const App = () => {
    const anecdotes = useSelector((state) => state.anecdotes);

    const dispatch = useDispatch();

    const message = useSelector((state) => state.notification.message)

    const filteredAnecdotes = useSelector((state) => state.filter.filteredAnecdotes)


    const getAnecdotes = async () => {

        dispatch(anecdotesActions.getAnecdotes());
    }

    useEffect(() => {
        
        getAnecdotes()
        
    }, [])

    return (
        <div>
            <h2>Anecdotes</h2>

            {message && <Notification />}

            <Filter/>

            <AnecdoteList anecdotes={filteredAnecdotes?? anecdotes} />
            <AnecdoteForm getAnecdotes={getAnecdotes}/>
        </div>
    );
};

export default App;
