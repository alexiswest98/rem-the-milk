import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getFollowingThunk, getFollowsThunk, followThunk, unfollowThunk } from '../store/follows';
import { getAllUsersThunk } from '../store/users';

function UsersList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boolean, setBoolean] = useState(true)
  const currUser = (useSelector(state => state.session.user))
  const followers = Object.values(useSelector(state => state.follows));
  const following = followers[followers.length - 1];
  const usersArr = Object.values(useSelector(state => state.users))
  const users = usersArr.filter(user => user.id !== currUser.id)

  useEffect(() => {
      // Get all users
      dispatch(getAllUsersThunk())
      // Get a users followers
      dispatch(getFollowsThunk())
      // Who youre following
      dispatch(getFollowingThunk())

  }, [dispatch, boolean])

  if (!following || !users || !followers) return null
  // People who follow you
  const followerIds = followers.map(ele => ele.id);
  // console.log('followerIds', followerIds)

  // People who you follow
  const arr = Object.values(following)
  const followingIds = arr.map(ele => ele.id)
  // console.log('following ids', followingIds)

 const followButton = (userId) => {
  setBoolean(!boolean)
  dispatch(followThunk(userId))
  history.push("/users")
 }

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>

        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        {!followerIds.includes(user.id) &&
          <>
            <button onClick={ () => dispatch(followThunk(user.id))}>follow</button>
          </>
        }
        {followerIds.includes(user.id) &&
          <>
          <p>Im following</p>
          <button onClick={ () => dispatch(unfollowThunk(user.id)) }>Unfollow</button>
          </>
        }
        {followingIds.includes(user.id) &&
        <>
        <p>follower</p>
        </>}
      </li>

  );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
