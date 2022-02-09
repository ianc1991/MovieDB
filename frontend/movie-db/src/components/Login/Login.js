import './login.css'
import AuthService from '../../Services/Users/auth';
import React, { useContext } from 'react';
import Register from '../Register/Register';
import { useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if logged in
  const {getLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
        const loginData = {
          email,
          password
        };

        await AuthService.login(loginData);
        await getLoggedIn();
        navigate('/');

    } catch(e) {
        console.error(e);
      }
  }
  
  return (
      <div className='loginScreenContainer'>
        <div className='loginFormContainer bg-dark'>
          <h1>Login</h1>
          <form 
            className='loginFormElement' 
            onSubmit={login}
          >
            <input 
              type='text'
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type='password' 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type='submit'
              value='Login' 
              className="btn btn-outline-success"
            />
          </form>
        </div>
        <Register />
      </div>
    )
}

export default Login;
