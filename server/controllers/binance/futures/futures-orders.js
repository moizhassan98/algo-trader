const { binance } = require('../helper/binance-api')
const {
    createFuturesOrderSchema,
    getFuturesOrderStatusSchema,
    cancelFuturesOrderSchema,
    cancelAllFuturesOrdersSchema,
    getAllFuturesOrdersSchema,
} = require('./utils/validators')


const createFuturesOrder = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.FuturesTestnetApiKey
    // const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = createFuturesOrderSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
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

}

const closeFuturesOrder = async({orderId,symbol}) =>{ //possibly in advanced orders.

    var orderQuery = await order.getFuturesOrderStatus({orderId, symbol});
    // console.log(orderQuery)
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

    const {error} = getFuturesOrderStatusSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
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
    

}

const cancelFuturesOrder = async(options) => { //it only cancels the non fulfilled orders.
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = cancelFuturesOrderSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
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
        }
        else{
            return ({
                status: result.response.status,
                success: true,
                error: result.response.statusText,
                data: result.response.data ? result.response.data : "no data",
            })
        }
    }

    
}

const cancelAllFuturesOrders = async(options) =>{// Cancel all unfullfilled orders
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = cancelAllFuturesOrdersSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
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
        }
        else{
            return ({
                status: result.response.status,
                succcess: false,
                error: result.response.statusText,
                data: result.response.data ? result.response.data : "no data",
            })
        }
    }
    
}

const getAllFuturesOrders = async(options) =>{
    const apiKey = process.env.FuturesTestnetApiKey
    const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = getAllFuturesOrdersSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
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
    
}

module.exports = {
    createFuturesOrder,
    closeFuturesOrder,
    getFuturesOrderStatus,
    cancelFuturesOrder,
    cancelAllFuturesOrders,
    getAllFuturesOrders,
}