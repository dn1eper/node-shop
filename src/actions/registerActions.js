import fetch from 'cross-fetch';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './actionTypes';
import { URL } from '../Constants';

export function registerRequest(data) {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST,
            payload: data
        });

        fetch(`http://${URL}:8080/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                login: data.email,
                pass: data.password
            })
        })
        .then(res => {
            if (res.status >= 400) {
                dispatch(registerError("Bad response from server, try again later."));
            }
            else {
                res.json().then(json => {
                    if (json.status === 'success') {
                        dispatch(registerSuccess());
                    }
                    else dispatch(registerError(json.status));
                });
            }
        })
        .catch(error => dispatch(registerError("Wops...")));
    };
}


function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS
    };
}

export function registerError(data) {
    return {
        type: REGISTER_ERROR,
		payload: data
    };
}
