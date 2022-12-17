import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams} from 'react-router-dom'
import { getGroupThunk } from "../../store/groups";
import { deleteGroupThunk } from "../../store/groups";
import { GetAllListsThunk } from "../../store/lists";
import { DeleteListThunk } from "../../store/lists";

export default function GetOneGroup() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { groupId } = useParams();
    // Listen for change of state and grab groups from the slice
    const group = useSelector(state => state.groups[groupId]);
    const currUser = useSelector(state => state.session)
    const lists = useSelector(state => state.lists)
    const groupLists = Object.values(lists).filter(list => {
        return list.group_id == groupId})
        console.log(groupLists)
    console.log('groupppp -----', group);
    console.log('CurrentUser', currUser)
    useEffect(() => {
        dispatch(getGroupThunk(groupId));
        dispatch(GetAllListsThunk(groupId));
    }, [groupId, dispatch]);

    const deleteList = (list_id) => {
        dispatch(DeleteListThunk(list_id))
      }
    if (!group) return null

    return (
        <div className="groupsDiv">

                    <div className="eachGroupMap">
                        <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="oneGroup">{group.name}</div>
                    </div>
                    {Object.values(lists).map(list=> (
                        <div>
                            <p>{list.name}</p>
                            <p>{list.due}</p>
                            <p>{list.notes}</p>
                            <p>{list.group_id}</p>
                            <button onClick={()=> deleteList(list.id)}>delete</button>
                        </div>
                    ))}
                    <button onClick={()=> history.push(`/groups/${group.id}/list`)}>Create New List</button>
                    <Link to='/dashboard'>
                    <button onClick={()=> {dispatch(deleteGroupThunk(groupId))}}>Delete your group</button>
                    </Link>
        </div>
    )
}
