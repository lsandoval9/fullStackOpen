import React from "react";

const Country = ({ country }) => {
    if (!country) {
        return null;
    }

    if (!country.found) {
        return <div>not found...</div>;
    }

    console.log(country)

    return (
        <div>
            <h3>{country.found.name?.common} </h3>
            <div>capital {country.found.capital} </div>
            <div>population {country.found.population}</div>
            <img
                src={country.found.flags.png}
                height="100"
                alt={`flag of ${country.found.name}`}
            />
        </div>
    );
};


export default Country;