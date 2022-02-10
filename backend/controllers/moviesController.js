const Comments = require("../models/Comments");
const mongoose = require('mongoose');
const User = require('../models/Users');
const Movies = require("../models/Movies");
const jwt_decode = require('jwt-decode')


// All movies
const getAllMovies = async (req, res) => {
    const allMovies = await Movies.find().limit(10);
    if (!allMovies) return res.status(204).json({'message': 'No movies found.'});
    return res.json(allMovies);
}

// Movie by search
const getMovieBySearchText = async (req, res) => {
    const searchText = req.params.searchtext;
    const searchedMovies = await Movies.find({ $text: { $search: searchText } }).limit(10).sort({ score: { $meta: "textScore" } });
    if (!searchedMovies) return res.status(204).json({'message': 'No movie found.'});
    res.json(searchedMovies);
}

// Movie by Id
const getMovieById = async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(204).json({'message': 'No movie found.'});
    res.json(movie);
}

// 5 most recent releases that have a poster image
const newMovies = async (req, res) => {
    const sortedMoviesByDate = await Movies.find({poster:{$exists:true}}).sort({released: -1}).limit(5);
    res.json(sortedMoviesByDate);
}

// For movie pagination (incomplete)
const nextPage = async (req, res) => {
    console.log(req.params.id);
}

// Get comments
const getComments = async (req, res) => {
    const comments = await Comments.find({movie_id: req.params.id}).sort({date: -1});
    res.json(comments);
}

//Post comments
const postComment = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({'message': 'Unauthorized'});
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);
    const commentToSave = new Comments({
        name: user.name,
        email: user.email,
        text: req.body.text,
        movie_id: req.params.id,
        //movie_id: mongoose.Types.ObjectId(req.params.id),
        date: Date.now()
    });
    console.log(commentToSave);
    return commentToSave.save();
}


module.exports = {
    getAllMovies,
    getMovieById,
    newMovies,
    getMovieBySearchText,
    nextPage,
    getComments,
    postComment
}



