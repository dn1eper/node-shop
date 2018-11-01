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
            <MenuItem item={HOME} />
        </NavLink>

        <NavLink to={`/${ABOUT}`} >
            <MenuItem item={ABOUT} />
        </NavLink>


        <NavLink to={`/${CONTACT_US}`} >
            <MenuItem item={CONTACT_US} />
        </NavLink>

        <NavLink to={`/${CART_URL}`} >
            <MenuItem item={CART_URL} param={props.cart_length}/>
        </NavLink>

        <NavLink to={`/${lastMenuItem}`} >
            <MenuItem item={lastMenuItem} />
        </NavLink>

        </div>
    );
};

export default Menu;
