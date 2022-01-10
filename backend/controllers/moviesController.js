const Movies = require("../models/Movies");


const getAllMovies = async (req, res) => {
    const movies = await Movies.find();
    if (!movies) return res.status(204).json({'message': 'No movies found.'});
    res.json(movies);
}

const getMovieById = async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(204).json({'message': 'No movie found.'});
    res.json(movie);
}



module.exports = {
    getAllMovies,
    getMovieById
}



