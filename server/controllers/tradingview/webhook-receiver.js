const db = require('../../db')
const {
    checkTradingViewAuth
} = require('./auth')
const {
    tradeExecution
} = require('./trade-execution')
const {
    getBotData,
    getBrokerApiKeys
} = require('./getUserData')

const recieveTest = async(req,res) =>{
    const body = req.body
    const {tradeSide, token} = body
    await db.collection('TradingViewReqs').doc().create(body)
    // const tradeSide = "BUY"
    // const encodedText = "MmdrdUtVamlVdG92ODJwRXZibjNffF9lZWI1MWY0ZjAwYmViYzFhNzEzNzg5Y2ZlMzJlMWVjODo0YzRlMjc3YmY5YjQ2MDIzM2JjOTYzYjcyMjgzNmY5M2Y0M2UyNTNjNWE4OWYxZWY1ZDdhODkyNTUxNjg3MGMwMDhiYjM4YmU4NTYzZDAyZTM3N2UwMQ=="
    
    // decodes and decrypts the request from the TradingView Request to authenticate the request.
    const result = await checkTradingViewAuth(token);
    

    if(result.success !== true){
        return res.satus(400).json({
            success: false,
            error: "malformed Inputs!"
        })
    }
    else{
        const {botId, userId} = result.result
        const botData = await getBotData(userId,botId);
        const apiKeys = await getBrokerApiKeys(userId,botData.brokerId)

        var tradeExecutionResponse = await tradeExecution(
            tradeSide,
            userId,
            botData,
            apiKeys
        );

        responseHandler(tradeExecutionResponse,res);
    }

    
}


module.exports = {
    recieveTest,
}


function responseHandler(result,res){
    if(result.success === false){
        return res.status(500).json({
            success: false,
            result
        })
    }
    else{
        return res.status(200).json({
            success: true,
            result
        })
    }
}





