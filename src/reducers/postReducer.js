import { FETCH_POSTS_END,
	     FETCH_POSTS_START,
	     FETCH_POSTS_ERROR,
		 LIKE_POST } from 'actions/actionTypes';
//import { fetchPosts } from 'actions/postsActions'; // specify post actions

// state is an array of posts here
export default function posts(state={}, action) {
	switch (action.type) {
		case LIKE_POST:
			let data = state.data.map((post, index) => {
				if (post.id === action.id) {
					/* I have liked a post
					 * Post:  { .., likes: 15, ... }
					 * TODO What about sending an AJAX to a server?
					 */
					// parseInt(number, radix)
					return {...post, likes: (parseInt(post.likes, 10)+1).toString() };
				}
				return post;
			});
			return Object.assign({}, state, {data: data});
		case FETCH_POSTS_END:
			//console.log(action.posts); // Log fetched posts
			return Object.assign({}, {
				data: action.posts,
				isFetching: false
			});
		case FETCH_POSTS_START:
			return Object.assign({}, state, {isFetching: true});
		case FETCH_POSTS_ERROR:
			console.log("Error while fetching");
			return Object.assign({}, state, {isFetching: false});
		default:
			return state;
	}
}
