import React from 'react';
import Tilt from 'react-tilt';
import moon from './black-hole.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" 
        options={{ max : 25 }} 
        style={{ 
          height: 150, 
          width: 150, 
          backgroundImage: 'linear-gradient(to right top, #0554c9, #ca42b8, #ff5180, #ff9942, #ffe528)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          }}> 
       <div className="Tilt-inner pa3"><img alt='logo' src={moon}/></div>
      </Tilt>
    </div>
  )
};

export default Logo;

