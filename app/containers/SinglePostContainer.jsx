import React from 'react'
import { Provider, connect } from 'react-redux'

import SinglePostComponent from '../components/SinglePostComponent'

import {Save_Post_Action, Load_Single_Post_Succeed_Action, Load_Single_Post_Action } from '../actions/PostActions'
import {Open_Dialog } from '../actions/UserActions'


const mapStateToProps = (state, props) =>{
	console.log('state - ', state);
	
	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest',
		post: state.PostReducer.post ? state.PostReducer.post : {},
		postid: props.params.postid,
		loading: state.PostReducer.loading
		
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSaveClick: (post) => {
			dispatch(Save_Post_Action(post));
			
		},
		onPreviewClick: (post) => {
		    dispatch(Save_Post_Action(post));
		},
		loadSinglePost: (postid) => {
			if(postid == null || postid == ''){
				dispatch(Load_Single_Post_Succeed_Action({}));
			}
			else{
				dispatch(Load_Single_Post_Action(postid));
			}
		}
	}
}


const SinglePostContainer = connect(mapStateToProps, mapDispatchToProps)(SinglePostComponent);


export default SinglePostContainer