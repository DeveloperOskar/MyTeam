import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Anime from 'animejs/lib/anime.es.js';
import SignIn from '../signIn/SignIn';
import {
  faHome,
  faQuestionCircle,
  faEnvelope,
  faSignInAlt,
  faTimesCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [IsNavShowning, setIsNavShowning] = useState(false);
  const [Page, setPage] = useState('/');
  const indexLink = useRef(null);
  const signupLink = useRef(null);
  const contactUsLink = useRef(null);
  const aboutUsLink = useRef(null);

  useEffect(() => {
    const setCurrentPageOnNav = () => {
      setPage(window.location.pathname);
      let elemet = document.querySelector('.current-selected-option');
      if (elemet) {
        elemet.classList.replace(
          'current-selected-option',
          'current-not-selected-option'
        );
      }

      if (Page === '/') {
        indexLink.current.classList.add('current-selected-option');
        signupLink.current.classList.add('current-not-selected-option');
        contactUsLink.current.classList.add('current-not-selected-option');
        aboutUsLink.current.classList.add('current-not-selected-option');
        return;
      } else if (Page === '/Signup') {
        indexLink.current.classList.add('current-not-selected-option');
        signupLink.current.classList.add('current-selected-option');
        contactUsLink.current.classList.add('current-not-selected-option');
        aboutUsLink.current.classList.add('current-not-selected-option');
        return;
      } else if (Page === '/Contact') {
        indexLink.current.classList.add('current-not-selected-option');
        signupLink.current.classList.add('current-not-selected-option');
        contactUsLink.current.classList.add('current-selected-option');
        aboutUsLink.current.classList.add('current-not-selected-option');
        return;
      } else {
        return;
      }
    };
    setCurrentPageOnNav();
  }, [Page]);

  let hasBuggedFixed = false; //Fixing bugg where nav items dont show bcs of anime , is animation out <ul>
  window.addEventListener('resize', () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw > 1055 && hasBuggedFixed !== true) {
      hasBuggedFixed = true;
      setIsNavShowning(true);
      Anime({
        targets: '#nav-ul',
        easing: 'easeOutExpo',
        translateX: ['-100%', '0%'],
      });
      const lis = document.querySelectorAll('.one-nav-link');
      var tl = Anime.timeline({
        easing: 'easeOutExpo',
        duration: 50,
      });
      lis.forEach((li) => {
        tl.add({
          targets: li,
          translateX: ['-100%', '-0%'],
        });
      });
    }
  });

  const ToggleNav = () => {
    if (IsNavShowning) {
      Anime({
        targets: '#nav-ul',
        easing: 'easeOutExpo',
        translateX: ['0%', '-100%'],
        duration: 200,
        complete: function () {
          const lis = document.querySelectorAll('.one-nav-link');
          var tl = Anime.timeline({
            easing: 'easeOutExpo',
            duration: 50,
          });
          lis.forEach((li) => {
            tl.add({
              targets: li,
              translateX: ['0%', '-100%'],
            });
          });
        },
      });
      setIsNavShowning(false);
      document.querySelector('html').style.overflowY = 'auto';
    } else {
      Anime({
        targets: '#nav-ul',
        easing: 'easeOutExpo',
        translateX: ['-100%', '0%'],
        duration: 700,
        complete: function () {
          const lis = document.querySelectorAll('.one-nav-link');
          var tl = Anime.timeline({
            easing: 'easeOutExpo',
            duration: 200,
          });
          lis.forEach((li) => {
            tl.add({
              targets: li,
              translateX: ['-100%', '0%'],
            });
          });
        },
      });
      setIsNavShowning(true);
      document.querySelector('html').style.overflowY = 'hidden';
    }
  };

  const toggleLoginContainer = () => {
    if (
      document.querySelector('#mobile-sign-in-cover').style.display === 'flex'
    ) {
      document.querySelector('#mobile-sign-in-cover').style.display = 'none';
      document.querySelector('html').style.overflowY = 'auto';
    } else {
      document.querySelector('#mobile-sign-in-cover').style.display = 'flex';
      document.querySelector('html').style.overflowY = 'hidden';
    }
  };

  return (
    <nav id='main-navbar'>
      <div id='nav-header'>
        <img
          src='/imgs/Brand-logo-min.png'
          alt='brand-logo'
          className='brand-logo-sm ml2 mt1'
        />
        <h1 className='color-white ml2'>My Team</h1>
      </div>

      <img
        src='/imgs/burger.svg'
        alt='mobile navigation icon'
        id='mobile-nav'
        className='mr2'
        onClick={ToggleNav}
      />
      <ul id='nav-ul'>
        <h2 className='color-white mt2 mb1'>Menu</h2>
        <div id='li-wrapper'>
          <div id='li-item-links'>
            <li className='mt2 one-nav-link' ref={indexLink} id='index-link'>
              <Link
                to='/'
                onClick={() => {
                  setPage('/');
                }}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  className='menu-icon '
                  color={'white'}
                />
                <p className='color-white '>Home</p>
              </Link>
            </li>

            <li className='mt3 one-nav-link' ref={aboutUsLink}>
              <Link to='/test'>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className='menu-icon'
                  color={'white'}
                />
                <p className='color-white '>About Us</p>
              </Link>
            </li>

            <li className='mt3 one-nav-link' ref={signupLink}>
              <Link
                to='/Signup'
                id='signup-link'
                onClick={() => {
                  setPage('/Signup');
                }}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className='menu-icon'
                  color={'white'}
                />
                <p className='color-white '>Sign Up</p>
              </Link>
            </li>

            <li className='mt3 one-nav-link' ref={contactUsLink}>
              <Link to='/test2'>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className='menu-icon'
                  color={'white'}
                />
                <p className='color-white '>Contact Us</p>
              </Link>
            </li>
          </div>
          <div>
            <li
              className='mt3 one-nav-link'
              id='sign-in-link'
              onClick={() => {
                toggleLoginContainer();
              }}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
                className='menu-icon'
                color={'white'}
              />
              <p className='color-white '>Sign In</p>
            </li>
          </div>
        </div>

        <div id='close-menu-wrapper' onClick={ToggleNav}>
          <FontAwesomeIcon
            icon={faTimesCircle}
            size='3x'
            color='white'
            className='mb3 mr3'
          />
        </div>
      </ul>
      <SignIn toggleLoginContainer={toggleLoginContainer} />
    </nav>
  );
};

export default Navbar;
