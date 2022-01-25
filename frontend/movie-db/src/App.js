import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import Loading from './components/Loading/Loading';

// TODO - CSS on repeat elements/classes affecting all elements and classes.
//        Need to install CSS Modules or something similar.

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
        </Routes>
    </div>
  );
}

export default App;
