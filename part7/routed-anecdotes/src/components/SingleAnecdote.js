import React from 'react'

function SingleAnecdote({anecdote}) {

    return (
        <div>
            <h1>{anecdote.content}</h1>
            <h3>Has {anecdote.votes} votes</h3>
            <h3>Author: {anecdote.author}</h3>
            <a href={anecdote.info}>Info</a>
        </div>
    )
}

export default SingleAnecdote
