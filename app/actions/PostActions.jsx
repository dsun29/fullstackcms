import reqwest from 'reqwest'
import {Open_Dialog, Open_Spinner, Close_Spinner } from './UserActions'

export const Save_Post_Action = (post) => {
	return function (dispatch){
		dispatch(Open_Spinner());
		return reqwest({
            url: 'https://men-sundavy.c9users.io:8080/post',
            method: 'post',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            withCredentials: true,
            data: post,
            error: function(err){
                 console.log('Eoooo = ' + err);
                 dispatch(Close_Spinner())
                 dispatch(Save_Fail_Action(err));
                 dispatch(Open_Dialog('Failed to save post', err.stack, function(){}));
            },
            
            success: function (response) {
              	console.log(response);
              	dispatch(Close_Spinner());
              	dispatch(Save_Succeed_Action(response));
              	dispatch(Open_Dialog('Successfully Saved', 'The new post is successfully saved.', function(){}));
              	
            }

        })
	}
}

export const Save_Succeed_Action = (post) => {
	
	
	return {
		type: 'SAVE_POST_SUCCEED',
		post: post
	}
}

export const Save_Fail_Action = (error) => {
	return {
		type: 'SAVE_POST_FAIL',
		error: error
	}
}

export const Save_Start_Action = (error) => {
	return {
		type: 'SAVE_POST_START',
		loading: true,
		loaded: false
	}
}


/*********************************************************/
export const Load_Posts_Action = (condition) => {
	return function (dispatch){
	
		return reqwest({
            url: 'https://men-sundavy.c9users.io:8080/posts',
            method: 'get',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            withCredentials: true,
            data: condition,
            error: function(err){
                 dispatch(Open_Dialog('Failed to load posts', err.responseText, function(){}));
                 dispatch(Load_Posts_Fail_Action(err));
            },
            success: function (response) {
              	console.log(response);
              	dispatch(Load_Posts_Succeed_Action(response));
            }

        })
	}
}

export const Load_Posts_Succeed_Action = (posts) => {
	return {
		type: 'LOAD_POSTS_SUCCEED',
		posts: posts
	}
}


export const Load_Posts_Fail_Action = (error) => {
	return {
		type: 'LOAD_POSTS_FAIL',
		error: error
	}
}

export const Load_Start_Action = () => {
	return {
		type: 'LOAD_POSTS_START'
		
	}
}
