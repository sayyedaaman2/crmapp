import { createSlice} from '@reduxjs/toolkit'
import {getUser} from './actions'   

const initialState = {
    data : null,
    isLoading : false,
    isSuccess: false,
    errorMessage : ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // reducers: {},
    extraReducers : {
        [getUser.pending] : (state)=>{
            state.isLoading = true;
        },
        [getUser.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getUser.rejected] : (state, {payload})=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }

    }
})

export default userSlice.reducer;