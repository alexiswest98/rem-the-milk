import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom'
import { GetAllListsThunk } from "../../store/lists";
import { DeleteListThunk } from "../../store/lists";
import './style.css'


const ProfileForm = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  useEffect(() => {
    dispatch(GetAllListsThunk())
  }, [dispatch])
  const deleteList = (list_id) => {
    dispatch(DeleteListThunk(list_id))
  }
  return(
    <div className="whole-profile-page">
      <h1>{user?.username}</h1>
      <img src={user?.image_url} className='dash-profile-image'/>
      <h2>YOUR LISTS:</h2>
      {Object.values(lists).map(list => (
        <div key={list.id}>
          <NavLink className="navlink" to={`/lists/${list.id}`} >
          {list.name}
          </NavLink>
          <span>Due Date: {list.due.slice(0, 17)}</span>
          <button onClick={()=> deleteList(list.id)}>delete</button>
      <NavLink to={`/list/edit/${list.id}`}>
        <button> Edit List</button>
      </NavLink>
        </div>
      ))}
      <NavLink className="navlink" to={`/lists/new`} >
      <button>New List</button>
      </NavLink>
    </div>
  )
}
export default ProfileForm
