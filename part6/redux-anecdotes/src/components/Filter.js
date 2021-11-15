import React, { useEffect } from "react";
import { connect } from "react-redux";
import { filterActions } from "../reducers/filterReducer";

function Filter(props) {
    const { anecdotes } = props;

    const state = props.state;

    const { filterAnecdotes } = props;

    const style = {
        marginBottom: 10,
    };

    const handleChange = (event) => {
        const input = event.target.value.toLowerCase() ?? "";

        if (!anecdotes) {
            console.log(anecdotes);
            return;
        }

        const filteredAnecdotes = anecdotes.filter((anecdote) => {
            if (!input) {
                return { ...state, filteredAnecdotes: anecdotes };
            }

            if (
                anecdote.content.toLowerCase().includes(input) ||
                anecdote.votes == input
            ) {
                return true;
            }

            return false;
        });

        filterAnecdotes(filteredAnecdotes);
    };

    return (
        <div style={style}>
            <input type="text" name="pattern" onChange={handleChange} />
        </div>
    );
}

const mapStateToProps = (state) => ({ state, anecdotes: state.anecdotes });
const mapDispatchToProps = {
    filterAnecdotes: filterActions.filterAnecdotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
