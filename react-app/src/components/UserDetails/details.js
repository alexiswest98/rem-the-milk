import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAllUsersThunk } from '../../store/users';
import { getFollowingThunk } from '../../store/following';
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
    const following = Object.values(useSelector(state => state.following));
    const usersArr = Object.values(useSelector(state => state.users))
    const users = usersArr.filter(user => user.id !== currUser.id)
    //this is the user that is changing in modal
    const indivUser = user.user
    // console.log(indivUser)
    // console.log('following = ',following)
    const followEmail = following.map(el => {
        return el.email
    })
    // console.log(followEmail)
    function refreshPage() {
        window.location.reload(false);
    }

    if (!following || !users || !followers) return null;

    // People who follow you
    const followerIds = followers.map(ele => ele.id);
    // People who you follow
    const arr = Object.values(following)
    // const followingIds = arr.map(ele => ele.id)


    const followButtonAction = async (id) => {
        let follow = await dispatch(followThunk(id))
        setShowModal(false)
        await dispatch(getFollowsThunk())
        await dispatch(getFollowingThunk())
        // history.push("/users")
    }

    const unfollowButtonAction = async (id) => {
        dispatch(unfollowThunk(id))
        setShowModal(false)
        // await dispatch(getFollowsThunk())
        // await dispatch(getFollowingThunk())
        refreshPage()
        // history.push("/users")
    }

    return (
        <div className='user-div-in-modal'>
            <h1>{indivUser.username}</h1>
            <h2>Email: {indivUser.email}</h2>
            <img src={indivUser.image_url} className='user-modal-detail-img'></img>
            {!followerIds.includes(indivUser.id) &&
                <div className='follow-modal-dets'>
                    <button className='activity-butt btn-7 ' onClick={() => followButtonAction(indivUser.id)}>follow</button>
                </div>
            }
            {followerIds.includes(indivUser.id) &&
                <div className='follow-modal-dets'>
                    <h3 className='color-orange-here'>I'm following</h3>
                    <button className='activity-butt btn-7 ' onClick={() => unfollowButtonAction(indivUser.id)}>Unfollow</button>
                </div>
            }
            {followEmail.includes(indivUser.email) &&
                <div className='follow-modal-dets'>
                    <h4 className='follows-you'>({indivUser.username} follows you)</h4>
                </div>
            }
        </div>
    )

}

export default UserDetails;

// onClick={followButtonAction(indivUser.id)
// onClick={unfollowButtonAction(indivUser.id)}
