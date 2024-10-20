import React, { useEffect } from 'react';

const LottiePlayer = () => {
  useEffect(() => {
    // 외부 스크립트 추가
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="lottie_wrap" style={{ position: 'absolute', width: '300px', height: '300px'}}>
      <dotlottie-player 
        src="https://lottie.host/4330fede-cc3c-49c1-908b-6631a418077f/gXv5CZjxGe.json"
        background="transparent" 
        speed="1" 
        style={{
            width: '300px', 
            height: '300px', 
            position: 'absolute',   // position 속성 추가
            top: '70%',             // 수직 중앙 정렬
            left: '50%',            // 수평 중앙 정렬
            transform: 'translate(-50%, -50%)' // 중앙 정렬을 위해 transform 사용
          }} 
        loop 
        autoplay>
      </dotlottie-player>
    </div>
  );
};

export default LottiePlayer;
