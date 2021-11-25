import axios from "axios";
import { useEffect, useState } from "react";


const useResource = (baseUrl) => {

    const [resources, setResources] = useState([]);

    useEffect(() => {
        
        (async () => {

            await getResources();

            
        })()
        
    }, [])


    const getResources = async () => {

        const result = await axios.get(baseUrl);

        setResources(result.data)

    }

    const create = async (resource) => {
        
        const result = await axios.post(baseUrl, resource);

        await getResources()

        return result;

    };

    const service = {
        create,
    };

    return [resources, service];
};


export default useResource;