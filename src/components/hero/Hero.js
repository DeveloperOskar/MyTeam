import React from 'react';
import './Hero.css';
const Hero = () => {
  return (
    <div id='hero' className='color-white'>
      <header>
        <div id='hero-header'>
          <h1 className='mt4'>My Team</h1>
          <p className='italic mt1'>Coaching and training at the next level!</p>
          <hr className='mt2'></hr>
          <button className='mt2'>Learn More</button>
        </div>
      </header>
    </div>
  );
};

export default Hero;
