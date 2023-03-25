import axios from "axios";

const baseUrl = "http://localhost:8080";

export default class Ticket {
    static async getTicket(data){
        try{
            const url = `${baseUrl}/crm/api/ticket/`
            const response = await axios.get(url,{
                headers : {"x-access-token" : data.accessToken}
            });
            return response;
        }catch(error){
            console.log(`Some error while getting ticket !!!`);
            return error;
        }
    }
    static async createTicket(data){
        try{
            const url = `${baseUrl}/crm/api/ticket/create`
            const response = await axios.post(url,data,{
                headers : {"x-access-token" : data.accessToken}
            });
            return response;
        }catch(error){
            console.log(`Some error while getting ticket !!!`);
            return error;
        }
    }
    
}