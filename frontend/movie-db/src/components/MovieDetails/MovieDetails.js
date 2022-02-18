import './movieDetails.css';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import movieDataSrv from '../../Services/movies';
import auth from '../../Services/Users/auth';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
//Promise Tracker
import { usePromiseTracker } from 'react-promise-tracker';
import { trackPromise } from 'react-promise-tracker';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
// Assets
import noImageAvailablePicture from '../../assets/noImage.png';

// TODO - Link genre buttons to somewhere and style them better
// TODO - Autoscroll when fullplot is expanded

const MovieDetails = () => {
    // Get id from URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    // Navigate
    const navigate = useNavigate();

    // Promise tracker
    const { promiseInProgress } = usePromiseTracker();

    // Comment and Details states
    const [movieDetails, setMovieDetails] = useState({genres:[], cast:[], directors:[], writers:[], imdb:{}});
    const [movieComments, setMovieComments] = useState([]);

    useEffect(() => {
        retrieveMovieDetails();
        // Below line disables missing dependency warning... Removing dependency array breaks rendering....
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        retrieveMovieComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    // Gets movie details by 'id' and sets it to 'movieDetails'
    const retrieveMovieDetails = () => {
        trackPromise(
            movieDataSrv.getMovieDetailsById(id)
                .then(response => {
                    setMovieDetails(response.data);
                })
                .catch(e => {
                    console.log('Error at retrieveMovieDetails(): ' + e);
            }))
    };

    // Get comments for movie
    const retrieveMovieComments = () => {
        trackPromise(
            movieDataSrv.getMovieComments(id)
                .then(response => {
                    setMovieComments(response.data);
                })
                .catch(e => {
                    console.log('Error at retrieveMovieComments(): ' + e);
                })
        )
    }

    // Paginate comments {
        const [currentPage, setCurrentPage] = useState(1);
        const [commentsPerPage] = useState(5);

        const pageNumberClicked = (pageNumber) => {
            setCurrentPage(pageNumber)
        }

        // Logic for displaying comments
        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        const currentComments = movieComments.slice(indexOfFirstComment, indexOfLastComment);

        // Page element
        // TODO - Figure out how to make this responsive
        const PageNumbersElement = () => { return (
            <Pagination
                activePage={currentPage}
                totalItemsCount={movieComments.length}
                itemsCountPerPage={5}
                onChange={pageNumberClicked}
                // Bootstrap props
                itemClass="page-item"
                linkClass="page-link"
            />
        )}
    // }

    // If image 404
    const handleImgError = e => e.target.src = noImageAvailablePicture;
    
    // For the full plot button toggle
    const [fullPlotToggled, setPlotToggle] = useState(false);
    const toggleFullPlot = () => setPlotToggle(!fullPlotToggled);
    
    // Reads value from AuthContext to check if user is logged in
    const {loggedIn} = useContext(AuthContext);
    
    // Leave comment
    const [userComment, setUserComment] = useState('');
    const leaveComment = async (e) => {
        e.preventDefault();
        if (!loggedIn) return alert('You can only comment if you are logged in');
        const validToken = await auth.loggedIn();
        if (validToken){
            movieDataSrv.postMovieComment(userComment, id);
        } else {
            console.log('Something went wrong when posting comment')
        }
    }

    // Show loading screen if promiseInProgress
    if(promiseInProgress) {
        return <></>
    }

    return (
        <div className='mainContainer'>
            <div className='titleContainer'>
                <h1>{movieDetails.title}</h1>
                <p> 
                    {movieDetails.year !== undefined && movieDetails.year + ' |'}
                    {movieDetails.rated !== undefined && ' ' + movieDetails.rated + ' |'}
                    {movieDetails.runtime !== undefined && ' ' + movieDetails.runtime + 'm'}
                </p>
            </div>
            <div className='posterContainer'>
                <img src={movieDetails.poster || noImageAvailablePicture} className='poster' onError={handleImgError} alt='Movie Poster'></img>
                <div className='ratingAndCardContainer'>
                    <FontAwesomeIcon icon={faImdb} inverse className='fa-5x' />
                    <p><FontAwesomeIcon icon={faStar} inverse /> {movieDetails.imdb.rating}/10 • {movieDetails.imdb.votes} votes</p>
                    <div className="cardDetails bg-secondary">
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
            </div>
            <div className='genreContainer'>
                {movieDetails.genres.map((genre, i) => (
                    <div key={i} className='genreMapContainer'>
                        <button type="button" className="btn btn-secondary genreButton">{genre}</button>
                    </div>
                ))}
            </div>
            <div className="cardPlot text-white bg-dark mb-3">
                <div className="card-header">
                    Plot
                </div>
                <div className="card-body">
                        {
                            fullPlotToggled ? 
                                <p>
                                    {movieDetails.fullplot}
                                </p>
                            :
                                <p>
                                    {movieDetails.plot + ' '} 
                                </p>
                        }
                        <button className="btn btn-outline-success fullPlotButton" onClick={toggleFullPlot}>
                            {fullPlotToggled ? 'Hide full plot' : 'Read full plot'}
                        </button>
                        
                </div>
            </div>
            <div className='movieCommentContainer'>
                <div className='commentBox'>
                    <h1>User Comments <FontAwesomeIcon icon={faCommentDots}/></h1>
                    { loggedIn === true ? (
                        <form className='commentForm' onSubmit={leaveComment}>
                            <textarea 
                                className='commentTextInput'
                                placeholder='Enter your comment here...'
                                type='text' 
                                onChange={(e) => setUserComment(e.target.value)}
                            />
                            <input
                                type='submit'
                                value='Submit Comment' 
                                className="btn btn-outline-success"
                            />
                        </form>
                    )
                    :
                    (
                        <p><a className='loginLink' onClick={() => navigate('/login')}>LOGIN</a> TO POST COMMENTS</p>
                    )}
                    <PageNumbersElement/>
                    { movieComments.length >= 1 ? (
                        currentComments.map((comment)=>(
                            <div key={comment._id} className='commentContainer'>
                                <div className="card text-dark bg-light mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{comment.name}</h5>
                                        <hr></hr>
                                        <p className="card-text commentText">{comment.text}</p>
                                        <hr></hr>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <p className='commentText'>Be the first to comment on this movie!</p>
                    )}
                    <PageNumbersElement/>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
