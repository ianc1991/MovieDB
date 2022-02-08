import './register.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AuthService from "../../Services/Users/auth";
// TODO - Validation etc.
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();

        if (password !== passwordVerify) return alert('Passwords do not match password');

        try {
            const registerData = {
                name,
                email, 
                password
            };

            await AuthService.register(registerData);
            await getLoggedIn();
            navigate('/');

        } catch(e) {
            console.error(e);
        }
    }

  return (
      <div className="registerScreenContainer">
          <div className="bg-dark registerFormContainer">
            <h1>Register a new account</h1>
            <form onSubmit={register} className='registerFormElement'>
                <input type='text' placeholder='Name' required
                    onChange={(e) => setName(e.target.value)}
                />
                <input type='email' placeholder='Email' required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type='password' placeholder='Password' required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type='password' placeholder='Verify your password' required
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                <button className='btn btn-outline-success' type='submit'>Register</button>
            </form>
          </div>
      </div>
  )
};

export default Register;