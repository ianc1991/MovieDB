const Movies = require("../models/Movies");



// All movies
const getAllMovies = async (req, res) => {
    allMovies = await Movies.find();
    if (!allMovies) return res.status(204).json({'message': 'No movies found.'});
    return res.json(allMovies);
}

// Movie by Id
const getMovieById = async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(204).json({'message': 'No movie found.'});
    res.json(movie);
}

// 5 most recent releases
const newMovies = async (req, res) => {
    const sortedMoviesByDate = await Movies.find({poster:{$exists:true}}).sort({released: -1}).limit(5);
    res.json(sortedMoviesByDate);
}


module.exports = {
    getAllMovies,
    getMovieById,
    newMovies
}



