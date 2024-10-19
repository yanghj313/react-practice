import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MovieLists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

const MovieLists = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
      setMovies(response.data.data.movies);
    };

    fetchMovies();
  }, []);

  return (
    <div id="movie_listwrap">
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => onSelectMovie(movie)}>
            <FontAwesomeIcon icon={faClapperboard} />
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieLists;