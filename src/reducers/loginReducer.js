import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, RELOGIN_REQUEST } from 'actions/actionTypes';

export default function(state = {}, action) {    
    switch(action.type) {
        case LOGIN_REQUEST:
            return {...state, status: 'request' };

        case LOGIN_SUCCESS:
            return {...state, status: 'signed', token: action.payload };

        case LOGIN_ERROR:
            return {...state, status: 'error', error: { message: action.payload } };
        
        case LOGOUT:
            return {...state, status: 'unsigned', token: false}
        
        case RELOGIN_REQUEST:
            return {...state, status: 'relogin' };

		default:
			return state;
	}
}

