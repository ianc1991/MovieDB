import http from './httpAuth';

class AuthService {
    login({email, password}) {
        return http.post('/login', {
            email,
            password
        },
        {
            withCredentials: true
        });
    }

    register({name, email, password}) {
        return http.post('/register', {
            name,
            email,
            password
        },
        {
            // To store cookie in browser
            withCredentials: true
        });
    }

    logout(){
        return http.get('/logout', {
            withCredentials: true
        })
    }

    // Check if logged in
    loggedIn(){
        return http.get('/loggedIn', {
            withCredentials: true,
        });
    }
}

export default new AuthService();