import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import './index.css'
import Slider from "react-slick";
import SliderComp from "../Slider";
export default function Home() {
    // const [currentIndex, setCurrentIndex] = useState(0);

    // function handlePrevious() {
    //     setCurrentIndex(currentIndex - 1);
    //   }

    //   function handleNext() {
    //     setCurrentIndex(currentIndex + 1);
    //   }

    return (
    <div className="mainDiv">
        <h1>The smart to-do app for busy people.</h1>
        <Link to='/signup'>
        <button>Sign up Free</button>
        </Link>
        <Slider/>
    </div>
    )
}
