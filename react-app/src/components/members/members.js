import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import './index.css'
import { Link, useParams} from 'react-router-dom'
import { GetMembersThunk } from "../../store/members";

export default function Members() {
    const history = useHistory()
    const dispatch = useDispatch();
    let { groupId } = useParams();


    let members = Object.values(useSelector(state => state.members))
    console.log('Members in my oneGroup comp', members)

    useEffect(() => {
        dispatch(GetMembersThunk(groupId))
    }, [groupId, dispatch]);

    return (
        <div className="membersTotal">
        <h1 className="MemberTitle">Group Members</h1>
        <div className="membersTotal">
        {members.map(member=>(
          <div>
          <p>{member.username}</p>
          </div>
        ))}
        </div>
        </div>
    )

}