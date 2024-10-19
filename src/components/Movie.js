import '../css/Movie.css';

function Movie(props){
    return(
        <div id='movie'>
             <img src={props.cover} alt={props.title} />
            <div>{props.title}</div>
        </div>
    )
}

export default Movie;

