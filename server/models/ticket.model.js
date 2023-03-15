const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        required : true,
        default : 4
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : constants.ticketStatsues.open,
        enum : [constants.ticketStatsues.open, constants.ticketStatsues.close, constants.ticketStatsues.blocked]
    },
    reporter : {
        type : String,
        required : true
    }, 
    assignee : {
        type  : String
    }
    

}, {timestamps : true , versionKey : false })

module.exports = mongoose.model("Ticket", ticketSchema);