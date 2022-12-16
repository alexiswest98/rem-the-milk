import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useParams, useHistory} from 'react-router-dom';
import { getAllUsersThunk } from '../../store/users';
import { followThunk } from '../../store/follows';
import { unfollowThunk } from '../../store/follows';
import './userDetails.css'

function UserDetails({ setShowModal, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [boolean, setBoolean] = useState(true)
    const currUser = (useSelector(state => state.session.user))
    const followers = Object.values(useSelector(state => state.follows));
    const following = followers[followers.length - 1];
    const usersArr = Object.values(useSelector(state => state.users))
    const users = usersArr.filter(user => user.id !== currUser.id)

    console.log(user)

    if (!following || !users || !followers) return null

    const followerIds = followers.map(ele => ele.id);

    const followButton = (userId) => {
        setBoolean(!boolean)
        let success = dispatch(followThunk(userId))
        if (success) return alert('Successfully followed :)')

        history.push("/users")
        dispatch(getAllUsersThunk())
        setShowModal(false)
       }

    return (
        <div className='user-div-in-modal'>
            <h1>{user.user.username}</h1>
            <h2>Email: {user.user.email}</h2>
            <img src={user.user.image_url} className='user-modal-img'></img>
        </div>
    )

}

export default UserDetails;
