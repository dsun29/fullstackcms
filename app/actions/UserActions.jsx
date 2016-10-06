import reqwest from 'reqwest'

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

export const Login_Fail_Action = (error) => {
	return {
		type: 'LOGIN_FAIL',
		error: error
	}
}

export function Google_Login_Action(googleReponse){
	return function (dispatch){
		return reqwest({
            url: 'https://men-sundavy.c9users.io:8080/api/login',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: {"email": googleReponse.profileObj.email, "tokenId": googleReponse.tokenId},
            error: function(err){
                 console.log('Eoooo = ' + err);
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
		dialogBody: body
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