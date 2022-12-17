import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
// import { Link } from 'react-router-dom'
import { getFollowsThunk } from "../../store/follows";
import { getAllUsersThunk } from "../../store/users";


export default function GetFollowers() {
    const dispatch = useDispatch();

    const followers = Object.values(useSelector(state => state.follows));
    // console.log('followers ----', followers);


    useEffect(() => {
        dispatch(getFollowsThunk())
        dispatch(getAllUsersThunk())
    }, [dispatch])

    return (
        <div>
            <h1>followers component</h1>
            {Object.values(followers).map(follower => (
                <div>
                    <img src={follower.image_url} className='followers-img'/>
                    <p>{follower.username}</p>
                </div>
            ))}
        </div>
    )
}
