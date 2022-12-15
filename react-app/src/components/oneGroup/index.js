import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams} from 'react-router-dom'
import { getGroupThunk } from "../../store/groups";
import { deleteGroupThunk } from "../../store/groups";

export default function GetOneGroup() {
    const history = useHistory()
    const dispatch = useDispatch();
    let { groupId } = useParams();
    // Listen for change of state and grab groups from the slice
    let group = useSelector(state => state.groups[groupId]);
    let currUser = useSelector(state => state.session)

    console.log('groupppp -----', group);
    console.log('CurrentUser', currUser)
    useEffect(() => {
        dispatch(getGroupThunk(groupId));
    }, [groupId, dispatch]);

    if (!group) return null

    return (
        <div className="groupsDiv">

                    <div className="eachGroupMap">
                        <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="oneGroup">{group.name}</div>
                    </div>
                    <Link to='/dashboard'>
                    <button onClick={()=> {dispatch(deleteGroupThunk(groupId))}}>Delete your group</button>
                    </Link>
        </div>
    )
}

