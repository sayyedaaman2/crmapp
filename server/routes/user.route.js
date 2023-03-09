const userController = require("../controllers/user.controller");
const { authJwt } = require("../middlewares")

module.exports = (app) =>{
    
    app.get("/crm/api/users",[authJwt.verifyToken, authJwt.isAdmin ] , userController.findAll);

    app.get("/crm/api/user/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner] , userController.findByUserId);

    app.put("/crm/api/user/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner, authJwt.isValidUserStatusUserType] ,userController.update);
    
}