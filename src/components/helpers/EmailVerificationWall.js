import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { auth } from '../firebase/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const EmailVerificationWall = () => {
  return (
    <div id='email-wall'>
      <h1 className='mt4 mb2 color-white'>You are almost done!</h1>
      <p className='color-white'>
        we need you to verify your email address to start using MyTeam. Use the
        link we send to your email and refresh this page!
      </p>
      <div className='mt3'>
        <RingLoader size={100} color={'white'} loading={true} />
      </div>
      <button
        onClick={() => {
          auth.signOut();
        }}
        className='mt3'
      >
        Sign Out
        <FontAwesomeIcon icon={faSignOutAlt} size='lg' className='ml1' />
      </button>{' '}
    </div>
  );
};

export default EmailVerificationWall;
