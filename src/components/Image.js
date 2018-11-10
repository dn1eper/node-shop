import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Image.css';

const Image = ({ url, className }) => (
	<img className={className} src={url} alt={'#'}/>
);

Image.propTypes = {
	url: PropTypes.string.isRequired
};

export default Image;
