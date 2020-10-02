import React from 'react';
const GoogleSignIn = ({ onClick }) => {
  return (
    <button
      type='button'
      className='googlebutton mb2 signup-button mt2'
      onClick={onClick}
    >
      <img
        className='mr1 '
        src='/imgs/google.svg'
        alt='google brand'
        width='20px'
      />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
