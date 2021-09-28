import React from "react";

function SearchBar(props) {
    const { setFilteredPersons, persons } = props;

    const onSearchKeyChange = (event) => {
        if (!event.target.value) {
            setFilteredPersons([...persons]);
            return;
        }

        const filteredPersons = persons.filter((person) => {
            return (
                person.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()) ||
                person.number
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            );
        });

        setFilteredPersons(filteredPersons);
    };

    return (
        <div>
            filter shown with:
            <input type="text" onChange={onSearchKeyChange} />
        </div>
    );
}

export default SearchBar;
