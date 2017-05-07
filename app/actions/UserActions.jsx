import reqwest from 'reqwest'
import config from '../../share/global_config'

export const Login_Action = (author, token) => {
	return {
		type: 'LOGIN',
		author: author,
		token: token
	}
}


export const Login_Succeed_Action = (userid, displayname) => {
	return {
		type: 'LOGIN_SUCCEED',
		userid: userid,
		displayname: displayname
	}
}

export const Logout_Done_Action = () => {
    return {
		type: 'LOGOUT'
    }
}

export const Login_Fail_Action = (error) => {
	return {
		type: 'LOGIN_FAIL',
		error: error
	}
}

export function Twitter_Login_Start_Action(){
	return function (dispatch){
		return reqwest({
            url: config.service_root_url + 'api/login',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: {"source": "twitter"},
            error: function(err){
                 console.log('Twitter login error = ', err);
                 if(err.status == 200){
                	window.location = err.responseText;
                	return;
                 }
                 dispatch(Login_Fail_Action(err));
            },
            success: function (response) {
              	//dispatch(Login_Succeed_Action(response.userid, response.displayname));
              	window.location = response;
            }

        })
	}
	
}


export function Google_Login_Action(googleReponse){
	return function (dispatch){
		return reqwest({
            url: config.service_root_url + 'api/login',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            crossOrigin: true,
			withCredentials: true,
            data: {"email": googleReponse.profileObj.email, "tokenId": googleReponse.tokenId},
            error: function(err){
                 console.log('Eoooo = ', err);
                 dispatch(Login_Fail_Action(err));
            },
            success: function (response) {
              	console.log('goood = ' + response);
              	dispatch(Login_Succeed_Action(response.userid, response.displayname));
            }

        })
	}
}

/*********************************************************************************/
export const Open_Dialog = (title, body, onClose) => {
	return {
		type: 'OPEN_DIALOG',
		dialogTitle: title,
		dialogBody: body,
		onDialogClose: onClose
	}
	
}

export const Close_Dialog = () => {
	
	return {
		type: 'CLOSE_DIALOG'
	}
}



/*********************************************************************************/
export const Open_Spinner = () => {
	return {
		type: 'OPEN_SPINNER'
	}
}

export const Close_Spinner = () => {
	
	return {
		type: 'CLOSE_SPINNER'
	}
}

/*********************************************************************************/

export function State_Initialization_Action(params){
	return function (dispatch){
		return reqwest({
            url: config.service_root_url + 'api/state',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: params,
            error: function(err){
                 console.log('get init state erro = ', err);
                 if(err.status == 200){
                	 window.location = err.responseText;
                    return;
                 }
                 dispatch(Login_Fail_Action(err));
            },
            success: function (response) {
              	console.log('goood = ', response);
              	dispatch(Get_State_Succeed_Action(response));
              	
              	if(response != null && response.redirect != null){
              	    window.location = response.redirect;
              	}
              	
            }

        })
	}
	
}

export const Get_State_Succeed_Action = (states) => {
	return {
		type: 'GET_SAVED_STATE_SUCCEED',
		savedStates: states
	}
}

export function Logout_Action(){
	return function (dispatch){
		return reqwest({
            url: config.service_root_url + 'api/logout',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            crossOrigin: true,
			withCredentials: true,
            error: function(err){
                 console.log('Log out error = ', err);
                 dispatch(Login_Fail_Action(err));
            },
            success: function (response) {
              	dispatch(Logout_Done_Action());
            }

        })
	}
}

/****************************************************************************/

export function Update_Config_Action(newConfigValue){
    
    
    
	return function (dispatch){
	    
	    dispatch(Open_Spinner());
	    
		return reqwest({
            url: config.service_root_url + 'api/config',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            crossOrigin: true,
            data: newConfigValue,
			withCredentials: true,
            error: function(err){
                 console.log('Update_Config_Action error = ', err);
                 
                 dispatch(Close_Spinner());
            },
            success: function (response) {
              	
              	console.log('Update_Config_Action good = ', response);
              	dispatch(Close_Spinner());
              	
            }

        })
	}
}

/****************************************************************************/

export function Set_Configurations_Action(newConfigValues){
    
    dispatch(Open_Spinner());
    
	return function (dispatch){
		return reqwest({
            url: config.service_root_url + 'api/installation',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            crossOrigin: true,
            data: newConfigValues,
			withCredentials: true,
            error: function(err){
                 console.log('Update_Config_Action error = ', err);
                 
                 dispatch(Close_Spinner());
            },
            success: function (response) {
              	
              	console.log('Update_Config_Action good = ', response);
              	dispatch(Close_Spinner());
              	
            }

        })
	}
}