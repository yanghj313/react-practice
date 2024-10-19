import { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Profile from "./components/Profile.js";
import Main from "./components/Main.js";
import BoardWrite from './components/BoardWrite.js';
import BoardDetail from './components/BoardDetail.js';
import MovieMain from './components/MovieMain.js';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

 
  render() {
   
    return (
      <div id="wrap">
        <BrowserRouter>
          <Header />
          <Routes>         
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
             {/* 게시판 관련 경로 */}
            <Route path="/main" element={<Main/>}/>
            <Route path="/write" element={<BoardWrite />} />
            <Route path="/:id" element={<BoardDetail />} />
             {/* 영화 관련 경로 */}
            <Route path="/moviemain" element={<MovieMain/>}/> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
