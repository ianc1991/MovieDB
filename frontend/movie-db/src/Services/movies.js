import http from './httpCommon';

class MovieDataService {
    // Get 5 newest movies
    getNew() {
        return http.get('/');
    }

    // Get by Id
    getMovieDetailsById(id) {
        return http.get(`/${id}`)
    }

    // Gey by search text
    getMoviesBySearchText(searchText) {
        return http.get(`/allmovies/${searchText}`)
    }
}

export default new MovieDataService();