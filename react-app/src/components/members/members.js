import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './addMemb.css'
import { useParams } from 'react-router-dom'
import { getFollowsThunk } from '../../store/follows';
import { GetMembersThunk } from "../../store/members";
import { AddMemberThunk } from "../../store/members";

export default function Members({ setShowModal }) {
  const history = useHistory()
  const user = Object.values(useSelector(state => state.session.user))
  const dispatch = useDispatch();
  let { groupId } = useParams();
  const members = Object.values(useSelector(state => state.members))
  // const members = member.slice(0, member.length-1)
  const followers = Object.values(useSelector(state => state.follows))
  // console.log('followers = ', followers)
  const membersId = members.map(member => {
    return member.id
  })
  // console.log('members id"s = ', membersId)
  const viable = followers.filter(follow => {
    return !membersId.includes(follow.id) && follow.id
  })

  // console.log(viable)
  const add = async (id) => {
    dispatch(AddMemberThunk(groupId, id))
    // console.log('you hit the add')
    // console.log(groupId)
  }


  useEffect(() => {
    dispatch(getFollowsThunk(user.id))
    dispatch(GetMembersThunk(groupId))
  }, [groupId, dispatch]);

  return (
    <div className="add-to-group">
      <h1 className="add-memb-title">Add members from follows:</h1>
      <div className="add-memb-outer">
        {viable.map(follower => (
            <div className="add-memb-inner">
              <h3>{follower.username}</h3>
                <button className="deleteMembInGroup" onClick={() => add(follower.id)}>add to group</button>
            </div>
        ))}
        {viable.length === 0 && <h3>Explore Friends to Add More...</h3>}
      </div>
    </div>
  )

}
