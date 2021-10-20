
import React, { useEffect, useState } from "react";
import AddNewPerson from "./components/AddNewPerson";
import Notification from "./components/Notification";
import PersonsList from "./components/PersonsList";
import SearchBar from "./components/SearchBar";

import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    const [messageData, setMessageData] = useState({})

    useEffect(() => {
        getPersonList()
    }, []);

    const getPersonList = () => {
        personService.getAll().then((response) => {
            setPersons(response.data);
            setFilteredPersons(response.data);
        });
    }


    const toggleMessage = (message, isError) => {

        setMessageData({message, isError})

        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        }, 8000);

    }

    return (
        <div>

            {showMessage && 
            <Notification message={messageData?.message} isError={messageData?.isError}/>}

            <h2>Phonebook</h2>

            <SearchBar
                persons={persons}
                setFilteredPersons={setFilteredPersons}
            />

            <AddNewPerson persons={persons} 
            toggleMessage={toggleMessage}
            setPersons={setPersons} 
            getPersonList={getPersonList}/>
            <h2>Numbers</h2>

            <PersonsList 
            filteredPersons={filteredPersons} 
            toggleMessage={toggleMessage} 
            getPersonList={getPersonList}/>
        </div>
    );
};

export default App;
