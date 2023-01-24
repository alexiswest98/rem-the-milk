import { useState } from 'react';
import michael from '../../Images/Michael.png';
import gabe from '../../Images/Gabe1.png';
import alex from '../../Images/Alexis1.png';
import Evan from '../../Images/Evan.png';
import Slider from 'react-slick';
import './index.css'

//imports from npm package 
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SliderComp() {


  // const [currentIndex, setCurrentIndex] = useState(0);

  // function handlePrevious() {
  //   setCurrentIndex(currentIndex - 1);
  //   if (currentIndex === 0) {
  //       setCurrentIndex(3)
  //   }
  // }

  // function handleNext() {
  //   setCurrentIndex(currentIndex + 1)
  //   if (currentIndex === 3) {
  //       setCurrentIndex(0)
  //   }
  // }

  // return (

  //     <div className='allCar'>
  //       <button className='arrow-button-left' onClick={handlePrevious}></button>
  //       <img src={images[currentIndex]} alt="Slider image" />
  //       <button className='arrow-button-right' onClick={handleNext}></button>
  //     </div>

  // )

  // const images = [
  //   Evan,
  //   michael,
  //   gabe,
  //   alex
  // ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Evan} alt='digital drawing'></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={michael} alt='digital drawing'></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={gabe} alt='digital drawing'></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={alex} alt='digital drawing'></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
