import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'; // AuthContext 가져오기
import '../css/login.css'; // 스타일 파일 불러오기

const Login = () => {
  const { handleLogin } = useContext(AuthContext); // AuthContext에서 로그인 핸들러를 가져옴
  const [username, setUsername] = useState(''); // 사용자 이름 상태 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const navigate = useNavigate(); // 로그인 성공 후 페이지 이동을 위한 네비게이트

  // 로그인 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    console.log('로그인 시도:', username, password); // 디버깅 로그

    const success = handleLogin(username, password); // 로그인 처리

    if (success) {
      alert('Login successful!'); // 로그인 성공 알림
      navigate('/'); // 홈으로 이동
    } else {
      alert('Invalid username or password'); // 로그인 실패 시 경고 메시지
    }
  };

  return (
    <div className="joinlogin contents">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // 사용자 이름 상태 변경
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 변경
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a className="join_bold" href="/signup">Sign up</a></p> {/* 회원가입 링크 */}
    </div>
  );
};

export default Login;
