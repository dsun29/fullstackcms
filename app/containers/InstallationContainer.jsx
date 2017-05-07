import React from 'react'
import { Provider, connect } from 'react-redux'

import InstallationComponent from '../components/InstallationComponent'

import { Update_Config_Action } from '../actions/UserActions'
import {browserHistory} from "react-router";

const mapStateToProps = (state, props) =>{
	console.log('params in container', props.location.query);

	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest',
		posts: state.PostReducer.posts ? state.PostReducer.posts : [],
		queryParams: props.location.query,
		tag: props.location.query.t,
		keywords: props.location.query.k //we must keep it, just for fun
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateConfigAction: (newValue) => {
			dispatch(Update_Config_Action(newValue));
		},
		
		installConfigure: (newValues) => {
			dispatch(Update_Config_Action(newValues));
		}
		
	}
}


const InstallationContainer = connect(mapStateToProps, mapDispatchToProps)(InstallationComponent);


export default InstallationContainer