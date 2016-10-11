import {MongoClient} from 'mongodb';
import config from '../server.dev.config';
import {ObjectId} from 'mongodb'

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
    
    static find(db, collectionName, condition, fields, numRows = 20, sort = 'lastModified'){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            resolve(collection.find(condition, fields, {limit: numRows, sort: sort}).toArray());
        });
        
    }
    
    static insert(db, collectionName, newRecord){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            collection.insert(newRecord, {upsert: true}, (err, results) => {
             
                if(err) reject(err);
                else resolve(results);
            });
        });
        
    }
    
    static update(db, collectionName, newRecord){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            let id = new ObjectId(newRecord._id);
            delete newRecord._id;
            collection.update({_id: id}, newRecord, (err, results) => {
             
                if(err) reject(err);
                else resolve(results);
            });
        });
        
    }
        
}

export default DB;