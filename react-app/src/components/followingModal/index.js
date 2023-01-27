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
console.log('following = ',Object.values(follows))

const unfollow = async (follower) => {
  let follow = await dispatch(unfollowThunk(follower.id))
  await dispatch(getFollowsThunk())
}
  return (
    <div className="whole-outer-followers-modal">
      <h2 className="following-title"> FOLLOWING</h2>
      <div className="inner-content-followers">
        {Object.values(follows).map(el => (
          <div className="allFollowers">
          <img className="user-modal-img" src={el.image_url}></img>
          <div>
            <h2>{el.username}</h2>
            <h6>{el.email}</h6>
          </div>
          </div>
        ))}
    </div>
    </div>
  )
}



export default ShowFollows;
