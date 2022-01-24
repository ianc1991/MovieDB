import './movieList.css'
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';
import { useNavigate } from 'react-router-dom';
import noImageAvailablePicture from '../../assets/noImage.png'

 

const MovieList = ({searchText}) => {
    // Get search parameter from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchParam = urlParams.get('s');

    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();

    // Get movie list and set it to 'movieList' state.
    useEffect(() => {
        const retrieveMovieListBySearch = () => {
            console.log('retrieveMovieListBySearch() running')
            movieDataSrv.getMoviesBySearchText(searchParam)
                .then(response => {
                    setMovieList(response.data);
                    console.log('Search complete');
                })
                .catch(e => {
                    console.log(e);
                });
        }

        const retrieveNewMovies = () => {
            movieDataSrv.getNew()
                .then(response => {
                    setMovieList(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        
        if(searchParam != null){
            console.log('searching with ' + searchParam)
            retrieveMovieListBySearch();
        } else {
            console.log('no search param')
            retrieveNewMovies();
        }
            
    }, [searchParam]); // Dependency array. useEffect() will run when variable changes.

    // If image 404
    const handleImgError = e => {
        e.target.src = noImageAvailablePicture
    }

  return (
    <div className='mainContainer'>
        <table className="table movieListTable table-dark table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Release Year</th>
                <th scope="col">Media Type</th>
                </tr>
            </thead>
            <tbody className='movieListTableBody'>
                {
                    movieList.map((movie, i) => (
                        <tr className='movieListTableRow' key={i} onClick={() => navigate(`/moviedetails?id=${movie._id}`)}>
                            <th scope="row">{i + 1}</th>
                            <td><div className='imageTitleContainer'><img className='moviePoster' src={movie.poster} onError={handleImgError} alt='Movie Poster'></img> {movie.title}</div></td>
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
