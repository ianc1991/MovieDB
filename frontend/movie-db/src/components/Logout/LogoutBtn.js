import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import auth from "../../Services/Users/auth";

const LogoutBtn = () => {

    const {getLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        await auth.logout();
        await getLoggedIn();
        navigate('/');        
    }

  return (
      <button className="btn btn-outline-success" onClick={logout}>
          Logout
      </button>
  )
};

export default LogoutBtn;
