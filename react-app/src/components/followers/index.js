import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
// import { Link } from 'react-router-dom'
import { getFollowsThunk } from "../../store/follows";
import { getAllUsersThunk } from "../../store/users";
import {getFollowingThunk} from "../../store/follows"

//?? displays following not followers
export default function GetFollowers() {
    const dispatch = useDispatch();
    const len = Object.values(useSelector(state => state.follows)).length
    const follower = Object.values(useSelector(state => state.follows))
    const followerz = follower.slice(0, follower.length-1)
    // console.log('followers ----', followers);

    useEffect(() => {
        dispatch(getFollowsThunk())
        dispatch(getAllUsersThunk())
    }, [dispatch])


    if(!followerz) return null;

    return (
        // <div className="followers-component">
            <div className="follower-details">
            <h1 className="followers-title">Following</h1>
            <ul className="followers-list">
                {Object.values(followerz).map(follower => (
                <li className="Followers-Details">
                    {/* <div className="prof-follower-div">
                        <div className="outer-prof-div-shell"> */}
                            <img className="followerImg" src={follower.image_url} />
                        {/* </div> */}
                        <div className="outer-name-div-shell">
                            <h4 className="followerName">{follower.username}</h4>
                        </div>
                    {/* </div> */}
                </li>
                ))}
                </ul>
            </div>
        // </div>
    )
}
