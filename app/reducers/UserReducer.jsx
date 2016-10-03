function UserReducer(state = {}, action)  {
	switch (action.type){
		case 'LOGIN_SUCCEED':
			
			return{
				userid: action.userid,
				displayname: action.displayname
			}
		case 'LOGIN_FAIL':
			return{
				userid: null,
				displayname: 'Guest',
				error: action.error
			}
		case 'CLOSE_DIALOG':

			return Object.assign({}, state, {
												showDialog: false,
												dialogTitle: '',
												dialogBody: ''});
				
			
		case 'OPEN_DIALOG':
			{ 
				
				const new_state = Object.assign({}, state, {
															showDialog: true,
															dialogTitle: action.dialogTitle,
															dialogBody: action.dialogBody});
				
				console.log(new_state);
				return  new_state;
			
			}
			
		case 'OPEN_SPINNER':

			return Object.assign({}, state, {showSpinner: true});
			
		case 'CLOSE_SPINNER':

			return Object.assign({}, state, {showSpinner: false});
	
	
		default:
			return state;	
	}
}

export default UserReducer