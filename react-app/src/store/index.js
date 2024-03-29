import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import groupReducer from './groups';
import tasksReducer from './tasks';
import listsReducer from './lists';
import followsReducer from './follows';
import specTasksReducer from './specTasks';
import usersReducer from './users';
import membersReducer from './members';
import userMembersReducer from './allmems';
import followingReducer from './following';

const rootReducer = combineReducers({
  session,
  groups: groupReducer,
  tasks: tasksReducer,
  lists: listsReducer,
  follows: followsReducer,
  following: followingReducer,
  specTask: specTasksReducer,
  users: usersReducer,
  members: membersReducer,
  userGroups: userMembersReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
