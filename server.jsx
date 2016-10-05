import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import {Provider} from 'react-redux';
import routes from 'routes';
import createLocation from 'history/lib/createLocation';
import {renderToString} from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import serverRoutes from './server/routes';
import {makeStore} from './app/helpers';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  console.log('session id', req.sessionID, req.query);
  next();
});

app.use(session({
  name: 'fullstackrebel',
  secret: 'fwfeUkm89fwefe_kL',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost:27017/fullstackrebel' })
}))

serverRoutes(app);


module.exports = app;
