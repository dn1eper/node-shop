import React from 'react';
import PostFilter from 'containers/PostFilter';
import FilteredPostList from 'containers/FilteredPostList';

const HomePage = ({ match: { params } }) => (
	<div>
	<PostFilter filter={params.param} />
	<FilteredPostList filter={params.param} />
	</div>
)

export default HomePage;
