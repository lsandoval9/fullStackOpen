import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseURL);
};

const createPerson = (personData) => {
    return axios.post(baseURL, personData);
};

const updatePerson = (id, newPerson) => {
    return axios.put(`${baseURL}/${id}`, newPerson);
};

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createPerson, updatePerson, deletePerson };
