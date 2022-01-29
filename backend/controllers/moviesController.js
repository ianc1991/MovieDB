const Movies = require("../models/Movies");
//const { body, validationResult } = require('express-validator')


// All movies
const getAllMovies = async (req, res) => {
    const allMovies = await Movies.find().limit(10);
    if (!allMovies) return res.status(204).json({'message': 'No movies found.'});
    return res.json(allMovies);
}

// Movie by search
// exports.validate = (method) => {
//     switch (method) {
//         case 'getMovieBySearchText': {
//             return [
//                 body('req.params.searchtext', 'no search text found').trim() > 0,
//             ]
//         }
//     }
// }

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

const nextPage = async (req, res) => {
    console.log(req.params.id);
}


module.exports = {
    getAllMovies,
    getMovieById,
    newMovies,
    getMovieBySearchText,
    nextPage
}



