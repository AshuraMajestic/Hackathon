const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const POST = new mongoose.model("Post", postSchema);

module.exports = POST;