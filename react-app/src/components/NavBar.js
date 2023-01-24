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
    <div className="navbar">
      <div className="navBarLogo">
        <NavLink to='/home'>
          <img src={whiteLogo} alt="logo" className="logo-img" />
        </NavLink>
      </div>
      <div className="second-half-nav-bar">
        <div className="nav-bar-list">
          <div className="navbarLi">
            <NavLink to='/aboutUs' exact={true} className='active'>
              About Us
            </NavLink>
          </div>
          <div className="navbarLi">
            <NavLink to='/dashboard' exact={true} className='active'>
              Dashboard
            </NavLink>
          </div>
          <div className="navbarLi">
            <NavLink to='/users' exact={true} className='active'>
              Find Friends
            </NavLink>
          </div>
          <div className="navbarLi">
            <NavLink to='/followers' exact={true} className='active'>
              Following
            </NavLink>
          </div>
          <div id="logoutnavbtnli">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
  //home page bar 
  if (!user) return (
    <div className="navbar" id="logged-out-nav">
      <div className="inner-nav-bar">
        <div className="navBarLogo">
          <NavLink to='/'>
            <img src={whiteLogo} alt="logo" className="logo-img" />
          </NavLink>
        </div>
        <div className="second-half-nav-bar">
          <div className="nav-bar-list">
            <NavLink to='/aboutUs' exact={true} className="navbarLi">
              <div className="about-us-home">
                About Us
              </div>
            </NavLink>
            <NavLink to='/login' exact={true} className="navbarLi-navig">
              <div className="home-page-navig">
                Login
              </div>
            </NavLink>
            <NavLink to='/sign-up' exact={true} className="navbarLi-navig">
              <div className="home-page-navig">
                Sign Up
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
