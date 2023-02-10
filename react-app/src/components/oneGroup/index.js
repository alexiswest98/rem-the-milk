import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { Link, useParams } from 'react-router-dom'
import { getAllGroupsThunk } from "../../store/groups";
import { deleteGroupThunk } from "../../store/groups";
import { GetAllListsThunk } from "../../store/lists";
import { groupListThunk } from "../../store/lists";
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
  const lists = Object.values(useSelector(state => state.lists))
  const members = Object.values(useSelector(state => state.members))
  const groupLists = lists.filter(list => list.group_id == +groupId)
  console.log(groupLists)


  const remove = async (id) => {
    dispatch(RemoveMemberThunk(groupId, id))
  }
  //   const owner = group.owner_id === currUser.id

  useEffect(() => {
    dispatch(getAllGroupsThunk());
    dispatch(groupListThunk(+groupId));
    dispatch(GetMembersThunk(groupId))
  }, [groupId, dispatch]);

  const deleteList = (list_id) => {
    dispatch(DeleteListThunk(list_id))
  }

  if (!group) return null;

  return (
    <div className="groupsDiv">
      <div className="top-half-group">
        <div className="left-half-top-group">
          <div className="eachGroupMap">
            <h1 className="title-one-group">{group.name}</h1>
            <img className='oneGroupImg' src={`${group.image_url}`} alt='group Pic'></img>
          </div>
        </div>
        <div className="right-half-one-group">
          <div className="border-needed">
            <h4 className="onegroupListHeader">Team Lists</h4>
            <div>
              <CreateGroupListModal groupId={groupId} />
            </div>
            <div className="listMappedBigDiv">
              {groupLists.map(list => (
                <div className="notesMapped">
                  <Link className="groupListLink" key={`a{${list.id}`} to={`/lists/${list.id}`}>
                    <p id="listDueName">{list.name}</p>
                    <p id="listDueName">Due: {list.due.slice(0, 17)}</p>
                  </Link>
                  <p id="listDueName">{list.notes}</p>
                  <button onClick={() => deleteList(list.id)} className='deleteListInGroup'>delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-half-group">
        <div className="membersTotal">
          <h1 className="MemberTitle">Group Members</h1>
          <div className="add-members-to-group">
            <AddMemberModal />
          </div>
          <div className="membersTotal2">
            {members.map(member => (
              <div className="outerMembers-list">
                <div className="member-list">
                  <span className="member-username"> {member.username} </span>
                  <span className="member-email"> {member.email} </span>
                  <button onClick={() => remove(member.id)} className='deleteMembInGroup'>remove</button>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="createListDeleteGroup">
          <Link to='/dashboard'>
            <button onClick={() => { dispatch(deleteGroupThunk(groupId)) }} className='deleteGroupBtn'>Delete Group</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
