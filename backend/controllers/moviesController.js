const Comments = require("../models/Comments");
const Movies = require("../models/Movies");


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

const getComments = async (req, res) => {
    const comments = await Comments.find({movie_id: req.params.id}).sort({date: -1});
    res.json(comments);
}


module.exports = {
    getAllMovies,
    getMovieById,
    newMovies,
    getMovieBySearchText,
    nextPage,
    getComments
}



