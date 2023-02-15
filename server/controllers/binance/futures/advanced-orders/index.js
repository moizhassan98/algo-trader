const {fixedDollarOrder} = require('./fixedDollarOrder')
const {percentageOrder} = require('./percentageOrder')
const {closeAllOrders} = require('./closeAllOrders')

module.exports = {
    fixedDollarOrder,
    percentageOrder,
    closeAllOrders
}