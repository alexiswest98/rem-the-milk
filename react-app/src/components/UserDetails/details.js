import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
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

    function refreshPage() {
        window.location.reload(false);
    }

    if (!following || !users || !followers) return null;

    // People who follow you
    const followerIds = followers.map(ele => ele.id);
    // People who you follow
    const arr = Object.values(following)
    const followingIds = arr.map(ele => ele.id)


    const followButtonAction = async (id) => {
        let follow = await dispatch(followThunk(id))
        await dispatch(getFollowsThunk())
        await dispatch(getFollowingThunk())
        setShowModal(false)
        history.push("/users")
    }

    const unfollowButtonAction = async (id) => {
        let follow = await dispatch(unfollowThunk(id))
        await dispatch(getFollowsThunk())
        await dispatch(getFollowingThunk())
        setShowModal(false)
        refreshPage()
        history.push("/users")
    }

    return (
        <div className='user-div-in-modal'>
            <h1>{indivUser.username}</h1>
            <h2>Email: {indivUser.email}</h2>
            <img src={indivUser.image_url} className='user-modal-img'></img>
            {!followerIds.includes(indivUser.id) &&
                <div className='follow-modal-dets'>
                    <button className='activity-butt btn-7 ' onClick={() => followButtonAction(indivUser.id)}>follow</button>
                </div>
            }
            {followerIds.includes(indivUser.id) &&
                <div className='follow-modal-dets'>
                    <h4>Im following</h4>
                    <button className='activity-butt btn-7 ' onClick={() => unfollowButtonAction(indivUser.id)}>Unfollow</button>
                </div>
            }
            {followingIds.includes(user.id) &&
                <div className='follow-modal-dets'>
                    <h4>follower</h4>
                </div>
            }
        </div>
    )

}

export default UserDetails;

// onClick={followButtonAction(indivUser.id)
// onClick={unfollowButtonAction(indivUser.id)}
