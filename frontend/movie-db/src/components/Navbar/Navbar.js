import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = (props) => {
    
    const navigate = useNavigate();
    // For searches
    const [text, setText] = useState(null);
    const handleSearchText = e => {
        setText(e.target.value);
    }

    return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">MovieDB</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">New Releases</a>
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
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Login</a>
                            </li>
                        </ul>
                        <span className="d-flex">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search"
                                onChange={handleSearchText}
                            />
                            <button className="btn btn-outline-success" 
                                onClick={() => {props.passText(text); navigate('/movielist')}}
                                >
                                    Search
                                </button>
                        </span>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
