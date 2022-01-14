import './App.css';
// Components
import Navbar from './components/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="appC">
      <header className="headerC">
        <Navbar />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/moviedetails" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
