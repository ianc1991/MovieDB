import './App.css';
import { Route, Routes } from 'react-router-dom';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {
  return (
    <div>
      <header>
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
