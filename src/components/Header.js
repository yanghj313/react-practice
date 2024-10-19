import React, { Component } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthContext'; // AuthContext 가져오기

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
    const { isLoggedIn, handleLogout } = this.context; // AuthContext에서 로그인 상태와 로그아웃 핸들러 가져오기

    return (
      <div id="header">
        <div id="inner_wrap">
          {/* 메뉴 항목 */}
          <ul className="menu">
            <li><a href="#this" onClick={this.moveHome}>Home</a></li>
            <li><a href="#this" onClick={this.moveProfile}>Profile</a></li>
            <li><a href="#this" onClick={this.moveBoardList}>Board</a></li>
            <li><a href="#this" onClick={this.moveMovieMain}>MovieList</a></li>
            <li><a href="#this" onClick={() => window.location.href = "/browse-movies"}>Browse Movies</a></li> {/* 영화 탐색 메뉴 추가 */}
          </ul>

          {/* 로그인 상태에 따라 다른 버튼을 표시 */}
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                {/* 로그아웃 버튼 */}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                {/* 로그인 및 회원가입 버튼 */}
                <button onClick={() => window.location.href = '/login'}>Login</button>
                <button onClick={() => window.location.href = '/signup'}>Join</button>
              </>
            )}
          </div>

          {/* 검색 입력 */}
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

// AuthContext 연결
Header.contextType = AuthContext;

export default Header;
