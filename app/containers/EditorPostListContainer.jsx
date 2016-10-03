import React from 'react'
import { Provider, connect } from 'react-redux'

import EditorPostListComponent from '../components/LoginComponent'

import {Load_Posts_Action} from '../actions/PostActions'


const mapStateToProps = (state) =>{

	return {
		userid: state.UserReducer.userid ? state.UserReducer.userid : null,
		displayname: state.UserReducer.displayname ? state.UserReducer.displayname : 'Guest'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPostsByAuthor: () => {
			dispatch(Load_Posts_Action({author: state.UserReducer.userid}));
		}
	}
}


const EditorPostListContainer = connect(mapStateToProps, loadPosts)(EditorPostListComponent);


export default EditorPostListContainer