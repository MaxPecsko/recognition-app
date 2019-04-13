import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn === true) {
		return (
			<nav style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}>
				<Logo />
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		)
	} else {
		return (
			<nav style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start'
			}}>
				<Logo />
				<div style={{
					padding: '20px',
					display: 'flex'
				}}>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 ma2 pointer'>Sign In</p>
					<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 ma2 pointer'>Register</p>
				</div>
			</nav>
		)
	}
};

export default Navigation;