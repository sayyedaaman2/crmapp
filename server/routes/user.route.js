const userController = require("../controllers/user.controller");
const { authJwt } = require("../middlewares")
const {upload} = require('../multer')
const router = require('express').Router();

    
router.get("/",[authJwt.verifyToken, authJwt.isAdmin ] , userController.findAll);

router.post('/img',upload.single('image'), [authJwt.verifyToken],userController.uploadImg)

router.get("/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner] , userController.findByUserId);

router.put("/:id",[authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner, authJwt.isValidUserStatusUserType] ,userController.update);

module.exports = router;