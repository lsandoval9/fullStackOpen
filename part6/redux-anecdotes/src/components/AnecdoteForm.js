import React from "react";
import { connect, useDispatch } from "react-redux";
import { anecdotesActions } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotesService";

function AnecdoteForm(props) {

    const {getAnecdotes, createAnecdote} = props;

    const create = async (event) => {
        event.preventDefault();

        await createAnecdote(event.target.content.value)

        getAnecdotes()


        
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input type="text" id="content-input" name="content" />
                </div>
                <button>create</button>
            </form>
        </>
    );
}


const mapStateToProps = (state) => ({
    
    anecdotes: state.anecdotes

})

const mapDispatchToProps = {
    createAnecdote: anecdotesActions.createAnecdote
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
