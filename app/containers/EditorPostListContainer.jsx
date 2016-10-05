import React from 'react'
import { Provider, connect } from 'react-redux'

import EditorPostListComponent from '../components/EditorPostListComponent'

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
		loadPostsByAuthor: (userid) => {
			dispatch(Load_Posts_Action({author:userid}));
		},
		onPostClick:(postid) => {
			//dispatch(Load_Posts_Action({author:userid}));
			//TODO: Go to singlePost page
		}
	}
}


const EditorPostListContainer = connect(mapStateToProps, mapDispatchToProps)(EditorPostListComponent);


export default EditorPostListContainer