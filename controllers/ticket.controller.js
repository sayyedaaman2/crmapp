const constants = require("../utils/constants");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

exports.createTicket = async (req, res) => {

    try {

        const ticketObj = {
            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            status: req.body.status,
            reporter: req.userId// I got it from access token
        }

        const engineer = await User.findOne({
            userType: constants.userType.engineer,
            userStatus: constants.userStatus.approved
        });
        if (engineer) {
            ticketObj.assignee = engineer.userId;
        }

        const ticketCreated = await Ticket.create(ticketObj);

        if (ticketCreated) {

            const customer = await User.findOne({
                userId: req.userId
            });
            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();

            if (engineer) {
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }
            res.status(201).send(ticketCreated);
        }

    } catch (err) {
        console.log("Error while doing the DB operations :", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


exports.getAllTickets = async (req, res) => {

    const user = await User.findOne({ userId: req.userId });
    const queryObj = {};
    const ticketsCreated = user.ticketsCreated;
    const ticketsAssigned = user.ticketsAssigned;

    if (user.userType == constants.userType.customer) {

        if (!ticketsCreated) {
            return res.status(200).send({
                message: "No tickets created by the user yet"
            })
        }
        queryObj["_id"] = { $in: ticketsCreated };
        

    } else if (user.userType == constants.userType.engineer) {
        if (!ticketsAssigned) {
            return res.status(200).send({
                message: "No tickets Are Assigned !"
            })
        }

        queryObj["$or"] = [{"_id" : { $in : ticketsCreated } }, {"_id" : { $in : ticketsAssigned }}]

    }
    const tickets = await Ticket.find(queryObj);

    res.status(200).send({
        userType: user.userType,
        tickets: tickets
    });

}

exports.updateTicket = async (req, res)=>{

    try{
        
        const ticket = await Ticket.findOne({"_id" : req.params.id});

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.priority != undefined ? req.body.priority : ticket.ticketPriority;
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;

        const updatedTicket = await ticket.save();

        res.status(200).send(updatedTicket);

    }catch(err){
        console.log("Some error while updating ticket :", err.message);
        return res.status(500).send({
            message : "Some Internal error while update the ticket !"
        })
    }
}