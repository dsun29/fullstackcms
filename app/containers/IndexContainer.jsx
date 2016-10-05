import React from 'react'
import { Provider, connect } from 'react-redux'

import IndexComponent from '../components/IndexComponent'

import {Load_Posts_Action} from '../actions/PostActions'


const mapStateToProps = (state) =>{

	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest',
		posts: state.PostReducer.posts ? state.PostReducer.posts : []
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPosts: (condition) => {
			dispatch(Load_Posts_Action(condition));
		},
		onPostClick:(postid) => {
			//dispatch(Load_Posts_Action({author:userid}));
			//TODO: Go to singlePost page
		}
	}
}


const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexComponent);


export default IndexContainer