const { fixedDollarOrder }= require('./fixedDollarOrder')

function responseHandler(binanceQuery,res){
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
            data: binanceQuery.data ? binanceQuery.data : "no data"
        })
    }
}

const createFixedDollarOrder = async(req,res) =>{
    var query = await fixedDollarOrder({
        symbol: 'BTCUSDT',
        fixedDollarAmount: 300,
        orderSide: 'SELL'
    })

    responseHandler(query,res);
}

module.exports = {
    createFixedDollarOrder,
}