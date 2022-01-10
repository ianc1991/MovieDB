const mongodb = require("mongodb");
const mongoose = require('mongoose');

const ObjectId = mongodb.ObjectId;

let movies;

// None of this works and may not be necessary

class MoviesDAO {
    static async injectDB(){
        if (movies) {
            return
        }
        try {
            movies = await conn.db('sample_mflix').collection('movies')
        } catch(e) {
            console.error(
                `Unable to establish a collection handle in MoviesDAO: ${e}`,
            )
        }
    }
}

module.exports = MoviesDAO;