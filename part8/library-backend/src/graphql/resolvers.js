const { UserInputError, AuthenticationError } = require("apollo-server-errors");
const jwtService = require("../jwtService");
const Author = require("../models/Author");
const Book = require("../models/Book");
const UserSchema = require("../models/UserSchema");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const hardcodedPassword = "fullStackOpen is awesome";

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, { author, genre }) => {
            try {
                let books = await Book.aggregate([
                    {
                        $lookup: {
                            from: Author.collection.name,
                            localField: "author",
                            foreignField: "_id",
                            as: "author",
                        },
                    },
                    { $unwind: "$author" },
                ]);

                if (author) {
                    books = books.filter((book) => book.author.name == author);
                    //books({"author.name": author})

                    //books = await books.find({"author.name": author})
                }

                if (genre) {
                    books = books.filter((book) => book.genres.includes(genre));
                    //books.find({genres: genre});
                }

                books.map((book) => (book.id = book._id));

                return books;
            } catch (error) {
                console.dir(error);
                throw new UserInputError(error.message, {
                    args: { author, genre },
                });
            }
        },
        allAuthors: async () => {
            try {
                const authors = await Author.find({});

                console.log("allAuthors.find")

                return authors;
            } catch (error) {
                console.dir(error);
                throw new UserInputError(error.message);
            }
        },

        me: (root, args, context) => {
            return context.currentUser;
        },
    },

    Mutation: {
        addBook: async (
            root,
            { title, published, author, genres },
            context
        ) => {
            try {
                if (!context.currentUser) {
                    throw new AuthenticationError("Not authenticated");
                }

                const newBook = { title, published, author: null, genres };

                let resultBook;

                const repeatedAuthor = await Author.findOne({ name: author });

                if (repeatedAuthor) {
                    newBook.author = repeatedAuthor.id;

                    resultBook = await Book.create(newBook);

                    const result = await Author.findByIdAndUpdate(repeatedAuthor.id, {
                        $inc: {bookCount: 1}
                    });

                    console.log(result)

                } else {
                    const newAuthor = await Author.create({ name: author, bookCount: 1 });

                    newBook.author = newAuthor.id;

                    resultBook = await Book.create(newBook);
                }

                // const resultBook = await Book.create(newBook);

                pubsub.publish("BOOK_ADDED", { bookAdded: resultBook });

                return resultBook;
            } catch (error) {
                console.dir(error);
                throw new UserInputError(error.message, {
                    args: { title, published, author, genres },
                });
            }
        },

        editAuthor: async (root, { name, setBornTo }, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("Not authenticated");
            }

            try {
                const updatedAuthor = await Author.updateOne(
                    { name: name },
                    { $set: { born: setBornTo } }
                );

                return { name, born: setBornTo };
            } catch (error) {
                console.dir(error);
                throw new UserInputError(error.message, {
                    args: { name, setBornTo },
                });
            }
        },

        createUser: (root, args) => {
            const { username, favoriteGenre } = args;

            try {
                return UserSchema.create({
                    username,
                    favoriteGenre,
                    password: hardcodedPassword,
                });
            } catch (error) {
                console.dir(error);
                throw new UserInputError(error.message, args);
            }
        },

        login: async (root, args) => {
            const { username, password } = args;

            const loggedUser = await UserSchema.findOne({ username, password });

            if (loggedUser) {
                const jwtToken = jwtService.signToken({
                    username,
                    id: loggedUser.id,
                });

                return { value: jwtToken };
            }

            return null;
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => {
                try {
                    return pubsub.asyncIterator(["BOOK_ADDED"]);
                } catch (error) {
                    console.dir(error);
                }
            },
        },
    },

    Book: {
        author: async (root) => {
            const author = await Author.findById(root.author);

            return author;
        },
    },
};

module.exports = resolvers;
