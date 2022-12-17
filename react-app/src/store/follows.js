const FOLLOWUSER = 'follows/addFollow'
const UNFOLLOWUSER = 'follows/unfollow'
const GETFOLLOWERS = 'follows/getFollows'
const GETFOLLOWING = 'follows/getFollowing'


export const followAction = (user) => {
  return {
    type: FOLLOWUSER,
    user,
  };
};

export const unfollowAction = (userId) => {
  return {
    type: UNFOLLOWUSER,
    userId,
  };
};

export const getFollowersAction = (followers) => {
  return {
    type: GETFOLLOWERS,
    followers,
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
      headers: { 'Content-Type': 'application/json' },
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
  const response = await fetch(`/api/follows/delete/${userId}`, { method: 'DELETE' });
  if (response.ok) {
    const userToUnfollow = await response.json();
    dispatch(unfollowAction(userToUnfollow.id))
  }
};

export const getFollowsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/follows/followers`);
  // console.log('data from getfollows thunk', response)
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

export default function followsReducer(initialState = {}, action) {
  let newState = {}
  switch (action.type) {

    case FOLLOWUSER:
      newState = { followers: {}, ...initialState }
      newState.followers[action.user.id] = action.user
      return newState

    case UNFOLLOWUSER:
      newState = { followers: {}, ...initialState }
      delete newState.followers[action.userId]
      return newState

    case GETFOLLOWERS:
      newState = { ...initialState }
      action.followers.forEach(follower => newState[follower.id] = follower)
      return newState

    case GETFOLLOWING:
      newState = { followers: {}, ...initialState }
      action.currentUser.forEach(follow => newState.followers[follow.id] = follow)
      return newState

    default:
      return initialState
  }
}
