import React from 'react';
import { connect } from 'react-redux';
import { applyFilter } from 'actions/filterActions';
import 'styles/PostFilter.css';

const mapDispatchToProps = dispatch => {
	return {
		onChange: (e) =>  dispatch(applyFilter(e.target.value))
	};
};

const mapStateToProps = (state, { filter }) => {
	return {
		postFilter: filter || state.postFilter
	};
};

let PostFilter = ({ onChange, postFilter }) => (
	<input onChange={onChange}
	defaultValue={postFilter}
	className="filter"/>
);

PostFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)(PostFilter);


export default PostFilter;
