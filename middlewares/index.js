const verifySignUp = require('./verifySignUp');
const authJwt = require("./auth.jwt");
const validateTicket = require('./ticketValidator');

module.exports = {
    verifySignUp,
    authJwt,
    validateTicket
}