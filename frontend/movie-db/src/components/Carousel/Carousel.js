import comedyGenre from '../../assets/ComedyGenreCropped.jpg';
import actionGenre from '../../assets/ActionGenreCropped.jpg'
import glowSign from '../../assets/NewReleases.png';
import './carousel.css';
import movieDataSrv from '../../Services/movies';
import { useState, useEffect } from "react";





const Carousel = () => {

    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        retrieveNewMovies();
    }, []);

    const retrieveNewMovies = () => {
        movieDataSrv.getNew()
            .then(response => {
                console.log(response.data);
                setNewMovies(response.data);
            })
            .catch(e => {
                console.log(e);
            });
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
                            <div key={i} className={i === 0 ? "carousel-item active" : "carousel-item"} >
                                <img className="d-block w-100" src={movie.poster} alt="Movie Slide"  />
                            </div>
                        )
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
