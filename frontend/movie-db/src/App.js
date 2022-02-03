import './App.css';
import { Route, Routes } from 'react-router-dom';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import Loading from './components/Loading/Loading';
import Login from './components/Login/Login';

import axios from 'axios';

// TODO - CSS on repeat elements/classes affecting all elements and classes.
//        Need to install CSS Modules or something similar.

// Allows cookies to be set in browser but isn't working. Settings are set in the service.
//axios.defaults.withCredentials = true;

function App() {

  return (
    <div>
      <header>
        <Navbar />
      </header>
        <Routes>
          <Route path="/loading" element={<Loading />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path ="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
