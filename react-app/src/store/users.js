const GETALLUSERS = '/get/users'

export const getAllUsersAction = (users) => {
    return {
        type: GETALLUSERS,
        users
    }
}

export const getAllUsersThunk= (users) => async(dispatch) => {
    const response = await fetch('/api/users/');
    const users = await response.json();
    // console.log('users ------------------------------', users.users)
    dispatch(getAllUsersAction(users.users));
}


export default function usersReducer(state = {}, action){
    let newState = {}
  switch(action.type){

    case GETALLUSERS:
        action.users.forEach( user => newState[user.id] = user )
        return newState



    default:
      return state
  }
  }
