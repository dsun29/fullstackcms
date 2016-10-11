import React from 'react'
import { Provider, connect } from 'react-redux'

import IndexComponent from '../components/IndexComponent'

import {Load_Posts_Action} from '../actions/PostActions'
import {State_Initialization_Action} from '../actions/UserActions'

const mapStateToProps = (state, props) =>{

	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest',
		posts: state.PostReducer.posts ? state.PostReducer.posts : [],
		queryParams: props.location.query
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPosts: (condition) => {
			dispatch(Load_Posts_Action(condition));
		},
		onPostClick:(postid) => {
			dispatch(Load_Posts_Action({author:userid}));
			
		},
		loadSavedStates: (params) => {
			dispatch(State_Initialization_Action(params));
		}
		
	}
}


const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexComponent);


export default IndexContainer