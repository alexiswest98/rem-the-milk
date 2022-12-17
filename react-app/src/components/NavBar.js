import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'
import { logout } from './../store/session'
import whiteLogo from '../Images/logowhite.png'
const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)


  if (user) return (
    <nav className="navbar">
      <NavLink to='/home'>
        <div className="navBarLogo">
          <img src={whiteLogo} alt="" />
        </div>
      </NavLink>
      <ul>
        <li className="navbarLi">
          <NavLink to='/aboutUs' exact={true} activeClassName='active'>
            About Us
          </NavLink>
        </li>
        <li className="navbarLi">
          <NavLink to='/dashboard' exact={true} activeClassName='active'>
            Dashboard
          </NavLink>
        </li>
        <li className="navbarLi">
          <NavLink to='/users' exact={true} activeClassName='active'>
            Find Friends
          </NavLink>
        </li>
        <li className="navbarLi">
          <NavLink to='/followers' exact={true} activeClassName='active'>
            Followers
          </NavLink>
        </li>
        <li className="navbarLi" id="logoutnavbtnli">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
  if (!user) return (
    <div className="nonUserDiv">
      <NavLink to='/'>
        <div className="navBarLogoNoUser">
          <img src={whiteLogo} alt="" />
        </div>
        <div>
          <p></p>
        </div>
      </NavLink>

      <ul>
        <li className="navbarLiNoUser">
          <NavLink to='/aboutUs' exact={true} activeClassName='active'>
            About Us
          </NavLink>
        </li>

        <li className="navbarLiNoUser">
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>

        <li className="navbarLiNoUser">
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>

      </ul>
    </div>
  )
}

export default NavBar;
