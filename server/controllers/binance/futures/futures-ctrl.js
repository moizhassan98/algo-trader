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
            side: "BUY",
            type: "MARKET",
            quantity: 0.01
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
}