const ticketController = require("../controllers/ticket.controller");
const { authJwt , validateTicket } = require("../middlewares");
const router = require('express').Router();

router.post("/tickets/",[authJwt.verifyToken, validateTicket.isValidTicket ], ticketController.createTicket);

router.get("/tickets/",[authJwt.verifyToken], ticketController.getAllTickets);

router.put("/tickets/:id", [ authJwt.verifyToken ,validateTicket.isValidOwnerOfTheTicket] , ticketController.updateTicket);

module.exports = router;