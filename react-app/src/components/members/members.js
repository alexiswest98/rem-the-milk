import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import './index.css'
import { Link, useParams} from 'react-router-dom'
<<<<<<< HEAD
import { getFollowsThunk } from '../../store/follows';
import { GetMembersThunk } from "../../store/members";
import { AddMemberThunk } from "../../store/members";
export default function Members({setShowModal}) {
    const history = useHistory()
    const user = Object.values(useSelector(state=> state.session.user))
    const dispatch = useDispatch();
    let { groupId } = useParams();
    const members = Object.values(useSelector(state=> state.members))
    const followers = Object.values(useSelector(state => state.follows))
    console.log('followers = ', followers)
    const membersId = members.map(member => {
      return member.id
    })
    console.log('members id"s = ', membersId)
  const viable = followers.filter(follow => {
    return !membersId.includes(follow.id)
  })
    const add = async(id) => {
      dispatch(AddMemberThunk(groupId, id))
      console.log('you hit the add')
      console.log(groupId)
    }


    useEffect(() => {
        dispatch(getFollowsThunk(user.id))
=======
import { GetMembersThunk } from "../../store/members";

export default function Members() {
    const history = useHistory()
    const dispatch = useDispatch();
    let { groupId } = useParams();


    let members = Object.values(useSelector(state => state.members))
    console.log('Members in my oneGroup comp', members)

    useEffect(() => {
>>>>>>> coolevan
        dispatch(GetMembersThunk(groupId))
    }, [groupId, dispatch]);

    return (
        <div className="membersTotal">
<<<<<<< HEAD
        <h1 className="MemberTitle">Add members from follows</h1>
        <div className="membersTotal">
        {viable.map(follower=>(
          <div>
          <div className="member-list">
            <button onClick={() => add(follower.id)}>add to group</button>
            {follower.username}
            </div>

=======
        <h1 className="MemberTitle">Group Members</h1>
        <div className="membersTotal">
        {members.map(member=>(
          <div>
          <p>{member.username}</p>
>>>>>>> coolevan
          </div>
        ))}
        </div>
        </div>
    )

<<<<<<< HEAD
}
=======
}
>>>>>>> coolevan
