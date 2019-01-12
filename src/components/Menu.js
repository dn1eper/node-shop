import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItem from 'components/MenuItem';
import { HOME, ABOUT, LOGIN_URL, LOGOUT_URL, CONTACT_US, CART_URL } from 'Constants';
import 'styles/Menu.css';

/* Clean components must not have logic inside
   Must only show something
   All unclean components are containers
*/

const Menu = (props) => {
    var lastMenuItem = props.isSigned ? LOGOUT_URL : LOGIN_URL;

    return (
        <div className="menu">

        <NavLink to={`/${HOME}`} >
            <MenuItem item={HOME} locale={props.locale}/>
        </NavLink>

        <NavLink to={`/${ABOUT}`} >
            <MenuItem item={ABOUT} locale={props.locale}/>
        </NavLink>


        <NavLink to={`/${CONTACT_US}`} >
            <MenuItem item={CONTACT_US} locale={props.locale}/>
        </NavLink>

        <NavLink to={`/${CART_URL}`} >
            <MenuItem item={CART_URL} locale={props.locale} param={props.cart_length}/>
        </NavLink>

        <NavLink to={`/${lastMenuItem}`} >
            <MenuItem item={lastMenuItem} locale={props.locale}/>
        </NavLink>

        </div>
    );
};

export default Menu;
