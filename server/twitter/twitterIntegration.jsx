

var reqwest = require('reqwest');

var auth = ['9LBNDwogxgbP9nfm2jq0jRghy', 'UfbBZnNsnOtuDJ3EavvtF0AX1qxXxdLbkSWq8IpynG8QBpkaza'].join(':');
auth = 'Basic ' + new Buffer(auth).toString('base64');

reqwest({
        url: 'https://api.twitter.com/oauth2/token',
        method: 'post',
        type: 'json',
        withCredentials: true,
        data: {grant_type: 'client_credentials'},
        headers: {Authorization: auth},
        error: function(err){
             console.log('error in save_post_action = ', err);
      
        },
        
        success: function (response) {
        	console.log('successfully saved post', response.access_token);

        }

})

