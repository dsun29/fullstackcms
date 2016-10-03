'use strict';

require('babel-register')(
{
    "plugins": [
    ["transform-runtime", {
      "regenerator": true
    }]
  ]
  
    
    
});

const f = require('./playground');

function g(results){
  console.log('----------------------------')
  console.log(results);
  console.log('----------------------------')
}
console.log('ooooooooooooo');
f(g);
console.log('vvvvvvvvvvvvvvvvv');


