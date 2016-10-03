import React from 'react'
import { Provider, connect } from 'react-redux'

import SinglePostComponent from '../components/SinglePostComponent'

import {Save_Post_Action } from '../actions/PostActions'
import {Open_Dialog } from '../actions/UserActions'


const mapStateToProps = (state) =>{
	
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest',
		post: {title: 'testing title'}
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSaveClick: ({title, url}) => {
			dispatch(Save_Post_Action({title, url}));
			
		},
		onPreviewClick: (post) => {
		    dispatch(Save_Post_Action(post));
		}
	}
}


const SinglePostContainer = connect(mapStateToProps, mapDispatchToProps)(SinglePostComponent);


export default SinglePostContainer