import evan from '../../Images/me.png';
import michael from '../../Images/boi.png';
import gabe from '../../Images/gabe.png';
import alex from '../../Images/alex.png';
import Slider from 'react-slick';


export default function SliderComp() {

const images = [
    evan,
    michael,
    gabe,
    alex
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true
  };

return (

    <Slider {...settings}>
    {images.map((image) => (
      <img src={image} alt="Slider image" style={{ width: '75%' }} />
    ))}
    </Slider>

)




}