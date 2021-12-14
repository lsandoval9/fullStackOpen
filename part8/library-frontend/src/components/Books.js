import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import queries from "../graphql/queries";
import GenreFilter from "./GenreFilter";

const Books = (props) => {

    const [books, setBooks] = useState([]);

    const [filteredBooks, setFilteredBooks] = useState([]);

    const [getAllBooks, {data }] = useLazyQuery(queries.GET_BOOKS)


    useEffect(() => {
        getAllBooks();
    }, [getAllBooks])

    useEffect(() => {
        
        if (data?.allBooks) {
            setBooks(data.allBooks);
            setFilteredBooks(data.allBooks);
        }
        
    }, [data])





    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author?.name?? "Unknown"}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <GenreFilter books={books} setFilteredBooks={setFilteredBooks}/>
            </div>
        </div>
    );
};

export default Books;
