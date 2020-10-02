import React from 'react';
import './FacebookSignIn.css';
const FacebookSignIN = ({ onClick }) => {
  return (
    <button
      type='button'
      className='facebookButton mb3 signup-button'
      onClick={onClick}
    >
      <img
        className='mr1'
        src='/imgs/facebook.svg'
        height='20px'
        alt='facebook brand'
      />
      Sign in with Facebook
    </button>
  );
};

export default FacebookSignIN;
