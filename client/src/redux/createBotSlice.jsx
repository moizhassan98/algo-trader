import { createSlice } from "@reduxjs/toolkit";
import Joi from "joi";

const createBotSlice = createSlice({
    name: "createBot",
    initialState: {
        broker: "",
        symbol: "",
        symbolSelectionDone: false,
        brokerSelectionDone: false, // optional
        spotSelected: true,
        isolatedSelected: true,
        leverageMultiplier: 1,
        percentageSelected: true,
        percentageAmount: 0,
        fixedDollarAmount: 0,
        createBotError: null, // optional
        createBotCompleted: false, //optional
        createBotLoading: false
    },
    reducers: {
        setBroker: (state,action)=>{
            state.broker = action.payload
        },
        setSymbol: (state, action)=>{
            state.symbol = action.payload
        },
        symbolSelectionCompleted: (state) =>{
            state.symbolSelectionDone = true
        },
        brokerSelectionCompleted: (state)=>{
            state.brokerSelectionDone = true
        },
        setSpotSelected: (state, action)=>{
            state.spotSelected = action.payload
        },
        toggleSpotSelected: (state) =>{
            state.spotSelected = !state.spotSelected
        },
        toggleIsolatedSelected: (state) =>{
            state.isolatedSelected = !state.isolatedSelected
        },
        setLeverageMultiplier: (state,action)=>{
            state.leverageMultiplier = action.payload
        },
        togglePercentageSelected: (state)=>{
            state.percentageSelected = !state.percentageSelected
        },
        setPercentageAmount: (state, action)=>{
            state.percentageAmount = action.paylaod
        },
        setFixedDollarAmount: (state, action) =>{
            state.fixedDollarAmount = action.payload
        },
        setCreateBotError: (state, action) =>{
            state.createBotError = action.payload
        },
        setCreateBotCompleted: (state, action)=>{
            state.createBotCompleted = action.payload
        },
        setCreateBotLoading: (state,action)=>{
            state.createBotLoading = action.payload
        }
    }
})
export const {
    setBroker,
    setSymbol,
    brokerSelectionCompleted, 
    symbolSelectionCompleted,
    setSpotSelected, 
    toggleSpotSelected, 
    toggleIsolatedSelected, 
    setLeverageMultiplier,
    togglePercentageSelected,
    setFixedDollarAmount,
    setPercentageAmount,
    setCreateBotError,
    setCreateBotCompleted,
    setCreateBotLoading
} = createBotSlice.actions
export default createBotSlice.reducer

export const createBotValidation = () => async(dispatch, getState) =>{
    const validationState = getState().createBot

    const validatorObject = Joi.object({
        broker: Joi.string().required(),
        symbol: Joi.string().required(),
        spotSelected: Joi.boolean().required(),
        isolatedSelected: Joi.boolean().required(),
        leverageMultiplier: Joi.number().min(1).max(125).required(),
        percentageSelected: Joi.boolean().required(),
        percentageAmount: Joi.number().min(0).max(100).required(),
        fixedDollarAmount: Joi.number().min(0).max(10000000).required(),

        brokerSelectionDone: Joi.boolean(),
        symbolSelectionDone: Joi.boolean(),
        createBotError: Joi.optional(),
        createBotCompleted: Joi.boolean(), 
        createBotLoading: Joi.optional()
    })
    

    const {error} = validatorObject.validate(validationState);
    if(error){
        dispatch(setCreateBotError(error.message))
    }
    else{
        dispatch(setCreateBotError(null))
    }
}

export const createBot = () => async(dispatch, getState) =>{
    dispatch(setCreateBotLoading(true))
    dispatch(createBotValidation());
    const valid = (getState().createBot.createBotError) ? false : true
    if(valid){
        //TODO: Save to DB
        await new Promise((resolve)=> setTimeout(()=>resolve(), 5000))
        dispatch(setCreateBotLoading(false))
        dispatch(setCreateBotCompleted(true))
    }
    
}