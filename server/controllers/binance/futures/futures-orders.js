const { binance } = require('../helper/binance-api')


/**
 * Function creates a new VP new order
 * @param {number} a - first number
 * @return {number} - sum of two numbers
 */

const createFuturesOrder = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    // console.log(apiKey,apiSecret);

    var result = await binance(
        '/fapi/v1/order',
        'POST',
        apiKey,
        apiSecret,
        options,
    );
    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }else{
        return ({
            status: result.response.status,
            success: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const getFuturesOrderStatus = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/order',
        'GET',
        apiKey,
        apiSecret,
        options
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }else{
        return ({
            status: result.response.status,
            success: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }

}

const cancelFuturesOrder = async(options) => { //it only cancels the non fulfilled orders.
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/order',
        'DELETE',
        apiKey,
        apiSecret,
        options
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }else{
        return ({
            status: result.response.status,
            success: true,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const cancelAllFuturesOrders = async(options) =>{// Cancel all unfullfilled orders
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/allOpenOrders',
        'DELETE',
        apiKey,
        apiSecret,
        options
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }else{
        return ({
            status: result.response.status,
            succcess: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

const getAllFuturesOrders = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    var result = await binance(
        '/fapi/v1/allOrders',
        'GET',
        apiKey,
        apiSecret,
        options
    );

    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }else{
        return ({
            status: result.response.status,
            success: false,
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
    getAllFuturesOrders,
}