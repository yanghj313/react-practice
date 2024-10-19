
import {Component} from 'react';
import '../css/Search.css';
import queryString from 'query-string';
import axios from 'axios';
import MovieList from './MovieList.js';

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            movieList:[]
        }
    }

    componentDidMount(){//ready
        console.log('componentDidMount')
        console.log(window.location)
        //location객체 항목이 많다. 뭘 접근할까?
        console.log(window.location.href)
        //http://localhost:3001/search?title=avatar&ie=utf8
        console.log(window.location.search) 
        //?title=avatar&ie=utf8
        const queryObj = queryString.parse(window.location.search)
        console.log(queryObj)//{ie:'utf8',title:'avatar'}
        console.log(queryObj.title)//avatar
        //뽑아낸 검색어를 이용해서 YTS API에 요청
        this.getMovieData(queryObj.title)
    }

    getMovieData=(title)=>{
        console.log('getMovieData')
        console.log(title)
        axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${title}`)
        .then(res => {
            console.log(res)
            console.log(res.data.data.movies)
            this.setState({
                movieList:res.data.data.movies
            })
        })
        .catch(err => {
            console.log(err)
        });
    }

    render(){
        const {movieList}=this.state
        return(
            <div id='search' class="contents">
                <MovieList movieList={movieList}/>
            </div>
        )
    }
}

export default Search;