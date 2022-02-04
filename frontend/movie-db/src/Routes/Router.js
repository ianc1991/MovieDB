import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// Components
import Home from '../components/Home/Home';
import Loading from '../components/Loading/Loading';
import Login from '../components/Login/Login';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import MovieList from '../components/MovieList/MovieList';

const Router = () => {

  const {loggedIn} = useContext(AuthContext);

  return (
      <div>
        <Routes>
            <Route path="/loading" element={<Loading />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/moviedetails" element={<MovieDetails />} />
            <Route path="/movielist" element={<MovieList />} />
            {loggedIn === false && (
              <>
                <Route path ="/login" element={<Login />} />
              </>
            )}
        </Routes>
      </div>
  )
}

export default Router;
