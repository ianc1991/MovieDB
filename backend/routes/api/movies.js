const express = require ("express");
const router = express.Router();
const Movies = require("../../models/Movies");
const moviesCtrl = require("../../controllers/moviesController");


// Used for searching all movies - defaults to prevent crashing server when /:searchtext is empty 
router.route('/allmovies').get(moviesCtrl.newMovies);

// Search all movies
router.route('/allmovies/:searchtext').get(moviesCtrl.getMovieBySearchText);

// New Movies
router.route('/').get(moviesCtrl.newMovies);

// Get movie by id
router.route('/:id').get(moviesCtrl.getMovieById);

module.exports = router;