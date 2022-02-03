import './login.css'
import AuthService from '../../Services/Users/auth';
import React from 'react';
import Register from '../Register/Register';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
        const loginData = {
          email,
          password
        };

        await AuthService.login(loginData);

    } catch(e) {
        console.error(e);
      }
  }
  
  return (
      <div className='loginScreenContainer'>
        <div className='loginFormContainer bg-dark'>
          <h1>Login</h1>
          <form 
            className='formContainer' 
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
