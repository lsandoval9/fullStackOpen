import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import queries from "../graphql/queries";

function UpdateAuthor({ authors }) {
    const [updateAuthor] = useMutation(queries.UPDATE_AUTHOR, {
        refetchQueries: [{ query: queries.GET_AUTHORS }],
        onError: (error) => console.dir(error),
    });

    const [author, setAuthor] = useState("");

    const submit = (event) => {
        event.preventDefault();

        const updatedAuthor = {
            variables: {
                name: author,
                setBornTo: parseInt(event.target.born.value),
            },
        };

        console.log(updatedAuthor);

        updateAuthor(updatedAuthor);
    };

    const changeAuthor = (event) => {

        setAuthor(event.target.value);

    }

    if (!authors) {
        return null;
    }

    return (
        <form onSubmit={submit}>
            <h2>Set birthyear</h2>
            <label htmlFor="author">Update author:</label>
            <select value={author} onChange={changeAuthor}>
                {authors.map((author) => (
                    <option key={author.name} value={author.name}>{author.name}</option>
                ))}
            </select>
            <br />
            <label htmlFor="born">born:</label>
            <input name="born" type="number" />
            <br />
            <br />
            <input type="submit" value="update author" />
        </form>
    );
}

export default UpdateAuthor;
