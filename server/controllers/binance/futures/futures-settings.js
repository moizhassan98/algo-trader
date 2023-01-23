const { binance } = require('../helper/binance-api')

const changeFuturesMarginType = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/marginType',
        'POST',
        apiKey,
        apiSecret,
        options
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

const changeFuturesLeverage = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/leverage',
        'POST',
        apiKey,
        apiSecret,
        options
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
    changeFuturesMarginType,
    changeFuturesLeverage,
}