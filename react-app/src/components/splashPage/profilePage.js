import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom'
import { GetAllListsThunk } from "../../store/lists";
import { DeleteListThunk } from "../../store/lists";
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
    <div>
      <p>{user?.username}</p>
      <img src={user?.image_url}/>
      {Object.values(lists).map(list => (
        <div key={list.id}>
          <NavLink className="navlink" to={`/lists/${list.id}`} >
          {list.name}
          </NavLink>
          <button onClick={()=> deleteList(list.id)}>:wastebasket:</button>
      <NavLink to={`/list/edit/${list.id}`}>
        <button> Edit List</button>
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
