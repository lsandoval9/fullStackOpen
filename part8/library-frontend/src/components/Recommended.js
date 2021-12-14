import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import queries from "../graphql/queries";

function Recommended(props) {
    const { show } = props;

    const [getUserInfo, { data: userResult }] = useLazyQuery(
        queries.GET_USER_INFO
    );

    const [favoriteGenre, setFavorigeGenre] = useState(null);

    const [fetchFavoriteBooks, { data: booksData }] = useLazyQuery(
        queries.GET_BOOKS,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userResult) {
            getBooksByGenre(userResult?.me?.favoriteGenre);
        }
    }, [userResult]);

    const getBooksByGenre = (genre) => {
        fetchFavoriteBooks({ variables: { genre: genre } });

        setFavorigeGenre(genre);

        //setFavorigeGenre(genre);
    };

    if (!show) {
        return null;
    }

    return (
        <div>
            <h4>Favorite genre: {favoriteGenre}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {booksData?.allBooks?.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author?.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Recommended;
