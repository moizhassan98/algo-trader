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
            });

            await binanceFuturesSettings.changeFuturesLeverage({
                symbol: botData.symbol,
                leverage:botData.botLeverage
            });

            


        }
        if(botData.accountType === "SPOT"){
            return errorHandler(500,`Currently Implementing SPOT Trading!`)
        }
        if(botData.accountType === "MARGIN"){
            return errorHandler(500,`MARGIN Trading not implemented!`)
        }
        return errorHandler(400,`Invalid account type in Broker ${botData.brokerId}`)
    }
    else{
        return errorHandler(500,`Broker ${botData.brokerId} not implemented!`)
    }
}

module.exports ={
    tradeExecution
}

function futuresOrder(){

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
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(binanceQuery.status).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}