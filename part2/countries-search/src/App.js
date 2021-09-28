import axios from "axios";
import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const SearchBar = (props) => {
    const { filterCountries } = props;

    const [filterText, setFilterText] = useState("");

    const [weatherData, setWeatherData] = useState({});

    const filter = (event) => {

        filterCountries(event.target.value)

    }

    return (
        <div>
            <h2>Find countries</h2>
            <input type="text" onChange={filter} />
        </div>
    );
};


const WeatherData = (props) => {

    const { countryCapital } = props;

    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {

        console.log(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryCapital}`)
        
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryCapital}`)

        .then(response => {console.log(weatherData);setWeatherData(response.data)} )
        
    }, [])

    return (
        <>
            <h3>Weather in {countryCapital}</h3>

            <p>Temperature: {weatherData?.temperature} Celsius</p>

            <img src={weatherData?.current?.weather_icons[0]} alt="" />
            <p>Description:  {weatherData?.current?.weather_descriptions}</p>
            <p>Wind: {weatherData?.current?.wind_speed} mph, 
             Direction:  {weatherData?.current?.wind_dir}</p>
        </>
    )

}

function App() {
    const [countries, setCountries] = useState([]);

    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v2/all")

            

            .then((response) => setCountries(response.data));
    }, []);

    const filterCountries = (countryName) => {

        if (!countryName || countryName.length === 0) {
            setFilteredCountries([]);
        } else {
            let filteredCountries = countries.filter((country) => {
                return country.name.toLowerCase().includes(countryName);
            });

            if (filterCountries && filterCountries.length > 0) {
                setFilteredCountries(filteredCountries);
            } else {
                setFilteredCountries([]);
            }

            
        }
    };

    const showCountry = (countryName) => {

        filterCountries(countryName.toLowerCase())

    }

   

    const renderData = () => {
        if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
            return (
                <ul>
                    {filteredCountries.map((country) => {
                        return <>

                            <li key={country.alpha3Code}>
                                {country.name}
                                {" "}<button onClick={() => showCountry(country.name)}>Show</button>
                            </li>
                            
                        </>;
                    })}
                </ul>
            );
        } else if (filteredCountries.length === 1) {
            let country = filteredCountries[0];

            return (
                <>
                    <h1>{country.name}</h1>

                    <p>Capital(s): {country.capital}</p>

                    <p>Population: {country.population}</p>

                    <h3>Language(s): </h3>

                    <ul>
                        {country.languages.map((language) => {
                            return <li key={language.name}>{language.name}</li>;
                        })}
                    </ul>

                    <h3>Flag</h3>

                    <img src={country.flags[1]} alt={country.name + " flag"} />

                    {filteredCountries.length === 1 && <WeatherData countryCapital={country.capital}/>}
                </>
            );
        } else if ((filteredCountries.length === 0) || !filteredCountries) {
            return <p>Not matches with that filter</p>;
        } else {
            return <h3>Too many matches, specify another filter</h3>;
        }
    };

    return (
        <div className="App">
            <SearchBar
                filterCountries={filterCountries}
            />

            {renderData()}
        </div>
    );
}

export default App;
