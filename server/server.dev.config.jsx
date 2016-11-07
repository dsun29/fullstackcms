import fs from 'fs'

let config = {
	mongo_connection_str: 'mongodb://localhost:27017/fullstackrebel',
	locale: 'EN',
	service_root_url: 'https://men-sundavy.c9users.io:8080/',
	ssl_cert_credentials: {
		//key: fs.readFileSync('/path/to/private.key', 'utf8'),
		//cert: fs.readFileSync('/path/to/cert.pem', 'utf8')
	},
	
	consumerKey: '9LBNDwogxgbP9nfm2jq0jRghy',
	consumerSecret: 'UfbBZnNsnOtuDJ3EavvtF0AX1qxXxdLbkSWq8IpynG8QBpkaza',
	callback: 'https://men-sundavy.c9users.io:8080/'


};

export default config