import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory} from 'react-router-dom';
import { getAllUsersThunk } from '../../store/users';
import { getFollowingThunk } from '../../store/follows';
import { getFollowsThunk } from '../../store/follows';
import { followThunk } from '../../store/follows';
import { unfollowThunk } from '../../store/follows';
import './userDetails.css'

function UserDetails({ setShowModal, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [boolean, setBoolean] = useState(true)
    const currUser = (useSelector(state => state.session.user))
    const followers = Object.values(useSelector(state => state.follows));
    const following = followers[followers.length - 1];
    const usersArr = Object.values(useSelector(state => state.users))
    const users = usersArr.filter(user => user.id !== currUser.id)
    //this is the user that is changing in modal
    const indivUser = user.user

    //causes infinite loop
    // useEffect(() => {
    //     // Get a users followers
    //     dispatch(getFollowsThunk())
    //     // Who youre following
    //     dispatch(getFollowingThunk())
  
    // }, [dispatch, boolean, followers, following])

    if (!following || !users || !followers) return null;

    // People who follow you
    const followerIds = followers.map(ele => ele.id);
    // People who you follow
    const arr = Object.values(following)
    const followingIds = arr.map(ele => ele.id)


    const followButtonAction = async (id) => {
        let follow = await dispatch(followThunk(id))
        // setBoolean(!boolean)
        // Get a users followers
        await dispatch(getFollowsThunk())
        // Who youre following
        await dispatch(getFollowingThunk())
        setShowModal(false)
        history.push("/users")
    }

    const unfollowButtonAction = async (id) => {
        let follow = await dispatch(unfollowThunk(id))
        // setBoolean(!boolean)

        await dispatch(getFollowsThunk())
        // Who youre following
        await dispatch(getFollowingThunk())
        setShowModal(false)
        history.push("/users")
    }

    return (
        <div className='user-div-in-modal'>
            <h1>{indivUser.username}</h1>
            <h2>Email: {indivUser.email}</h2>
            <img src={indivUser.image_url} className='user-modal-img'></img>
            {!followerIds.includes(indivUser.id) &&
                <>
                <button onClick={() => followButtonAction(indivUser.id)}>follow</button>
                </>
            }
            {followerIds.includes(indivUser.id) &&
                <>
                <p>Im following</p>
                <button onClick={() => unfollowButtonAction(indivUser.id)}>Unfollow</button>
                </>
            }
            {followingIds.includes(user.id) &&
                <>
                <p>follower</p>
                </>
            }
        </div>
    )

}

export default UserDetails;

// onClick={followButtonAction(indivUser.id)
// onClick={unfollowButtonAction(indivUser.id)}
