const { spotBinance } = require('../helper/binance-spot-api')


const createSpotOrder = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/order',
        'POST',
        apiKey,
        apiSecret,
        options,
    );

    return responseHandler(result);
}

const getSpotOrderStatus = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/order',
        'GET',
        apiKey,
        apiSecret,
        options,
    );

    return responseHandler(result);
}

const cancelOpenSpotOrders = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/order',
        'DELETE',
        apiKey,
        apiSecret,
        options,
    );

    return responseHandler(result);
}

const cancelAllOpenSpotOrders = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/openOrders',
        'DELETE',
        apiKey,
        apiSecret,
        options,
    );

    return responseHandler(result);
}

const getAllSpotOrders = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/allOrders',
        'GET',
        apiKey,
        apiSecret,
        options,
    );

    return responseHandler(result);
}

module.exports = {
    createSpotOrder,
    getSpotOrderStatus,
    cancelOpenSpotOrders,
    cancelAllOpenSpotOrders,
    getAllSpotOrders,
}

function responseHandler(result){
    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }
    else{
        return ({
            status: result.response.status,
            success: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}