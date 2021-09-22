import React, { useState } from "react";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LargerAnecdote(props) {

    return (
        <>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[props.larger]}</p>
            <p>has: {props.votes[props.larger]} votes</p>
        </>
    );
}

function App() {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
    ];

    const [selected, setSelected] = useState(0);

    const [largerAnecdote, setLargerAnecdote] = useState(0);

    const [votes, setVotes] = useState(Array(7).fill(0));

    function nextAnecdote() {
        setSelected(getRandomInt(0, 6));
    }

    function vote() {

        let newVotes = []

        setVotes((prev) => {

            newVotes = Object.assign([], prev, { [selected]: prev[selected] + 1 });

            return newVotes;
        });

        setLargerAnecdote(prev => {

            let larger = Math.max(...newVotes);

            return newVotes.indexOf(larger);

        })
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has: {votes[selected]} votes</p>
            <button onClick={nextAnecdote}>Next anecdote</button>
            <button onClick={vote}>Vote</button>

            <LargerAnecdote
                larger={largerAnecdote}
                anecdotes={anecdotes}
                votes={votes}
            />
        </div>
    );
}

export default App;
