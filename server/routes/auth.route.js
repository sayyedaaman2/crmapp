const authController = require('../controllers/auth.controller');
const { verifySignUp } = require('../middlewares');
const router = require('express').Router();


//POST /crm/api/v1/auth/signup
router.post("/signup",[verifySignUp.validateSignUpRequestBody] ,authController.signup);

//POST /crm/api/v1/auth/signin
router.post("/signin",[verifySignUp.validateSignInRequestBody], authController.signin);

module.exports = router;