import React from "react";

import personService from "../services/persons";

function PersonsList(props) {
    const { filteredPersons, getPersonList, toggleMessage } = props;

    const deleteSelectedPerson = (id, name) => {
        if (window.confirm("Delete person: " + name)) {

            

            console.log(filteredPersons)

            personService.deletePerson(id)
            .then(response => {toggleMessage(`Succesfully deleted ${name}`, false); getPersonList();})
            .catch(error =>  toggleMessage(`${name} is already deleted`, true));

            

            
        }
    };

    return (
        <div>
            {filteredPersons.map((person) => {
                return (
                    <React.Fragment key={person.name}>
                        <div>
                            <span>
                                {person.name} - {person.number}
                            </span>{" "}
                            <button
                                onClick={() =>
                                    deleteSelectedPerson(person.id, person.name)
                                }
                            >
                                delete
                            </button>
                        </div>
                        <br />
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default PersonsList;
