import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
import './index.css'
import Slider from "react-slick";
import SliderComp from "../Slider";
export default function Home() {


    return (
        <>
    <div className="mainDiv">
        <h1>The smart to-do app for busy people.</h1>
        <Link to='/signup'>
        <button>Sign up Free</button>
        </Link>
        <SliderComp/>
    </div>
            <footer className='footer'>
            <div>
            A Remember The Leche clone by the Leche Team
            </div>
            <div>
            <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/michael-lacey-84875a243/'>Michael's LinkedIn</a>
            <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/alexis-west-596a6b203/'>Alexis's LinkedIn</a>
            <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/gabriel-day-536738201/'>Gabriel's LinkedIn</a>
            <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/evan-morgan-9a2723132/'>Evan's LinkedIn</a>
            </div>
          </footer>
          </>
    )
}
