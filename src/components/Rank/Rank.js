import React from 'react';

const Rank = ({ name, rank }) => {
	return (
		<div>
			<div className='f3 black ma0'>
				{`${name}, your current rank is ...`}
			</div>
			<div className='f2 black'>
				{`${rank}`}
			</div>
		</div>
	);
}

export default Rank;