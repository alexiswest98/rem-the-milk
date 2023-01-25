const GETFOLLOWING = 'following/getFollowing'

export const getFollowingAction = (currentUser) => {
  return {
    type: GETFOLLOWING,
    currentUser,
  };
};
export const getFollowingThunk = () => async (dispatch) => {
  const response = await fetch(`/api/follows/following`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getFollowingAction(data));
  }
};

      export default function followingReducer(initialState = {}, action) {
        let newState = {}
        switch (action.type) {
          case GETFOLLOWING:
            newState = { followers: {}, ...initialState }
            action.currentUser.forEach(follow => newState.followers[follow.id] = follow)
            return newState
          default:
            return initialState
        }
      }
