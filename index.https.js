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
var debug = require('debug')('server')

var server_config = require( './server/server.dev.config' ).default;
const app = require('./server');


var httpsServer = https.createServer(server_config.ssl_cert_credentials, app);
httpsServer.listen(443, function(){
    debug('HTTPS server starting, listening on 443');
});

http.createServer(app).listen(80, function(){
     debug('HTTP server starting, listening on 80');
});