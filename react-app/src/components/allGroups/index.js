import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link } from 'react-router-dom'
import { getGroupsThunk } from "../../store/groups";

export default function GetGroups() {
    const dispatch = useDispatch();

    // Listen for change of state and grab groups from the slice
    const groups = Object.values(useSelector(state => state.groups));
    console.log('groups ----', groups)
    useEffect(() => {
        dispatch(getGroupsThunk())
    }, [dispatch])

    if (!groups) return null

    return (
        <div className="groupsDiv">
            {groups.map(group => (
                <Link className='groupLink' key={`a${group.id}`} style={{ textDecoration: 'none' }} to={`/groups/${group.id}`}>
                    <div className="eachGroupMap">
                        <img key={`b${group.id}`} className='groupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="groupName">{group.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}