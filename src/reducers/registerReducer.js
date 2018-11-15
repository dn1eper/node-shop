import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from '../actions/actionTypes';

export default function(state = {}, action) {    
    switch(action.type) {
        case REGISTER_REQUEST:
            return {...state, status: 'request' };

        case REGISTER_SUCCESS:
            return {...state, status: 'success' };

        case REGISTER_ERROR:
            return {...state, status: 'error', error: { message: action.payload } };

		default:
			return state;
	}
}

