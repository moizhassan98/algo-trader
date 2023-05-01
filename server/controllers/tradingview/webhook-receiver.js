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
const Joi = require('@hapi/joi');

const recieveTest = async(req,res) =>{
    
    const body = req.body
    const {error} = webhookrecieverSchema.validate(body);

    if(error){
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
        const {tradeSide, token} = body
        await db.collection('TradingViewReqs').doc().create(body)


        const result = await checkTradingViewAuth(token);
        

        if(result.success !== true){
            return res.status(400).json({
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
    

    
}


module.exports = {
    recieveTest,
}

const webhookrecieverSchema = Joi.object({
    tradeSide: Joi.string().required(),
    token: Joi.string().required()
});

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





