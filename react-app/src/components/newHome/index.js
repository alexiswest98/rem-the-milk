import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { getAllTasksThunk } from "../../store/tasks";
import './index.css'

export default function NewHomePage() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const Tasks = Object.values(useSelector(state => state.tasks))
    // console.log(Tasks)

    useEffect(() => {
        dispatch(getAllTasksThunk())
    }, [dispatch])

    return (
        <div className="whole-user-home-page">
        <div className="home-page-outer">
                <div className="home-action-nav-bar">
                    <div className="home-profile-image">
                        <img src={user.image_url} alt="profile pic" className="home-prof-pic"/>
                        <h3 className="home-user-name">{user.username}</h3>
                        <h4 className="home-user-email">{user.email}</h4>
                    </div>
                    <div className="home-profile-info">
                        <div className="bubble-info-box">

                        </div>
                    </div>
                    <div className="home-profile-nav">
                        <h1>NAV</h1>
                    </div>
                </div>
                <div className="center-page">
                    <span>LIST</span>
                </div>
                <div className="clock-side">
                    <img src="https://cb2.scene7.com/is/image/CB2/CarloMrblBlkWllClckSHS19/$web_pdp_main_carousel_sm$/190410160814/carlo-black-marble-wall-clock.jpg" alt="clock" className="clock"/>
                </div>
        </div>
        </div>
    )
}
