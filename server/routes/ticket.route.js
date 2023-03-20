const ticketController = require("../controllers/ticket.controller");
const { authJwt , validateTicket } = require("../middlewares");
const router = require('express').Router();

router.post("/create",[authJwt.verifyToken, validateTicket.isValidTicket ], ticketController.createTicket);

router.get("/",[authJwt.verifyToken], ticketController.getAllTickets);

router.put("/:id", [ authJwt.verifyToken ,validateTicket.isValidOwnerOfTheTicket] , ticketController.updateTicket);

module.exports = router;