const express = require ("express");
const router = express.Router();
const moviesCtrl = require("../../controllers/moviesController");

// Used for searching all movies - defaults to prevent crashing server when /:searchtext is empty 
router.route('/allmovies').get(moviesCtrl.newMovies);

// Search all movies
router.route('/allmovies/:searchtext').get(moviesCtrl.getMovieBySearchText);

// New Movies
router.route('/').get(moviesCtrl.newMovies);

// Get movie by id
router.route('/:id').get(moviesCtrl.getMovieById);

// Get next page of itmes
router.route('/nextpage/:id').get(moviesCtrl.nextPage);



module.exports = router;