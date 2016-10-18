import React from 'react'
import { Provider, connect } from 'react-redux'
import EditorPostListComponent from '../components/EditorPostListComponent'
import {Load_Posts_Action, Remove_Post_Action} from '../actions/PostActions'
import { browserHistory } from 'react-router'


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
		removePost: (postid) => {
			dispatch(Remove_Post_Action(postid));
		}
	}
}


const EditorPostListContainer = connect(mapStateToProps, mapDispatchToProps)(EditorPostListComponent);


export default EditorPostListContainer