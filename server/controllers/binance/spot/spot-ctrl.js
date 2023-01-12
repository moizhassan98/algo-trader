const getBinanceConnector =  require('../binance-connector')
const { Spot } = require('@binance/connector')
const { binance } = require('../helper/binance-api')
const crypto = require('crypto')
const {
    createSpotOrderSchema,
} = require('./validators')

const createSpotOrder  =async(req,res) =>{
    const {error} = createSpotOrderSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error
        });
    }
    else{
        const body = req.body
        var userId = body.userId;
        const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
        const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
        const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
        const symbol = 'BTCUSDT';
        const side = 'BUY';
        const type = 'MARKET';
        // const timeInForce = 'GTC';
        const quantity = '0.001';


        var result = await binance(
            'https://testnet.binance.vision/api/v3/order',
            'POST',
            apiKey,
            apiSecret,
            {
                symbol,
                side,
                type,
                quantity
            }
        );
        
        return res.status(200).json({
            result: result
        })
       
        
    }
}

module.exports = {
    createSpotOrder,
}