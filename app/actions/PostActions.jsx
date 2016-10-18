import reqwest from 'reqwest'
import {Open_Dialog, Close_Dialog, Open_Spinner, Close_Spinner } from './UserActions'
import config from '../../share/global_config'
import {browserHistory} from "react-router";

export const Save_Post_Action = (post) => {
	
	console.log(post);
	
	return function (dispatch){
		dispatch(Open_Spinner());
		return reqwest({
            url: config.service_root_url + 'api/post',
            method: 'post',
            type: 'json',
            withCredentials: true,
            data: {post: JSON.stringify(post)},
            error: function(err){
                 console.log('error in save_post_action = ', err);
                 dispatch(Close_Spinner())
                 dispatch(Save_Fail_Action(err));
                 dispatch(Open_Dialog('Failed to save post', err.stack, null));
            },
            
            success: function (response) {
            	console.log('successfully saved post', response);
    
              	dispatch(Close_Spinner());
              	dispatch(Save_Succeed_Action(response));
              	dispatch(Open_Dialog('Successfully Saved', 'The new post is successfully saved.', function(){browserHistory.push('/post/' + response._id + '?mode=edit'); dispatch(Close_Dialog());}));
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
            url: config.service_root_url + 'api/posts',
            method: 'get',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            withCredentials: true,
            data: condition,
            error: function(err){
                 dispatch(Open_Dialog('Failed to load posts', err.responseText, null));
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


/*********************************************************/
export const Load_Single_Post_Action = (postid) => {
	
	if(postid == null || postid == ''){
		dispatch(Init_Post());
		return;
	}

	return function (dispatch){
	
		return reqwest({
            url: config.service_root_url + 'api/post/' + postid,
            method: 'get',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded',
            withCredentials: true,
            error: function(err){
                 dispatch(Open_Dialog('Failed to load the post', err.responseText, null));
                 dispatch(Load_Single_Post_Fail_Action(err));
            },
            success: function (response) {
              	console.log(response);
              	dispatch(Load_Single_Post_Succeed_Action(response));
            }

        })
	}
}

export const Load_Single_Post_Succeed_Action = (post) => {
	return {
		type: 'LOAD_SINGLE_POST_SUCCEED',
		post: post
	}
}


export const Load_Single_Post_Fail_Action = (error) => {
	return {
		type: 'LOAD_SINGLE_POST_FAIL',
		error: error
	}
}

export const Init_Post_Action = () => {
	return {
		type: 'INIT_POST'
	}
}

/********************************************************************************/
export const Remove_Post_Action = (postid) => {
	
	
	return function (dispatch){
		dispatch(Open_Spinner());
		return reqwest({
            url: config.service_root_url + 'api/post/' + postid,
            method: 'delete',
            type: 'json',
            withCredentials: true,
            data: {post: JSON.stringify(post)},
            error: function(err){
                 console.log('error in save_post_action = ', err);
                 dispatch(Close_Spinner())
                 dispatch(Save_Fail_Action(err));
                 dispatch(Open_Dialog('Failed to save post', err.stack, null));
            },
            
            success: function (response) {
            	console.log('successfully saved post', response);
    
              	dispatch(Close_Spinner());
              	//dispatch(Save_Succeed_Action(response));
              	//dispatch(Open_Dialog('Successfully Saved', 'The new post is successfully saved.', function(){browserHistory.push('/post/' + response._id + '?mode=edit'); dispatch(Close_Dialog());}));
            }

        })
	}
}

