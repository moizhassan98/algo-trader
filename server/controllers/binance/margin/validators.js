const Joi = require('@hapi/joi');

const createMarginOrderSchema = Joi.object({
    userId: Joi.string().required(),
    symbol: Joi.string().required(),
    isIsolated:  Joi.string().valid('TRUE','FALSE'), 
    side:  Joi.string().valid('SELL','BUY').required(),
    type: Joi.string().valid('LIMIT', 'MARKET', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER').required(),
    quantity: Joi.number().required(),
})

module.exports = {
    createMarginOrderSchema,
}