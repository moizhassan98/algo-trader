const { binance } = require('../helper/binance-api')

const getFuturesAccountBalance = async() =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        'fapi/v2/balance',
        'GET',
        apiKey,
        apiSecret,
        {
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

const getFuturesAccountInformation = async() =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        'fapi/v2/account',
        'GET',
        apiKey,
        apiSecret,
        {
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

module.exports = {
    getFuturesAccountBalance,
    getFuturesAccountInformation,
}