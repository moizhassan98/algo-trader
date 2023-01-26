const { binance } = require('../helper/binance-api')
const account = require('./futures-account')
const setting = require('./futures-settings')
const order = require('./futures-orders')
const advancedOrders = require('./advanced-orders/advanced-orders')

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


const createFuturesOrder = async(req,res) =>{//

    var binanceQuery = await order.createFuturesOrder({
        symbol: 'VETUSDT',
        side: "BUY",
        type: "MARKET",
        quantity: 4207.5,
    })

    responseHandler(binanceQuery, res);
}

const closeFuturesOrder = async(req,res) =>{

    var binanceQuery = await advancedOrders.closeFuturesOrder({
        orderId: 3277169736,
        symbol: 'BTCUSDT'
    })

    responseHandler(binanceQuery, res);
}

const getFuturesOrderStatus = async(req,res) =>{

    var binanceQuery = await order.getFuturesOrderStatus({
        orderId: 3277175690,
        symbol: 'BTCUSDT'
    })

    responseHandler(binanceQuery, res);
}

const cancelFuturesOrder = async(req,res) => { // I think it only cancels the non fulfilled orders.
    
    var binanceQuery = await order.cancelFuturesOrder({
        orderId: 3277175690,
        symbol: 'BTCUSDT'
    })

    responseHandler(binanceQuery, res);
}

const cancelAllFuturesOrders = async(req,res) =>{// Cancel all unfullfilled orders
    var binanceQuery = await order.cancelFuturesOrder({
        symbol: 'BTCUSDT'
    })

    responseHandler(binanceQuery, res);
}

const getAllFuturesOrders = async(req,res) =>{

    var binanceQuery = await order.getAllFuturesOrders({
        symbol: 'BTCUSDT'
    })

    responseHandler(binanceQuery, res);
}

const getFuturesAccountBalance = async (req,res) =>{

    var binanceQuery = await account.getFuturesAccountBalance();

    responseHandler(binanceQuery, res);
}

const getFuturesAccountInformation = async(req,res) =>{
    var binanceQuery = await account.getFuturesAccountInformation();

    responseHandler(binanceQuery, res);
}

const changeFuturesLeverage = async(req,res) =>{
    var binanceQuery = await setting.changeFuturesLeverage({
        symbol: 'BTCUSDT',
        leverage: 5
    });

    responseHandler(binanceQuery, res);
}

const changeFuturesMarginType = async(req,res) =>{
    var binanceQuery = await setting.changeFuturesMarginType({
        symbol: 'BTCUSDT',
        marginType: 'CROSSED'
    });

    responseHandler(binanceQuery, res);
}

module.exports = {
    createFuturesOrder,
    getFuturesOrderStatus,
    closeFuturesOrder,
    cancelFuturesOrder,
    cancelAllFuturesOrders,
    getAllFuturesOrders,
    getFuturesAccountBalance,
    getFuturesAccountInformation,
    changeFuturesLeverage,
    changeFuturesMarginType,
}