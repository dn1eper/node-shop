import { combineReducers } from 'redux';
import postsReducer from './postReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    posts: postsReducer,
	postFilter: filterReducer
});
