const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    movie_id: {
        type: Schema.Types.ObjectId, ref:'Movies',
        required: true
    }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);