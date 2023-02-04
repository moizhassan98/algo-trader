
const orderTypes = {
    LIMIT : "LIMIT",
    MARKET : "MARKET",
    STOP_LOSS : "STOP_LOSS",
    STOP_LOSS_LIMIT : "STOP_LOSS_LIMIT",
    TAKE_PROFIT : "TAKE_PROFIT",
    TAKE_PROFIT_LIMIT : "TAKE_PROFIT_LIMIT",
    LIMIT_MAKER: "LIMIT_MAKER"
}

const orderSide = {
    BUY: "BUY",
    SELL: "SELL"
}

const timeInForce = {
    GTC: "GTC",
    IOC: "IOC",
    FOK: "FOK"
}

module.exports = {
    orderTypes,
    orderSide,
    timeInForce
}