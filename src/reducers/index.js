import { combineReducers } from 'redux';
import postsReducer from './postReducer';
import filterReducer from './filterReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

export default combineReducers({
    posts: postsReducer,
    postFilter: filterReducer,
    auth: loginReducer,
	register: registerReducer,
});
