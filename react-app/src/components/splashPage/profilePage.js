import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom'
import { GetAllListsThunk } from "../../store/lists";


const ProfileForm = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)


  useEffect(() => {
    dispatch(GetAllListsThunk())
  }, [dispatch])


  return(
    <div>
      <p>{user?.username}</p>
      <img src={user?.image_url}/>
      {Object.values(lists).map(list => (
        <div key={list.id}>
          <NavLink className="navlink" to={`/lists/${list.id}`} >
          {list.name}
          </NavLink>
        </div>
      ))}
      <div>follows components</div>
      <NavLink className="navlink" to={`/lists/new`} >
      <button>New List</button>
      </NavLink>
    </div>
  )
}

export default ProfileForm
