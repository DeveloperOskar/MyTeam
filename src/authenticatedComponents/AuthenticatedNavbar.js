import React from 'react';
import './Authenticatednavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
const AuthenticatedNavbar = ({ userPhotoUrl }) => {
  return (
    <nav id='auth-nav'>
      <img
        id='nav-profile-pic'
        src={
          userPhotoUrl ? userPhotoUrl : '/imgs/user-profile-pic-placeholder.svg'
        }
        alt='profile img'
      ></img>

      <div id='nav-menus-options-btns-wrapper'>
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          size='lg'
          id='drow-down-menu'
        />
        <img
          id='auth-nav-burger'
          src='/imgs/burger.svg'
          alt='hamburger nav'
        ></img>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
