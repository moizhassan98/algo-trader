const Joi = require('@hapi/joi');
const enums = require('./enums');
const { enumsInArray } = require('./enumsInArray');


/////////////////////////////////////////////////////////////
//////////          futures-orders.js             //////////
///////////////////////////////////////////////////////////
//#region futures-order.js

const createFuturesOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid(...enumsInArray(enums.orderSide)).required(),
    positionSide: Joi.string().valid(...enumsInArray(enums.positionSide)),
    type: Joi.string().valid(...enumsInArray(enums.orderTypes)).required(),
    timeInForce: Joi.string().valid(...enumsInArray(enums.timeInForce))
        .when('type',{
            is: enums.orderTypes.LIMIT,
            then: Joi.string().valid(...enumsInArray(enums.timeInForce)).required()
        }),
    quantity: Joi.number()
        .when('type',{
            is: Joi.string().valid('LIMIT','MARKET','STOP','TAKE_PROFIT'),
            then: Joi.number().required()
        })
        .when('closePosition',{
            is: "true",
            then: Joi.number().forbidden()
        })
    ,
    reduceOnly: Joi.string().valid("true","false")
        .when('postionSide',{
            is: Joi.string().valid(enums.positionSide.LONG, enums.positionSide.SHORT),
            then: Joi.string().forbidden()
        })
        .when('closePosition',{
            is: "true",
            then: Joi.string().forbidden()
        }),
    price: Joi.number()
        .when('type',{
            is: Joi.string().valid('LIMIT','STOP','TAKE_PROFIT'),
            then: Joi.number().required()
        }),
    newClientOrderId: Joi.string().regex(/^[\.A-Z\:/a-z0-9_-]{1,36}$/),
    stopPrice: Joi.number()
        .when('type',{
            is: Joi.string().valid('STOP','TAKE_PROFIT','STOP_MARKET','TAKE_PROFIT_MARKET'),
            then: Joi.number().required()
        }),
    closePosition: Joi.string().valid("true","false"),
    activationPrice: Joi.number(),
    callbackRate: Joi.number()
        .when('type',{
            is: enums.orderTypes.TRAILING_STOP_MARKET,
            then: Joi.number().required()
        }),
    workingType: Joi.string().valid(...enumsInArray(enums.workingType)),
    priceProtect: Joi.string().valid("TRUE","FALSE"),
    newOrderRespType: Joi.string().valid(...enumsInArray(enums.responseType)),
});

const getFuturesOrderStatusSchema = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number().optional(),
    origClientOrderId: Joi.string().optional()
}).or('orderId','origClientOrderId');

const cancelFuturesOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number().optional(),
    origClientOrderId: Joi.string().optional()
}).or('orderId','origClientOrderId');

const cancelAllFuturesOrdersSchema = Joi.object({
    symbol: Joi.string().required()
});

const getAllFuturesOrdersSchema = Joi.object({
    symbol: Joi.string().required(),
    orderId: Joi.number().optional(),
    startTime: Joi.number().optional(),
    endTime: Joi.number().optional(),
    limit: Joi.number().integer().min(0).max(1000).optional() //default is 500.
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxx       END futures-orders.js     xxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//#endregion

/////////////////////////////////////////////////////////////
//////////          futures-settings.js             ////////
///////////////////////////////////////////////////////////
//#region futures-settings.js

const changeFuturesMarginTypeSchema = Joi.object({
    symbol: Joi.string().required(),
    marginType: Joi.string().valid("CROSSED","ISOLATED").required()
});

const changeFuturesLeverageSchema = Joi.object({
    symbol: Joi.string().required(),
    leverage: Joi.number().integer().min(1).max(125)
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxx       END futures-settings.js     xxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//#endregion


module.exports = {
    createFuturesOrderSchema,
    getFuturesOrderStatusSchema,
    cancelFuturesOrderSchema,
    cancelAllFuturesOrdersSchema,
    getAllFuturesOrdersSchema,
    changeFuturesMarginTypeSchema,
    changeFuturesLeverageSchema,
}