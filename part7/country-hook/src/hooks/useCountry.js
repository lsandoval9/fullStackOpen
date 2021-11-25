import axios from "axios";
import { useEffect, useState } from "react";

const useCountry = (countryName) => {
    const [country, setCountry] = useState("");

    const fetchCountry = async () => {
        if (!countryName) {
            setCountry("");
            return;
        }

        try {
            
            const result = (
                await axios.get(
                    `https://restcountries.com/v3.1/name/${countryName}`
                )
            ).data[0];
    
            if (result) {
                setCountry(result);
            } else {
                setCountry(null);
            }

        } catch (error) {
            setCountry(null)
            console.dir(error)
        }
    };

    useEffect(() => {
        fetchCountry();
    }, [countryName]);


    return {found: country};

};

export default useCountry;
