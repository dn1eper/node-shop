import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/createStore'; // adding a redux

import { fetchPosts } from './actions/postsActions';

const { store, persistor } = createStore();	// redux-store

fetchPosts()(store.dispatch);


ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<Route path="/:place?/:subplace?" component={App} />
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
