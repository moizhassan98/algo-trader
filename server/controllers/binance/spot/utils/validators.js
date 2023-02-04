const Joi = require('@hapi/joi');
const enums = require('./enums');
const { enumsInArray } = require('../../helper/enumsInArray');

const createSpotOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid(...enumsInArray(enums.orderSide)).required(),
    type: Joi.string().valid(...enumsInArray(enums.orderTypes)).required(),
    timeInForce: Joi.string().valid(...enumsInArray(enums.timeInForce))
        .when('type',{
            is: enums.orderTypes.LIMIT,
            then: Joi.string().valid(...enumsInArray(enums.timeInForce)).required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS_LIMIT,
            then: Joi.string().valid(...enumsInArray(enums.timeInForce)).required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT_LIMIT,
            then: Joi.string().valid(...enumsInArray(enums.timeInForce)).required()
        }),
    quantity: Joi.number()
        .when('type',{
            is: enums.orderTypes.LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.MARKET,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.LIMIT_MAKER,
            then: Joi.number().required()
        }),
    quoteOrderQty: Joi.number()
        .when('type',{
            is: enums.orderTypes.MARKET,
            then: Joi.number().required()
        }),
    price: Joi.number()
        .when('type',{
            is: enums.orderTypes.LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.LIMIT_MAKER,
            then: Joi.number().required()
        }),
    newClientOrderId: Joi.string(),
    strategyId: Joi.number().integer(),
    strategyType: Joi.number().integer(),
    stopPrice: Joi.number()
        .when('type',{
            is: enums.orderTypes.STOP_LOSS,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT_LIMIT,
            then: Joi.number().required()
        }),
    trailingDelta: Joi.number()
        .when('type',{
            is: enums.orderTypes.STOP_LOSS,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.STOP_LOSS_LIMIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT,
            then: Joi.number().required()
        })
        .when('type',{
            is: enums.orderTypes.TAKE_PROFIT_LIMIT,
            then: Joi.number().required()
        }),
    icebergQty: Joi.number(),
    newOrderRespType: Joi.string().valid("ACK","RESULT","FULL"),
    selfTradePreventionMode: Joi.string().valid("EXPIRE_TAKER","EXPIRE MAKER","EXPIRE_BOTH")
})
.or('quantity','quoteOrderQty')
.or('stopPrice','trailingDelta');

const getSpotOrderStatusSchema = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number(),
    origClientOrderId: Joi.string()
}).or('orderId','origClientOrderId');

const cancelOpenSpotOrders = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number(),
    origClientOrderId: Joi.string(),
    newClientOrderId: Joi.string()
}).or('orderId','origClientOrderId');

const cancelAllOpenSpotOrders = Joi.object({
    symbol: Joi.string().required()
})

const getAllSpotOrders = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number(),
    startTime: Joi.number().optional(),
    endTime: Joi.number().optional(),
    limit: Joi.number().integer().min(0).max(1000).optional() //default is 500.
})

module.exports = {
    createSpotOrderSchema,
    getSpotOrderStatusSchema,
    cancelOpenSpotOrders,
    cancelAllOpenSpotOrders,
    getAllSpotOrders
}