const { binance } = require('../helper/binance-api')
const {
    createSpotOrderSchema,
} = require('./validators')

const createSpotOrder  = async(req,res) =>{
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
        )
        if(result.status === 200 ){
            return res.status(200).json({
                result: result.data
            })
        }else{
            return res.status(result.response.status).json({
                error: result.response.statusText
            })
        }
        
    }
}

const cancelSpotOrder = async(req,res) =>{
    const body = req.body
    var userId = body.userId;
    const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
    const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const symbol = 'BTCUSDT';
    const orderId = 6569201; //Neccesary

    var result = await binance(
        'https://testnet.binance.vision/api/v3/order',
        'DELETE',
        apiKey,
        apiSecret,
        {
            symbol,
            orderId,
        }
    );
    
    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText
        })
    }
}

const cancelAllSpotOrders = async(req,res) =>{
    const body = req.body
    var userId = body.userId;
    const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
    const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const symbol = 'BTCUSDT';
    const orderId = 6569201; //Neccesary

    var result = await binance(
        'https://testnet.binance.vision/api/v3/openOrders',
        'DELETE',
        apiKey,
        apiSecret,
        {
            symbol,
        }
    );
    
    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText
        })
    }
}

const getSpotOrderStatus = async(req,res) =>{// Getting Forbidden
    const body = req.body
    var userId = body.userId;
    const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
    const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const symbol = 'BTCUSDT';
    const orderId = 6569201; //Neccesary

    var result = await binance(
        'https://testnet.binance.vision/api/v3/order',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol,
            orderId,
        }
    );
    
    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText
        })
    }

}

const getAllSpotOrders = async(req,res) =>{
    // const body = req.body
    // var userId = body.userId;
    const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
    const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const symbol = 'BTCUSDT';
    const orderId = 6569201; //Neccesary

    var result = await binance(
        'https://testnet.binance.vision/api/v3/allOrders',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol
        }
    );
    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText
        })
    }
}

const getAccountInfo = async(req,res) =>{
    const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
    const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const apiSecret = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';
    const symbol = 'BTCUSDT';
    const orderId = 6569201; //Neccesary

    var result = await binance(
        'https://testnet.binance.vision/api/v3/account',
        'GET',
        apiKey,
        apiSecret,
        {
        }
    );
    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText
        })
    }
}

module.exports = {
    createSpotOrder,
    getSpotOrderStatus,
    getAllSpotOrders,
    cancelAllSpotOrders,
    cancelSpotOrder,
    getAccountInfo,
}