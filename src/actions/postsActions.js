import fetch from 'cross-fetch';
import { URL } from 'Constants';

import { FETCH_POSTS_END,
		 FETCH_POSTS_START,
		 FETCH_POSTS_ERROR,
		 LIKE_POST } from './actionTypes';

export function requestPosts() {
	return {type: FETCH_POSTS_START};
}

export function fetchError(place) {
	return {type: FETCH_POSTS_ERROR, place};
}

export function recievePosts(posts) {
	return {type: FETCH_POSTS_END, posts: posts.posts};
}

export function fetchPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return fetch(`http://${URL}:8080/`)
			.then(res => 
				res.json()
				.then(json => dispatch(recievePosts({posts: json.items }))),
			err => dispatch(fetchError('posts')))
	};
}

export function likePost(id) {
	return {type: LIKE_POST, id};
}

export function likePostAdmin(id) { // TODO заменить на безусловное увеличивание лайков
	return {type: LIKE_POST, id};
}
