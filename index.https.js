#!/usr/bin/env node

'use strict';

require('babel-register')(
{
    "plugins": [
    ["transform-runtime", {
      "regenerator": true
    }]
  ]
  
});

var https = require('https');
var http = require('http');
var server_config = require( './server/server.dev.config' ).default;

const app = require('./server');
app.use(function(req, res, next){ //force https
    if(req.secure){
        next();
        
    }else{
        if(req.method === "GET" || req.method === 'HEAD') {
			res.redirect(301, "https://" + req.headers.host + req.originalUrl);
		} else {
			res.redirect(301, "https://fullstackrebel.com");
		}
    }
});

var httpsServer = https.createServer(server_config.ssl_cert_credentials, app);
httpsServer.listen(443, function(){
    console.log('Listening on 443');
});

http.createServer(app).listen(80, function(){
    console.log('Listening on 80');
});