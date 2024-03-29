import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link } from 'react-router-dom'
import { getGroupsThunk } from "../../store/groups";
import CreateGroupModal from '../createGroup/CreateGroupModal'
import { GetUsersGroupsThunk } from "../../store/allmems";


export default function GetGroups() {
    const dispatch = useDispatch();

    // Listen for change of state and grab groups from the slice
    const groups = Object.values(useSelector(state => state.groups));
    const otherGroups = Object.values(useSelector(state => state.userGroups))
    const user = useSelector(state => state.session.user)
    // if(user){
    //     console.log('current user =====================', user.id)
    // }

    // console.log('groups ----', groups.push(... otherGroups))
    useEffect(() => {
        dispatch(getGroupsThunk())
        dispatch(GetUsersGroupsThunk())
    }, [dispatch])
    if (!groups) return null

    return (
    <div className="totalGroups">
        <div className='top-div-group'>
        <h2 className="groupTitle">Your Groups</h2>
        <CreateGroupModal/>
        </div>
        {/* <div className="groupsDiv"> */}
        <div className="test">
            {groups.map(group => (
                <Link className='groupLink' style={{ textDecoration: 'none' }} to={`/groups/${group.id}`}>
                    <div className="eachGroupMap">
                        <img className='groupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="groupName">{group.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
    )
}
