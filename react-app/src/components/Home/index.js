import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import './index.css'
import Slider from "react-slick";
import SliderComp from "../Slider";
export default function Home() {


    return (
    <div className="mainDiv">
        <h1 className="homeTitle">The smart to-do app for busy people.</h1>
        <Link to='/signup'>
        <button className="signInButton">Sign up Free</button>
        </Link>
        <SliderComp/>
    </div>
    )
}
