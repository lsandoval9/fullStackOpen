const User = require("../models/userSchema");
const encryptService = require("../utils/encrypt");
const jwtService = require("../utils/jwtService");

const Blog = require("../models/blogSchema");

const ObjectId = require("mongoose").Types.ObjectId;

const usersRouter = require("express").Router();

usersRouter.get("/api/users", async (request, response, next) => {

    try {
        
        const users = await User.find({}).populate("blogs");

        return response.status(200).json(users);

    } catch (error) {
        next(error);
    }


})


// Create user
usersRouter.post("/api/users", async (request, response, next) => {
    const body = request.body;

    if (!body.username || !body.password) {
        return response.status(400).json({error: "username and password are required"})
    }

    if (body.password.length < 3 || body.username.length < 3) {
        return response.status(400)
        .json({error: "username and password must be at least 3 characters long"});
    }

    try {

        console.log(body.password)
        
        const passwordHash = await encryptService.encrypt(body.password);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        });

        const savedUser = await user.save();

        response.status(201).json(savedUser);

    } catch (error) {
        next(error);
    }
});

// Login
usersRouter.post("/api/login", async (request, response, next) => {
    const body = request.body;

    const user = await User.findOne({ username: body.username });

    const passwordCorrect =
        user === null
            ? false
            : await encryptService.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password",
        });
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    console.log(userForToken)

    const token = jwtService.signToken(userForToken);

    console.log(token)

    return response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = usersRouter;
