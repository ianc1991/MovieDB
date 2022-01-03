import './App.css';
// Components
import Navbar from './components/Navbar';
import Carousel from './components/Carousel/Carousel';


// TODO - Make pictures on Carousel same size. Possibly what is causing the arrows to spread out while sliding?
// TODO - Link newest movies to Carousel

function App() {
  return (
    <div className="appC">
      <header className="headerC">
        <Navbar />
      </header>
        <Carousel />
    </div>
  );
}

export default App;
