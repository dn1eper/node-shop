import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, ABOUT, CONTACT_US }  from '../Constants';
import 'styles/Footer.css';
// No props yet
let Footer = ({ dispatch }) => (
	<footer>

	  <div className="footer__map">
		<span className="footer__map__header">
		  Site map
		</span>
		<Link to={`/${HOME}`} >
		  Home
		</Link>

		<Link to={`/${ABOUT}`} >
		  About
		</Link>

		<Link to={`/${CONTACT_US}`} >
		  Write to us
		</Link>

	  </div>
			<div className="footer__information">
				<span className="footer__map__header">
					Shop (C) 2018
				</span>
	  </div>
	</footer>
);

export default Footer;
