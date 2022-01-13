const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: false
    },
    poster: {
        type: String,
        required: false
    },
    released: {
        type: Date,
        required: false
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);