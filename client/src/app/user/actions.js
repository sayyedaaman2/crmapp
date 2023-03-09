import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "http://localhost:8080";
const id = Cookies.get("id");
export const getUser = createAsyncThunk(
  "user/getUser",
  async (page, { rejectWithValue }) => {
    try {
      console.log(id)
      const token  = Cookies.get('x-access-token');
      const response = await axios.get(`${baseUrl}/crm/api/user/${id}`,{withCredentials:true ,headers : {
        "x-access-token" : token
      }});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
