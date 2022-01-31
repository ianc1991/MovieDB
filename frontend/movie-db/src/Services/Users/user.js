import authHeader from './auth-header';
import http from './httpAuth';

class UserService {
    getPublicContent() {
        return http.get('/all');
    }

    getUserBoard() {
        return http.get('/user', { headers: authHeader() });
    }

    getAdminBoard() {
        return http.get('/admin', { headers: authHeader() });
    }
}

export default new UserService();
