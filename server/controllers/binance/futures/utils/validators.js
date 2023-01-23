const Joi = require('@hapi/joi');
const enums = require('./enums');
const enumsInArray = require('./enumsInArray');

const createFuturesOrderScheme = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid("SELL","BUY").required(),
})