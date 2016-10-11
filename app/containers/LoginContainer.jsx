import React from 'react'
import { Provider, connect } from 'react-redux'

import LoginComponent from '../components/LoginComponent'

import {Google_Login_Action, Twitter_Login_Start_Action} from '../actions/UserActions'


const mapStateToProps = (state, props) =>{
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest'
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGoogleLogin: (response) => {
			dispatch(Google_Login_Action(response));
		},
		onTwitterLoginStart: () =>{
			dispatch(Twitter_Login_Start_Action());
		}
	}
}


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);


export default LoginContainer