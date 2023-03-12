const { getAssetMarkPrice } = require('../utils/getAssetMarkPrice')
const Joi = require('@hapi/joi');
const db = require('../../../../db')
const {
    createFuturesOrder
} = require('../futures-orders')
const account = require('../futures-account')

/**
 * Creates a position where a fixed dollar amount is defined. Order is executed at MARKET price.
 * 
 * @param {Object} options object containing different inputs for function.
 * @param {String} options.symbol symbol for which the trade is to be executed. e.g BTCUSDT
 * @param {number} options.percentage percentage from 0-1 which define how much account balance used in one trade.
 * @param {('BUY' | 'SELL')} options.orderSide Is the order LONG or SHORT
 * 
 * @returns {Object} returns the result of api request to binance
 */
const percentageOrder = async(apiKey, apiSecret, options) =>{

    const {error} = percentageOrderSchema.validate(options);

    if(error){
        return errorHandler(400,error)
    }
    else{
        var baseAssetMarkPrice = await getAssetMarkPrice(options.symbol);
        if(baseAssetMarkPrice === -1){
            return errorHandler(400,'The symbol provided not supported. Got error getting MarkPrice!')
        }
        else{
            var dbAssetData = await(await (db.collection('binanceFuturesSymbols').doc(options.symbol).get())).data() 
            if(!dbAssetData){
                return errorHandler(400,'The symbol provided not supported. Got error getting from DB!')
            }
            else{
                var marginAsset = dbAssetData.marginAsset
                var marginAssetAccountBalance = await account.getAccountBalanceForAsset(apiKey, apiSecret, marginAsset)
                console.log("Margin Asset account Balance: ",marginAssetAccountBalance)
                if(marginAssetAccountBalance === -1){
                    return errorHandler(500,'Unable to get the asset balance from account!')
                }
                else{
                    console.log("Percentage: ",options.percentage)
                    var percentageDollarAmount = Number(options.percentage * marginAssetAccountBalance) * Number(options.leverage)
                    console.log("Order dollar amount: ",percentageDollarAmount)
                    var orderQuantity = percentageDollarAmount / baseAssetMarkPrice
                    console.log("Order  quantity: ",orderQuantity)
                    var orderQuantityPrecision = dbAssetData.quantityPrecision
                    orderQuantity = roundToDecimalPlaces(orderQuantity,orderQuantityPrecision);
                    console.log("Order  quantity rounded: ",orderQuantity)
                    var orderResponse = await createFuturesOrder(apiKey, apiSecret,{
                        symbol: options.symbol,
                        side: options.orderSide,
                        type: "MARKET",
                        quantity: orderQuantity,
                    })
                    return responseHandler(orderResponse);
                }

                
            }
            
        }
    }
}

module.exports = {
    percentageOrder,
}

const percentageOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    percentage: Joi.number().min(0).max(1).required(),
    orderSide: Joi.string().valid("BUY","SELL").required(),
    leverage: Joi.number().min(1).max(125).required(),
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

function errorHandler(status,text){
    return ({
        status: status,
        success: false,
        error: text
    })
}

