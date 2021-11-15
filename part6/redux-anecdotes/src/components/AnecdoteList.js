import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { anecdotesActions, voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationActions } from "../reducers/notificationReducer";

function AnecdoteList({anecdotes}) {

    const dispatch = useDispatch();

    const vote = (id, anecdote) => {
        dispatch(anecdotesActions.voteAnecdote(id, anecdote));

        dispatch(notificationActions.notificate(`You voted for ${anecdote.content}`, 5));

    };

    return (
        <>
            {anecdotes

                .sort((a, b) => {
                    if (a.votes === b.votes) {
                        return 0;
                    }

                    return a.votes < b.votes ? 1 : -1;
                })

                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id, anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default AnecdoteList;
