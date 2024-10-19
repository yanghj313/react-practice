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

  const handleBack = () => {
    navigate('/main'); // 게시판 목록으로 돌아가기
  };

  if (loading) return <div>로딩 중...</div>; // 데이터 로딩 중 표시
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>; // 게시글이 없을 경우 표시

  return (
    <div>
      <h2>게시글 상세보기</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleBack}>목록으로 돌아가기</button>
    </div>
  );
};

export default BoardDetail;