import glowSign from '../../../assets/NewReleases.png';
import './carousel.css';
import movieDataSrv from '../../../Services/movies';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';


// TODO - Pictures resize a tiny bit when changing slides. Mostly fixed, but could be tweaked more.

// Carousel takes the 5 most recent released movies from MongoDB (as long as they also have a poster image). Data is .map() to .carousel-inner

const Carousel = () => {

    const navigate = useNavigate();

    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        retrieveNewMovies();
    }, []);

    const retrieveNewMovies = () => {
        trackPromise(
            movieDataSrv.getNew()
                .then(response => {
                    setNewMovies(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        )
    };

    return (
        <div className='container'>
            <img className='glowSign' src={glowSign} alt='New Releases'></img>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
                </ol>
                <div className="carousel-inner">
                    {newMovies.map((movie, i) => (
                            <div key={movie._id} onClick={()=>navigate(`/moviedetails?id=${movie._id}`) } className={i === 0 ? "carousel-item active" : "carousel-item"} >
                                <img className="d-block w-100" src={movie.poster} alt="Movie poster" />
                            </div>
                        ))}
                </div>
                <button className="carousel-control-prev arrow" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next arrow" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
