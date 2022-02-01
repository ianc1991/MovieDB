import http from './httpAuth';

class AuthService {
    async login(email, password) {
        const response = await http.post('/login', {
            email,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
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