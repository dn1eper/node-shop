import { connect } from 'react-redux';
import { likePost } from 'actions/postsActions';
import { cartAddItem } from 'actions/cartActions';
import PostList from 'components/PostList';

function escapeRegExp(string){
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const getFilteredPosts = (posts, filter) => {
	if (filter === '' || typeof filter === undefined) {
		return posts;
	}
	let tagRe = new RegExp(escapeRegExp(filter), 'i'); // ignoring case
	// Finds if any tag matches the filter, given in regexp
	return posts.filter((p) => (p.tags.find((tag) => tag.match(tagRe))));

};


const mapStateToProps = state => ({
		posts: getFilteredPosts(state.posts.data, state.postFilter)
});

const mapDispatchToProps = dispatch => ({
		likePost: id => {
			dispatch(likePost(id));
		},
		onPostClick: post => {
			dispatch(cartAddItem(post.id));
		}
});

// I guess PostList may be used somewhere in an application
// That's why I need FilteredPostList only for a HomePage
const FilteredPostList = connect(
	mapStateToProps,
	mapDispatchToProps
)(PostList);

export default FilteredPostList;
