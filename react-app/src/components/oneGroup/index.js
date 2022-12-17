import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams} from 'react-router-dom'
import { getGroupsThunk } from "../../store/groups";
import { deleteGroupThunk } from "../../store/groups";
import { GetAllListsThunk } from "../../store/lists";
import { DeleteListThunk } from "../../store/lists";
import { GetMembersThunk } from "../../store/members";
import { RemoveMemberThunk } from "../../store/members";
import AddMemberModal from "../members";
import CreateGroupListModal from "../Groups";
// import Members from "../members/members";
export default function GetOneGroup() {
    // const history = useHistory()
    const dispatch = useDispatch();
    const { groupId } = useParams();
    // Listen for change of state and grab groups from the slice
    const group = useSelector(state => state.groups[groupId]);
    // const currUser = useSelector(state => state.session)
    const lists = useSelector(state => state.lists)
    const members = Object.values(useSelector(state => state.members))
    const groupLists = Object.values(lists).filter(list => {
       return list.group_id == groupId})
    // console.log('groupLists', groupLists)



    const remove = async(id) => {
        dispatch(RemoveMemberThunk(groupId, id))
        // console.log('you hit the remove')
      }



    useEffect(() => {
        // console.log('hit the use effect')
        dispatch(getGroupsThunk());
        dispatch(GetAllListsThunk(groupId));
        dispatch(GetMembersThunk(groupId))
        dispatch(GetMembersThunk(groupId))

    }, [groupId, dispatch]);

    const deleteList = (list_id) => {
        dispatch(DeleteListThunk(list_id))
      }
    if (!group) return null

    return (
        <div className="groupsDiv">
            <div>
                    <div className="eachGroupMap">
                        <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
                        <div className="oneGroup">{group.name}
                        <AddMemberModal/>
                        </div>
                    </div>
                    {Object.values(groupLists).map(list=> (
                        <div>
                            <p>_________________________________</p>
                            <p>{list.name}       due: {list.due}</p>
                            <p>{list.notes}</p>
                            <button onClick={()=> deleteList(list.id)}>delete</button>

                        </div>
                    ))}
                    <CreateGroupListModal groupId={groupId}/>
                    <Link to='/dashboard'>
                    <button onClick={()=> {dispatch(deleteGroupThunk(groupId))}}>Delete your group</button>
                    </Link>
        </div>
        <div className="membersTotal">
        <h1 className="MemberTitle">Group Members</h1>
        <div className="membersTotal">
        {members.map(member=>(
          <div>
          <div className="member-list">
            <button onClick={() => remove(member.id)}>remove from group</button>
            {member.username}
            </div>

          </div>
        ))}
        </div>
        </div>
    </div>
    )
}
