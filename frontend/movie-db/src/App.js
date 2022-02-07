import './App.css';
// Components
import Navbar from './components/Navbar/Navbar';
import Router from './Routes/Router'

import { AuthContextProvider } from './context/AuthContext';

// TODO - CSS on repeat elements/classes affecting all elements and classes.
//        Need to install CSS Modules or something similar.

function App() {

  return (
    <div>
    <AuthContextProvider>
      <Navbar />
      <Router />
    </AuthContextProvider>
    </div>
  );
}

export default App;
