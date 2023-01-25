import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
// import { getFollowingThunk } from '../../store/following';
import { getFollowsThunk } from "../../store/follows";
// import './index.css'

function ShowFollowers({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const followers = Object.values(useSelector(state => state.following))
  console.log('followers = ',Object.values(followers))
  return (
      <form onSubmit={onsubmit} className='createListForm'>
    <div>
      <h2> FOLLOWING CONTENT </h2>

        {Object.values(followers).map(follower => (
          <div className="allFollowers">
          <img className="user-modal-img" src={follower.image_url}></img>
          <h2>{follower.username}</h2>
          <h6>{follower.email}</h6>
          </div>
        )
          )
        }
    </div>
      </form>
  )
}



export default ShowFollowers;
