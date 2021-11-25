const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: Array,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = model("Blog", blogSchema);

module.exports = Blog;
