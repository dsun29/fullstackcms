import React from 'react'
import { Provider, connect } from 'react-redux'

import LoginComponent from '../components/LoginComponent'

import {Google_Login_Action} from '../actions/UserActions'


const mapStateToProps = (state) =>{
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGoogleLogin: (response) => {
			dispatch(Google_Login_Action(response));
		}
	}
}


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);


export default LoginContainer