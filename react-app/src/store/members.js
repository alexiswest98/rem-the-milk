import UsersList from "../components/UsersList/UsersList"

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
  const res = await fetch(`/api/members/${groupId}`)
  if(res.ok){
    const data = await res.json();
    dispatch(GetMembersAction(data))
  }
}

export const RemoveMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/members/${groupId}/delete/${userId}`)
  if(res.ok){
    const data = await res.json();
    dispatch(RemoveMemberAction(data))
  }
}

export const AddMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/members/${groupId}/add/${userId}`)
  if(res.ok){
    const data = await res.json();
    dispatch(AddMemberAction(data))
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
      delete newState.members[action.member.id]
      return newState

    default:
      return state
  }
}
