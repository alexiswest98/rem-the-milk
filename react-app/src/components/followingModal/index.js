import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
// import { getFollowingThunk } from '../../store/following';
import { getFollowsThunk } from "../../store/follows";
import { getFollowingThunk } from "../../store/following";
import { unfollowThunk } from "../../store/follows";


function ShowFollows({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const follows = Object.values(useSelector(state => state.follows))
console.log('following = ',follows)

const unfollow = async (follow) => {
  let follow = await dispatch(unfollowThunk(follow.id))
  await dispatch(getFollowsThunk())
}
  return (
    <div className='FollowersModal'>
        {Object.values(follows).map(follower => {
          <div className="allFollowers">
          <img src={follower.image_url}></img>
          <h2>{follower.username}</h2>
          <h6>{follower.email}</h6>
          <span onClick={() => unfollow(follower)}> unfollow </span>
          </div>
        })}
    </div>
  )
}



export default ShowFollows;
