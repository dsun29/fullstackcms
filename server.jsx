import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import serverRoutes from './server/routes';
import { makeStore } from './app/helpers';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	name: 'fullstackrebel',
	secret: 'fwfeUkm89fwefe_kL',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: 'mongodb://localhost:27017/fullstackrebel' })
}));

app.use((req, res, next) => { // force https
	if (req.secure) {
		next();
        
	} else {
		if (req.method === 'GET' || req.method === 'HEAD') {
			res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
		} else {
			res.redirect(301, 'https://fullstackrebel.com');
		}
	}
});

serverRoutes(app);


module.exports = app;
