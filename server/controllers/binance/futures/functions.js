const { binance } = require('../helper/binance-api')

const getFuturesOrderStatus = async(orderId) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/order',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol: 'BTCUSDT',
            orderId: orderId
        }
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            result: result.data
        })
    }else{
        return ({
            status: 500,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }

}

const createFuturesOrder = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        'https://testnet.binancefuture.com/fapi/v1/order',
        'POST',
        apiKey,
        apiSecret,
        options,
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            result: result.data
        })
    }else{
        return ({
            status: 500,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

module.exports = {
    getFuturesOrderStatus,
    createFuturesOrder,
}