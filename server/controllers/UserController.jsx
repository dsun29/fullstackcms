import config from '../fullstackcms.config';
import Controller from './Controller';
import DB from '../util/DB';
import debug from 'debug';
import https from 'https';
import locale from '../../share/util/locale';
import twitterAPI from 'node-twitter-api';
import fs from 'fs';
import HttpStatus from 'http-status-codes';
import { MongoClient } from 'mongodb';

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
							res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
							res.send(error2);
							
							return;
						});
					}
				});
			}
		});
		
	}
	
	getInitState (req, res) {
		// oauth_token is given by Twitter, do not change it
		const twitterOoauthToken = req.body.oauth_token; 
		const twitterOauthVerifier = req.body.oauth_verifier;
		
		// this is a redirect from Twitter with succesul login
		if (typeof twitterOoauthToken !== 'undefined' && typeof twitterOauthVerifier !== 'undefined') { 
			
			console.log('twitter redirect', req.body, typeof twitterOoauthToken);
			
			return this.twitterAccessToken(req, res);
		}
		
		// refresh home page
		if (typeof req.session !== 'undefined' && typeof req.session.userid !== 'undefined') { 
		
			return res.send({	
				userid: req.session.userid, 
				displayname: req.session.displayname 
			});
		}
		
		//check whether it is an initial install
    	if (config.mongo_connection_str === null || typeof config.mongo_connection_str === 'undefined' 
    	|| config.mongo_connection_str === '' || config.installed === false) {
    	
	    	return res.send({	
				installing: true 
			});
    	}
    	
    	return res.send({	
				installing: false 
		});
		    
	}
	
	logout (req, res) {
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
	
	//update system application
	updateConfig (req, res) {
		let dbStr = req.body.db;
		if (!(typeof dbStr === 'undefined')) {
			
			fs.access(config.config_file, fs.F_OK, function(err) {
				
					if(err){
						res.statusCode = HttpStatus.BAD_REQUEST;
						return res.send({message: 'Unable to open config file'});
					}
					
					//check if the mongodb url is valid
					try {
						MongoClient.connect(dbStr, function(err, db) {
							if(err) {
								res.statusCode = HttpStatus.BAD_REQUEST;
								return res.send({message: 'Unable to connec to MongoDB'});
							}
							else {
								config.mongo_connection_str = dbStr;
								fs.writeFile(config.config_file, JSON.stringify(config, null, 2) , 'utf-8');
								return res.send({});
								
							}
						});
					}
					catch (err){
						console.log(err.message);
						res.statusCode = HttpStatus.BAD_REQUEST;
						return res.send(err.message);
					}
			});

		}
		
		let siteTitle = req.body.title;
		if (!(typeof siteTitle === 'undefined')) {
			
			config.title = siteTitle;
			fs.writeFile(config.config_file, JSON.stringify(config, null, 2) , 'utf-8');
			return res.send({});
		}
		
		
		let googleClientId = req.body.googleClientId;
		if (!(typeof googleClientId === 'undefined')) {
			
			config.google_client_id = googleClientId;
			fs.writeFile(config.config_file, JSON.stringify(config, null, 2) , 'utf-8');
			return res.send({});
		}
		
		let twitterConsumerKey = req.body.twitterConsumerKey;
		let twitterConsumerSecret = req.body.twitterConsumerSecret;
		
		if (!(typeof twitterConsumerKey === 'undefined') && !(typeof twitterConsumerSecret === 'undefined')) {
			
			config.twitter_consumer_key = twitterConsumerKey;
			config.twitter_consumer_secret = twitterConsumerSecret;
			fs.writeFile(config.config_file, JSON.stringify(config, null, 2) , 'utf-8');
			return res.send({});
		}
		
		res.statusCode = HttpStatus.BAD_REQUEST;
		return res.send('Field name is not understood');
		
	}
	
	install(req, res) {
		let dbStr = req.body.db;
		let siteTitle = req.body.siteTitle;
		let adminEmail = req.body.adminEmail;
		let adminPassword = req.body.adminPassword;
		
		if (typeof dbStr === 'undefined'){
			res.statusCode = HttpStatus.BAD_REQUEST;
			return res.send('Database connection string is missing');
		}
		
		if (typeof siteTitle === 'undefined'){
			res.statusCode = HttpStatus.BAD_REQUEST;
			return res.send('Site title is missing');
		}
		
		if (typeof adminEmail === 'undefined'){
			res.statusCode = HttpStatus.BAD_REQUEST;
			return res.send('Admin\' email address is missing');
		}
		
		if (typeof adminPassword === 'undefined'){
			res.statusCode = HttpStatus.BAD_REQUEST;
			return res.send('Admin\' password is missing');
		}
		
		try {
			MongoClient.connect(dbStr, function(err, db) {
				if(err) {
					res.statusCode = HttpStatus.BAD_REQUEST;
					return res.send({message: 'Unable to connec to MongoDB'});
				}
				else {
					config.mongo_connection_str = dbStr;
					fs.writeFile(config.config_file, JSON.stringify(config, null, 2) , 'utf-8');
					return res.send({});
					
				}
			});
		}
		catch (err){
			console.log(err.message);
			res.statusCode = HttpStatus.BAD_REQUEST;
			return res.send(err.message);
		}
		
		
	}
}

export default UserController;
