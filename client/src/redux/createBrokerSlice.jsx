import { createSlice } from "@reduxjs/toolkit";

const createBrokerSlice = createSlice({
    name: 'createBroker',
    initialState:{
        broker: '',
        apiKey: '',
        apiSecret: '',
        inputPanel: true,
        outputPanel: false
    },
    reducers:{
        setBroker: (state, action)=>{
            state.broker = action.payload
        },
        setApiKey: (state, action)=>{
            state.apiKey = action.payload
        },
        setApiSecret: (state, action) =>{
            state.apiSecret = action.payload
        },
        setInputPanelComplete: (state) =>{
            state.inputPanel = false
            state.outputPanel = true
        },
        clear: (state) =>{
            state.broker = ''
            state.apiKey = ''
            state.apiSecret = ''
        }
    }
})


export default createBrokerSlice.reducer
export const {setBroker,setApiKey, setApiSecret, clear, setInputPanelComplete} = createBrokerSlice.actions