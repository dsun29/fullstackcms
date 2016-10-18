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
var server_config = require( './server/server.dev.config' )

const app = require('./server');

var httpsServer = https.createServer(server_config.ssl_cert_credentials, app);
httpsServer.listen(433);