import {MongoClient} from 'mongodb';
import co from 'co';

function func(f){
  
  var b;
  co(function*() {
    // Connection URLf
    var db = yield MongoClient.connect('mongodb://localhost:27017/fullstackrebel');
    console.log("Connected correctly to server");
  
    // Insert a single document
    var r = yield db.collection('users').insertOne({
          a:2
        });
  
  
    
    //search for users
    var docs = yield db.collection('users').find({a:2}).toArray();
    f(docs);
    
    db.close();
    

  }).catch(function(err) {
    console.log(err.stack);
  });
  
}


function open(){

    // Connection URL. This is where your mongodb server is running.

    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        mongoClient.connect('mongodb://localhost:27017/fullstackrebel', (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

open();

module.exports = func;