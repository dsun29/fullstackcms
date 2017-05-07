import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import serverRoutes from './server/routes';
import { makeStore } from './app/helpers';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import config from './server/fullstackcms.config';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

if (config.installed) {
    app.use(session({
    	name: 'fullstackrebel',
    	secret: 'fwfeUkm89fwefe_kL',
    	resave: true,
    	saveUninitialized: true,
    	store: new MongoStore({ url: config.mongo_connection_str })
    }));
}

/*
app.use((req, res, next) => { // force https
	if (req.secure) {
		next();
        
	} else {
		if (req.method === 'GET' || req.method === 'HEAD') {
			res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
		} else {
			res.redirect(301, 'https://men-sundavy.c9users.io/');
		}
	}
});
*/

serverRoutes(app);


module.exports = app;
