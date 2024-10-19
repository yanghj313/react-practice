import '../css/MovieList.css';
import Movie from './Movie.js';

function MovieList(props){
    const result = props.movieList.map(
        (data)=>(<Movie cover={data.medium_cover_image}
        title={data.title}/>)
    )
    return(
        <div id='movie-list' class="contents">
            {result}
        </div>
    )
}
export default MovieList;