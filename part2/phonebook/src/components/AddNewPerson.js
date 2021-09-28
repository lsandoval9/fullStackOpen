import React, { useState } from "react";

import personService from "../services/persons";

function AddNewPerson(props) {

    const { setPersons, persons, getPersonList, toggleMessage} = props;

    const [newName, setNewName] = useState("");
    const [newNumber, setNumber] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        let selectedPerson;

        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already in the phonebook, replace old number with new one?`
                )
            ) {
                let filteredPerson = persons.filter(
                    (person) => person.name === newName
                )[0];

                personService.updatePerson(filteredPerson.id, {
                    ...filteredPerson,
                    number: newNumber,
                });

                

                getPersonList();

                toggleMessage("Succesfull updated " + filteredPerson.name, false)
            }

            return;
        }

        if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook numbers`);

            return;
        }

        personService.createPerson({name: newName, number: newNumber});

        getPersonList();

        toggleMessage("Succesfull created " + newName, false)
    };

    const onNameChange = (event) => {
        setNewName(event.target.value);
    };

    const onNumberChange = (event) => {
        setNumber(event.target.value);
    };

    return (
        <>
            <h2>Add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name:{" "}
                    <input
                        type="text"
                        value={newName}
                        onChange={onNameChange}
                    />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={onNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
}

export default AddNewPerson;
