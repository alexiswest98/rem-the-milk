import UsersList from "../components/UsersList/UsersList"
import { groupListThunk } from "./lists"

const AddMember = 'members/AddMember'
const RemoveMember = 'members/RemoveMember'
const GetMembers = 'members/GetMembers'


export const GetMembersAction = (members) => {
  return{
    type: GetMembers,
    members
  }
}

export const RemoveMemberAction = (member) => {
  return{
    type: RemoveMember,
    member
  }
}

export const AddMemberAction = (member) => {
  return{
    type: AddMember,
    member
  }
}


export const GetMembersThunk = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/members/group/${groupId}`)
  console.log('made it to the thunk, res = ', res)
  if(res.ok){
    const data = await res.json();
    console.log('data = ', data)
    dispatch(GetMembersAction(data))
    return data
  }
}

export const RemoveMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/members/delete/${userId}/group/${groupId}`,{
  method: 'Delete',
  body: JSON.stringify({groupId, userId})
  }
  )
  console.log('you are in the remove member thunk, res = ', res)
  if(res.ok){
    const data = await res.json();
    dispatch(GetMembersThunk(groupId))
    console.log('res successful, data = ', data)
  }
}

export const AddMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/members/add/${userId}/group/${groupId}`,{
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({groupId, userId})
  }
  )
  console.log('you are in the add member thunk, res = ', res)
  if(res.ok){
    const data = await res.json();
    dispatch(GetMembersThunk(groupId))
    console.log('res successful, data = ', data)
  }
}


export default function membersReducer(state = {}, action){
  let newState = {}
  switch(action.type){
    case GetMembers:
      action.members.forEach( member => newState[member.id] = member)
      return newState

    case AddMember:
      newState = { ...state }
      newState[action.member.id] = action.member
      return newState

    case RemoveMember:
      newState = { ...state }
      delete newState.member[action.member.id]
      return newState

    default:
      return state
  }
}
