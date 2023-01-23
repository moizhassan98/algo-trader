const Joi = require('@hapi/joi');
const enums = require('./enums');
const enumsInArray = require('./enumsInArray');

const createFuturesOrderScheme = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid("SELL","BUY").required(),
})

/////////////////////////////////////////////////////////////
//////////          futures-orders.js             //////////
///////////////////////////////////////////////////////////
//#region futures-order.js

const createFuturesOrderSchema = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid(enumsInArray(enums.orderSide)).required(),
    positionSide: Joi.string().valid(enumsInArray(enums.positionSide)),
    type: Joi.string().valid(enumsInArray(enums.orderTypes)).required(),
    timeInForce: Joi.string().valid(enumsInArray(enums.timeInForce))
        .when('type',{
            is: enums.orderTypes.LIMIT,
            then: Joi.string().valid(enumsInArray(enums.timeInForce)).required()
        }),
    quantity: Joi.number()
        .switch('type',{
        'LIMIT' : Joi.number().required(),
        'MARKET' : Joi.number().required(),
        'STOP': Joi.number().required(),
        'TAKE_PROFIT': Joi.number().required(),
        })
        .when('closePosition',{
            is: "true",
            then: Joi.number().forbidden()
        })
    ,
    reduceOnly: Joi.string().valid(["true","false"])
        .when('postionSide',{
            is: Joi.string().valid([enums.positionSide.LONG, enums.positionSide.SHORT]),
            then: Joi.string().forbidden()
        })
        .when('closePosition',{
            is: "true",
            then: Joi.number().forbidden()
        }),
    price: Joi.number()
        .switch('type',{
            'LIMIT' : Joi.number().required(),
            'STOP' : Joi.number().required(),
            'TAKE_PROFIT': Joi.number().required(),
        }),
    newClientOrderId: Joi.string().regex(/^[\.A-Z\:/a-z0-9_-]{1,36}$/),
    stopPrice: Joi.number()
        .switch('type',{
            'STOP': Joi.number().required(),
            'TAKE_PROFIT': Joi.number().required(),
            'STOP_MARKET': Joi.number().required(),
            'TAKE_PROFIT_MARKET': Joi.number().required(),
        }),
    closePosition: Joi.string().valid(["true","false"]),
    activationPrice: Joi.number(),
    callbackRate: Joi.number()
        .when('type',{
            is: enums.orderTypes.TRAILING_STOP_MARKET,
            then: Joi.number().required()
        }),
    workingType: Joi.string().valid(enumsInArray(enums.workingType)),
    priceProtect: Joi.string().valid(["TRUE","FALSE"]),
    newOrderRespType: Joi.string().valid(enumsInArray(enums.responseType)),
});

const closeFuturesOrderSchema = Joi.object({

});

const getFuturesOrderStatusSchema = Joi.object({

});

const cancelFuturesOrderSchema = Joi.object({

});

const cancelAllFuturesOrdersSchema = Joi.object({

});

const getAllFuturesOrdersSchema = Joi.object({

});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxx       END futures-orders.js     xxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//#endregion

/////////////////////////////////////////////////////////////
//////////          futures-account.js             /////////
///////////////////////////////////////////////////////////
//#region futures-account.js


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxx       END futures-account.js     xxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//#endregion

/////////////////////////////////////////////////////////////
//////////          futures-settings.js             ////////
///////////////////////////////////////////////////////////
//#region futures-settings.js


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxx       END futures-settings.js     xxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//#endregion