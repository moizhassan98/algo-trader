const { getAssetMarkPrice } = require('../utils/getAssetMarkPrice')
const Joi = require('@hapi/joi');
const db = require('../../../../db')
const {
    createFuturesOrder
} = require('../futures-orders')

/**
 * Creates a position where a fixed dollar amount is defined. Order is executed at MARKET price.
 * 
 * @param {Object} options object containing different inputs for function.
 * @param {String} options.symbol symbol for which the trade is to be executed. e.g BTCUSDT
 * @param {number} options.fixedDollarAmount amount of money which is to be traded. Is an integer number like 100
 * @param {('BUY' | 'SELL')} options.orderSide Is the order LONG or SHORT
 * 
 * @returns {Object} returns the result of api request to binance
 */
const fixedDollarOrder = async(options) =>{

    const {error} = fixedDollarOrderSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
        var baseAssetMarkPrice = await getAssetMarkPrice(options.symbol);
        if(baseAssetMarkPrice === -1){
            return ({
                status: 400,
                success: false,
                error: 'The symbol provided not supported. Got error getting MarkPrice!'
            })
        }
        else{
            var orderQuantity = options.fixedDollarAmount / baseAssetMarkPrice
            var orderQuantityPrecision = await(await (db.collection('binanceFuturesSymbols').doc(options.symbol).get())).data().quantityPrecision
            orderQuantity = roundToDecimalPlaces(orderQuantity,orderQuantityPrecision);

            var orderResponse = await createFuturesOrder({
                symbol: options.symbol,
                side: options.orderSide,
                type: "MARKET",
                quantity: orderQuantity,
            })
            return responseHandler(orderResponse);
        }
    }
}

module.exports = {
    fixedDollarOrder,
}

const fixedDollarOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    fixedDollarAmount: Joi.number().integer().min(1).required(),
    orderSide: Joi.string().valid("BUY","SELL").required()
});

function roundToDecimalPlaces(num, decimalPlaces) {
    return Number(num.toFixed(decimalPlaces));
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