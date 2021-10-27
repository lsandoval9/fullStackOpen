const Blog = require("../models/blogSchema");

const ObjectId = require("mongoose").Types.ObjectId;

const jwtService = require("../utils/jwtService");

const jwt = require("jsonwebtoken")

const middleware = require("../utils/middleware");

const blogsRouter = require("express").Router();

const User = require("../models/userSchema");

blogsRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

    return response.json(blogs);
});



blogsRouter.post("/api/blogs", middleware.tokenExtractor, async (request, response) => {


    if (!request.body.title || !request.body.url) {
        return response.status(400).send({error: "title and url are required"});
    }

    let newBlog = request.body;

    if (!request.body.likes) {
        newBlog.likes = 0;
    }

    const decodedToken = request.token;

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    

    const decodedObject = await User.findById(decodedToken.id);

    newBlog = {...newBlog, user: decodedObject.id};

    const createdBlog = await Blog.create(newBlog)

    await User.findByIdAndUpdate(decodedToken.id,
        { $push: { blogs: createdBlog.id } }
    );

    

    const blog = new Blog(newBlog);

    const result = await blog.save();

    return response.status(201).json(result);
});

blogsRouter.delete("/api/blogs/:id", middleware.tokenExtractor, middleware.userExtractor, 
async (request, response, next) => {

    if (!ObjectId.isValid(request.params.id)) {
        return response.status(400).send("Invalid ID");
    }


    try {

        const owner = (await Blog.findById(request.params.id)).user.toString();

        if (owner.toString() !== request.userId) {
            return response.sendStatus(401);
        }

        return response.sendStatus(200);

        const result = await Blog.deleteOne({
            _id: ObjectId(request.params.id),
        });

        if (result.deletedCount === 0) {
            return response
                .status(400)
                .json({ error: "cannot find a blog with that ID" });
        }

        return response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

blogsRouter.put("/api/blogs/:id", async (request, response, next) => {
    if (!ObjectId.isValid(request.params.id)) {
        return response.status(400).send("Invalid ID");
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).send("Title and URL are required");
    }

    if (!request.body.likes) {
        request.body.likes = 0;
    }

    try {
        const result = await Blog.updateOne({
            _id: ObjectId(request.params.id),
            ...request.body
        });

        if (result.modifiedCount === 0) {
            return response
                .status(400)
                .json({ error: "cannot find a blog with that ID" });
        }

        return response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;
