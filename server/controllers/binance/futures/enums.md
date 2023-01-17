# ENUM definitions
## Symbol type:
    - FUTURE

## Contract type (contractType):

    - PERPETUAL
    - CURRENT_MONTH
    - NEXT_MONTH
    - CURRENT_QUARTER
    - NEXT_QUARTER
    - PERPETUAL_DELIVERING

## Contract status(contractStatus，status):

    - PENDING_TRADING
    - TRADING
    - PRE_DELIVERING
    - DELIVERING
    - DELIVERED
    - PRE_SETTLE
    - SETTLING
    - CLOSE

## Order status (status):

    - NEW
    - PARTIALLY_FILLED
    - FILLED
    - CANCELED
    - REJECTED
    - EXPIRED

## Order types (orderTypes, type):

    - LIMIT
    - MARKET
    - STOP
    - STOP_MARKET
    - TAKE_PROFIT
    - TAKE_PROFIT_MARKET
    - TRAILING_STOP_MAR
    - KET
## Order side (side):

    - BUY
    - SELL

## Position side (positionSide):

    - BOTH
    - LONG
    - SHORT

## Time in force (timeInForce):

    - GTC - Good Till Cancel
    - IOC - Immediate or Cancel
    - FOK - Fill or Kill
    - GTX - Good Till Crossing (Post Only)

## Working Type (workingType):

    - MARK_PRICE
    - CONTRACT_PRICE
## Response Type (newOrderRespType):

    - ACK
    - RESULT

## Kline/Candlestick chart intervals:

m -> minutes; h -> hours; d -> days; w -> weeks; M -> months

1m
3m
5m
15m
30m
1h
2h
4h
6h
8h
12h
1d
3d
1w
1M

## Rate limiters (rateLimitType):

    - REQUEST_WEIGHT
    - ORDERS


## Rate limit intervals (interval):

MINUTE