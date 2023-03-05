const ticketController = require("../controllers/ticket.controller");
const { authJwt , validateTicket } = require("../middlewares");
module.exports = (app) =>{

    app.post("/crm/api/tickets/",[authJwt.verifyToken, validateTicket.isValidTicket ], ticketController.createTicket);

    app.get("/crm/api/tickets/",[authJwt.verifyToken], ticketController.getAllTickets);

    app.put("/crm/api/tickets/:id", [ authJwt.verifyToken ,validateTicket.isValidOwnerOfTheTicket] , ticketController.updateTicket);
    
}