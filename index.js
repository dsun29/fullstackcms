'use strict';

require('babel-register')(
{
    "plugins": [
    ["transform-runtime", {
      "regenerator": true
    }]
  ]
  
});

const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server on port ', PORT);
});
