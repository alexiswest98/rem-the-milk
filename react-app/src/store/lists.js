const GetOneList = 'lists/getOneList' //done
const GetAllLists = 'lists/getAllLists' //done
const CreateList = 'lists/createList' //done
const UpdateList = 'lists/updateList' //done
const DeleteList = 'lists/deleteList' //done
const GETLISTSBYGROUP = 'groups/lists'
/* -----------ACTION----------- */
export const GetOneListAction = (list) => {
  return {
    type: GetOneList,
    list
  };
};

export const GetAllListAction = (Lists) => {
  return {
    type: GetAllLists,
    Lists
  };
};

export const CreateListAction = (List) => {
  return {
    type: CreateList,
    List
  };
};

export const UpdateListAction = (List) => {
  return {
    type: UpdateList,
    List
  };
};

export const DeleteListAction = (id) => {
  return {
    type: DeleteList,
    id
  };
};

export const GetListsByGroupAction = (group) => {
  return {
    type: GETLISTSBYGROUP,
    group
  };
};
/* ------------THUNK----------- */
// Get lists for user
export const GetOneListThunk = () => async (dispatch) => {
  const res = await fetch(`/api/lists/all`);
  if (res.ok) {
    const data = await res.json();
    dispatch(GetOneListAction(data))
  }
}
// Get all Lists
export const GetAllListsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/lists/all`);
  if (res.ok) {
    const data = await res.json();
    dispatch(GetAllListAction(data))
    return data
  }
}

// Delete list
export const DeleteListThunk = (list_id) => async (dispatch) => {
  const res = await fetch(`/api/lists/${list_id}`, { method: 'DELETE' });
  if (res.ok) {
    dispatch(DeleteListAction(list_id))
  }
}

// Edit List
export const EditListThunk = (list) => async (dispatch) => {
  const res = await fetch(`/api/lists/${list.id}`, {
    method: 'PUT',
    body: JSON.stringify(list)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(UpdateListAction(data))
    return data
  }
}
// Create List
export const CreateListThunk = (list) => async (dispatch) => {
  const res = await fetch(`/api/lists/`, {
    method: 'POST',
    body: JSON.stringify(list)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(CreateListAction(data))
    return data
  }
}

// Get lists by group
export const groupListThunk = (group, groupId) => async (dispatch) => {
  const response = await fetch(`/api/lists/groups/${groupId}`);
  const group = await response.json();
  dispatch(GetListsByGroupAction(group))
}


/* ------------REDUCER----------- */
export default function listsReducer(state = {}, action) {
  let newState = {};

  switch (action.type) {

    case GetAllLists:
      action.Lists.forEach(list => newState[list.id] = list)
      return newState

    case GetOneList:
      newState[action.list.id] = action.list
      return newState

    case UpdateList:
      newState = { ...state }
      newState[action.list.id] = action.list
      return newState

    case DeleteList:
      newState = { ...state }
      delete newState[action.id]
      return newState

    case CreateList:
      newState = { ...state }
      newState[action.list.id] = action.list
      return newState

    case GETLISTSBYGROUP:
      newState[action.group.id] = action.group
      return newState

    default:
      return state
  }
}
