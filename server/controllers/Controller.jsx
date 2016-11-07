import { MongoClient } from 'mongodb';
const debug = require('debug')('server');

import config from '../server.dev.config';
import locale from '../../share/util/locale';
import DB from '../util/DB';

export default class Controller {
    
	constructor (req, res) {

		if (typeof req != undefined) {
			this.req = req;
		}
		if (typeof res != undefined) {
			this.res = res;
		}
	}
	
	errorHandler (e) {
		
		debug(e.stack);
		this.res.statusCode = 500; // server error
		this.res.send(e.stack);
	}
	
	
	respond_no_auth () {
		this.res.statusCode = 401;
		this.res.send(locale[config.locale].no_auth);
	}
    
	response_server_error (error) {
		this.res.statusCode = 500;
		this.res.send(error.stack);
	}    
    
	checkSession (req) {
		if (req.session == undefined || req.session == null || req.session.email == null || req.session.userid == null) {
			this.respond_no_auth();
			console.log('Session check failed', req.session);
			
			return false;
		} 
	}
    
	checkUserRole (userRecord, requiredRole) {
		if (userRecord == null || userRecord.length != 1) {
  
			this.respond_no_auth();
			
			return false;
		}
		
		const user_roles = userRecord[0].roles;
		
		if (user_roles == null) {

			this.respond_no_auth();
			
			return false;
		}
		
		if (user_roles.indexOf(requiredRole) == -1) {
	
			this.respond_no_auth();
			
			return false;
		}
	}
	
	
}
