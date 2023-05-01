const Joi = require('@hapi/joi');
const db = require('../../../../db');
const { getSpotAssetMarkPrice } = require('../utils/getSpotAssetMarkPrice');
const orders = require('../spot-orders')
const spotAccount = require('../spot-account')


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
const spotPercentageOrder = async(apiKey, apiSecret, options) =>{
    const {error} = percentageOrderSchema.validate(options);

    if(error){
        return errorHandler(400,error)
    }
    else{
        var dbAssetData = await(await (db.collection('binanceSpotSymbols').doc(options.symbol).get())).data()
        var quoteAsset = dbAssetData.quoteAsset

        var orderSymbol;
        if(options.orderSide === "BUY"){
            //quote
            orderSymbol = dbAssetData.quoteAsset
        }
        else{
            orderSymbol = dbAssetData.baseAsset
            // base
        }
        var totalAccountBalance = Number((await spotAccount.getAccountBalanceForAsset(
            apiKey,
            apiSecret,
            orderSymbol
        )).result.free)

        

        var binanceQuery;
        if(options.orderSide === "BUY"){
            let orderQuantity = totalAccountBalance * options.percentage
            orderQuantity = roundToDecimalPlaces(orderQuantity, dbAssetData.quotePrecision)
            binanceQuery = await orders.createSpotOrder(
                apiKey,
                apiSecret,
                {
                    symbol: options.symbol,
                    side: options.orderSide,
                    type: "MARKET",
                    quoteOrderQty: orderQuantity
                }
            );
        }
        else{

            let orderQuantity = totalAccountBalance * options.percentage;
            var baseOrderQuantityDollars = await getSpotAssetMarkPrice(dbAssetData.baseAsset) * orderQuantity
            var quoteAsset = dbAssetData.quoteAsset
            if(quoteAsset !== "USDT"){
                var quoteAssetPrice = await getSpotAssetMarkPrice(quoteAsset);
            }
            else{
                var quoteAssetPrice = 1;
            }
            var quoteAssetQuantity = baseOrderQuantityDollars / quoteAssetPrice ;
            quoteAssetQuantity = roundToDecimalPlaces(quoteAssetQuantity,dbAssetData.quotePrecision)
            binanceQuery = await orders.createSpotOrder(
                apiKey,
                apiSecret,
                {
                    symbol: options.symbol,
                    side: options.orderSide,
                    type: "MARKET",
                    quoteOrderQty: quoteAssetQuantity
                }
            );
        }

        return responseHandler(binanceQuery)
    }
}

module.exports = {
    spotPercentageOrder,
}

const percentageOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    percentage: Joi.number().min(0).max(1).required(),
    orderSide: Joi.string().valid("BUY","SELL").required(),
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