import React from 'react';
import '../styles/App.css';

import Page from '../containers/Page';
import Footer from './Footer';

const App = ({ match: {params} }) => (
	<div>
	  <Page param={params.place || ''} sub={params.subplace}/>
	  <Footer locale={params.locale}/>
	</div>
);

export default App;
