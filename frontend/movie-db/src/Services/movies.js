import http from './httpCommon';

class MovieDataService {
    // Get 5 newest movies
    getNew() {
        return http.get('/');
    }

    getMovieDetailsById(id) {
        return http.get(`/${id}`)
    }
}

export default new MovieDataService();