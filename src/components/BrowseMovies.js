import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/BrowseMovies.css';

const BrowseMovies = () => {
  const [movies, setMovies] = useState([]);  // 영화 목록 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [searchTerm, setSearchTerm] = useState('');  // 검색어 상태
  const [genre, setGenre] = useState('');  // 장르 필터
  const [sortOption, setSortOption] = useState('');  // 정렬 옵션
  const [year, setYear] = useState('');  // 연도 필터

  // 영화 데이터를 API에서 가져오기
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
        params: {
          query_term: searchTerm,
          genre: genre,
          sort_by: sortOption,
          year: year,
        }
      });
      setMovies(response.data.data.movies || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, genre, sortOption, year]);

  // 검색어 입력 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 장르 선택 처리
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  // 정렬 옵션 처리
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // 연도 필터 처리
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="browse-movies">
      <h1>Browse Movies</h1>

      {/* 검색 입력 */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* 필터 옵션 */}
      <div className="filters">
        <select value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          {/* 원하는 장르 추가 */}
        </select>

        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="rating">Rating</option>
          <option value="year">Year</option>
          <option value="download_count">Popularity</option>
        </select>

        <input 
          type="number" 
          placeholder="Year" 
          value={year}
          onChange={handleYearChange}
        />
      </div>

      {/* 영화 목록 */}
      <div className="movie-list">
        {loading ? (
          <p>Loading movies...</p>
        ) : movies.length > 0 ? (
          <div className="movies">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.medium_cover_image} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.year} - Rating: {movie.rating}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default BrowseMovies;
