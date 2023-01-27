import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from "react-redux";
import './index.css'
import Slider from "react-slick";
import SliderComp from "../Slider";
import { useSelector } from "react-redux";
import milk from "../../Images/milk.png"
import MonthTask from "../MonthTasks";
import { logout } from "../../store/session";

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(async() => {
        await dispatch(logout());
    }, [dispatch])

    return (
        <>
            <div className="mainDiv">
                <h1 className="homeTitle">The smart to-do app for busy people.</h1>
                {!user && <Link to='/sign-up'>
                    <button className="signInButton">Sign Up Free</button>
                </Link>}
                <SliderComp />
                <div className="milk-img">
                    <img src={milk} className="milk-splash"></img>
                </div>
            <div className='footer'>
                <div className="details-footer">
                    A Remember The Leche clone by the Leche Team
                </div>
                <div>
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/michael-lacey-84875a243/'>Michael's LinkedIn</a>
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/alexis-west-596a6b203/'>Alexis's LinkedIn</a>
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/gabriel-day-536738201/'>Gabriel's LinkedIn</a>
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/evan-morgan-9a2723132/'>Evan's LinkedIn</a>
                </div>
            </div>
            </div>
        </>
    )
}
