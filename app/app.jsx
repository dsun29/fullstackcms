import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { makeStore } from './helpers';
import { Provider } from 'react-redux';
import IndexContainer from './containers/IndexContainer';
import LoginContainer from './containers/LoginContainer';
import SinglePostContainer from './containers/SinglePostContainer';
import PostDisplayContainer from './containers/PostDisplayContainer';
import EditorPostListContainer from './containers/EditorPostListContainer';
import InstallationContainer from './containers/InstallationContainer';
import 'css/globals.scss';

const store = makeStore({ 
	UserReducer: { 
		showDialog: false, 
		dialogTitle: '', 
		dialogBody: '', 
		showSpinner: false
        
	}
    
});



const shell = document.createElement('main');
document.body.appendChild(shell);


render(
    <Provider store={store}>
        <Router history={browserHistory}>
	        <Route path="/" component={IndexContainer}/>
	        <Route path="/install" component={InstallationContainer} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/post(/:postid)" component={SinglePostContainer} />
			<Route path="/me" component={EditorPostListContainer} />
			<Route path="/post2(/:postid)" component={PostDisplayContainer} />
			<Route path="*" component={IndexContainer} />
		</Router>
    </Provider>,
    shell
);

