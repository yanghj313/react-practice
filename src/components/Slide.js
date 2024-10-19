import '../css/Slide.css';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from'react-slick';
import slide1Imge from '../images/im01.jpg';
import slide2Imge from '../images/im02.jpg';
import slide3Imge from '../images/im03.jpg';

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };
  
    return (
      
      <div id="slide">
        <div class="black_cover"></div>
        <div class="text_main"><h1>A Resting place where<br/>you can find your own movie</h1></div>
       <Slider {...settings}> 
          <div class="slide_element slide1" key={1}><img src={slide1Imge} alt=""/></div>
          <div class="slide_element slide2" key={2}><img src={slide2Imge} alt=""/></div>
          <div class="slide_element slidec" key={3}><img src={slide3Imge} alt=""/></div>
        </Slider>
      </div>
    );
  };
  
  export default Slide;