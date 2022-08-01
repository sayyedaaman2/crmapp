const Client = require("node-rest-client").Client;
const client = Client();


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
        "Content-Type" : "applicaton/json"
    }

    //Combine headers and req body together
    const args = {
        data : reqBody,
        headers : reqHeader
    }

    //make a post call and handle the response 
    
    try{
        console.log("in the client function")
        client.post("http://localhost:8000/notiserv/api/v1/notifications",args, (data, res)=>{

            console.log("Request sent");
            console.log(data);
            res.send(200).send("hello");
        })
    }catch(err){
        console.log(err.message);
    }
}
