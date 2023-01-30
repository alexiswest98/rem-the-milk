const GetMembers = 'members/GetMembers'

export const GetMembersAction = (members) => {
  return{
    type: GetMembers,
    members
  }
}

export const GetUsersGroupsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/members/all`)
  // console.log('made it to mem thunk, res = ', res)
  if(res.ok){
    const data = await res.json();
    // console.log('data = ', data)
    dispatch(GetMembersAction(data))
    return data
  }
}


export default function userMembersReducer(state = {}, action){
  let newState = {}
  switch(action.type){
    case GetMembers:
      action.members.forEach( member => newState[member.id] = member)
      return newState

    default:
      return state
  }
}
