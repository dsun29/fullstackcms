import fs from 'fs'

let config = {
	mongo_connection_str: 'mongodb://localhost:27017/fullstackrebel',
	locale: 'EN',
	service_root_url: 'https://men-sundavy.c9users.io:8080/',
	ssl_cert_credentials: {
		key: fs.readFileSync('/path/to/private.key', 'utf8'),
		cert: fs.readFileSync('/path/to/fullchain.pem', 'utf8')
	}


}

export default config