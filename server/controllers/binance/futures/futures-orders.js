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

const closeFuturesOrder = async({orderId,symbol}) =>{ //possibly in advanced orders.

    var orderQuery = await getFuturesOrderStatus({orderId, symbol});
    console.log(orderQuery)
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

        var closeOrderQuery = await createFuturesOrder(orderCreationOptions);
        if(closeOrderQuery.status === 200){
            return ({
                status: 200,
                success: true,
                result: closeOrderQuery.result
            })
        }
        else{
            return ({
                status: 500,
                success: false,
                error: orderQuery.error,
                data: orderQuery.data
            })
        }
    }
    else{
        return ({
            status: 500,
            success: false,
            error: orderQuery.error,
            data: orderQuery.data
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
    closeFuturesOrder,
    getFuturesOrderStatus,
    cancelFuturesOrder,
    cancelAllFuturesOrders,
    getAllFuturesOrders,
}