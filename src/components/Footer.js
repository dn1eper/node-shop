import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { localeSwitch } from 'actions/localeActions';
import { HOME, ABOUT, CONTACT_US }  from '../Constants';
import I18n from 'i18n';
import 'styles/Footer.css';
// No props yet

let Footer = ({ locale, onRULocaleClick, onENLocaleClick }) => (
	<footer>

	  <div className="footer__map">
		<span className="footer__map__header">
		    {I18n[locale].footer.site_map}
		</span>
		<Link to={`/${HOME}`} >
			{I18n[locale].footer.home}
		</Link>

		<Link to={`/${ABOUT}`} >
			{I18n[locale].footer.about}
		</Link>

		<Link to={`/${CONTACT_US}`} >
			{I18n[locale].footer.write_to_us}
		</Link>

	  </div>
			<div className="footer__information">
				<span className="footer__map__header">
					{I18n[locale].footer.copyright}
				</span>
				<span onClick={onRULocaleClick} className="footer__locale">ru</span> 
				<span onClick={onENLocaleClick} className="footer__locale">en</span>
	  </div>
	</footer>
);

let FooterComponent = connect(
	state => ({
		locale: state.locale,
	}),
	dispatch => ({
		onRULocaleClick: locale => {
			dispatch(localeSwitch('ru'));
		},
		onENLocaleClick: locale => {
			dispatch(localeSwitch('en'));
		}
	}),
)(Footer);

export default FooterComponent;
