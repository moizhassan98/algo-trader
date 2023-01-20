const { binance } = require('../helper/binance-api')
const fn = require('./functions')
const account = require('./futures-account')
const setting = require('./futures-settings')


const createFuturesOrder = async(req,res) =>{//

    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/order',
        'POST',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT',
            side: "SELL",
            type: "MARKET",
            quantity: 0.01,
        }
    );

    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const closeFuturesOrder = async(req,res) =>{
    const orderId = 3276949096;

    var orderQuery = await fn.getFuturesOrderStatus(orderId);

    if(orderQuery.status === 200){
        var orderSide = ""
        if(orderQuery.result.side === "BUY"){
            orderSide = "SELL"; 
        }
        else{
            orderSide = "BUY";
        }
        const orderCreationOptions = {
            symbol: orderQuery.result.symbol,
            quantity: parseFloat(orderQuery.result.executedQty),
            type: "MARKET",
            side: orderSide
        }

        var closeOrderQuery = await fn.createFuturesOrder(orderCreationOptions);
        if(closeOrderQuery.status === 200){
            return res.status(200).json({
                success: true,
                result: closeOrderQuery.result
            })
        }
        else{
            return res.status(500).json({
                success: false,
                error: orderQuery.error,
                data: orderQuery.data
            })
        }
    }
    else{
        return res.status(500).json({
            success: false,
            error: orderQuery.error,
            data: orderQuery.data
        })
    }

    
}

const getFuturesOrderStatus = async(req,res) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/order',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT',
            orderId: 3276928701
        }
    );

    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }

}

const cancelFuturesOrder = async(req,res) => { // I think it only cancels the non fulfilled orders.
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/order',
        'DELETE',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT',
            orderId: 3276928701
            // side: "BUY",
            // type: "MARKET",
            // quantity: 0.01
        }
    );

    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const cancelAllFuturesOrders = async(req,res) =>{// Cancel all unfullfilled orders
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/allOpenOrders',
        'DELETE',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT'
        }
    );

    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const getAllFuturesOrders = async(req,res) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/allOrders',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT'
        }
    );

    if(result.status === 200 ){
        return res.status(200).json({
            result: result.data
        })
    }else{
        return res.status(result.response.status).json({
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const getFuturesAccountBalance = async (req,res) =>{
    var binanceQuery = await account.getFuturesAccountBalance();

    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(500).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}

const getFuturesAccountInformation = async(req,res) =>{
    var binanceQuery = await account.getFuturesAccountInformation();

    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(500).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}

const changeFuturesLeverage = async(req,res) =>{
    var binanceQuery = await setting.changeFuturesLeverage({
        symbol: 'BTCUSDT',
        leverage: 5
    });

    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(500).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}

const changeFuturesMarginType = async(req,res) =>{
    var binanceQuery = await setting.changeFuturesLeverage({
        symbol: 'BTCUSDT',
        marginType: 'ISOLATED'
    });

    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(500).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
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