import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { makeStore } from '../helpers';
import { Provider } from 'react-redux';
import App from './App';
import About from './About';
import LoginContainer from '../containers/LoginContainer'
import SinglePostContainer from '../containers/SinglePostContainer'
import EditorPostListContainer from '../containers/EditorPostListContainer'


const store = makeStore({UserReducer: {showDialog: false, dialogTitle:  '', dialogBody: '', showSpinner: false}});

var shell = document.createElement('main');
document.body.appendChild(shell);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
	        <Route path="/" component={App}/>
			<Route path="/about" component={About} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/post" component={SinglePostContainer} />
			<Route path="/me" component={EditorPostListContainer} />
			<Route path="*" component={About} />
		</Router>
    </Provider>,
    shell);
