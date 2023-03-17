const nodemailer = require('nodemailer');
const {userName,password,clientId,clientSecret,refreshToken} = require('../configs/email.config')
//todo:solve the nodemailer problem
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type : 'OAuth2',
        user : userName,
        pass: password,
        clientId : clientId,
        clientSecret : clientSecret,
        refreshToken : refreshToken
    }
})

module.exports = (subject , content, recepients, requester)=>{

    //create the request body
    const mailOptions = {
        from : requester,
        to : recepients,
        subject : subject,
        text : content,
    }
    

    //Prepare the headers
    const reqHeader = {
        "Content-Type": "application/json"
    }

    //Combine headers and req body together
    const args = {
        data : reqBody,
        headers : reqHeader
    }
    console.log(args);

    //make a post call and handle the response 
    
    try{
        console.log("in the client function")
        client.post(ClientRestCall.CLIENT_REST_CALL,args, (data, res)=>{

            console.log("Request sent");
            console.log(data);

        })
    }catch(err){
        console.log("Some Error while sending the message : ", err.message);
    }
}
