import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { GetAllListsThunk } from "../../store/lists";


const ProfileForm = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.session.lists)
  const onload = async() => {
    await dispatch(GetAllListsThunk());
  }
  onload()
  console.log("lists= ",lists)
  console.log(user)
  return(
    <div>
      <p>{user?.username}</p>
      <img src={user?.image_url}/>
    </div>
  )
}

export default ProfileForm
