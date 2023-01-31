const order = require('../futures-orders');
const account = require('../futures-account');
const Joi = require('@hapi/joi');
// get position for a symbol, get buy and sell side from minus/plus amount . Then place an order for that. 

/**
 * Creates an order which closes the position on the specified symbol
 * 
 * @param {Object} options object containing different inputs for function.
 * @param {String} options.symbol symbol for which positions are to be closed. e.g BTCUSDT
 * 
 * @returns {Object} returns the result of api request to binance
 */
const closeAllOrders = async(options) =>{
    const {error} = closeAllOrdersSchema.validate(options);

    if(error){
        return errorHandler(400,error);
    }
    else{
        var openPositionQuery = await account.getPositionForSymbol(options.symbol);
        
        if(openPositionQuery.status !== 200){
            return errorHandler(500,openPositionQuery)
        }
        else{
            var openPositionAmount = Number(openPositionQuery.result[0].positionAmt);
            var openPositionSide = openPositionAmount > 0 ? "BUY" : "SELL";

            if(openPositionAmount === 0){
                return errorHandler(400, `No positions open on symbol ${options.symbol}`)
            }
            else{
                var closeOrderSide = openPositionSide === "BUY" ? "SELL" : "BUY"; // if the position in LONG then will place order for SHORT.
                var closeOrderQuantity = Math.abs(openPositionAmount); // So its always positive
                var orderResponse = await order.createFuturesOrder({
                    symbol: options.symbol,
                    side: closeOrderSide,
                    type: "MARKET",
                    quantity: closeOrderQuantity,
                })
                return responseHandler(orderResponse);

            }
        }
    }
}

module.exports = {
    closeAllOrders,
}

const closeAllOrdersSchema = Joi.object({
    symbol: Joi.string().required()
});

function errorHandler(status,text){
    return ({
        status: status,
        success: false,
        error: text
    })
}

function responseHandler(binanceQuery){
    if(binanceQuery.status === 200){
        return ({
            status: 200,
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return ({
            status: binanceQuery.status,
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}