import * as types from './actionTypes';

function url() {
	return 'localhost:8080';
}

export function receiveStuff(json) {
	// Just some specified format
	return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchStuff() {
	// Giving it a callback, that handles fetched stuff
	return dispatch => {
		fetch(url(), {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Accept': 'application/json'
			}
		})
			.then(response => response.json())
			.then(json => dispatch(receiveStuff(json)));
	};
}
