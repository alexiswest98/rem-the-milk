import { useState } from 'react';
import michael from '../../Images/Michael.png';
import gabe from '../../Images/Gabe1.png';
import alex from '../../Images/Alexis1.png';
import Evan from '../../Images/Evan.png';
import Slider from 'react-slick';
import './index.css'

export default function SliderComp() {

const images = [
    Evan,
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
      <button className='arrow-button-left' onClick={handlePrevious}></button>
      <img src={images[currentIndex]} alt="Slider image" />
      <button className='arrow-button-right' onClick={handleNext}></button>
    </div>

)




}