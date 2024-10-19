import '../css/Movie.css';

function Movie(props){
    return(
        <div id='movie'>
            <img src={props.cover}/>
            <div>{props.title}</div>
        </div>
    )
}

export default Movie;