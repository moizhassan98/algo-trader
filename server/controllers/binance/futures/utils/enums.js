
const contractType = {
    PERPETUAL : "PERPETUAL",
    CURRENT_MONTH : "CURRENT_MONTH",
    NEXT_MONTH : "NEXT_MONTH",
    CURRENT_QUARTER : "CURRENT_QUARTER",
    NEXT_QUARTER : "NEXT_QUARTER",
    PERPETUAL_DELIVERING : "PERPETUAL_DELIVERING"
}

const contractStatus = {
    PENDING_TRADING : "PENDING_TRADING",
    TRADING : "TRADING",
    PRE_DELIVERING : "PRE_DELIVERING",
    DELIVERING : "DELIVERING",
    DELIVERED : "DELIVERED",
    PRE_SETTLE : "PRE_SETTLE",
    SETTLING : "SETTLING",
    CLOSE : "CLOSE"
}

const orderStatus = {
    NEW : "NEW",
    PARTIALLY_FILLED : "PARTIALLY_FILLED",
    FILLED : "FILLED",
    CANCELED : "CANCELED",
    REJECTED : "REJECTED",
    EXPIRED : "EXPIRED"
}

const orderTypes = {
    LIMIT : "LIMIT",
    MARKET : "MARKET",
    STOP : "STOP",
    STOP_MARKET : "STOP_MARKET",
    TAKE_PROFIT : "TAKE_PROFIT",
    TAKE_PROFIT_MARKET : "TAKE_PROFIT_MARKET",
    TRAILING_STOP_MARKET : "TRAILING_STOP_MARKET",
    KET : "KET"
}

const orderSide = {
    BUY: "BUY",
    SELL: "SELL"
}

const positionSide = {
    BOTH : "BOTH",
    LONG : "LONG",
    SHORT : "SHORT"
}

const timeInForce = {
    GTC : "GTC", //  Good Till Cancel
    IOC : "IOC", //  Immediate or Cancel
    FOK : "FOK", //  Fill or Kill
    GTX : "GTX", //  Good Till Crossing (Post Only)
}

const workingType = {
    MARK_PRICE: "MARK_PRICE",
    CONTRACT_TYPE: "CONTRACT_PRICE"
}

const responseType = {
    ACK : "ACK",
    RESULT: "RESULT"
}

const rateLimitType = {
    REQUEST_WEIGHT : "REQUEST_WEIGHT",
    ORDERS : "ORDERS",
}

module.exports = {
    contractType,
    contractStatus,
    orderStatus,
    orderTypes,
    orderSide,
    positionSide,
    timeInForce,
    workingType,
    responseType,
    rateLimitType,
}