import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import '../styles/PostList.css';

// Every Post has all attributes given in props
const PostList = ({ posts, likePost, onPostClick }) => (
	<div className="post-list">
	  {posts.length ? posts.map((post, index) => (
		  <Post
			key={index}
			{...post}
			likePost={() => likePost(post.id)}
			onPostClick={() => onPostClick(post)}/>
	  ))
       : 'No posts'

	  }
	</div>
);

PostList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			likes: PropTypes.string.isRequired
		})
	).isRequired,
	onClick: PropTypes.func,
	likePost: PropTypes.func.isRequired
};

export default PostList;
