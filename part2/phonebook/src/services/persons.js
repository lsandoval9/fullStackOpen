import axios from "axios";

const baseURL = process.env.REACT_APP_API;



const getAll = () => {
    console.log("address: ", baseURL)
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
