import React, { useState } from 'react';
import MovieDetails from './MovieDetails.js';
import MovieLists from './MovieLists';
import '../css/MovieMain.css';

const MovieMain = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div class="contents">
    <div style={{ display: 'flex' }} class="list_mov">
      <div  class="null_list mov_list">
        <MovieLists onSelectMovie={setSelectedMovie} />
      </div>
      <div class="null_movie mov_list">
        <MovieDetails movie={selectedMovie} />
      </div>
    </div>
    </div>
  );
};

export default MovieMain;