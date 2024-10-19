import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'; // AuthContext 가져오기
import '../css/login.css';

const Login = () => {
  const { handleLogin } = useContext(AuthContext); // 로그인 핸들러를 가져옴
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 로그인 성공 후 페이지 이동을 위한 네비게이트

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleLogin(username, password); // 로그인 처리

    if (success) {
      alert('Login successful!');
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } else {
      alert('Invalid username or password'); // 로그인 실패 시 경고 메시지
    }
  };

  return (
    <div class="joinlogin contents">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a class="join_bold" href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
