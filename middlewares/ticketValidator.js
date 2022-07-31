const User = require('../models/user.model');
const Ticket = require("../models/ticket.model");
const constants = require('../utils/constants');

const isValidTicket = async (req, res, next) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "Failed ! Title is not Provided !"
        })
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed ! Write description ?"
        })
    }
    const engineer = await User.findOne({
        userType: constants.userType.engineer,
        userStatus: constants.userStatus.approved
    })
    if (!engineer) {
        return res.status(401).send({
            message: "Engineer is not Avaliable ! try to some time later "
        })
    }
    next();

}

const isValidOwnerOfTheTicket = async (req, res, next) => {
    try {
        
        const user = await User.findOne({userId : req.userId});
        
        const ticket = await Ticket.findOne({_id : req.params.id});

        if(user.userType == constants.userType.customer){
            const ownerId = ticket.reporter;

            if(user.userId != ownerId){
                return res.status(403).send({
                    message : "Only ADMIN | OWNER ASSIGNED ENGINEER is allowed "
                })
            }
        }
        else if( user.userType == constants.userType.engineer){
            const ownerId = ticket.reporter;
            const engineerId = ticket.assignee;

            if(user.userId != ownerId && user.userId != engineerId){
                return res.status(403).send({
                    message : "Only ADMIN ASSIGNED ENGINEER is allowed "
                })
            }
        }

        if(req.body.priority){
            if(user.userType != constants.userType.admin){
                return res.status(403).send({
                    message : "Only ADMIN can change the Priority "
                })
            }
        }
        if(req.body.status){
            if(user.userType != constants.userType.customer){
                return res.status(403).send({
                    message : "Only Onwer can change the Status"
                })
            }
        }
        if(req.body.assignee != undefined && user.userType != constants.userType.admin){
            return res.status(403).send({
                message : "Only ADMIN is allowed to re-assign a ticket "
            })
        }

        if(req.body.assignee != undefined){

            const engineer = await User.findOne({ userId : req.body.assignee });
           
            if(engineer == null || engineer.userType != constants.userType.engineer || engineer.userStatus != constants.userStatus.approved){
                return res.status(401).send({
                    message : "Engineer userId passed as assignee is wrong "
                })
            }
        }

        next();

    } catch (err) {
        console.log("Internal Server error ", err.message)
        return res.status(500).send({
            message: "Some Internal Error occured !"
        })
    }
}

const verifyTicket = {
    isValidTicket: isValidTicket,
    isValidOwnerOfTheTicket: isValidOwnerOfTheTicket
}

module.exports = verifyTicket;