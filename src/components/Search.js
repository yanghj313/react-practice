import { Component } from 'react';
import '../css/Search.css';
import queryString from 'query-string';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      errorMessage: '',  // 에러 메시지 상태 추가
      searchTerm: ''     // 검색어 상태 추가
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    const queryObj = queryString.parse(window.location.search);  // 쿼리 파라미터 파싱
    console.log(queryObj);  // 파싱된 쿼리 확인
    console.log(queryObj.title);  // title 값 확인

    if (queryObj.title) {
      this.setState({ searchTerm: queryObj.title });  // 검색어 저장
      this.getMovieData(queryObj.title);  // title 값으로 API 호출
    } else {
      this.setState({ errorMessage: 'No search terms were provided' });
    }
  }

  getMovieData = (title) => {
    console.log('getMovieData', title);
    
    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${title}`)
      .then(res => {
        console.log(res);
        const movies = res.data.data.movies;
        if (movies) {
          this.setState({
            movieList: movies,
            errorMessage: '',  // 검색 성공 시 에러 메시지 초기화
          });
        } else {
          this.setState({ errorMessage: 'There are no search results' });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ errorMessage: 'Failed to load movie data' });
      });
  }

  render() {
    const { movieList, errorMessage, searchTerm } = this.state;

    return (
      <div id='search' className='contents'>
        {errorMessage ? (
          <p>{errorMessage}</p>  // 에러 메시지 출력
        ) : (
          <div className="movie-results">
            {/* 검색 결과 개수와 검색어 표시 */}
            {movieList.length > 0 && (
              <p>
                Your search for "<strong>{searchTerm}</strong>" returned {movieList.length} result{movieList.length > 1 ? 's' : ''}.
              </p>
            )}

            {/* 검색 결과 목록 */}
            {movieList.length > 0 ? (
              movieList.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.medium_cover_image} alt={movie.title} className="movie-poster" />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Genres: {movie.genres.join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="error">No movies found.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
