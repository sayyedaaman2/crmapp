const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require('../models/user.model');
const constants = require('../utils/constants');

const verifyToken =  (req, res, next) =>{
    
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided ! Acess prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded) =>{

        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id;
        const user = await User.findOne({userId : req.userId});
        req.user = user;
        next();
    })

}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userType.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

const isValidUserIdInReqParam = async (req, res, next) =>{
    try{
        const user = await User.findOne({ userId : req.params.id });
        if(!user){
            return res.status(400).send({
                message : "UserId passed doesn't exist"
            })
        }
        next();
    }catch(err){
        cosnole.log("Error while reading the user info ", err.message);
        return res.status(500).send({
            message : "Internal server error whiel reading the user data"
        })
    }
}

const isAdminOrOwner = async (req, res, next) =>{

    try{
        const callingUser = await User.findOne({ userId : req.userId });
        if(callingUser.userType == constants.userType.admin || callingUser.userId == req.params.id){
            next();
        }else{
            res.status(403).send({
                message : "Only admin or the owner is allowed to make this call"
            })
        }
    }catch(err){
        console.log("Error while reading the user info ", err.message );
        return res.status(500).send({
            message : "Internal Server error while reading the user data "
        })
    }
}

const isValidUserStatusUserType = async (req, res, next) =>{

    const callingUser = await User.findOne({ userId : req.userId});
     
    if(callingUser.userType == constants.userType.admin){
        if(req.body.name){
            return res.status(400).send({
                message : "ADMIN can't change the user name !"

            })
        }
        next();
    }else{
        if(req.body.userType || req.body.userStatus){
            return res.status(400).send({
                message : "Only ADMIN update the userStatus and userType !"
            })
        }
        next();
    }

}




const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidUserIdInReqParam : isValidUserIdInReqParam,
    isAdminOrOwner : isAdminOrOwner,
    isValidUserStatusUserType : isValidUserStatusUserType
};

module.exports = authJwt;