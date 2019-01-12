import React from 'react';
import PropTypes from 'prop-types';
import 'styles/MenuItem.css';
import { HOME, ABOUT, ALL_POSTS,
		 ORDERS, MESSAGES, CONTACT_US, LOGIN_URL, LOGOUT_URL, CART_URL } from 'Constants';
import I18n from 'i18n';

function translateItem(item, param, locale) {
	switch (item) {
	case HOME: return I18n[locale].menu.home;
	case ABOUT: return I18n[locale].menu.about;
	case ALL_POSTS: return I18n[locale].menu.all_posts;
	case ORDERS: return I18n[locale].menu.orders;
	case MESSAGES: return I18n[locale].menu.messages;
	case LOGIN_URL: return I18n[locale].menu.login;
	case CONTACT_US: return I18n[locale].menu.contact_us;
	case LOGOUT_URL: return I18n[locale].menu.logout;
	case CART_URL: return I18n[locale].menu.cart+ ' (' + param + ')';
	default: return '';
	}
}

// Make it more complicated if needed
const MenuItem = ({ item, param, locale }) => (
	<div className="menu-item">
	  {translateItem(item, param, locale)}
	</div>
);

MenuItem.propTypes = {
	item: PropTypes.string.isRequired,
  param: PropTypes.number,
	locale: PropTypes.string,
};

export default MenuItem;
