import { FILTER_POSTS } from 'actions/actionTypes';

export default function postFilter(state='', action) {
	switch(action.type) {
		case FILTER_POSTS:
			let newState = action.filter;
			return newState;
		default:
			return state;
	}
}
