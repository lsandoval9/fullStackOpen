import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
    fragment bookDetails on Book {
        title
        published
        author {
            name
            bookCount
            id
            born
        }
        id
        genres
    }
`;

const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            bookCount
            born
        }
    }
`;

const GET_BOOKS = gql`
    query ($genre: String, $author: String) {
        allBooks (author: $author, genre: $genre) {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

const ADD_NEW_BOOK = gql`
    mutation addNewBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

const UPDATE_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

const GET_USER_INFO = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

const queries = {
    GET_AUTHORS,
    GET_BOOKS,
    ADD_NEW_BOOK,
    UPDATE_AUTHOR,
    LOGIN,
    GET_USER_INFO,
    BOOK_ADDED,
};

export default queries;
