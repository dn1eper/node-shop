import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from 'reducers/index';
import initialState from 'reducers/initialState';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['register', 'postFilter']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	const store = createStore(
		persistedReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);

  let persistor = persistStore(store);
	return { store, persistor }
}
