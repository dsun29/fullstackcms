import config from '../server.dev.config'

class User {
    
    constructor(email = undefined){
        if (email != undefined){
            this.email = email;
        }
    }
    
    getUser(email, callback){
        this.email = email;
        
        
    }

    
    
}