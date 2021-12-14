const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    favoriteGenre: {
        type: String
    }
});

const UserSchema = mongoose.model("User", schema);

module.exports = UserSchema;
