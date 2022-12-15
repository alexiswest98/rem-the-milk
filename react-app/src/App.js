import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ProfileForm from './components/splashPage/profilePage';
import ListPage from './components/Lists/listPage';
// import Dashboard from './components/DashBoard';
import CreateList from './components/Lists/CreateLists';
import GetGroups from './components/allGroups';
import GetFollowers from './components/followers';
import GetOneGroup from './components/oneGroup';
import CreateAGroup from './components/createGroup';
import UpdateList from './components/Lists/updateList';
import EditListTask from './components/Tasks/updateTasks';


import CreateListTask from './components/Tasks/CreateListTask';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <GetFollowers/>
      <Switch>
      {/* new new */}
      <Route path='/list/edit/:listId' exact={true}>
          <UpdateList/>
        </Route>
      <Route path='/lists/:listId/Tasks/edit/:taskId' exact={true}>
          <EditListTask/>
        </Route>
      <Route path='/Tasks/new/:listId' exact={true}>
          <CreateListTask/>
        </Route>
      <Route path='/lists/new' exact={true}>
          <CreateList/>
        </Route>
      <Route path='/lists/:listId' exact={true}>
          <ListPage/>
        </Route>
      {/* new new */}
        <Route path='/profile' exact={true}>
          <ProfileForm/>
        </Route>
        <Route path='/groups/create' exact={true}>
          <CreateAGroup/>
        </Route>
        <Route path='/groups/:groupId' exact={true}>
          <GetOneGroup/>
        </Route>
        <Route path='/dashboard' exact={true} >
          <Dashboard />
        </Route> 
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/lists' exact={true} >
          <h1>My Lists</h1>
        </Route>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
