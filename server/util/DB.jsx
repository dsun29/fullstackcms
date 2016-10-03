import {MongoClient} from 'mongodb';
import config from '../server.dev.config';

class DB{
    
    static findOne(collectionName, condition, createNewIfNotFound, callback){
        MongoClient.connect(config.mongo_connection_str, function(err, db) {
            if(err){
                callback(error, null);
                return;
            }
            
            let collection = db.collection(collectionName);
            if(collection == null || collection == undefined){
                callback(new Error('Wrong Collection Name - ' + collectionName), null);
                return;
            }
            
            collection.findOne(condition, function(err, results){
                if(err){
                    callback(error, null);
                    return;
                }
                
                if(createNewIfNotFound && results == null){
                    
                }
                
                callback(null, results);
            });
            
        });
        
    }
    
        
    static insertOne(collectionName, newRecord, callback){
        MongoClient.connect(config.mongo_connection_str, function(err, db) {
            if(err){
                callback(error, null);
                return;
            }
            
            let collection = db.collection(collectionName);
            if(collection == null || collection == undefined){
                callback(new Error('Wrong Collection Name - ' + collectionName), null);
                return;
            }
            
            collection.insert(newRecord, {}, function(err, results){
                if(err){
                    callback(error, null);
                    return;
                }
                
                callback(null, results);
            });
            
        });
        
    }
    
    static connect() {
        return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
            MongoClient.connect('mongodb://localhost:27017/fullstackrebel', (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
    }
    
    static find(db, collectionName, condition){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            resolve(collection.find(condition).toArray());
        });
        
    }
    
    static insert(db, collectionName, newRecord){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            collection.insert(newRecord, (err, results) => {
             
                if(err) reject(err);
                else resolve(results);
            });
        });
        
    }
        
}

export default DB;