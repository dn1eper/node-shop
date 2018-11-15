import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { REDIRECT_AFTER_LOGOUT, LOGIN_URL } from 'Constants';
import { logout } from 'actions/loginActions';



const Logout = ( props ) => {
    if (props.isSigned) {
        props.onLogout(props.token);
        return (        
            <Redirect to={{
                pathname: `/${REDIRECT_AFTER_LOGOUT}`
            }}/>
        );
    }
    else return (
        <Redirect to={{
            pathname: `/${LOGIN_URL}`
        }}/>
    );
}

export default connect(
    state => ({
        isSigned: state.auth.status === 'signed',
        token: state.auth.token
    }),
    dispatch => ({
        onLogout: bindActionCreators(logout, dispatch)
    })
)(Logout);
