import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        authToken: ''
    },
    reducers:{
        setAuthToken: (state,action)=>{
            state.authToken = action.payload
        },
        clearAuthToken: (state) =>{
            state.authToken = ''
        }
    }
})
export const {setAuthToken, clearAuthToken} = authSlice.actions
export default authSlice.reducer





