const getBinanceConnector =  require('../binance-connector')
const { Spot } = require('@binance/connector')
const axios = require('axios')
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
        // console.log("USER",userId)
        // var binanace = getBinanceConnector(userId);
        // var binance = new Spot(
        //     'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF',
        //     'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g',
        //     {
        //         baseURL: 'https://testnet.binance.vision'
        //     })

        // binance.newOrder(
        //     body.symbol,
        //     body.side,
        //     body.type,
        //     {
        //         quantity: body.quantity,
        //     }
        // )
        // .then((ApiResponse)=>{
        //     console.log(ApiResponse);

        //     return res.status(200).json({
        //         response: ApiResponse,
        //     })

        // })
        // .catch((error)=>{
        //     console.log(error);
        //     return res.status(500).json({
        //         error: error,
        //     })
        // })
        const apiKey = 'L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF';
        const secretKey = 'SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g';

        const timestamp = Date.now();
        const symbol = 'BTCUSDT';
        const side = 'BUY';
        const type = 'MARKET';
        const timeInForce = 'GTC';
        const quantity = '0.001';

        // Create the signature
        const queryString = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;
        const signature = crypto.createHmac('sha256', secretKey).update(queryString).digest('hex');

        const headers = {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
        };

        const data = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}&signature=${signature}`;

        axios.post('https://testnet.binance.vision/api/v3/order', data, { headers })
        .then(response => {
            console.log(response.data);
            return res.status(200).json({
                response: response.data
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error
            })
        });
        
    }
}

module.exports = {
    createSpotOrder,
}