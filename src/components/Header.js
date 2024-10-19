import { Component } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  titleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      title: e.target.value,
    });
  };

  searchMovie = () => {
    const { title } = this.state;
    window.location.href = `/search?title=${title}&ie=utf8`;
  };

  moveHome = () => {
    window.location.href = "/";
  };

  moveProfile = () => {
    window.location.href = "/profile";
  };

  moveBoardList = () => {
    window.location.href = "/main";
  };

  moveMovieMain = () => {
    window.location.href = "/moviemain";
  };

  render() {
    return (
      <div id="header">
        <div id="inner_wrap">
        <ul class="menu">
          <li> <a href="#this" onClick={this.moveHome}>홈</a></li>
          <li><a href="#this" onClick={this.moveProfile}>프로필</a></li>
          <li><a href="#this" onClick={this.moveBoardList}>게시판</a></li>
          <li><a href="#this" onClick={this.moveMovieMain}>영화목록</a></li>
        </ul>
        <div id="search_input">
        <form class="search-form">
        <button type="button" class="search-button" onClick={this.searchMovie}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        <input type="text" class="search-input" placeholder="search..." onChange={this.titleChange} />
       </form>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
