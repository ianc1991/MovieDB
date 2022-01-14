import './movieDetails.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';

const MovieDetails = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const [movieDetails, setMovieDetails] = useState([]);

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
                console.log(e);
            });
    };

    return (
        <div>
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster} className='poster'></img>
            <p>{movieDetails.fullplot}</p>
        </div>
    )
}

export default MovieDetails
