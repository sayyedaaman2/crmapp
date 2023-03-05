const express = require('express');
const app = express();
const cors = require('cors');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

const corsOption = {
    origin : ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error while connecting to MongoDB");
});
db.once("open", ()=>{
    console.log("Connected to mongoDB");
    init();
});

async function init(){
    try{
        //drop the collections
        await User.collection.drop();

        const user = await User.create({
            name : "admin",
            userId : "admin",
            password : bcrypt.hashSync("test1234",8),
            email : "admin123@gmail.com",
            userType : "ADMIN"
        });

        console.log(user);
    }catch(err){
        console.log("err in db initialization , " + err.message);

    }
}

app.get('/',(req,res)=>{
    res.status(200).send({
        message : "testing api..."
    })
})

require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/ticket.route')(app);
/**
 * So this can be used for the intergation Testing
 */
module.exports = app.listen(serverConfig.PORT,()=>{
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
