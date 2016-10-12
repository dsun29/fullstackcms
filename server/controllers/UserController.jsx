import https from 'https'
import locale from '../../share/util/locale'
import DB from '../util/DB'
import config from '../server.dev.config'
import Controller from './Controller'
import twitterAPI from 'node-twitter-api'

let twitter = new twitterAPI({
    consumerKey: '9LBNDwogxgbP9nfm2jq0jRghy',
    consumerSecret: 'UfbBZnNsnOtuDJ3EavvtF0AX1qxXxdLbkSWq8IpynG8QBpkaza',
    callback: 'https://men-sundavy.c9users.io:8080/'
});

class UserController extends Controller{

	login(req, res){
		if(typeof req != undefined){
			this.req = req;
		}
		if(typeof res != undefined){
			this.res = res;
		}
		
		let source = req.body.source;
		if (source == undefined || source == 'google')	{
			return this.loginGoogle(req.body.email, req.body.tokenId);
			
		}
		else if (source == 'twitter'){
			twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
			    if (error) {
			        console.log("Error getting OAuth request token : " + error);
			        res.statusCode = 500;
			        res.send(error);
			        return;
			    } else {
			        
			        
			        let session = req.session;
			        session.requestToken = requestToken;
			        session.requestTokenSecret = requestTokenSecret;
			        
			        console.log('session created - ', req.session);
			        
			        res.send('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
			        return;
			    }
			});
		}

	}
	
	/*
		{
		 // These six fields are included in all Google ID Tokens.
		 "iss": "https://accounts.google.com",
		 "sub": "110169484474386276334",
		 "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
		 "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
		 "iat": "1433978353",
		 "exp": "1433981953",

		 // These seven fields are only included when the user has granted the "profile" and
		 // "email" OAuth scopes to the application.
		 "email": "testuser@gmail.com",
		 "email_verified": "true",
		 "name" : "Test User",
		 "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
		 "given_name": "Test",
		 "family_name": "User",
		 "locale": "en"
		}
	*/	

	loginGoogle(email, tokenId){
		https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + tokenId, (res2) => {

		  res2.on('data', (d) => {

		  	this.parseGoogleResults(d);
		  });
		 
		}).on('error', (e) => {
		  this.errorhandle(e);
		});
	}
	
	parseGoogleResults(googleResponseRaw){
		let googleResponse = JSON.parse(googleResponseRaw);

	  	if(googleResponse.email == undefined || googleResponse.email == null){
	  		this.res.statusCode = 400;
	  		this.res.send(locale[config.locale].invalid_google_token)
	  		return;
	  	}
	  	if(googleResponse.email != this.req.body.email){
	  		this.res.statusCode = 400;
	  		this.res.send(locale[config.locale].google_token_email_not_match)
	  		return;
	  	}
	  	
	  	this.googleResponse = googleResponse;
	  	let context = this;

		//step 1: check if user exists
		
		DB.connect().then(function(db){
			DB.find(db, 'Users', {email: googleResponse.email}, 2, 'lastname')
			.then(function(results){
				
				if(results == null || results.length != 1){
					let user = {email: googleResponse.email, firstname: googleResponse.given_name, lastname: googleResponse.family_name,
  							displayname: googleResponse.name, locale: googleResponse.locale, photo: googleResponse.picture, source: 'google'};
					return context.createUserFromResponse(user);
				}
				
				let user = results[0];
				context.setUserSession(user._id, user.email, user.displayname);
				return context.res.send({userid: user._id, displayname: user.displayname});
				
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
	
	setUserSession(userid, email, displayname){
		let sess = this.req.session;
		sess.userid = userid;
		sess.email = email;
		sess.displayname = displayname;
	}
	
	
	createUserFromResponse(user){
		console.log('user not found and being created');
		let context = this;
		
		DB.connect().then(function(db){
			DB.insert(db, 'Users', user)
  			
  			.then(function(results){
				
				context.setUserSession(results.insertedIds[0], user.email, user.displayname);
				context.res.send({userid: results.insertedIds[0], displayname: user.displayname});
		
			})
			.catch(function(error) {
	        	// An error occurred
	        	res.statusCode = 500;
			    res.send(error);
			    return;
    		});
	
		}).catch(function(error) {
        	res.statusCode = 500;
			res.send(error);
			return;
    	});
	
	}
	
	twitterAccessToken(req, res){
		let requestToken =  req.body.oauth_token; //it is the same request token
		let oauth_verifier =  req.body.oauth_verifier;
		
		
		let context = this;
		twitter.getAccessToken(requestToken, req.session.requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
		    if (error) {
				console.log("Error getting OAuth access token : ", error, req.query);
			    res.statusCode = 500;
			    res.send(error);
			    return;
		    } else {
		        //store accessToken and accessTokenSecret somewhere (associated to the user)
		        
		        req.session.accessToken = accessToken;
		        req.accessTokenSecret = accessTokenSecret;
		        
		        //Step 4: Verify Credentials belongs here - get display name and email
		        twitter.verifyCredentials(accessToken, accessTokenSecret, {include_email: false}, function(error, data, response) {
				    if (error) {
				        console.log("Error verifying OAuth access token : ", error);
					    res.statusCode = 500;
					    res.send(error);
					    return;
				    } else {
				        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
				        //data contains the user-data described in the official Twitter-API-docs
				        
				        //TODO - register user, get userid, email and displayname
				        let email = data.email; //TODO: need to request for email permission from Twitter
				        if(email == null){
				        	email = data.id + '@twtter.com';
				        }
				        
				        //Check if email exists already
				        	DB.connect().then(function(db){
				        		
				        			
								DB.find(db, 'Users', {email: email}, {_id: 1, email: 1, displayname: 1}, 2, 'email')
								.then(function(results){
									console.log(results);
									
									if(results == null || results.length == 0){ //user not found
										let user = {email: email, displayname: data.name, locale: data.lang, screen_name: data.screen_name,
													photo: data.profile_image_url_https, source: 'twitter', twitterid: data.id};
													
										DB.insert(db, 'Users', user)
  			
							  			.then(function(results){
											
											context.setUserSession(results.insertedIds[0], user.email, user.displayname);
											res.send({userid: results.insertedIds[0], displayname: user.displayname});
											return;
									
										})
										.catch(function(error) {
								        	// An error occurred
								        	res.statusCode = 500;
										    res.send(error);
										    return;
							    		});
															
									}
									
									let user = results[0];
									context.setUserSession(user._id, user.email, user.displayname);
									return res.send({userid: user._id, displayname: user.displayname}); //TODO - redirect user
									
								})
								.catch(function(error) {
						        	// An error occurred
						        	console.log('Finding existing Twitter account - ', error);
						        	res.statusCode = 500;
								    res.send(error);
								    return;

						    	});
							})
							.catch(function(error) {
					        	// An error occurred
					        	res.statusCode = 500;
							    res.send(error);
							    return;
					    	});
				    }
				});
		        
		        
		        
		        
		    }
		});
		
	}
	
	getStoredState(req, res){
		let twitter_oauth_token = req.body.oauth_token; //oauth_token is given by Twitter, do not change it
		let twitter_oauth_verifier = req.body.oauth_verifier;
		if(twitter_oauth_token != null && twitter_oauth_verifier != null){ //this is a redirect from Twitter with succesul login
			console.log('check if session exists - ', req.session);
			return this.twitterAccessToken(req, res);
		}
		
		if(req.session != null && req.session.userid != null){ //refresh home page
			return res.send({userid: req.session.userid, displayname: req.session.displayname});
		}
		
		return res.send({});
	}
	
	logout(req, res){
		if(req.session){
			req.session.destroy(function(err){
				//TODO: handle error
				res.send();	
				return;
			});
		}
		
		res.send();
	}
	
	
}

export default UserController;