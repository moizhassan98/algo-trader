const binanceFuturesSettings = require('../binance/futures/futures-settings')
const binanceFuturesAdvOrders = require('../binance/futures/advanced-orders/')

//TODO: Handle the error in the binance requests.
//TODO: Make changes in the base function so that they take api keys from this function.
//TODO: Complete documentation on base functions.
//TODO: Fix advanced Orders to use less firebase hits.

const tradeExecution = async(tradeSide,userId,botData,apiKeys) =>{
    
    if(botData.brokerId === "BINANCE"){
        if(botData.accountType === "FUTURES"){
            await binanceFuturesAdvOrders.closeAllOrders({
                symbol: botData.symbol
            })

            await binanceFuturesSettings.changeFuturesMarginType({
                symbol: botData.symbol,
                marginType:botData.leverageType
            })

            await binanceFuturesSettings.changeFuturesLeverage({
                symbol: botData.symbol,
                leverage:botData.botLeverage
            })

            
            let response = await binanceFuturesAdvancedOrder(tradeSide,userId,botData,apiKeys)

            return response
        }
        if(botData.accountType === "SPOT"){
            return errorHandler(501,`Currently Implementing SPOT Trading!`)
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
        let result = await binanceFuturesAdvOrders.percentageOrder({
            symbol: botData.symbol,
            percentage: botData.fixedPercentage,
            orderSide: tradeSide
        })

        return responseHandler(result)

    }
    if(botData.typeOfOrder === "FIXED_DOLLAR_AMOUNT"){
        let result = await binanceFuturesAdvOrders.fixedDollarOrder({
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
        return ({
            success: true,
            status: 200,
            result: binanceQuery.result
        })
    }
    else{
        return ({
            success: false,
            status: 500,
            error: binanceQuery.error,
            data: binanceQuery.data ? binanceQuery.data : "no data"
        })
    }
}