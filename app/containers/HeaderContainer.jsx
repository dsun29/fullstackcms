import React from 'react'
import { Provider, connect } from 'react-redux'

import HeaderComponent from '../components/HeaderComponent'


const mapStateToProps = (state) =>{
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPosts: () => {
			dispatch(Google_Login_Action(response));
		}
	}
}


const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);


export default HeaderContainer