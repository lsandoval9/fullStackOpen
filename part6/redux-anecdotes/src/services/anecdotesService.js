import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
    const response = await axios.get(baseUrl);

    return response.data;
};

const create = async (content) => {
    const anecdote = {
        content: content,
        votes: 0,
        id: getId(),
    };

    await axios.post(baseUrl, anecdote);
};


const updateAnecdote = async (id, anecdote) => {

    return await axios.put(`${baseUrl}/${id}`, anecdote);

}

const anecdotesService = { getAll, create, updateAnecdote };

export default anecdotesService;
