
const account = require('./spot-account')
const orders = require('./spot-orders.js')

const getSpotAccountAssets = async(req,res) =>{

    var binanceQuery = await account.getSpotAccountBalances();

    responseHandler(binanceQuery, res);
}

const getAssetBalance = async(req,res) =>{
    var apiKey = req.body.apiKey
    var apiSecret = req.body.apiSecret
    var binanceQuery = await account.getAccountBalanceForAsset(
        apiKey,
        apiSecret,
        'USDT'
    )

    responseHandler(binanceQuery, res);
}

const getAllSpotOrdersCtrl = async(req,res) => {
    var apiKey = req.body.apiKey
    var apiSecret = req.body.apiSecret

    var binanceQuery = await orders.getAllSpotOrders(
        apiKey,
        apiSecret,
        {
            symbol: "BTCUSDT"
        }
    )

    responseHandler(binanceQuery, res);
}

const createOrderForSpot = async(req,res) =>{
    var apiKey = req.body.apiKey
    var apiSecret = req.body.apiSecret

    var binanceQuery = await orders.createSpotOrder(
        apiKey,
        apiSecret,
        {
            symbol: "BTCUSDT",
            side: "BUY",
            type: "MARKET",
            // quoteOrderQty: 15,  // quote quantity, like for BTCUSDT trade USDT is quote so amount of USDT
            // quantity: 0.00055   // quantity of base symbol in in pair, e.g BTC in BTCUSDT.
        }
    )

    responseHandler(binanceQuery, res);
}

module.exports = {
    getSpotAccountAssets,
    getAssetBalance,
    getAllSpotOrdersCtrl,
    createOrderForSpot
}

function responseHandler(binanceQuery,res){
    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(binanceQuery.status).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}
