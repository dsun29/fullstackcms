import https from 'https'
import locale from '../../share/util/locale'
import DB from '../util/DB'
import config from '../server.dev.config'
import Controller from './Controller'

class PostController extends Controller{



	save(req, res){
		if(typeof req != undefined){
			this.req = req;
		}
		if(typeof res != undefined){
			this.res = res;
		}
		
		if(this.checkSession(req) == false){
			return;
		}
		
		console.log(req.body);
		
		let context = this;
		const requiredRole = 'editor';
		
		DB.connect().then(function(db){
			DB.find(db, 'Users', {email: req.session.email})
			.then(function(results){
				if(context.checkUserRole(results, requiredRole) == false){
	
					return;
				}
				
				//TODO: DB.insert().then()
				let post = {};
				post.title = req.body.title;
				post.url = req.body.url;
				post.author = {userid: req.session.userid, email: req.session.email, name: req.session.displayname};
				DB.insert(db, 'Posts', post)
	  			.then(function(results){
					console.log(results);
					res.send(results.ops[0]); //TODO://results.xx);
			
				})
				.catch(function(error) {
					console.log(error.stack);
		        	context.response_server_error(error.stack);
		        	return;
	    		});
				
				
			})
			.catch(function(error) {
	        	// An error occurred
	        	console.log('Wrong -----');
	        	console.log(error);
	    	});
		})
		.catch(function(error) {
        	// An error occurred
        	console.log('Wrong');
        	console.log(error);
    	});
		
		
	}

	
	
	
	
	
}

export default PostController;