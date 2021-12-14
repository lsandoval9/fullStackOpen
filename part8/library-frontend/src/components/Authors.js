import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import queries from "../graphql/queries";
import UpdateAuthor from "./UpdateAuthor";

const Authors = (props) => {
    
    const [authors, setAuthors] = useState([]);

    const result = useQuery(queries.GET_AUTHORS)

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        }
    }, [result])

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <UpdateAuthor authors={authors}/>
        </div>
    );
};

export default Authors;
