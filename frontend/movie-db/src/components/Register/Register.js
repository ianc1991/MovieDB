import { useState } from "react";
import AuthService from "../../Services/Users/auth";
// TODO - Validation etc.
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    async function register(e) {
        e.preventDefault();

        try {
            const registerData = {
                name,
                email, 
                password
            };

            await AuthService.register(registerData);

        } catch(e) {
            console.error(e);
        }
    }

  return (
      <div>
          <h1>Register a new account</h1>
          <form onSubmit={register}>
            <input type='text' placeholder='Name'
                onChange={(e) => setName(e.target.value)}
            />
            <input type='email' placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type='password' paceholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type='password' paceholder='Verify your password'
                onChange={(e) => setPasswordVerify(e.target.value)}
            />
            <button type='submit'>Register</button>
          </form>
      </div>
  )
};

export default Register;