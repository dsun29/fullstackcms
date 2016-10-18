import React from 'react'
import { Provider, connect } from 'react-redux'

import IndexComponent from '../components/IndexComponent'

import {Load_Posts_Action} from '../actions/PostActions'
import {State_Initialization_Action} from '../actions/UserActions'
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
		loadPosts: (condition) => {
			dispatch(Load_Posts_Action(condition));
		},
		onPostClick:(postid) => {
			dispatch(Load_Posts_Action({author:userid}));
		},
		loadSavedStates: (params) => {
			dispatch(State_Initialization_Action(params));
		},
		search: (keywords) => {
			keywords = keywords.trim();
			if(keywords === null || keywords === undefined || keywords.length < 2){
				return null;
			}
			browserHistory.push('/?k=' + keywords);
		}
		
	}
}


const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexComponent);


export default IndexContainer