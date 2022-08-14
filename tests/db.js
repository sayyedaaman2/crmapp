/**
 * This file will be used to initiate the connection with
 * mongodb memery server { which we have installed as npm dependency }
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
/**
 * Connection to the DB
 */
module.exports.connect = async ()=>{
    if(!mongod){
        console.log('connect ----------------------')

        mongod = await MongoMemoryServer.create(); // create a running mongo server
        const uri = mongod.getUri(); //getUri() will return the URI of the running mongo  server
        const mongooseOpts = {
            useUnifiedTopology : true,
            maxPoolSize : 10
        }
        mongoose.connect(uri, mongooseOpts); // mongoose is now connected to MongoDB

    }
}
/**
 * Disconnecting to the DB and closing all the connection
 * 
 *  When Testing is Completed
 */
module.exports.closeDatabase = async ()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if(mongod){
        await mongod.stop();
    }
}
/**
 * Clear the db, remove all the records after the testing is complete 
 * 
 * when each individual test is completed
 */
module.exports.clearDatabase = () =>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
        collection.deleteMany()// delete the all collections
    }
}
