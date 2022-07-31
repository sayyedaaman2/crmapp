const ticketController = require("../controllers/ticket.controller");
const { authJwt , validateTicket } = require("../middlewares");
module.exports = (app) =>{

    app.post("/crm/api/v1/tickets/",[authJwt.verifyToken, validateTicket.isValidTicket ], ticketController.createTicket);

    app.get("/crm/api/v1/tickets/",[authJwt.verifyToken], ticketController.getAllTickets);

    app.put("/crm/api/v1/tickets/:id", [ authJwt.verifyToken ,validateTicket.isValidOwnerOfTheTicket] , ticketController.updateTicket);
    
}