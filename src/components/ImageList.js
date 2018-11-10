import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import 'styles/ImageList.css';

const ImageList = ({ images }) => (
	<div className="image-list">
	  {images.map((img, index) => (
		  <Image key={index}
				 className={index === 0 ? 'visible' : 'invisible'}
				 {...img} />
	  ))}
	</div>
);

ImageList.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired
		})
	).isRequired
};

export default ImageList;
