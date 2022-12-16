import evan from '../../Images/me.png';
import { useState } from 'react';
import michael from '../../Images/boi.png';
import gabe from '../../Images/gabe.png';
import alex from '../../Images/alex.png';
import Slider from 'react-slick';
import './index.css'

export default function SliderComp() {

const images = [
    evan,
    michael,
    gabe,
    alex
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious() {
    setCurrentIndex(currentIndex - 1);
    if (currentIndex === 0) {
        setCurrentIndex(3)
    }
  }

  function handleNext() {
    setCurrentIndex(currentIndex + 1)
    if (currentIndex === 3) {
        setCurrentIndex(0)
    }
  }

return (

    <div className='allCar'>
      <button className='arrow' onClick={handlePrevious}></button>
      <img src={images[currentIndex]} alt="Slider image" />
      <button className='arrow' onClick={handleNext}></button>
    </div>

)




}