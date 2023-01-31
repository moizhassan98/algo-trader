const { fixedDollarOrder }= require('./fixedDollarOrder')
const { percentageOrder } = require('./percentageOrder')
const {closeAllOrders} = require('./closeAllOrders')

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
            data: binanceQuery.data ? binanceQuery.data : "no data"
        })
    }
}

const createFixedDollarOrder = async(req,res) =>{
    var query = await fixedDollarOrder({
        symbol: 'BTCUSDT',
        fixedDollarAmount: 300,
        orderSide: 'SELL'
    })

    responseHandler(query,res);
}

const createPercentageOrder = async(req,res) =>{
    var query = await percentageOrder({
        symbol: 'AAVEUSDT',
        percentage: 0.1,
        orderSide: 'SELL'
    })

    responseHandler(query,res);
}

const closeAllOrdersForSymbol = async(req,res) =>{
    var query = await closeAllOrders({
        symbol: 'LTCUSDT'
    })

    responseHandler(query,res);
}

module.exports = {
    createFixedDollarOrder,
    createPercentageOrder,
    closeAllOrdersForSymbol
}