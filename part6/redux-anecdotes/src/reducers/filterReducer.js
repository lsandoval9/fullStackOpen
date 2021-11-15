const initialState = {
    filteredAnecdotes: null
}

const filterAnecdotes = (filteredAnecdotes) => {

    return  {
        type: "FILTER",
        payload: {
            filteredAnecdotes
        }
    }

}

export const filterActions = {filterAnecdotes}

export default (state = initialState, { type, payload }) => {

    switch (type) {

    case "FILTER":
        return {...state, filteredAnecdotes: payload.filteredAnecdotes};

    default:
        return state
    }
}
