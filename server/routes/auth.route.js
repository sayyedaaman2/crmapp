const authController = require('../controllers/auth.controller');
const { verifySignUp } = require('../middlewares');

module.exports = (app) =>{
    
    //POST /crm/api/v1/auth/signup
    app.post("/crm/api/auth/signup",[verifySignUp.validateSignUpRequestBody] ,authController.signup);

    //POST /crm/api/v1/auth/signin
    app.post("/crm/api/auth/signin",[verifySignUp.validateSignInRequestBody], authController.signin);
    
}