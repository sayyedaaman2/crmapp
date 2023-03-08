const User = require("../models/user.model");
const constants = require('../utils/constants');

const validateSignUpRequestBody = async (req, res, next) =>{

    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! User name is not provided"
        })
    }

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! UserId is not provided"
        })
    }

    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user != null){
            return res.status(400).send({
                message : "Failed ! UserId is already taken"
            })
        }
    }catch(err){
        return res.status(500).send({
            message : "Internal server error while validating the request"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Failed ! Not a valid email id"
        })
    }

    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Failed ! Not a valid email id"
        })
    }
    const emailExist = await User.findOne({email : req.body.email});

    if(emailExist){
        return res.status(400).send({
            message : "Failed ! Email Already taken"
        })
    }
    if(!req.body.userType){
        return res.status(400).send({
            message : "Failed ! User type is not passed"
        });
    }

    if(req.body.userType == constants.userType.admin){
        return res.status(400).send({
            message : "ADMIN registartion is not allowed"
        })
    }

    const userTypes = [constants.userType.customer, constants.userType.engineer];

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "UserType provided is not correct values : CUSTOMER | ENGINEER"
        })
    }

    next();
}

const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignInRequestBody = (req, res, next) =>{

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! UserId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password is not provided"
        })
    }

    next();
}

const verifyRequestBodiesForAuth = {
    validateSignUpRequestBody : validateSignUpRequestBody,
    validateSignInRequestBody : validateSignInRequestBody
}

module.exports = verifyRequestBodiesForAuth;