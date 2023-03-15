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
    reducers: {
        addUser : (state, {payload})=>{
            state.data = payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
          })
          .addCase(getUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
          });
      },
})

export const { addUser } = userSlice.actions

export default userSlice.reducer;