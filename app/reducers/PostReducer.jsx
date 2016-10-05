function PostReducer(state = {}, action)  {
	switch (action.type){
		case 'SAVE_POST_SUCCEED':
			
			return Object.assign({}, state, action.post);
												
		case 'LOGIN_FAIL':
			return{
				userid: null,
				displayname: 'Guest',
				error: error
			}	
		
		case 'LOAD_POSTS_SUCCEED':
			console.log(Object.assign({}, state, {posts: action.posts}));
			return Object.assign({}, state, {posts: action.posts});
		
		case 'LOAD_POSTS_FAIL':
			console.log(Object.assign({}, state, {error: action.error}));
			return Object.assign({}, state, {error: action.error});	
			
		default:
			return state;	
	}
}

export default PostReducer