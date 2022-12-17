import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList/UsersList';
import { authenticate } from './store/session';
import ProfileForm from './components/splashPage/profilePage';
import Dashboard from './components/DashBoard';
import CreateList from './components/Lists/CreateLists';
import GetFollowers from './components/followers';
import GetOneGroup from './components/oneGroup';
import CreateAGroup from './components/createGroup';
import UpdateList from './components/Lists/updateList';
import EditListTask from './components/UpdateTasks/updateTasks';
import Home from './components/Home';
import CreateATaskModal from './components/ListTasks';
import NewHomePage from './components/newHome';
import CreateListTask from './components/ListTasks/CreateListTask';
import LoginPage from './components/loginpage';
import SignupPage from './components/signupPage';
import CompleteTasksPage from './components/ListTasks/completedTasks';
import IncompleteTasksPage from './components/ListTasks/incompleteTasks';
import CreateGroupList from './components/Groups/CreateGroupLists';
import NewListPage from './components/Lists/newListPage';
import TodayTaskPage from './components/DayTasks/todayTasks';
import TomTaskPage from './components/TommTasks/tommTask';
import MonthTaskPage from './components/MonthTasks/monthTasks';
import CompTaskPage from './components/ListTasks/compTaskHome';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
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
      <Switch>
        <Route path='/groups/:groupId/list' exact={true}>
          <CreateGroupList />
        </Route>
        <Route path='/tasks/all' exact={true}>
          <IncompleteTasksPage />
        </Route>
        <Route path='/tasks/completed' exact={true}>
          <CompTaskPage />
        </Route>
        {/* <Route path='/tasks/incomplete' exact={true}>
          <IncompleteTasksPage />
        </Route> */}
        <Route path='/tasks/today' exact={true}>
          <TodayTaskPage/>
        </Route>
        <Route path='/tasks/tomorrow' exact={true}>
          <TomTaskPage/>
        </Route>
        <Route path='/tasks/month' exact={true}>
          <MonthTaskPage/>
        </Route>
        <Route path='/list/edit/:listId' exact={true}>
          <UpdateList />
        </Route>
        <Route path='/lists/:listId/Tasks/edit/:taskId' exact={true}>
          <EditListTask />
        </Route>
        <Route path='/Tasks/new/:listId' exact={true}>
          <CreateListTask />
        </Route>
        <Route path='/lists/new' exact={true}>
          <CreateList />
        </Route>
        <Route path='/lists/:listId' exact={true}>
          <NewListPage/>
        </Route>
        <Route path='/profile' exact={true}>
          <ProfileForm />
        </Route>
        <Route path='/tasks/create' exact={true}>
          <CreateATaskModal />
        </Route>
        <Route path='/groups/create' exact={true}>
          <CreateAGroup />
        </Route>
        <Route path='/groups/:groupId' exact={true}>
          <GetOneGroup />
        </Route>
        <Route path='/dashboard' exact={true} >
          <Dashboard />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignupPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/followers' exact={true} >
          {/* <h1>FIX THIS</h1> */}
          <GetFollowers />
        </ProtectedRoute>
        <Route path='/lists' exact={true} >
          <h1>My Lists</h1>
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <NewHomePage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

{/* <Link to='/tasks/create'>
<button>Create a Task</button>
</Link> */}



export default App;
