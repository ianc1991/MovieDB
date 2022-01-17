import './movieDetails.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';

const MovieDetails = () => {
    // Get id from URL
    // TODO - Axios should have a way to do this
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    // useState initializes with empty arrays, else the conditional rendering in the HTML will fail
    const [movieDetails, setMovieDetails] = useState({genres: [], cast:[], directors:[], writers:[]});
    useEffect(() => {
        retrieveMovieDetails();
        // The comment below disables missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveMovieDetails = () => {
        movieDataSrv.getMovieDetailsById(id)
            .then(response => {
                setMovieDetails(response.data);
            })
            .catch(e => {
                console.log('Error at retrieveMovieDetails(): ' + e);
            });
    };

    // TODO - handle movies with no rating/release date/runtime
    // TODO - Link genre buttons to somewhere and style them better
    // TODO - Mobile first CSS adjustments

    return (
        <div className='mainContainer'>
            <div className='titleContainer'>
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.year} | {movieDetails.rated} | {movieDetails.runtime}m</p>
            </div>
            <div className='posterContainer'>
                <img src={movieDetails.poster} className='poster' alt='Movie Poster'></img>
                <div className="card bg-secondary">
                    <div className="card-body">
                        <h5 className="card-title">Cast</h5>
                        <p className="card-text">{movieDetails.cast.map((castMember, i) => (
                            // only adds ', ' if not the last item in the array or there isn't only one item
                            i === movieDetails.cast.length - 1 || movieDetails.cast.length === 1 ? castMember : castMember + ', '
                        ))}</p>
                        <hr></hr>
                        <h5 className="card-title">Release Date</h5>
                        <p className="card-text">{movieDetails.released ? movieDetails.released.substring(0, 10): "Not found"}</p>
                        <hr></hr>
                        <h5 className="card-title">Director(s)</h5>
                        <p className="card-text">{movieDetails.directors.map((director, i) => (
                            i === movieDetails.directors.length - 1 || movieDetails.directors.length === 1 ? director : director + ', '
                        ))}</p>
                        <hr></hr>
                        <h5 className="card-title">Writer(s)</h5>
                        <p className="card-text">{movieDetails.writers.map((writer, i) => (
                            i === movieDetails.writers.length - 1 || movieDetails.writers.length === 1 ? writer : writer + ', '
                        ))}</p>
                    </div>
                </div>
            </div>
            <div className='genreContainer'>
                {movieDetails.genres.map((genre, i) => (
                    <div key={i} className='genreMapContainer'>
                        <button type="button" className="btn btn-secondary genreButton">{genre}</button>
                    </div>
                ))}
            </div>
            <p className='fullPlot'>{movieDetails.fullplot}</p>
        </div>
    )
}

export default MovieDetails
