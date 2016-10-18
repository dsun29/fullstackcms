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
												dialogBody: '',
												onDialogClose: null});
				
			
		case 'OPEN_DIALOG':
			{ 
				
				return Object.assign({}, state, {
															showDialog: true,
															dialogTitle: action.dialogTitle,
															dialogBody: action.dialogBody,
															onDialogClose: action.onDialogClose});
				

			
			}
			
		case 'OPEN_SPINNER':

			return Object.assign({}, state, {showSpinner: true});
			
		case 'CLOSE_SPINNER':

			return Object.assign({}, state, {showSpinner: false});
			
		case 'GET_SAVED_STATE_SUCCEED':
			return Object.assign({}, state, action.savedStates);
		
		case 'LOGOUT':
			return Object.assign({}, state, {userid: null, displayname: 'Guest'});
		
		default:
			return state;	
	}
}

export default UserReducer