import config from '../server.dev.config';
import Controller from './Controller';
import DB from '../util/DB';
import debug from 'debug';
import https from 'https';
import locale from '../../share/util/locale';
import twitterAPI from 'node-twitter-api';


const twitter = new twitterAPI({
	consumerKey: config.consumerKey,
	consumerSecret: config.consumerSecret,
	callback: config.callback
});

class UserController extends Controller {

	login (req, res) {
		if (typeof req !== 'undefined') {
			this.req = req;
		}
		if (typeof res !== 'undefined') {
			this.res = res;
		}
		
		const source = req.body.source;
		if (typeof source === 'undefined' || source === 'google')	{
			
			return this.loginGoogle(req.body.email, req.body.tokenId);
			
		}
		else if (source === 'twitter') {
			twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
				if (error) {
					debug('Error getting OAuth request token', error);
					res.statusCode = 500;
					res.send(error);
					
				} 
				else {
					const session = req.session;
					session.requestToken = requestToken;
					session.requestTokenSecret = requestTokenSecret;
					
					res.send(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
					
				}
				
			});
			
			return;
		}
		else {
			res.send();
			
			return;
		}

	}


	loginGoogle (email, tokenId) {
		https.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`, (res2) => {
		
			res2.on('data', (data) => {
				this.parseGoogleResults(data);
			});
		 
		}).on('error', (err) => {
			this.errorhandle(err);
		});
	}
	
	parseGoogleResults (googleResponseRaw) {
		const googleResponse = JSON.parse(googleResponseRaw);

		if (typeof googleResponse.email === 'undefined' || googleResponse.email === null) {
			this.res.statusCode = 400;
			this.res.send(locale[config.locale].invalid_google_token);
			
			return;
		}
		if (googleResponse.email !== this.req.body.email) {
			this.res.statusCode = 400;
			this.res.send(locale[config.locale].google_token_email_not_match);
			
			return;
		}
	  	
		this.googleResponse = googleResponse;
		const context = this;

		// Step 1: check if user exists
		DB.connect().then((db) => {
			DB.find(db, 'Users', { email: googleResponse.email }, { email: 1, displayname: 1 }, 2, 'lastname')
			.then((results) => {
				
				if (results === null || results.length != 1) {
					const user = {
						email: googleResponse.email, 
						firstname: googleResponse.given_name, 
						lastname: googleResponse.family_name,
						displayname: googleResponse.name,
						locale: googleResponse.locale,
						photo: googleResponse.picture,
						source: 'google'
					};
					
					return context.createUserFromResponse(user);
				}
				
				const user = results[0];
				context.setUserSession(user._id, user.email, user.displayname);
				
				return context.res.send({
					userid: user._id, 
					displayname: user.displayname
					
				});
				
			})
			.catch((error) => {
	        	// An error occurred
				debug(error);
			});
		})
		.catch((error) => {
        	// An error occurred
			console.log('Wrong');
			console.log(error);
		});

	}
	
	setUserSession (userid, email, displayname) {
		const sess = this.req.session;
		sess.userid = userid;
		sess.email = email;
		sess.displayname = displayname;
	}
	
	
	createUserFromResponse (user) {
		
		const context = this;
		
		DB.connect().then((db) => {
			DB.insert(db, 'Users', user)
  			
  			.then((results) => {
				
				context.setUserSession(results.insertedIds[0], user.email, user.displayname);
				context.res.send({ userid: results.insertedIds[0], displayname: user.displayname });
		
			})
			.catch((error) => {
	        	// An error occurred
				context.res.statusCode = 500;
				context.res.send(error);
			    
				return;
			});
	
		}).catch((error) => {
			context.res.statusCode = 500;
			context.res.send(error);
			
			return;
		});
	
	}
	
	twitterAccessToken (req, res) {
		// it is the same request token
		const requestToken = req.body.oauth_token; 
		const oauthVerifier = req.body.oauth_verifier;
		const context = this;
		
		twitter.getAccessToken(requestToken, req.session.requestTokenSecret, oauthVerifier, (error, accessToken, accessTokenSecret) => {
			if (error) {
				debug('Error getting OAuth access token', error, req.query);
				res.statusCode = 500;
				res.send(error);
			    
				return;
			} 
			else {
				// store accessToken and accessTokenSecret somewhere (associated to the user)
				
				req.session.accessToken = accessToken;
				req.accessTokenSecret = accessTokenSecret;
				
				// Step 4: Verify Credentials belongs here - get display name and email
				twitter.verifyCredentials(accessToken, accessTokenSecret, { include_email: false }, (error2, data) => {
					if (error2) {
						debug('Error verifying OAuth access token', error2);
						res.statusCode = 500;
						res.send(error2);
						
					} 
					else {
						// accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
						// data contains the user-data described in the official Twitter-API-docs
						
						// Note: need to request for email permission from Twitter
						let email = data.email; 
						if (email === null) {
							email = `${data.id}@twitter.com`;
						}
					
						// Check if email exists already
						DB.connect().then((db) => {
							DB.find(db, 'Users', { email }, { _id: 1, email: 1, displayname: 1 }, 2, 'email')
							.then((results) => {
								// user not found
								if (results === null || results.length === 0) {
									const user = {
										email,
										displayname: data.name,
										locale: data.lang,
										screenname: data.screen_name,
										photo: data.profile_image_url_https,
										source: 'twitter',
										twitterid: data.id
									};
												
									DB.insert(db, 'Users', user).then((insertedResults) => {
										
										context.setUserSession(insertedResults.insertedIds[0], user.email, user.displayname);
										res.send({
											userid: insertedResults.insertedIds[0],
											displayname: user.displayname
										});
										
										return;
									
									})
									.catch((error3) => {
										if (error3) {
											debug(error3.stack);
										}
										res.statusCode = 500;
										res.send(error3);
										
										return;
									});
														
								}
								
								const newRecordRow = 0;
								const user = results[newRecordRow];
								context.setUserSession(user._id, user.email, user.displayname);
								
								return res.send({ 
									userid: user._id, 
									displayname: user.displayname 
								});
								
							})
							.catch((error) => {
								// An error occurred
								debug('Finding existing Twitter account', error);
								res.statusCode = 500;
								res.send(error);
								
								return;

							});
						})
						.catch((error2) => {
							// An error occurred
							if (error2) {
								debug(error2);
							}
							res.statusCode = 500;
							res.send(error2);
							
							return;
						});
					}
				});
			}
		});
		
	}
	
	getStoredState (req, res) {
		// oauth_token is given by Twitter, do not change it
		const twitterOoauthToken = req.body.oauth_token; 
		const twitterOauthVerifier = req.body.oauth_verifier;
		
		// this is a redirect from Twitter with succesul login
		if (twitterOoauthToken !== null && twitterOauthVerifier !== null) { 
			return this.twitterAccessToken(req, res);
		}
		
		// refresh home page
		if (req.session !== null && req.session.userid !== null) { 
		
			return res.send({	
				userid: req.session.userid, 
				displayname: req.session.displayname 
			});
		}
		
		return res.send({});
	}
	
	static logout (req, res) {
		if (req.session) {
			req.session.destroy((err) => {
				
				if (err) {
					debug('error in logging out', err.stack);
				}
				res.send();	

				return;
			});
		}

		res.send();
	}
}

export default UserController;
