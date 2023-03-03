const { binance } = require('../helper/binance-api')

const getFuturesAccountBalance = async(apiKey, apiSecret) =>{
    // const apiKey = process.env.FuturesTestnetApiKey
    // const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        '/fapi/v2/balance',
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
        '/fapi/v2/account',
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

/**
 * gets the amount of asset in account. This function id mainly for FUTURES account balance of one asset.
 * @param {string} asset Asset name for which you need balance. like 'USDT', 'BTC'
 * @returns {number} balance amount in the account. If errored then returns -1.
 */
const getAccountBalanceForAsset = async(apiKey,apiSecret, asset) =>{
    var query = await getFuturesAccountBalance(apiKey,apiSecret);

    if(query.status === 200){
        var assetBalance = -1
        query.result.map((queryAsset)=>{
            if(queryAsset.asset === asset){
                assetBalance = queryAsset.balance
            }
        })
        return assetBalance
    }
    else{
        return -1
    }
}


/**
 * get current position on a symbol like BTCUSDT
 * 
 * @param {string} symbol symbol for which you need the position for.
 * @returns {Object} 
 */
const getPositionForSymbol = async(apiKey, apiSecret, symbol) =>{
    // const apiKey = process.env.FuturesTestnetApiKey
    // const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v2/positionRisk',
        'GET',
        apiKey,
        apiSecret,
        {
            symbol
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
    getAccountBalanceForAsset,
    getPositionForSymbol,
}