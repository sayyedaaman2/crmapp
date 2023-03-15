import axios from "axios";

const baseUrl = "http://localhost:8080";

export default class Auth {
  static async test() {
    try {
      const url = `${baseUrl}/`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(`Some error while testing api ${error}`);
      return error;
    }
  }
  static async signUp(data) {
    try {
      const url = `${baseUrl}/crm/api/auth/signup`;
      const response = await axios.post(url, data, { withCredentials: true });
      return response;
    } catch (error) {
      const response = await error;

      console.log(`Some error while creating the user account ${error}`);
      return response;
    }
  }

  static async login(data) {
    try {
      const url = `${baseUrl}/crm/api/auth/signin`;
      const response = await axios.post(url, data, { withCredentials: true });
      return response;
    } catch (error) {
      const response = await error;
      console.log(`some error while login user ${error}`);
      return response;
    }
  }
  static async uploadImage(data) {
    try {
      const url = `${baseUrl}/crm/api/user/img`;
      const response = await axios.post(url, data, {
        headers: { "x-access-token": data.accessToken },
      });
      return response;
    } catch (error) {
      console.log(`Some error while testing api ${error}`);
      return error;
    }
  }
}

