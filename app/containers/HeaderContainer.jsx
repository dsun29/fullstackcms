import React from 'react'
import { Provider, connect } from 'react-redux'
import HeaderComponent from '../components/HeaderComponent'
import {Logout_Action} from '../actions/UserActions'

const mapStateToProps = (state) =>{
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(Logout_Action());
		}
	
	}
}


const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);


export default HeaderContainer