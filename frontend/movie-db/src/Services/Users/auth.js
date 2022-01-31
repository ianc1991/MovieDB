import http from './httpAuth';

class AuthService {
    login(email, password) {
        return http.post('/login', {
            email,
            password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(name, email, password) {
        return http.post('/register', {
            name,
            email,
            password
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();