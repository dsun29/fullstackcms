function PostReducer(state = {}, action)  {
	switch (action.type){
		
		case 'SAVE_POST_SUCCEED':
			
			return Object.assign({}, state, action.post, {postid: action.post_id});
												
		
		case 'LOAD_POSTS_SUCCEED':
	
			return Object.assign({}, state, {posts: action.posts});
		
		case 'LOAD_POSTS_FAIL':

			return Object.assign({}, state, {error: action.error});	
			
		case 'LOAD_SINGLE_POST_SUCCEED':

			return Object.assign({}, state, {post: action.post, postid: '', loading: false});
			
		case 'LOAD_SINGLE_POST_FAIL':

			return Object.assign({}, state, {error: action.error});	
			
		case 'INIT_POST':

			return Object.assign({}, state, {post: {}, postid: ''});				
			
		default:
			return state;	
	}
}

export default PostReducer