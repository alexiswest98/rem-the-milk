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

export const GetAllListAction = (lists) => {
  return {
    type: GetAllLists,
    lists
  };
};

export const CreateListAction = (list) => {
  return {
    type: CreateList,
    list
  };
};

export const UpdateListAction = (list) => {
  return {
    type: UpdateList,
    list
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
  const {id, name, due, notes, user_id, completed} = list
  console.log('destructured variables = ',id, name, due, notes, user_id, completed)
  console.log("URL =", `/api/lists/${id}`)
  const res = await fetch(`/api/lists/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      name,
      due,
      notes,
      user_id,
      completed
    })
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(UpdateListAction(data))
    console.log('Res.ok and dispatch hit.')
    console.log('data = ',data)
    return data
  }
}
// Create List
export const CreateListThunk = (list) => async (dispatch) => {
  const {id, name, due, notes, user_id, completed} = list
  const res = await fetch(`/api/lists/new`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(list)
  });
  console.log('response =', res )
  if (res.ok) {
    const data = await res.json()
    console.log("Hit the thunk, data = ", data)
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
      action.lists.forEach(list => newState[list.id] = list)
      return newState

    case GetOneList:
      newState[action.list.id] = action.list
      return newState

      case UpdateList:
        newState = { ...state }
        newState[action.list.id] = {...newState[action.list.id], ...action.list}
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
