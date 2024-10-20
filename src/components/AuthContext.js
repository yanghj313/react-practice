// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([{ username: 'user1', password: 'password1' }]);

  // 페이지 새로고침 또는 첫 로드 시 로그인 상태 복원
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true); // 저장된 로그인 상태가 true면 로그인 상태 유지
    }
  }, []);

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 localStorage에 저장
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // 로그아웃 시 로그인 상태 제거
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
