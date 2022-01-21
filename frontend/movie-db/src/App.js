import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <header>
        <Navbar passText={text => setSearchText(text)} />
      </header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/moviedetails" element={<MovieDetails />} />
        </Routes>
        <button onClick={()=>console.log(searchText)}>SHOW SEARCH STATE</button>
    </div>
  );
}

export default App;
