import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import LogoutBtn from '../Logout/LogoutBtn';
import './navbar.css'


const Navbar = () => {
    
    const navigate = useNavigate();

    // Reads value from AuthContext to check if user is logged in
    const {loggedIn} = useContext(AuthContext);

    // TODO - Replace this with useState
    const handleSearchSubmit = () => {
        navigate('/movielist')
    }

    return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={() => navigate('/')}>MovieDB</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link" aria-current="page" onClick={() => navigate(`/movielist`)}>New Releases</span>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Movies
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/">View All</a></li>
                                    <li><a className="dropdown-item" href="/">Top Rated</a></li>
                                    <li><a className="dropdown-item" href="/">Genres</a></li>
                                </ul>
                            </li>
                            {loggedIn === false && (
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" onClick={() => navigate(`/login`)}>Login</a>
                                </li>
                                )
                                }
                                {loggedIn === true && (
                                    <li className="nav-item">
                                        <LogoutBtn />
                                    </li>
                                )}

                        </ul>
                        <form className="d-flex" 
                            onSubmit={handleSearchSubmit} 
                        >
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                required
                                placeholder="Search" 
                                aria-label="Search"
                                //onChange={handleSearchText}
                                name='s'
                            />
                            <button 
                                className="btn btn-outline-success"
                                type='submit'
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
