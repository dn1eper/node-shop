import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'; // adding a redux

const store = configureStore();	// redux-store

ReactDOM.render(
		<App store={store} />,
	document.getElementById('root')
);

registerServiceWorker();
