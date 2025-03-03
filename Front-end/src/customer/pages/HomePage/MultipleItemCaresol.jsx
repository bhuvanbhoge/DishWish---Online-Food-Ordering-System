import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import { topMeels } from './TopMeels';
import CaresoulItem from './CaresoulItem';

const MultipleItemCaresol = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false
        
      };

  return (
    <div>
      <Slider {...settings}>
        {topMeels.map((item)=><CaresoulItem image={item.image} title={item.title}/>)}
      </Slider>
    </div>
  )
}

export default MultipleItemCaresol
