const Joi = require('@hapi/joi');

const createFuturesOrderScheme = Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid("SELL","BUY").required(),
})