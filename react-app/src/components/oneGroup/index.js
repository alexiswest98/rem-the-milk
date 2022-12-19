import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams } from 'react-router-dom'
import { getAllGroupsThunk } from "../../store/groups";
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
    return list.group_id == groupId
  })

  // console.log('grouplists=',groupLists)
  // console.log('group=',group)

  const remove = async (id) => {
    dispatch(RemoveMemberThunk(groupId, id))
  }
  //   const owner = group.owner_id === currUser.id


  useEffect(() => {
    dispatch(getAllGroupsThunk());
    dispatch(GetAllListsThunk(groupId));
    dispatch(GetMembersThunk(groupId))
  }, [groupId, dispatch]);

  const deleteList = (list_id) => {
    dispatch(DeleteListThunk(list_id))
  }
  if (!group) return null

  return (
    <div className="groupsDiv">
      <div className="oneGroupTopHalf">
        <div className="eachGroupMap">
          <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
          <div className="oneGroup">{group.name}
            <AddMemberModal />
          </div>
        </div>
        <h4 className="onegroupListHeader">Lists for the group</h4>
        <div className="listMappedBigDiv">
          {Object.values(groupLists).map(list => (
            <div className="notesMapped">
              <Link className="groupListLink" key={`a{${list.id}`} to={`/lists/${list.id}`}>

                <p id="listDueName">{list.name}       </p>
                <p id="listDueName">due: {list.due}</p>

              </Link>
              <p id="listDueName">{list.notes}</p>
              <button onClick={() => deleteList(list.id)} className='deleteListInGroup'>delete</button>

            </div>
          ))}
        </div>
        <div className="createListDeleteGroup">
          <div>
          <CreateGroupListModal groupId={groupId} />
          </div>
          <Link to='/dashboard'>
            <button onClick={() => { dispatch(deleteGroupThunk(groupId)) }} className='deleteGroupBtn'>Delete your group</button>
          </Link>
        </div>
      </div>
      <div className="membersTotal">
        <h1 className="MemberTitle">Group Members</h1>
        <div className="membersTotal2">
          {members.map(member => (
            <div className="outerMembers-list">
              <div className="member-list">
                <div className="memberDivs">
                  {member.username}
                </div>
                <div className="memberDivs">
                  {member.email}
                </div>
                <button onClick={() => remove(member.id)} className='deleteMembInGroup'>remove</button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
