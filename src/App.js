import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Profile from "./components/Profile.js";
import Main from "./components/Main.js";
import BoardWrite from './components/BoardWrite.js';
import BoardDetail from './components/BoardDetail.js';
import MovieMain from './components/MovieMain.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { AuthContext } from './components/AuthContext'; // AuthContext 가져오기
import BrowseMovies from './components/BrowseMovies.js'; // 영화 탐색 컴포넌트 추가
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, // 로그인 여부 상태
      users: [],         // 회원 가입된 사용자 목록
    };
  }

  // 회원 가입 처리
  handleSignup = (newUser) => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
  };

  // 로그인 핸들러
  handleLogin = (username, password) => {
    const { users } = this.state;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      this.setState({ isLoggedIn: true });
      return true; // 로그인 성공
    } else {
      return false; // 로그인 실패
    }
  };

  // 로그아웃 핸들러
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div id="wrap">
        <BrowserRouter>
          <AuthContext.Provider value={{
            isLoggedIn,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout,
            handleSignup: this.handleSignup
          }}>
            <Header /> {/* 모든 컴포넌트가 AuthContext에 접근 가능 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              
              {/* 게시판 관련 경로 */}
              <Route path="/main" element={<Main />} />
              
              {/* 로그인된 사용자만 글쓰기에 접근 가능, 리다이렉트 사용 */}
              <Route 
                path="/write" 
                element={isLoggedIn ? <BoardWrite /> : <Navigate to="/login" />} 
              />
              
              {/* 게시글 상세 페이지 경로 */}
              <Route path="/post/:id" element={<BoardDetail />} />

              {/* 영화 관련 경로 */}
              <Route path="/moviemain" element={<MovieMain />} />

              {/* YTS 영화 탐색 경로 */}
              <Route path="/browse-movies" element={<BrowseMovies />} /> {/* 새 경로 추가 */}

              {/* 로그인 페이지 */}
              <Route path="/login" element={<Login />} />
              
              {/* 회원가입 페이지 */}
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
          </AuthContext.Provider> {/* AuthContext.Provider 끝 */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
