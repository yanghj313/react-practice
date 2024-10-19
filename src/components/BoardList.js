import '../css/BoardList.css';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext 가져오기

const BoardList = () => {
  const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 가져오기
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10; // 페이지당 게시글 수
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10); // 표시할 페이지 버튼 수
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network Error');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 검색어에 따라 게시글 필터링
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <div className="body_loading">
      <div className="container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
            </filter>
          </defs>
        </svg>
      </div>
      </div>
    );
  }

  // 페이지 버튼 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 현재 페이지에 따라 표시할 페이지 번호 계산
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  // 글쓰기 버튼 클릭 시 동작
  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate('/write'); // 로그인 상태라면 /write 페이지로 이동
    } else {
      alert('Please log in to write a post.'); // 로그인되지 않은 경우 경고 메시지
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div id="boardlist">
      <h1>Movie Board</h1>
      {/* 검색 입력 필드 */}
      <div id="table_btn">
        <form className="search-form">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
        </form>
        <button className="write_go sales" onClick={handleWriteClick}>
          Write
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Writer</th>
            <th>View</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td><Link to={`/post/${post.id}`}>{post.title}</Link></td> {/* 경로 수정 */}
              <td>Writer {post.userId}</td> 
              <td>{Math.floor(Math.random() * 1000)}</td> 
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 이전 및 다음 버튼 */}
      <div className="number_chap">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* 나열식 페이지네이션 */}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <button className="numb_set"
            key={number}
            onClick={() => setCurrentPage(number)}
            disabled={currentPage === number}
            style={{
              margin: '0 5px',
              backgroundColor: currentPage === number ? '#6400ff' : '#f0f0f0',
              color: currentPage === number ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {number}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BoardList;
