import fetch from 'cross-fetch';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SUBMIT, 
    CART_SUBMIT_SUCCESS, CART_SUBMIT_ERROR, CART_CLEAR } from 'actions/actionTypes';
import { URL } from 'Constants';
import { reLoginRequest, loginSuccess } from 'actions/loginActions';

export function cartAddItem(id) {
    return {
        type: CART_ADD_ITEM,
        payload: id
    };
}

export function cartRemoveItem(id) {
    return {
        type: CART_REMOVE_ITEM,
        payload: id
    };
}

function cartSubmitSuccess(order_id) {
    return {
        type: CART_SUBMIT_SUCCESS,
        payload: order_id
    };
}

export function cartSubmitError(msg) {
    console.warn("CART_SUBMIT_ERROR", msg);
    return {
        type: CART_SUBMIT_ERROR,
        payload: msg
    };
}

export function cartClear() {
    return {
        type: CART_CLEAR
    };
}

/* actions with built in dispatch */
export function cartSubmit(cartItems, token) {
    return (dispatch) => {
        dispatch({
            type: CART_SUBMIT
        });

        fetch(`http://${URL}:8080/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems,
                token: token
            })
        })
        .then(res => {
            if (res.status >= 400) {
                dispatch(cartSubmitError("Bad response from server, try again later."));
            }
            else {
                res.json().then(json => {
                    if (json.status === 'success') {
                        dispatch(cartSubmitSuccess(json.order_id));
                    }
                    else {
                        if (json.status === 'Token not valid') {
                            dispatch(reLoginRequest(token, res => {
                                if (res.status === 'success') {
                                    dispatch(loginSuccess(res.token));
                                    dispatch(cartSubmit(cartItems, res.token));
                                }
                                else if (res.message === 'Invalid old token') {
                                    dispatch(cartSubmitError('Please login again'));
                                }
                                else dispatch(cartSubmitError(res.message));
                            }));
                        }
                        else dispatch(cartSubmitError(json.status));
                    }
                });
            }
        });
    };
}