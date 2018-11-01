import React from 'react';
import '../styles/App.css';

import Page from '../containers/Page';
import Footer from './Footer';

const App = ({ match: {params} }) => (
	<div>
	  <Page param={params.place || ''} sub={params.subplace}/>
	  <Footer />
	</div>
);

export default App;
