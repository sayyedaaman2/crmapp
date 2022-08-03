const Client = require("node-rest-client").Client;
const client = new Client();


module.exports = (subject , content, recepients, requester)=>{

    //create the request body
    const reqBody = {
        subject : subject,
        recepientEmails : recepients,
        content : content,
        requester : requester
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
        client.post("http://localhost:8000/notiserv/api/v1/notifications",args, (data, res)=>{

            console.log("Request sent");
            console.log(data);

        })
    }catch(err){
        console.log("Some Error while sending the message : ", err.message);
    }
}
