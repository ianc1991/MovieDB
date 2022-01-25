import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './loading.css'

const Loading = () => {

  return (
    <div className="loadingContainer">
        <h1 className='loadingTitle'>Loading...<FontAwesomeIcon icon={faSpinner} pulse /></h1>
    </div>
  )
};

export default Loading;
