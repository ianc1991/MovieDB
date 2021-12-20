const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);