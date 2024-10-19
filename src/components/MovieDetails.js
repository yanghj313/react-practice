import React from 'react';
import '../css/MovieDetails.css';


const MovieDetails = ({ movie }) => {
  if (!movie) return <div class="null_img"><p>Select Movie!<br/>Click!</p></div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
    </div>
  );
};

export default MovieDetails;