import { createSlice } from "@reduxjs/toolkit";
import api from "../apis";

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

export const createUser = (user) => async(dispatch, getState) =>{
    var authToken = getState().auth.authToken
    api.userExists(authToken).then((response)=>{
        if(!response.data.exists){ // only run if user already doesn't exists
            api.createUser(user,authToken)
                .then((response)=>{

                })
                .catch((error)=>{
                    
                })
        }
    })
    .catch((err)=>{

    })
}



