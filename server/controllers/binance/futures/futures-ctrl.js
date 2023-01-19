const { binance } = require('../helper/binance-api')


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

module.exports = {
    createFuturesOrder,
    getFuturesOrderStatus,
    cancelFuturesOrder,
    cancelAllFuturesOrders,
}