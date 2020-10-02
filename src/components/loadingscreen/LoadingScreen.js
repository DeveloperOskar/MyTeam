import React from 'react';
import './LoadingScreen.css';
import RingLoader from 'react-spinners/RingLoader';

const LoadingScreen = () => {
  return (
    <div id='loading-screen-container'>
      <h1 className='mb4'>Loading...</h1>
      <div>
        <RingLoader size={100} color={'white'} loading={true} />
      </div>
    </div>
  );
};

export default LoadingScreen;
