const GETONEGROUP = 'groups/getOneGroup'
const GETALLGROUPS = 'groups/getAllGroups'
const CREATEONEGROUP = 'groups/createGroup'
const DELETEGROUP = 'groups/deleteGroup'

export const getGroupAction = (group) => {
  return {
    type: GETONEGROUP,
    group,
  };
};

export const getGroupsAction = (groups) => {
  return {
    type: GETALLGROUPS,
    groups,
  };
};

export const createGroupAction = (group) => {
  return {
    type: CREATEONEGROUP,
    group,
  };
};

export const deleteGroupAction = (groupId) => {
  return {
    type: DELETEGROUP,
    groupId,
  };
};


export const createGroupThunk = (group) => async (dispatch) => {
  const { name, image_url, owner_id  } = group;
  const response = await fetch('/api/groups/create',
  {
 method: 'POST',
 headers: {'Content-Type':'application/json'},
 body: JSON.stringify({
  name,
  image_url,
  owner_id
})
 })

 if (response.ok) {
   const newGroup = await response.json();
   createGroupAction(newGroup);
   return newGroup;
    }
};


export const getGroupsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/groups/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getGroupsAction(data));
  }
};

export const getAllGroupsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/groups/act/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getGroupsAction(data));
    return data;
  }
};



export const getGroupThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getGroupAction(data));
    return data;
  }
};

//Thunk for deleting a group
export const deleteGroupThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`, {method: 'DELETE'});
  if (response.ok) {
    dispatch(deleteGroupAction(groupId));
    return response;
  }
};


export default function groupReducer(state = {}, action){
  let newState = {}
switch(action.type){

  case GETONEGROUP:
    newState[action.group.id] = action.group
        return newState

  case GETALLGROUPS:
    action.groups.forEach(group => {
      newState[group.id] = group
    })
    return newState

  case CREATEONEGROUP:
    newState = {...state}
    newState[action.group.id] = action.group
    return newState

  case DELETEGROUP:
    newState = {...state}
    delete newState[action.groupId]
    return newState

  default:
    return state
}
}
