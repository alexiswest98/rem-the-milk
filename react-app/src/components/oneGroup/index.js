import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams} from 'react-router-dom'
import { getGroupThunk } from "../../store/groups";
import { deleteGroupThunk } from "../../store/groups";
import { GetAllListsThunk } from "../../store/lists";
import { DeleteListThunk } from "../../store/lists";
import { GetMembersThunk } from "../../store/members";

export default function GetOneGroup() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { groupId } = useParams();
    // Listen for change of state and grab groups from the slice
    const group = useSelector(state => state.groups[groupId]);
    const currUser = useSelector(state => state.session)
    const lists = useSelector(state => state.lists)

    console.log('groupId = ', groupId)
    const groupLists = Object.values(lists).filter(list => {
        return list.group_id = groupId})
        console.log(groupLists)
    console.log('groupppp -----', group);
    console.log('CurrentUser', currUser)
    useEffect(() => {
        dispatch(getGroupThunk(groupId));
        dispatch(GetAllListsThunk(groupId));
        dispatch(GetMembersThunk(groupId))

    }, [groupId, dispatch]);

    const deleteList = (list_id) => {
        dispatch(DeleteListThunk(list_id))
      }
    if (!group) return null

    return (
        <div className="groupsDiv">

                    <div className="eachGroupMap">
                        <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="oneGroup">{group.name}
                        <button>add a member</button>
                        <button>see all members</button>
                        </div>
                    </div>
                    {Object.values(lists).map(list=> (
                        <div>
                            <p>_________________________________</p>
                            <p>{list.name}       due: {list.due}</p>
                            <p>{list.notes}</p>
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
