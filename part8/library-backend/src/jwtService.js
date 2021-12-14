//import { UserInputEror } from "apollo-server-errors";
const UserInputError = require("apollo-server-errors").UserInputError;
const jwt = require("jsonwebtoken")
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (user) => {
    if (!user.username || !user.id) {
        throw new UserInputError("Invalid user", { ...user });
    }
    return jwt.sign(user, SECRET_KEY);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.dir(error);
        return null;
    }
};

const jwtService = {
    verifyToken,
    signToken,
};

module.exports = jwtService;