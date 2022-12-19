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
    history.push('/');
    await dispatch(logout());
    // return history.push('/');
  };

  return <button className='logout-butt btn-6' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
