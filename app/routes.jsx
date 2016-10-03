import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'components/App';
import Home from 'components/Home';
import About from 'components/About';

export default (
			<Router history={hashHistory}>
			    <Route path="/" component={App}/>
			    <Route path="/login" component={About} />
			</Router>
);
