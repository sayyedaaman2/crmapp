const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    image : {
        type : String,
        default : ""
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.customer,
        enum : [constants.userType.customer, constants.userType.admin ,constants.userType.engineer]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]
    },
    ticketsCreated : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Ticket"
    },
    ticketsAssigned : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Ticket",
    }
},{
    timestamps : true , versionKey : false
});

module.exports = mongoose.model("user", userSchema);