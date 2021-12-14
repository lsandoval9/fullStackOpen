import React, { useEffect, useState } from 'react'

function GenreFilter(props) {

    const {books, setFilteredBooks} = props;

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const genresSet = new Set();
        books.map(book => book.genres.map(genre => genresSet.add(genre)))
        setGenres([...genresSet]);
    }, [books])

    const filterByGenre = (genre = null) => {
        if (!genre) {
            console.log(books)
            setFilteredBooks(books);
            return;
        }

        const filteredBooks = books.filter(book => {
            return book.genres.includes(genre);
        });
        
        setFilteredBooks(filteredBooks);
    }

    return (
        <div>
            <hr/>
            <h4>Filter by genre</h4>
            {genres.map(genre => (
                <button onClick={() => filterByGenre(genre)} key={genre}>{genre}</button>
            ))}
            <button onClick={() => filterByGenre(null)}>All genres</button>
        </div>
    )
}

export default GenreFilter
