function PostReducer(state = {}, action)  {
	switch (action.type){
		case 'SAVE_POST_SUCCEED':
			console.log(Object.assign({}, state, {post: action.post}));
			return Object.assign({}, state, action.post);
												
		case 'LOGIN_FAIL':
			return{
				userid: null,
				displayname: 'Guest',
				error: error
			}	
		default:
			return state;	
	}
}

export default PostReducer