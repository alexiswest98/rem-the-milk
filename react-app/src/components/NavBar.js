import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  // // const currUser = curr.user.id
  // // console.log(currUser)
  // if (user){
  //   let currUser = user.id
  // }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {user?
          <li>
          <NavLink to='/dashboard' exact={true} activeClassName='active'>
            Dashboard
          </NavLink>
        </li>
          :
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        }
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Find Friends
          </NavLink>
        </li>
        <li>
          <NavLink to='/followers' exact={true} activeClassName='active'>
            Followers
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
