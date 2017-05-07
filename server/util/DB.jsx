import {MongoClient} from 'mongodb';
import config from '../fullstackcms.config';
import {ObjectId} from 'mongodb'

class DB{
    
    static connect() {
        return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
            MongoClient.connect(config.mongo_connection_str, (err, db) => {
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
                else{
                    results._id = id;
                    resolve(results);
                    
                } 
            });
        });
        
    }
    
    static textSearch(db, collectionName, keywords, fields, numRows = 20){
        let collection = db.collection(collectionName);
        return new Promise((resolve, reject)=>{
            resolve(collection.find({"$text": {"$search": keywords}}, {score: {$meta: "toextScore"}}).sort({score:{$meta:"textScore"}}).limit(numRows));
        });
    }
    
}

export default DB;