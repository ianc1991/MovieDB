import comedyGenre from '../../assets/ComedyGenreCropped.jpg';
import actionGenre from '../../assets/ActionGenreCropped.jpg'
import glowSign from '../../assets/NewReleases.png';
import './carousel.css';



const Carousel = () => {
    return (
        <div className='container'>
            <img className='glowSign' src={glowSign} alt='New Releases'></img>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={comedyGenre} alt="First slide"  />
                        <div className="carousel-caption d-md-block">
                            <h5>Movie Name</h5>
                            <p>Movie description...</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={actionGenre} alt="Second slide"  />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
