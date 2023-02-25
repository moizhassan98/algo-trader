import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers:{
        increment: (state) =>{
            state.value = state.value + 1
        },
        decrement: (state) =>{
            state.value -= 1
        },
        reset: (state) =>{
            state.value = 0
        },
        setValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const {increment, decrement, reset, setValue} = counterSlice.actions

export const delayedIncrement = (amount) => async (dispatch) =>{
    await new Promise((resolve)=> setTimeout(()=>resolve(), 5000)) // 5 sec wait
    dispatch(setValue(amount))
}


export default counterSlice.reducer