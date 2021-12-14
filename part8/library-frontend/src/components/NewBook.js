import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import queries from "../graphql/queries";

const NewBook = (props) => {

    const {show, notify } = props;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [createBook] = useMutation(queries.ADD_NEW_BOOK, {
        onError: (error) => {
            console.dir(error);
        },
        refetchQueries: [ queries.GET_BOOKS_BY_GENRE_OR_AUTHOR, queries.GET_BOOKS
        ],
        awaitRefetchQueries: true
    });

    const submit = async (event) => {
        event.preventDefault();

        if (!title || !author || !published) {
            notify("title, author and published date are required!", true);
            return;
        }


        const newBook = {
                title,
                author,
                published: parseInt(published),
                genres,
            };
    
            createBook({ variables: newBook });
    
            setTitle("");
            setPublished("");
            setAuthor("");
            setGenres([]);
            setGenre("");
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    if (!show) {
        return null;
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
