import anecdotesService from "../services/anecdotesService";

const getId = () => (100000 * Math.random()).toFixed(0);

const voteAnecdote = (id, content) => {
    return async (dispatch) => {
        const votedAnecdote = { ...content, votes: content.votes + 1 };

        await anecdotesService.updateAnecdote(id, votedAnecdote);

        dispatch({
            type: "VOTE",
            payload: {
                id,
            },
        });
    };
};

const createAnecdote = (content) => {
    return async (dispatch) => {
        return new Promise((resolve, reject) => {
            anecdotesService.create(content).then(() => {

                dispatch({
                    type: "CREATE",
                    payload: {
                        content,
                    },
                });
    
                resolve()

            })

            
        });
    };
};

const getAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdotesService.getAll();

        dispatch({
            type: "GET_ALL",
            payload: anecdotes,
        });
    };
};

export const anecdotesActions = { getAnecdotes, createAnecdote, voteAnecdote };

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case "VOTE":
            return state.map((anecdote) => {
                if (anecdote.id == action.payload.id) {
                    anecdote.votes += 1;
                }

                return anecdote;
            });

        case "CREATE":
            console.log("CREATE");

            return state.concat({
                content: action.payload.content,
                votes: 0,
                id: getId(),
            });

        case "GET_ALL":
            return action.payload;

        default:
            break;
    }

    return state;
};

export default anecdoteReducer;
