import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'; // AuthContext 가져오기
import '../css/login.css';

const Signup = () => {
  const { handleSignup } = useContext(AuthContext); // 회원가입 핸들러를 가져옴
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 회원가입 성공 후 페이지 이동을 위한 네비게이트

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 회원가입 처리
    handleSignup({ username, password });
    alert('Signup successful! You can now log in.');
    navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
  };

  return (
    <div class="joinlogin contents">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a class="join_bold" href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
