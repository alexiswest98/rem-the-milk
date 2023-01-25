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
    <form className='createListForm'>
    <div className='FollowersModal'>
      <h2> FOLLOWS CONTENT </h2>
        {Object.values(follows).map(el => (
          <div className="allFollowers">
          <img className="user-modal-img" src={el.image_url}></img>
          <h2>{el.username}</h2>
          <h6>{el.email}</h6>
          <span onClick={() => unfollow(el)}> unfollow </span>
          </div>
        ))}
    </div>
    </form>
  )
}



export default ShowFollows;
