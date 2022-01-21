import './movieList.css'
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';

// TODO - CSS on direct elements like 'img' was affecting home page css???? 

const MovieList = ({searchText}) => {
    const [movieList, setMovieList] = useState([]);

    // Get movie list and set it to 'movieList' state.
    useEffect(() => {
        // If there is search text
        const retrieveMovieListBySearch = () => {
            console.log('retrieveMovieListBySearch() running')
            movieDataSrv.getMoviesBySearchText(searchText)
                .then(response => {
                    setMovieList(response.data);
                    console.log('Search complete');
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if(searchText != null){
            retrieveMovieListBySearch();
        }
            
    }, [searchText]); // Dependency array. useEffect() will run when 'searchText' changes.

  return (
    <div className='mainContainer'>
        <table className="table table-dark table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Release Year</th>
                <th scope="col">Media Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    movieList.map((movie, i) => (
                        <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td><div className='imageTitleContainer'><img className='moviePoster' src={movie.poster} alt='Movie Poster'></img> {movie.title}</div></td>
                        <td>{movie.year}</td>
                        <td>{movie.type}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
export default MovieList;
