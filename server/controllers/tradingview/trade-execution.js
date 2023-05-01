const binanceFuturesSettings = require('../binance/futures/futures-settings')
const binanceFuturesAdvOrders = require('../binance/futures/advanced-orders/')
const { spotFixedDollarOrder } = require('../binance/spot/advanced-orders/spotFixedDollarOrder')
const { spotPercentageOrder } = require('../binance/spot/advanced-orders/spotPercentageOrder')

//TODO: Handle the error in the binance requests.
//TODO: Make changes in the base function so that they take api keys from this function.
//TODO: Complete documentation on base functions.
//TODO: Fix advanced Orders to use less firebase hits.

const tradeExecution = async(tradeSide,userId,botData,apiKeys) =>{
    
    if(botData.brokerId === "BINANCE"){
        if(botData.accountType === "FUTURES"){
            await binanceFuturesAdvOrders.closeAllOrders(apiKeys.apiKey, apiKeys.apiSecret,{
                symbol: botData.symbol
            })
            if(tradeSide === "CLOSE"){
                return ({
                    success: true,
                    status: 200,
                    result: "trade Closed!"
                }) 
            }
            else{
                await binanceFuturesSettings.changeFuturesMarginType(apiKeys.apiKey,apiKeys.apiSecret,{
                    symbol: botData.symbol,
                    marginType:botData.leverageType
                })
    
                await binanceFuturesSettings.changeFuturesLeverage(apiKeys.apiKey, apiKeys.apiSecret,{
                    symbol: botData.symbol,
                    leverage:botData.botLeverage
                })
    
                
                let response = await binanceFuturesAdvancedOrder(tradeSide,userId,botData,apiKeys)
    
                return response
            }
            
        }
        if(botData.accountType === "SPOT"){
            if(tradeSide === "CLOSE"){
                return ({
                    success: true,
                    status: 200,
                    result: "SPOT doesn't have Close!"
                }) 
            }
            else{
                let response = await binanceSpotAdvancedOrders(tradeSide, userId, botData, apiKeys)
                return response;

            }
        }
        if(botData.accountType === "MARGIN"){
            return errorHandler(501,`MARGIN Trading not implemented!`)
        }
        return errorHandler(400,`Invalid account type in Broker ${botData.brokerId}`)
    }
    else{
        return errorHandler(501,`Broker ${botData.brokerId} not implemented!`)
    }
}

module.exports ={
    tradeExecution
}

async function binanceFuturesAdvancedOrder(tradeSide,userId,botData,apiKeys){
    if(botData.typeOfOrder === "FIXED_PERCENTAGE"){
        console.log(`[FUTURES] REQUEST: ${tradeSide} ${botData.symbol} for User:${userId} , Options: ${Number(botData.fixedPercentage)*100}%`)
        let result = await binanceFuturesAdvOrders.percentageOrder(apiKeys.apiKey,apiKeys.apiSecret,{
            symbol: botData.symbol,
            percentage: botData.fixedPercentage,
            orderSide: tradeSide,
            leverage: botData.botLeverage
        })

        return responseHandler(result)

    }
    if(botData.typeOfOrder === "FIXED_DOLLAR_AMOUNT"){
        console.log(`[FUTURES] REQUEST: ${tradeSide} ${botData.symbol} for User:${userId} , Options: ${botData.fixedDollarAmount} USD`)
        let result = await binanceFuturesAdvOrders.fixedDollarOrder(apiKeys.apiKey, apiKeys.apiSecret,{
            symbol: botData.symbol,
            fixedDollarAmount: botData.fixedDollarAmount,
            orderSide: tradeSide,
            leverage: botData.botLeverage
        })

        return responseHandler(result);
    }
    return errorHandler(400,`can't execute the advanced order of type: ${botData.typeOfOrder}`)
}

async function binanceSpotAdvancedOrders(tradeSide,userId,botData,apiKeys){
    if(botData.typeOfOrder === "FIXED_PERCENTAGE"){
        console.log(`[SPOT] REQUEST: ${tradeSide} ${botData.symbol} for User:${userId} , Options: ${Number(botData.fixedPercentage)*100}%`)
        let result = await spotPercentageOrder(apiKeys.apiKey, apiKeys.apiSecret,{
            symbol: botData.symbol,
            percentage: botData.fixedPercentage,
            orderSide: tradeSide,
        })
        // console.log("RES",result);
        return responseHandler(result);
    } 
    if(botData.typeOfOrder === "FIXED_DOLLAR_AMOUNT"){
        console.log(`[SPOT] REQUEST: ${tradeSide} ${botData.symbol} for User:${userId} , Options: ${botData.fixedDollarAmount} USD`)
        let result = await spotFixedDollarOrder(apiKeys.apiKey, apiKeys.apiSecret,{
            symbol: botData.symbol,
            fixedDollarAmount: botData.fixedDollarAmount,
            orderSide: tradeSide
        })
        return responseHandler(result);
    }
    
    return errorHandler(400,`can't execute the advanced order of type: ${botData.typeOfOrder}`)
}

function errorHandler(status,err){
    return ({
        success: false,
        status: status,
        error: err
    })
}

function responseHandler(binanceQuery){
    if(binanceQuery.status === 200){
        console.log(`SUCCESS`)
        return ({
            success: true,
            status: 200,
            result: binanceQuery.result
        })
    }
    else{
        console.log(`ERROR: error: ${binanceQuery.error} | data: ${binanceQuery.data}`)
        return ({
            success: false,
            status: 500,
            error: binanceQuery.error,
            data: binanceQuery.data ? binanceQuery.data : "no data"
        })
    }
}