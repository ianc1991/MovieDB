import http from './httpCommon';

class MovieDataService {
    // Get all movies
    getAll() {
        return http.get('/allmovies')
    }

    // Get 5 newest movies
    getNew() {
        return http.get('/');
    }

    // Get by Id
    getMovieDetailsById(id) {
        return http.get(`/${id}`)
    }

    // Get by search text
    getMoviesBySearchText(searchText) {
        return http.get(`/allmovies/${searchText}`)
    }

    getNextPage(lastItem) {
        return http.get(`/nextpage/${lastItem}`)
    }
}

export default new MovieDataService();