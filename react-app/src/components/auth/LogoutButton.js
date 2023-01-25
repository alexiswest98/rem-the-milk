import React from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './logoutbutton.css'


const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
    // return history.push('/');
  };

  return <button className="home-page-navig" id='logout-butt' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
