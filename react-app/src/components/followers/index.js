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
        <div className="followers-component">
            <div className="follow-div">
            <h1 className="followers-title">FOLLOWERS</h1>
            </div>
            <div className="follower-details">
                {Object.values(followers).map(follower => (
                    <div className="prof-follower-div">
                        <div className="outer-prof-div-shell">
                            <img className="followerImg" src={follower.image_url} />
                            <div className="outer-name-div-shell">
                                <h4>{follower.username}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
