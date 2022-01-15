import './movieDetails.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';

const MovieDetails = () => {
    // Get id from URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const [movieDetails, setMovieDetails] = useState([]);
    // TODO - For some reason, calling 'movieDetails.genres.map()' in the '.genreContainer' gets a type undefined. Probably has something to do with being an array. 
        // Weirdly, if 'movieDetails.genres.map()' is saved and the page is already open, React correctly places the genres there without refreshing. Refreshing the page or trying to open the link afterwards will result in undefined error.
        // 'genres' useState is a workaround until a fix is found.
    const [genres, setMovieGenre] = useState([]);
    useEffect(() => {
        retrieveMovieDetails();
        // The comment below disables missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveMovieDetails = () => {
        movieDataSrv.getMovieDetailsById(id)
            .then(response => {
                setMovieDetails(response.data);
                setMovieGenre(response.data.genres);
            })
            .catch(e => {
                console.log('Error at retrieveMovieDetails(): ' + e);
            });
    };

    // TODO - handle movies with no rating
    // TODO - Link genre buttons to somewhere

    return (
        <div className='mainContainer'>
            <div className='titleContainer'>
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.year} | {movieDetails.rated} | {movieDetails.runtime}m</p>
            </div>
            <div className='posterContainer'>
                <img src={movieDetails.poster} className='poster' alt='Movie Poster'></img>

            </div>
            <div className='genreContainer'>
                {genres.map((genre, i) => (
                    <div key={i} className='genreMapContainer'>
                        <button type="button" className="btn btn-outline-info genreButton">{genre}</button>
                    </div>
                ))}
            </div>
            <p className='fullPlot'>{movieDetails.fullplot}</p>
        </div>
    )
}

export default MovieDetails
