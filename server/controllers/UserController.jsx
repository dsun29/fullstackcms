import https from 'https'
import locale from '../../share/util/locale'
import DB from '../util/DB'
import config from '../server.dev.config'
import Controller from './Controller'

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

		//step 1: check if ''use exists
		
		DB.connect().then(function(db){
			DB.find(db, 'Users', {email: googleResponse.email}, 2, 'lastname')
			.then(function(results){
				
				if(results == null || results.length != 1){
					return context.createGoogleUserFromResponse(context.googleResponse);
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
	
	
	createGoogleUserFromResponse(googleResponse){
		console.log('user not found and being created');
		let context = this;
		
		DB.connect().then(function(db){
			DB.insert(db, 'Users', {email: googleResponse.email, firstname: googleResponse.given_name, lastname: googleResponse.family_name,
  							displayname: googleResponse.name, locale: googleResponse.locale, photo: googleResponse.picture, source: 'google'}
  			)
  			.then(function(results){
				
				context.setUserSession(results.insertedIds[0], googleResponse.email, googleResponse.name);
				context.res.send({userid: results.insertedIds[0], displayname: googleResponse.name});
		
			})
			.catch(function(error) {
        	// An error occurred
        	console.log('Wrong3');
        	console.log(error);
    		});
	
		}).catch(function(error) {
        	// An error occurred
        	console.log('Wrong2');
        	console.log(error);
    	});
	
	}
	
	
}

export default UserController;