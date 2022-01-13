import http from './httpCommon';

class MovieDataService {
    // Get 5 newest movies
    getNew() {
        return http.get('/');
    }
}

export default new MovieDataService();