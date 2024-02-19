import React from 'react'
import Img1 from '../../assets/carousel images/1.png' 
import Img2 from '../../assets/carousel images/2.png' 
import Img3 from '../../assets/carousel images/3.png' 
import './carousel.css'
import { Carousel } from 'react-bootstrap';

function HeadCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img src={Img1} alt="Winter collection"/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img src={Img2} alt="Winter collection"/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Img3} alt="Winter collection"/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HeadCarousel
