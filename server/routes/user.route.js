const userController = require("../controllers/user.controller");
const { authJwt } = require("../middlewares")
const {upload} = require('../multer')
module.exports = (app) =>{
    
    app.get("/crm/api/users",[authJwt.verifyToken, authJwt.isAdmin ] , userController.findAll);

    app.post('/crm/api/user/img',upload.single('image'), [authJwt.verifyToken],userController.uploadImg)
    
    app.get("/crm/api/user/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner] , userController.findByUserId);

    app.put("/crm/api/user/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner, authJwt.isValidUserStatusUserType] ,userController.update);

}