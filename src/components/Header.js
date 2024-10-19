import { Component } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",  // 검색어 상태 관리
    };
  }

  // 검색어 입력 시 상태 업데이트
  titleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  // 검색 실행
  searchMovie = () => {
    const { title } = this.state;
    if (title.trim()) {  // 검색어가 비어있는지 확인
      window.location.href = `/search?title=${title}&ie=utf8`;
    } else {
      alert("Please enter your search term");  // 검색어가 없을 경우 경고 메시지 표시
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();  // 폼이 제출되지 않도록 기본 동작 방지
      this.searchMovie();
    }
  };

  // 홈으로 이동
  moveHome = () => {
    window.location.href = "/";
  };

  // 프로필로 이동
  moveProfile = () => {
    window.location.href = "/profile";
  };

  // 게시판으로 이동
  moveBoardList = () => {
    window.location.href = "/main";
  };

  // 영화 목록으로 이동
  moveMovieMain = () => {
    window.location.href = "/moviemain";
  };

  render() {
    return (
      <div id="header">
        <div id="inner_wrap">
          <ul className="menu">
            <li><a href="#this" onClick={this.moveHome}>Home</a></li>
            <li><a href="#this" onClick={this.moveProfile}>Profile</a></li>
            <li><a href="#this" onClick={this.moveBoardList}>Board</a></li>
            <li><a href="#this" onClick={this.moveMovieMain}>MovieList</a></li>
          </ul>
          <div id="search_input">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <button type="button" className="search-button" onClick={this.searchMovie}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input 
                type="text" 
                className="search-input" 
                placeholder="search..." 
                onChange={this.titleChange}
                onKeyDown={this.handleKeyDown}  // onKeyDown으로 변경
                value={this.state.title}  // 입력된 값 유지
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
