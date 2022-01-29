import './movieList.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';
import { useNavigate } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
//Assets
import noImageAvailablePicture from '../../assets/noImage.png';
import nothingFoundImage from '../../assets/noResultFound.webp';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

 // TODO - Use nothingFoundImage if no results are found for list

const MovieList = () => {
    // Get search parameter from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchParam = urlParams.get('s');

    const navigate = useNavigate();
    
    const [movieList, setMovieList] = useState([]);

    // Get movie list and set it to 'movieList' state.
    useEffect(() => {
        const retrieveMovieListBySearch = () => {
            trackPromise(
                movieDataSrv.getMoviesBySearchText(searchParam)
                    .then(response => {
                        setMovieList(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            )
        }

        const retrieveNewMovies = () => {
            trackPromise(
                movieDataSrv.getNew()
                    .then(response => {
                        setMovieList(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            )
        }
        
        if(searchParam != null){
            retrieveMovieListBySearch();
        } else {
            retrieveNewMovies();
        }
            
    }, [searchParam]); // Dependency array. useEffect() will run when variable changes.



    // If image 404
    const handleImgError = e => {
        e.target.src = noImageAvailablePicture
    }

    // T0DO - Finish this
    // View More button
    const [viewMoreClicked, setViewMoreClicked] = useState(false);

    const handleViewMoreButton = () => {
        setViewMoreClicked(true)
    }

    useEffect(() => {
        if (viewMoreClicked) {
            let lastItem = movieList[movieList.length - 1];
            const retrieveNextPage = () => {
                trackPromise(
                    movieDataSrv.getNextPage(lastItem._id)
                        .then(response => {
                            setMovieList(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        })
                )
            }

            retrieveNextPage();
            setViewMoreClicked(false);
        }
        // TODO - movieList becomes missing dependency if not included? 
    },[viewMoreClicked, movieList]);

    // END OF VIEW MORE BUTTON


  return (
    <div className='mainMovieListContainer'>
        <div className='filterContainer'>

        </div>
        <table className="table movieListTable table-dark table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">IMDb Rating</th>
                <th scope="col">Release Year</th>
                <th scope="col">Media Type</th>
                </tr>
            </thead>
            <tbody className='movieListTableBody'>
                {
                    movieList.map((movie, i) => (
                        <tr className='movieListTableRow' key={i} onClick={() => navigate(`/moviedetails?id=${movie._id}`)}>
                            <th scope="row">{i + 1}</th>
                            <td><div className='imageTitleContainer'><img className='moviePoster' src={movie.poster || noImageAvailablePicture} onError={handleImgError} alt='Movie Poster'></img> {movie.title}</div></td>
                            <td><div className='imageTitleContainer'>
                                <p><FontAwesomeIcon icon={faStar} inverse /> {movie.imdb.rating}</p></div>
                            </td>
                            <td><div className='imageTitleContainer'>{movie.year}</div></td>
                            <td><div className='imageTitleContainer'>{movie.type}</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    )
}
export default MovieList;
