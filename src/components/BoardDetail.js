import '../css/BoardDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
  const { id } = useParams(); // URL에서 게시글 ID를 가져옴
  const [post, setPost] = useState(null); // 게시글 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate(); // 이전 페이지로 돌아가기 위해 사용

  useEffect(() => {
    // 게시글 데이터를 가져오는 비동기 함수
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('네트워크 오류 발생');
        const data = await response.json();
        setPost(data); // 게시글 데이터를 상태에 저장
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPost();
  }, [id]);

  // 목록으로 돌아가기
  const handleBack = () => {
    navigate('/main'); // 게시판 목록으로 돌아가기, 경로 수정
  };

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
  } // 데이터 로딩 중 표시

  if (!post) return <div className="warning">Not found!</div>; // 게시글이 없을 경우 표시

  return (
    <div className="contents">
      <div id="detail_wrap">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button onClick={handleBack}> 
          <i className="fas fa-list" style={{ marginRight: '8px' }}></i> Go to list
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
