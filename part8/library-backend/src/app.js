const { ApolloServer, gql } = require("apollo-server");
const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const mongoose = require("mongoose");
const { v1: uuid } = require("uuid");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const jwtService = require("./jwtService");
const UserSchema = require("./models/UserSchema");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const hardcodedPassword = "fullStackOpen is awesome";

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            try {
                const decodedToken = jwtService.verifyToken(auth.split(" ")[1]);
                const currentUser = await UserSchema.findById(decodedToken?.id);

                return { currentUser };
            } catch (error) {
                console.dir(error);
                throw new AuthenticationError(error.message, { args: auth });
            }
        }
        return null;
    },
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
        server.listen().then(({ url, subscriptionsUrl }) => {
            console.log(`Server ready at ${url}`);
            console.log(`Subscriptions ready at ${subscriptionsUrl}`)
        });
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });
