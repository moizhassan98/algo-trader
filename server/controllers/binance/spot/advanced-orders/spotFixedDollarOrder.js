const Joi = require('@hapi/joi');
const db = require('../../../../db');
const { getSpotAssetMarkPrice } = require('../utils/getSpotAssetMarkPrice');
const orders = require('../spot-orders')

/**
 * Creates a SPOT position where a fixed dollar amount is defined. Order is executed at MARKET price.
 * 
 * @param {Object} options object containing different inputs for function.
 * @param {String} options.symbol symbol for which the trade is to be executed. e.g BTCUSDT
 * @param {number} options.fixedDollarAmount amount of money which is to be traded. Is an integer number like 100
 * @param {('BUY' | 'SELL')} options.orderSide Is the order LONG or SHORT
 * 
 * @returns {Object} returns the result of api request to binance
 */
const spotFixedDollarOrder = async(apiKey, apiSecret, options) =>{
    const {error} = fixedDollarOrderSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
        var dbAssetData = await(await (db.collection('binanceSpotSymbols').doc(options.symbol).get())).data()
        var quoteAsset = dbAssetData.quoteAsset
        if(quoteAsset !== "USDT"){
            var quoteAssetPrice = await getSpotAssetMarkPrice(quoteAsset);
        }
        else{
            var quoteAssetPrice = 1;
        }
        

        var quoteAssetQuantity = options.fixedDollarAmount / quoteAssetPrice ;
        quoteAssetQuantity = roundToDecimalPlaces(quoteAssetQuantity,dbAssetData.quotePrecision)

        var binanceQuery = await orders.createSpotOrder(
            apiKey,
            apiSecret,
            {
                symbol: options.symbol,
                side: options.orderSide,
                type: "MARKET",
                quoteOrderQty: quoteAssetQuantity
            }
        );

        return responseHandler(binanceQuery);

    }
}

module.exports = {
    spotFixedDollarOrder
}

const fixedDollarOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    fixedDollarAmount: Joi.number().integer().min(1).required(),
    orderSide: Joi.string().valid("BUY","SELL").required()
});

function roundToDecimalPlaces(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
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