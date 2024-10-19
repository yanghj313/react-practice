import '../css/BoardWrite.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      userId: 1, // 더미 사용자 ID
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Fail');
      }

      const data = await response.json();
      console.log('새 게시글:', data);
      
      // 게시글 작성 후 목록 페이지로 리디렉션
      navigate('/main');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div class="contents">
    <div id="detail_wrap">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contents</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit"><i className="fas fa-pen" style={{ marginRight: '8px' }}></i>Write</button>
      </form>
    </div>
    </div>
  );
};

export default BoardWrite;