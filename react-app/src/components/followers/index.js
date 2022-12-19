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
    
    useEffect(() => {
        dispatch(getFollowsThunk())
        dispatch(getFollowingThunk())
        dispatch(getAllUsersThunk())
    }, [dispatch])

    const followers = Object.values(useSelector(state => state.follows));

    if(!followers) return null;

    return (
        <div className="followers-component">
            <h1 className="follower-details">Followers</h1>
            {Object.values(followers).map(follower => (
                <div className="follower-details">
                    <div>
                        <img className="followerImg" src={follower.image_url}/> {follower.username}
                    </div>
                </div>
            ))}
        </div>
    )
}
