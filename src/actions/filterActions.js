import { FILTER_POSTS } from './actionTypes';

export function applyFilter(filter) {
	return {type: FILTER_POSTS, filter};
}
