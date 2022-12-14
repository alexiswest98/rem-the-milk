const FOLLOWUSER = 'follows/addFollow'
const UNFOLLOWUSER = 'follows/unfollow'
const GETFOLLOWERS = 'follows/getFollows'
const GETFOLLOWING = 'follows/getFollowing'

export const followAction = (userId) => {
    return {
      type: FOLLOWUSER,
      userId,
    };
  };

  export const unfollowAction = (userId) => {
    return {
      type: UNFOLLOWUSER,
      userId,
    };
  };

  export const getFollowersAction = (currentUser) => {
    return {
      type: GETFOLLOWERS,
      currentUser,
    };
  };

  export const getFollowingAction = (currentUser) => {
    return {
      type: GETFOLLOWING,
      currentUser,
    };
  };


  export const followThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/add/${userId}`,
    {
   method: 'POST',
   headers: {'Content-Type':'application/json'},
   body: JSON.stringify({
    userId: userId
  })
   })

   if (response.ok) {
    const newFollower = await response.json();
    dispatch(followAction(newFollower.id))
     }


  };

  export const unfollowThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/delete/${userId}`, {method: 'DELETE'});
    if (response.ok) {
        const userToUnfollow = await response.json();
        dispatch(unfollowAction(userToUnfollow.id))
    }
  };

  export const getFollowsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/follows/followers`);
    if (response.ok) {
      const data = await response.json();
      dispatch(getFollowersAction(data));
    }
  };

  export const getFollowingThunk = () => async (dispatch) => {
    const response = await fetch(`/api/follows/following`);
    if (response.ok) {
      const data = await response.json();
      dispatch(getFollowingAction(data));
    }
  };

  export default function followsReducer(state = {}, action){
    let newState = {}
  switch(action.type){

    case FOLLOWUSER:
      newState[action.userThatFollows.id] = action.userThatFollows
          return newState

    case UNFOLLOWUSER:
        newState = {...state}
        delete newState[action.userThatFollows]
        return newState

    case GETFOLLOWERS:
        newState[action.currentUser.id] = action.currentUser.followers
        return newState

    case GETFOLLOWING:
        newState[action.currentUser.id] = action.currentUser.following
        return newState

    default:
        return state
}
}
