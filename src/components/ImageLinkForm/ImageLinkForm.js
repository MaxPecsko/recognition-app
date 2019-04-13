import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'This App wil help you detect faces. Probably...'}
			</p>
	   		<div className='center'>
		 		<div className=' form center pa3 br1 shadow-5'>
					<input className='br1 f4 pa1 w-70 center' type="text" onChange={onInputChange}/>
		 			<button className='br1 w-30 grow f4 link ph3 pv2 dib white bg-purple' onClick={onImageSubmit}>Detect</button>
				</div>
			</div>
		</div>
  )
};

export default ImageLinkForm;