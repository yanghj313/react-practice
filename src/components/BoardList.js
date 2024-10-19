import '../css/BoardList.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10; // 페이지당 게시글 수
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10); // 표시할 페이지 버튼 수

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('네트워크 오류 발생');
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

  if (loading) return <div>Loading...</div>;

  // 페이지 버튼 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 현재 페이지에 따라 표시할 페이지 번호 계산
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  return (
    <div id="boardlist">
      <h1>Movie Board</h1>
      {/* 검색 입력 필드 */}
       <div id="table_btn">
      <form class="search-form">      
      <input 
        type="text" 
        placeholder="Search" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} class="search-input"
      />
       </form>
      <button class="write_go sales"><Link to="/write">Write</Link></button>
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
            <td><Link to={`/${post.id}`}>{post.title}</Link></td>           
            <td>writer{post.userId}</td> 
            <td>{Math.floor(Math.random() * 1000)}</td> 
            <td>{new Date().toLocaleDateString()}</td>
           
          </tr>
        ))}
      </tbody>
      </table>
      {/* 이전 및 다음 버튼 */}
      <div class="number_chap">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* 나열식 페이지네이션 */}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <button class="numb_set"
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