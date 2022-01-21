import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';

function App() {
  const [searchText, setSearchText] = useState(null);

  return (
    <div>
      <header>
        <Navbar passText={text => setSearchText(text)} />
      </header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/movielist" element={<MovieList searchText={searchText}/>} />
        </Routes>
    </div>
  );
}

export default App;
