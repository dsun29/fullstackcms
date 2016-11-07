#!/usr/bin/env node

require('babel-register')({
	'plugins': [
        ['transform-runtime', { 'regenerator': true }]
	]
  
});

const debug = require('debug')('http-server');

const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	debug('Server on port ', PORT);
});
