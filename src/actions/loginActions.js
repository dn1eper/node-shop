import fetch from 'cross-fetch';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, RELOGIN_REQUEST } from './actionTypes';
import { URL } from 'Constants';
import { cartClear } from './cartActions';


export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    };
}

export function loginError(msg) {
    console.warn("LOGIN_ERROR", msg);
    return {
        type: LOGIN_ERROR,
        payload: msg
    };
}

export function reLoginRequest(token, callback) {
    fetch(`http://${URL}:8080/reauthenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
    })
    .then(res => {
        if (res.status >= 400) {
            callback({status: 'error', message: 'Bad response from server, try again later'});
        }
        else {
            res.json().then(json => {
                if (!json.token) {
                    callback({status: 'error', message: 'Invalid old token'});
                }
                else callback({status: 'success', token: json.token});
            });
        }
    })
    .catch(error => callback({status: 'error', message: 'Oops..'}));

    return {
        type: RELOGIN_REQUEST
    }
}

/* actions with built in dispatch */
export function loginRequest(data) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: data
        });

        fetch(`http://${URL}:8080/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: data.email,
                pass: data.password
            })
        })
        .then(res => {
            if (res.status >= 400) {
                dispatch(loginError("Bad response from server, try again later."));
            }
            else {
                res.json().then(json => {
                    if (!json.token) {
                        dispatch(loginError("Invalid email or password."));
                    }
                    else dispatch(loginSuccess(json.token));
                });
            }
        })
		.catch(error => dispatch(loginError("Wops...")));
    };
}


export function logout(token) {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });

        fetch(`http://${URL}:8080/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token})
        })
        .then(res => {
            if (res.status === 200) {
                dispatch(cartClear());
            }
        });
    }
}
