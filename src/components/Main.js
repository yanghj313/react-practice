import '../css/Main.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BoardList from './BoardList'; // 게시글 목록을 가져옵니다.
import LottiePlayer from './LottiePlayer.js';

const Main = () => {
  return (
    <div id="Main_wrap"> 
     <LottiePlayer />  
      <BoardList /> {/* 게시글 목록 컴포넌트 */}
      <Outlet /> {/* 하위 라우트를 렌더링하기 위한 Outlet */}
    </div>
  );
};

export default Main;

