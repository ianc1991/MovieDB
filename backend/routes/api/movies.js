const express = require ("express");
const router = express.Router();

const Movies = require("../../models/Movies");


//Get all movies
router.get('/allmovies', (req, res) => {
    Movies.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(404).json({nomoviesfound: 'No movies found..'}))
})

//Get movie by id
router.get('/:id', (req, res) => {
    Movies.findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(404).json({nomoviefound: 'No movie found..'}))
})

module.exports = router;