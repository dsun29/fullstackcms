import https from 'https';
import locale from '../../share/util/locale';
import DB from '../util/DB';
import { ObjectId } from 'mongodb';
import config from '../fullstackcms.config';
import Controller from './Controller';

class PostController extends Controller {

	save (req, res) {
		if (typeof req != undefined) {
			this.req = req;
		}
		if (typeof res != undefined) {
			this.res = res;
		}
		
		if (this.checkSession(req) == false) {
			return;
		}
		

		const context = this;
		const requiredRole = 'editor';
		
		DB.connect().then((db) => {
			DB.find(db, 'Users', { email: req.session.email })
			.then((results) => {
				if (context.checkUserRole(results, requiredRole) == false) {
	
					return;
				}
				
				// TODO: DB.insert().then()
				const post = JSON.parse(req.body.post);
				const postToBeUpdated = post;
				console.log('Check post -- ', post);
				post.author = { userid: req.session.userid, email: req.session.email, name: req.session.displayname };
				post.lastmodified = new Date();
				if (post._id == null || post._id == '' || post._id == 'new') {
					DB.insert(db, 'Posts', post)
		  			.then((results) => {
						console.log(results);
						res.send(results.ops[0]); 
				
					})
					.catch((error) => {
						console.log(error.stack);
						context.response_server_error(error.stack);
			        	
						return;
					});
				}
				else {

					DB.update(db, 'Posts', post)
		  			.then((results) => {
						post._id = results._id;
						console.log('postToBeUpdated', post);
		  				
						res.send(post); // TODO://results.xx);
				
					})
					.catch((error) => {
						console.log(error.stack);
						context.response_server_error(error.stack);
			        	
						return;
					});
				}
				
			})
			.catch((error) => {
	        	// An error occurred
				console.log('Wrong -----');
				console.log(error);
			});
		})
		.catch((error) => {
        	// An error occurred
			console.log('Wrong');
			console.log(error);
		});
		
		
	}
	
	getPosts (req, res) {
		
		
		// author: author's userid
		// front: y or n -- whether or not is from front page
		// keywords: searching keywords
		
		const author = req.query.author;
		const session = req.session;
		if (author != null && session != null && author == req.session.userid) { // get my own posts
			console.log(req.session);
			this.getPostsByCondition({ 'author.userid': author }, 50, res);
			
			return;
		}
		else if (author != null && (req.query.front != null && req.query.front == 'y')) { // search by author
			this.getPostsByCondition({ 'author.userid': author, published: true }, 20, res);
			
			return;
		}
		
		else if (req.query.front != null && req.query.front == 'y') { // get front pages
			
			let condition = { published: true };
			if (req.query.keywords != null) {
				
				let keywords = req.query.keywords.trim();
				if (keywords.indexOf(' ') > -1) {
					keywords = `\"${keywords.replace(/\s/g, '\" \"')}\"`;
				}
				
				condition = { published: true, '$text': { '$search': keywords } };
				console.log(condition);
			}
			
			this.getPostsByCondition(condition, 20, res);
			
			return;
		}
		else {
			console.log(req.session, req.sessionID);
			this.response_server_error('Function not implemented yet');
			
			return;
		}
	}
	
	getPostsByCondition (condition, numRows, res) {
		
		const context = this;
		
		DB.connect()
		
		.then((db) => {
			DB.find(db, 'Posts', condition, { content: 0, comments: 0 }, numRows, 'lastModified')
			.then((results) => {
				res.send(results);
			})
			.catch((error) => {
				console.log(error.stack);
				context.response_server_error(error.stack);
		        
				return;
			});
		})
		.catch((error) => {
			console.log(error.stack);
			context.response_server_error(error.stack);
			
			return;
		});
	}
	
	getSinglePost (req, res) {
		const context = this;
		
		DB.connect()
		
		.then((db) => {
			DB.find(db, 'Posts', { _id: new ObjectId(req.params.postid) }, null, 2, 'lastModified')
			.then((results) => {
				if (results == null || results.length != 1) {
					res.statusCode = 404;
					res.send();
					
					return;
				}
				res.send(results[0]);
			})
			.catch((error) => {
				console.log(error.stack);
				context.response_server_error(error.stack);
		        
				return;
			});
		})
		.catch((error) => {
			console.log(error.stack);
			context.response_server_error(error.stack);
			
			return;
		});
	}
	
	
}

export default PostController;
